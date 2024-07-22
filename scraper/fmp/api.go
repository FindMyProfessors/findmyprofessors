package fmp

import (
	"context"
	"fmt"
	"strconv"
	"sync"
	"time"

	"golang.org/x/sync/semaphore"

	"github.com/FindMyProfessors/scraper/model"
)

type Api struct {
	JwtToken string
}

const LOCAL = 0
const PRODUCTION = 1

func NewApi(ctx context.Context, username string, password string) (context.Context, *Api, error) {
	token, err := Login(username, password)
	if err != nil {
		fmt.Printf("Error logging in to FMP: %s\n", err)
		return nil, nil, err
	}

	return ctx, &Api{JwtToken: token}, nil
}

type TermInput struct {
	Year     int32
	Semester string
}

func (a *Api) UpsertSchool(ctx context.Context, school *model.School, term *model.Term) error {
	foundSchool, err := GetSchoolByName(a.JwtToken, school.Name)
	if err != nil {
		return err
	}
	if foundSchool == nil {
		school_id, err := CreateSchool(a.JwtToken, NewSchool{Name: school.Name})
		if err != nil {
			return err
		}
		id := strconv.Itoa(school_id)
		school.ID = &id
	} else {
		school.ID = foundSchool.ID
	}

	termInput := TermInput{
		Year:     int32(term.Year),
		Semester: string(term.Semester),
	}

	professorMap, err := a.GetAllProfessors(ctx, school, termInput)
	if err != nil {
		return err
	}

	courseIds, err := a.GetAllCourseIds(ctx, school)
	if err != nil {
		return err
	}
	// print courseIds
	fmt.Printf("Course IDs: %v\n", courseIds)

	// parse school id as int
	schoolId, err := strconv.Atoi(*school.ID)
	if err != nil {
		return err
	}

	for _, course := range school.Courses {
		_, exists := courseIds[course.Code]
		if !exists {
			courseId, err := CreateCourse(a.JwtToken, NewCourse{
				Name:     course.Name,
				Code:     course.Code,
				SchoolID: schoolId,
			})

			courseIds[course.Code] = strconv.Itoa(courseId)
			if err != nil {
				return err
			}
		}
	}

	for _, elem := range school.Professors {
		err = func(professor *model.Professor) error {
			match, ok := professorMap[professor.FirstName+professor.LastName]
			if ok {
				// Conver professor id into int
				professorId, err := strconv.Atoi(match.ID)
				if err != nil {
					return err
				}
				if len(match.Reviews) > 0 {
					newReviews, err := a.InsertNewReviews(ctx, professor, match.Reviews[0])
					if err != nil {
						return err
					}
					if newReviews > 0 {
						fmt.Printf("%s %s has %d new reviews!\n", professor.FirstName, professor.LastName, newReviews)
					}
				}
				for _, course := range professor.Courses {
					_, ok := match.Courses[course.Code]
					if !ok {
						courseId, err := strconv.Atoi(course.ID)
						if err != nil {
							return err
						}
						courseEnrollment := CourseEnrollment{
							CourseID: courseId,
							Year:     term.Year,
							Semester: string(term.Semester),
						}

						_, err = EnrollProfessorIntoCourse(a.JwtToken, professorId, courseEnrollment)
						if err != nil {
							return err
						}
					}
				}
			} else {

				// Convert school id into int
				schoolId, err := strconv.Atoi(*school.ID)
				if err != nil {
					return err
				}

				professorId, err := CreateProfessor(a.JwtToken, NewProfessor{
					FirstName: professor.FirstName,
					LastName:  professor.LastName,
					RmpID:     professor.RMPId,
					SchoolID:  schoolId,
				})

				if err != nil {
					return err
				}
				professor.ID = strconv.Itoa(professorId)

				for _, review := range professor.Reviews {
					err := CreateReview(a.JwtToken, NewReview{
						Quality:     review.Quality,
						Difficulty:  review.Difficulty,
						Time:        review.Date.Format(time.RFC3339),
						Tags:        review.Tags,
						Grade:       review.Grade,
						ProfessorID: professorId,
					})
					if err != nil {
						return err
					}
				}
				for _, course := range professor.Courses {
					courseId, ok := courseIds[course.Code]
					if !ok {
						return fmt.Errorf("course with code %s not found in courses retrieved from FMP", course.Code)
					}
					courseIdInt, err := strconv.Atoi(courseId)
					if err != nil {
						return err
					}
					courseEnrollment := CourseEnrollment{
						CourseID: courseIdInt,
						Year:     term.Year,
						Semester: string(term.Semester),
					}
					_, err = EnrollProfessorIntoCourse(a.JwtToken, professorId, courseEnrollment)
					if err != nil {
						return err
					}
				}
			}
			return nil
		}(elem)
		if err != nil {
			return err
		}
	}
	fmt.Printf("Finished uploading school to FMP\n")
	return nil
}

func (a *Api) InsertNewReviews(ctx context.Context, scrapedProfessor *model.Professor, retrievedReview *model.Review) (int, error) {
	var indexUntil int

	for i, review := range scrapedProfessor.Reviews {
		if review.Date.Equal(retrievedReview.Date) {
			indexUntil = i
		}
	}

	// convert professor id into int
	professorId, err := strconv.Atoi(scrapedProfessor.ID)
	if err != nil {
		return -1, err
	}

	var wg sync.WaitGroup
	sem := semaphore.NewWeighted(10) // limit to 10 concurrent goroutines
	errChan := make(chan error, indexUntil)

	for i := 0; i < indexUntil; i++ {
		review := scrapedProfessor.Reviews[i]
		wg.Add(1)
		go func(review *model.Review) {
			defer wg.Done()
			if err := sem.Acquire(ctx, 1); err != nil {
				errChan <- err
				return
			}
			defer sem.Release(1)

			err := CreateReview(a.JwtToken, NewReview{
				Quality:     review.Quality,
				Difficulty:  review.Difficulty,
				Time:        review.Date.Format(time.RFC3339),
				Tags:        review.Tags,
				Grade:       review.Grade,
				ProfessorID: professorId,
			})
			if err != nil {
				errChan <- err
			}
		}(review)
	}

	wg.Wait()
	close(errChan)

	for err := range errChan {
		if err != nil {
			return -1, err
		}
	}

	return 0, nil
}

func (a *Api) GetAllProfessors(ctx context.Context, school *model.School, term TermInput) (map[string]*model.Professor, error) {
	professorMap := make(map[string]*model.Professor)

	schoolId, err := strconv.Atoi(*school.ID)
	if err != nil {
		return nil, fmt.Errorf("invalid school ID: %v", err)
	}

	var after string
	hasNextPage := true

	for hasNextPage {
		resp, err := SearchProfessors(a.JwtToken, school.Name, schoolId, after, 10000)
		if err != nil {
			return nil, err
		}

		for _, elem := range resp.Edges {
			professorKey := elem.Node.FirstName + elem.Node.LastName
			professor := model.Professor{
				ID:        strconv.Itoa(elem.Node.ID),
				FirstName: elem.Node.FirstName,
				LastName:  elem.Node.LastName,
				Courses:   map[string]*model.Course{},
				Reviews:   []*model.Review{},
			}

			reviews, err := GetReviewsForProfessor(a.JwtToken, elem.Node.ID, "", 10000)
			if err != nil {
				return nil, err
			}

			for _, review := range reviews.Edges {
				date, err := time.Parse(time.RFC3339, review.Node.Time)
				if err != nil {
					return nil, err
				}
				professor.Reviews = append(professor.Reviews, &model.Review{
					Quality:    review.Node.Quality,
					Difficulty: review.Node.Difficulty,
					Date:       date,
					Tags:       convertTags(review.Node.Tags),
					Grade:      model.Grade(review.Node.Grade),
				})
			}

			courses, err := GetProfessorCourses(a.JwtToken, elem.Node.ID, int(term.Year), term.Semester)
			if err != nil {
				return nil, err
			}

			for _, course := range courses.Courses {
				professor.Courses[course.Code] = &model.Course{
					ID:   strconv.Itoa(course.ID),
					Name: course.Name,
					Code: course.Code,
				}
			}

			professorMap[professorKey] = &professor
		}

		after = resp.PageInfo.EndCursor
		hasNextPage = resp.PageInfo.HasNextPage
	}
	return professorMap, nil
}

func convertTags(tags []string) []model.Tag {
	var modelTags []model.Tag
	for _, tag := range tags {
		modelTags = append(modelTags, model.Tag(tag))
	}
	return modelTags
}

func (a *Api) GetAllCourseIds(ctx context.Context, school *model.School) (map[string]string, error) {
	courseMap := make(map[string]string)

	var after string
	hasNextPage := true
	// get school id
	schoolId, err := strconv.Atoi(*school.ID)
	if err != nil {
		return nil, fmt.Errorf("invalid school ID: %v", err)
	}

	// print school id
	fmt.Printf("School ID: %d\n", schoolId)
	for hasNextPage {
		// print after
		fmt.Printf("After: %s\n", after)

		response, err := GetSchoolCourses(a.JwtToken, schoolId, "", after, 100)
		if err != nil {
			return nil, err
		}
		// print response
		fmt.Printf("Response: %v\n", response)

		// loop over and print response.Edges
		for _, elem := range response.Edges {
			fmt.Printf("Course: %s %s\n", elem.Node.Code, elem.Node.Name)
		}

		for _, elem := range response.Edges {
			courseMap[elem.Node.Code] = strconv.Itoa(elem.Node.ID)
		}

		after = response.PageInfo.EndCursor
		hasNextPage = response.PageInfo.HasNextPage
	}
	return courseMap, nil
}

func GetSchoolByName(jwtToken, schoolName string) (*model.School, error) {
	resp, err := SearchSchools(jwtToken, schoolName, "", 1)
	if err != nil {
		return nil, err
	}

	for _, elem := range resp.Edges {
		if schoolName == elem.Node.Name {
			schoolID := strconv.Itoa(elem.Node.ID)
			school := model.School{
				ID:   &schoolID,
				Name: elem.Node.Name,
			}
			return &school, nil
		}
	}
	return nil, nil
}
