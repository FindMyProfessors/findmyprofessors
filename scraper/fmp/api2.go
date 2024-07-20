package fmp

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/FindMyProfessors/scraper/model"
)

type NewCourse struct {
	Name     string `json:"name"`
	SchoolID int    `json:"school_id"`
	Code     string `json:"code"`
}

type NewSchool struct {
	Name string `json:"name"`
}

type NewProfessor struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	RmpID     string `json:"rmp_id"`
	SchoolID  int    `json:"school_id"`
}

type NewReview struct {
	Quality     float64     `json:"quality"`
	Difficulty  float64     `json:"difficulty"`
	Time        string      `json:"time"`
	Tags        []model.Tag `json:"tags"`
	Grade       model.Grade `json:"grade"`
	ProfessorID int         `json:"professor_id"`
}

type LoginParams struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	User  UserResponse `json:"user"`
	Token string       `json:"token"`
}

type UserResponse struct {
	ID              int    `json:"id"`
	Email           string `json:"email"`
	Username        string `json:"username"`
	SignupTime      string `json:"signup_time"`
	LastLoginTime   string `json:"last_login_time"`
	AccountVerified bool   `json:"account_verified"`
	Role            string `json:"role"`
}

type PageInfo struct {
	Total       int    `json:"total"`
	EndCursor   string `json:"endCursor"`
	HasNextPage bool   `json:"hasNextPage"`
}

type School struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type SchoolEdge struct {
	Node   School `json:"node"`
	Cursor string `json:"cursor"`
}

type SchoolSearchResult struct {
	PageInfo PageInfo     `json:"pageInfo"`
	Edges    []SchoolEdge `json:"edges"`
}

type Course struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Code     string `json:"code"`
	SchoolID int    `json:"school_id"`
}

type ProfessorCourses struct {
	Total   int      `json:"total"`
	Courses []Course `json:"courses"`
}

type Review struct {
	ID          int      `json:"id"`
	Quality     float64  `json:"quality"`
	Difficulty  float64  `json:"difficulty"`
	Time        string   `json:"time"`
	Tags        []string `json:"tags"`
	Grade       string   `json:"grade"`
	ProfessorID int      `json:"professor_id"`
}

type ReviewEdge struct {
	Node   Review `json:"node"`
	Cursor string `json:"cursor"`
}

type ReviewsSearchResult struct {
	PageInfo PageInfo     `json:"pageInfo"`
	Edges    []ReviewEdge `json:"edges"`
}

type Professor struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	RmpID     string `json:"rmp_id"`
	SchoolID  int    `json:"school_id"`
}

type ProfessorEdge struct {
	Node   Professor `json:"node"`
	Cursor string    `json:"cursor"`
}

type ProfessorSearchResult struct {
	PageInfo PageInfo        `json:"pageInfo"`
	Edges    []ProfessorEdge `json:"edges"`
}

type CourseEdge struct {
	Node   Course `json:"node"`
	Cursor string `json:"cursor"`
}

type CourseSearchResult struct {
	PageInfo PageInfo     `json:"pageInfo"`
	Edges    []CourseEdge `json:"edges"`
}

type CourseEnrollment struct {
	CourseID int    `json:"course_id"`
	Year     int    `json:"year"`
	Semester string `json:"semester"`
}

type CourseEnrollmentResult struct {
	ID          int    `json:"id"`
	CourseID    int    `json:"course_id"`
	ProfessorID int    `json:"professor_id"`
	Year        int    `json:"year"`
	Semester    string `json:"semester"`
}

func CreateCourse(jwtToken string, course NewCourse) (int, error) {
	url := "http://localhost:8080/courses/create"
	var createdCourse Course
	err := PostRequestWithResponse(jwtToken, url, course, &createdCourse)
	if err != nil {
		return 0, err
	}
	// Print course ID
	log.Printf("Created course with ID: %d\n", createdCourse.ID)
	return createdCourse.ID, nil
}

func CreateSchool(jwtToken string, school NewSchool) (int, error) {
	url := "http://localhost:8080/schools/create"
	var createdSchool School
	err := PostRequestWithResponse(jwtToken, url, school, &createdSchool)
	if err != nil {
		return 0, err
	}
	// Print school ID
	fmt.Printf("Created school with ID: %d\n", createdSchool.ID)
	return createdSchool.ID, nil
}

func PostRequestWithResponse(jwtToken string, url string, payload interface{}, response interface{}) error {
	jsonData, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("failed to marshal payload: %v", err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("failed to create request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+jwtToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to execute request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated {
		return fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	if err := json.NewDecoder(resp.Body).Decode(response); err != nil {
		return fmt.Errorf("failed to decode response: %v", err)
	}

	return nil
}

// Return professor id
func CreateProfessor(jwtToken string, professor NewProfessor) (int, error) {
	url := "http://localhost:8080/professors/create"
	var createdProfessor Professor
	err := PostRequestWithResponse(jwtToken, url, professor, &createdProfessor)
	if err != nil {
		return 0, err
	}
	return createdProfessor.ID, nil
}

func CreateReview(jwtToken string, review NewReview) error {
	url := "http://localhost:8080/reviews/create"
	return PostRequest(jwtToken, url, review)
}

func PostRequest(jwtToken string, url string, payload interface{}) error {
	jsonData, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("failed to marshal payload: %v", err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("failed to create request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+jwtToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to execute request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated {
		return fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	return nil
}

func Login(username, password string) (string, error) {
	url := "http://localhost:8080/auth/login"
	loginParams := LoginParams{
		Username: username,
		Password: password,
	}

	jsonData, err := json.Marshal(loginParams)
	if err != nil {
		return "", fmt.Errorf("failed to marshal login params: %v", err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return "", fmt.Errorf("failed to create request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to execute request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var loginResponse LoginResponse
	if err := json.NewDecoder(resp.Body).Decode(&loginResponse); err != nil {
		return "", fmt.Errorf("failed to decode response: %v", err)
	}

	return loginResponse.Token, nil
}

// ... existing code ...

func SearchSchools(jwtToken, name, cursor string, pageSize int) (*SchoolSearchResult, error) {
	url := "http://localhost:8080/schools/search"
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %v", err)
	}

	q := req.URL.Query()
	if name != "" {
		q.Add("name", name)
	}
	if cursor != "" {
		q.Add("cursor", cursor)
	}
	if pageSize > 0 {
		q.Add("pageSize", fmt.Sprintf("%d", pageSize))
	}
	req.URL.RawQuery = q.Encode()

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+jwtToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to execute request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var result SchoolSearchResult
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %v", err)
	}

	return &result, nil
}

func GetProfessorCourses(jwtToken string, professorID, year int, semester string) (*ProfessorCourses, error) {
	url := fmt.Sprintf("http://localhost:8080/professors/%d/courses", professorID)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %v", err)
	}

	q := req.URL.Query()
	if year > 0 {
		q.Add("year", fmt.Sprintf("%d", year))
	}
	if semester != "" {
		q.Add("semester", semester)
	}
	req.URL.RawQuery = q.Encode()

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+jwtToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to execute request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var result ProfessorCourses
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %v", err)
	}

	return &result, nil
}

func GetReviewsForProfessor(jwtToken string, professorID int, cursor string, pageSize int) (*ReviewsSearchResult, error) {
	url := fmt.Sprintf("http://localhost:8080/professors/%d/reviews", professorID)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %v", err)
	}

	q := req.URL.Query()
	if cursor != "" {
		q.Add("cursor", cursor)
	}
	if pageSize > 0 {
		q.Add("pageSize", fmt.Sprintf("%d", pageSize))
	}
	req.URL.RawQuery = q.Encode()

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+jwtToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to execute request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var result ReviewsSearchResult
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %v", err)
	}

	return &result, nil
}

// ... existing code ...

func SearchCourses(jwtToken string, schoolID int, query, semester, cursor string, year, pageSize int) (*CourseSearchResult, error) {
	url := "http://localhost:8080/courses/search"
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %v", err)
	}

	q := req.URL.Query()
	q.Add("school_id", fmt.Sprintf("%d", schoolID))
	if query != "" {
		q.Add("query", query)
	}
	if semester != "" {
		q.Add("semester", semester)
	}
	if year > 0 {
		q.Add("year", fmt.Sprintf("%d", year))
	}
	if cursor != "" {
		q.Add("cursor", cursor)
	}
	if pageSize > 0 {
		q.Add("pageSize", fmt.Sprintf("%d", pageSize))
	}
	req.URL.RawQuery = q.Encode()

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+jwtToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to execute request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var result CourseSearchResult
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %v", err)
	}

	return &result, nil
}

// ... existing code ...

func EnrollProfessorIntoCourse(jwtToken string, professorID int, enrollment CourseEnrollment) (*CourseEnrollmentResult, error) {
	url := fmt.Sprintf("http://localhost:8080/professors/%d/enroll", professorID)
	jsonData, err := json.Marshal(enrollment)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal enrollment data: %v", err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+jwtToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to execute request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var result CourseEnrollmentResult
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %v", err)
	}

	return &result, nil
}

// ... existing code ...

func SearchProfessors(jwtToken, name string, schoolID int, cursor string, pageSize int) (*ProfessorSearchResult, error) {
	url := "http://localhost:8080/professors/search"
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %v", err)
	}

	q := req.URL.Query()
	if name != "" {
		q.Add("name", name)
	}
	if schoolID > 0 {
		q.Add("school_id", fmt.Sprintf("%d", schoolID))
	}
	if cursor != "" {
		q.Add("cursor", cursor)
	}
	if pageSize > 0 {
		q.Add("pageSize", fmt.Sprintf("%d", pageSize))
	}
	req.URL.RawQuery = q.Encode()

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+jwtToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to execute request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var result ProfessorSearchResult
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %v", err)
	}

	return &result, nil
}

// ... existing code ...

func GetSchoolCourses(jwtToken string, schoolID int, query, cursor string, pageSize int) (*CourseSearchResult, error) {
	url := "http://localhost:8080/schools/" + fmt.Sprintf("%d", schoolID) + "/courses"
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %v", err)
	}

	q := req.URL.Query()
	q.Add("school_id", fmt.Sprintf("%d", schoolID))
	if query != "" {
		q.Add("query", query)
	}
	if cursor != "" {
		q.Add("cursor", cursor)
	}
	if pageSize > 0 {
		q.Add("pageSize", fmt.Sprintf("%d", pageSize))
	}
	req.URL.RawQuery = q.Encode()

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+jwtToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to execute request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var result CourseSearchResult
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to decode response: %v", err)
	}

	return &result, nil
}
