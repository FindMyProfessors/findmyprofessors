# \CoursesAPI

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateCourse**](CoursesAPI.md#CreateCourse) | **Post** /courses/create | 
[**DeleteCourse**](CoursesAPI.md#DeleteCourse) | **Delete** /courses/{id} | 
[**GetCourse**](CoursesAPI.md#GetCourse) | **Get** /courses/{id} | 
[**GetCourseProfessors**](CoursesAPI.md#GetCourseProfessors) | **Get** /courses/{id}/professors | 
[**SearchCourses**](CoursesAPI.md#SearchCourses) | **Get** /courses/search | 
[**UpdateCourse**](CoursesAPI.md#UpdateCourse) | **Put** /courses/{id} | 



## CreateCourse

> DefaultSelectionPrisma36CoursePayload CreateCourse(ctx).Body(body).Execute()



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	body := PickCourseNameOrCodeOrSchoolId(987) // PickCourseNameOrCodeOrSchoolId | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.CoursesAPI.CreateCourse(context.Background()).Body(body).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `CoursesAPI.CreateCourse``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateCourse`: DefaultSelectionPrisma36CoursePayload
	fmt.Fprintf(os.Stdout, "Response from `CoursesAPI.CreateCourse`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateCourseRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **PickCourseNameOrCodeOrSchoolId** |  | 

### Return type

[**DefaultSelectionPrisma36CoursePayload**](DefaultSelectionPrisma36CoursePayload.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteCourse

> DeleteCourse(ctx, id).Execute()



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	id := float64(1.2) // float64 | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.CoursesAPI.DeleteCourse(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `CoursesAPI.DeleteCourse``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **float64** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteCourseRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

 (empty response body)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetCourse

> DefaultSelectionPrisma36CoursePayload GetCourse(ctx, id).Execute()



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	id := float64(1.2) // float64 | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.CoursesAPI.GetCourse(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `CoursesAPI.GetCourse``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetCourse`: DefaultSelectionPrisma36CoursePayload
	fmt.Fprintf(os.Stdout, "Response from `CoursesAPI.GetCourse`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **float64** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetCourseRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**DefaultSelectionPrisma36CoursePayload**](DefaultSelectionPrisma36CoursePayload.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetCourseProfessors

> CourseProfessors GetCourseProfessors(ctx, id).Year(year).Semester(semester).Execute()



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	id := float64(1.2) // float64 | 
	year := float64(1.2) // float64 | 
	semester := openapiclient._36_Enums.Semester("SPRING") // 36EnumsSemester | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.CoursesAPI.GetCourseProfessors(context.Background(), id).Year(year).Semester(semester).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `CoursesAPI.GetCourseProfessors``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetCourseProfessors`: CourseProfessors
	fmt.Fprintf(os.Stdout, "Response from `CoursesAPI.GetCourseProfessors`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **float64** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetCourseProfessorsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **year** | **float64** |  | 
 **semester** | [**36EnumsSemester**](36EnumsSemester.md) |  | 

### Return type

[**CourseProfessors**](CourseProfessors.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## SearchCourses

> CourseSearchResult SearchCourses(ctx).SchoolId(schoolId).Query(query).Semester(semester).Year(year).Cursor(cursor).PageSize(pageSize).Execute()



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	schoolId := float64(1.2) // float64 | 
	query := "query_example" // string |  (optional)
	semester := openapiclient._36_Enums.Semester("SPRING") // 36EnumsSemester |  (optional)
	year := float64(1.2) // float64 |  (optional)
	cursor := "cursor_example" // string |  (optional)
	pageSize := float64(1.2) // float64 |  (optional) (default to 10)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.CoursesAPI.SearchCourses(context.Background()).SchoolId(schoolId).Query(query).Semester(semester).Year(year).Cursor(cursor).PageSize(pageSize).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `CoursesAPI.SearchCourses``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `SearchCourses`: CourseSearchResult
	fmt.Fprintf(os.Stdout, "Response from `CoursesAPI.SearchCourses`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiSearchCoursesRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **schoolId** | **float64** |  | 
 **query** | **string** |  | 
 **semester** | [**36EnumsSemester**](36EnumsSemester.md) |  | 
 **year** | **float64** |  | 
 **cursor** | **string** |  | 
 **pageSize** | **float64** |  | [default to 10]

### Return type

[**CourseSearchResult**](CourseSearchResult.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateCourse

> DefaultSelectionPrisma36CoursePayload UpdateCourse(ctx, id).Body(body).Execute()



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	id := float64(1.2) // float64 | 
	body := PickCourseNameOrCode(987) // PickCourseNameOrCode | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.CoursesAPI.UpdateCourse(context.Background(), id).Body(body).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `CoursesAPI.UpdateCourse``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateCourse`: DefaultSelectionPrisma36CoursePayload
	fmt.Fprintf(os.Stdout, "Response from `CoursesAPI.UpdateCourse`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **float64** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateCourseRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **body** | **PickCourseNameOrCode** |  | 

### Return type

[**DefaultSelectionPrisma36CoursePayload**](DefaultSelectionPrisma36CoursePayload.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

