package rmp

import (
	"context"
	"encoding/base64"
	"fmt"
	"log"
	"net/http"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/FindMyProfessors/scraper/model"
	"github.com/Khan/genqlient/graphql"
)

type Api struct {
	Client graphql.Client
}

type AuthenticationTransportWrapper struct {
	Password string
}

func (d AuthenticationTransportWrapper) RoundTrip(request *http.Request) (*http.Response, error) {
	request.Header.Set("Authorization", "Basic "+d.Password)
	return http.DefaultTransport.RoundTrip(request)
}

func NewApi(password string) *Api {
	httpClient := &http.Client{
		Transport:     AuthenticationTransportWrapper{Password: password},
		Timeout:       time.Minute * 1,
		CheckRedirect: http.DefaultClient.CheckRedirect,
		Jar:           http.DefaultClient.Jar,
	}
	return &Api{Client: graphql.NewClient("https://www.ratemyprofessors.com/graphql", httpClient)}
}

func (a *Api) StartScrape(ctx context.Context, school *model.School, schoolIDs ...int) error {
	var professorArray []*model.Professor
	for _, id := range schoolIDs {
		fmt.Printf("Scraping %s with rmp id %d\n", school.Name, id)
		base64SchoolIdCursor := base64.StdEncoding.EncodeToString([]byte("School-" + strconv.Itoa(id)))
		professors, err := a.scrape(ctx, []*model.Professor{}, "", base64SchoolIdCursor)
		if err != nil {
			return fmt.Errorf("unable to scrape: %v", err)
		}
		professorArray = append(professorArray, professors...)
	}

	sort.SliceStable(professorArray[:], func(i, j int) bool {
		return strings.Compare(professorArray[i].LastName, professorArray[j].LastName) == -1
	})
	crossReference(school, professorArray)
	for _, elem := range professorArray {
		fmt.Printf("professor=%v\n", elem)
	}
	return nil
}

func isSameProfessor(professor *model.Professor, rmpProfessor *model.Professor) bool {
	//fmt.Printf("professor=%v\n", professor)
	//fmt.Printf("rmpProfessor=%v\n", rmpProfessor)
	//log.Printf("Comparing professor: %s %s with rmpProfessor: %s %s\n", professor.FirstName, professor.LastName, rmpProfessor.FirstName, rmpProfessor.LastName)

	if professor.FirstName == rmpProfessor.FirstName {
		if professor.LastName == rmpProfessor.LastName {
			return true
		}
	}

	tryMultiname := func(a string, b string, deliminator string) bool {
		aNames := strings.Split(a, deliminator)
		bNames := strings.Split(b, deliminator)
		if len(aNames) == 1 && len(bNames) == 1 {
			return a == b
		}
		for _, aa := range aNames {
			for _, bb := range bNames {
				if aa == bb {
					return true
				}
			}
		}
		return false
	}

	if tryMultiname(professor.FirstName, rmpProfessor.FirstName, "-") && tryMultiname(professor.LastName, rmpProfessor.LastName, "-") {
		return true
	}
	return false
}

func crossReference(school *model.School, rmpProfessors []*model.Professor) {
	var wg sync.WaitGroup
	wg.Add(len(rmpProfessors))
	for _, rmpProfessor := range rmpProfessors {
		if rmpProfessor.LastName == "Leinecker" {
			log.Printf("Found Leinecker!!!\n")
		}
		rmpProfessor := rmpProfessor // create a new variable for the goroutine
		go func(p *model.Professor) {
			defer wg.Done()
			for _, professor := range school.Professors {
				if isSameProfessor(professor, p) {
					professor.Reviews = p.Reviews
					professor.RMPId = p.RMPId
					log.Printf("found match for %s %s\n", professor.FirstName, professor.LastName)
					break
				}
			}
		}(rmpProfessor)
	}
	wg.Wait()
}

func (a *Api) scrape(ctx context.Context, professors []*model.Professor, cursor string, schoolId string) ([]*model.Professor, error) {
	response, err := NewSearch(ctx, a.Client, &schoolId, 1000, cursor)
	if err != nil {
		return nil, err
	}

	for _, prof := range response.NewSearch.Teachers.Edges {
		rmpProfessor := prof.Node
		if rmpProfessor.LastName != nil && *rmpProfessor.LastName == "Leinecker" {
			log.Printf("Found Leinecker!!! HERE\n")
		}

		var reviews = make([]*model.Review, len(rmpProfessor.Ratings.Edges), len(rmpProfessor.Ratings.Edges))

		for i, elem := range rmpProfessor.Ratings.Edges {
			//fmt.Printf("elem.Rating=%v\n", elem)
			rmpRating := elem.Node
			t, err := time.Parse(model.RMPTimeConstant, *rmpRating.Date)
			if err != nil {
				return nil, err
			}
			var tags []model.Tag
			tagsString := *rmpRating.RatingTags
			if len(tagsString) > 0 {
				split := strings.Split(tagsString, "--")

				tags = make([]model.Tag, 0, len(split))

				for _, elem := range split {
					tag, err := model.GetTagByString(elem)
					if err != nil {
						return nil, err
					}
					tags = append(tags, tag)
				}
			} else {
				tags = []model.Tag{}
			}

			grade := model.GetGradeByString(*rmpRating.Grade)
			if !grade.IsValid() {
				return nil, fmt.Errorf("%s is an invalid grade", *rmpRating.Grade)
			}

			reviews[i] = &model.Review{
				Quality:    float64(*rmpRating.QualityRating),
				Difficulty: *rmpRating.DifficultyRatingRounded,
				Date:       t,
				Tags:       tags,
				Grade:      grade,
			}
		}

		professors = append(professors, &model.Professor{
			FirstName: *rmpProfessor.FirstName,
			LastName:  *rmpProfessor.LastName,
			RMPId:     *rmpProfessor.Id,
			Reviews:   reviews,
		})

		log.Printf("Added professor: %s %s with %d reviews\n", *rmpProfessor.FirstName, *rmpProfessor.LastName, len(reviews))
	}

	pageInfo := response.NewSearch.Teachers.PageInfo

	if pageInfo.EndCursor != nil {
		log.Println("EndCursor=", *pageInfo.EndCursor)
	}
	log.Println("HasNextPage=", pageInfo.HasNextPage)

	if pageInfo.HasNextPage {
		return a.scrape(ctx, professors, *pageInfo.EndCursor, schoolId)
	}
	return professors, nil
}
