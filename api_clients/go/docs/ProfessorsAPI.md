# \ProfessorsAPI

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateProfessor**](ProfessorsAPI.md#CreateProfessor) | **Post** /professors/create | 
[**DeleteProfessor**](ProfessorsAPI.md#DeleteProfessor) | **Delete** /professors/{id} | 
[**Enroll**](ProfessorsAPI.md#Enroll) | **Post** /professors/{id}/enroll | 
[**GetProfessor**](ProfessorsAPI.md#GetProfessor) | **Get** /professors/{id} | 
[**GetProfessorAnalysis**](ProfessorsAPI.md#GetProfessorAnalysis) | **Get** /professors/{id}/analysis | 
[**GetProfessorCourses**](ProfessorsAPI.md#GetProfessorCourses) | **Get** /professors/{id}/courses | 
[**GetProfessorRating**](ProfessorsAPI.md#GetProfessorRating) | **Get** /professors/{id}/rating | 
[**GetReviews**](ProfessorsAPI.md#GetReviews) | **Get** /professors/{id}/reviews | 
[**SearchProfessors**](ProfessorsAPI.md#SearchProfessors) | **Get** /professors/search | 
[**UpdateProfessor**](ProfessorsAPI.md#UpdateProfessor) | **Put** /professors/{id} | 



## CreateProfessor

> DefaultSelectionPrisma36ProfessorPayload CreateProfessor(ctx).Body(body).Execute()



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
	body := PickProfessorFirstNameOrLastNameOrRmpIdOrSchoolId(987) // PickProfessorFirstNameOrLastNameOrRmpIdOrSchoolId | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ProfessorsAPI.CreateProfessor(context.Background()).Body(body).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ProfessorsAPI.CreateProfessor``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateProfessor`: DefaultSelectionPrisma36ProfessorPayload
	fmt.Fprintf(os.Stdout, "Response from `ProfessorsAPI.CreateProfessor`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateProfessorRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **PickProfessorFirstNameOrLastNameOrRmpIdOrSchoolId** |  | 

### Return type

[**DefaultSelectionPrisma36ProfessorPayload**](DefaultSelectionPrisma36ProfessorPayload.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteProfessor

> DeleteProfessor(ctx, id).Execute()



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
	id := int32(56) // int32 | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.ProfessorsAPI.DeleteProfessor(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ProfessorsAPI.DeleteProfessor``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **int32** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteProfessorRequest struct via the builder pattern


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


## Enroll

> DefaultSelectionPrisma36ProfessorCoursePayload Enroll(ctx, id).Body(body).Execute()



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
	id := int32(56) // int32 | 
	body := PickProfessorCourseExcludeKeyofProfessorCourseProfessorIdOrId(987) // PickProfessorCourseExcludeKeyofProfessorCourseProfessorIdOrId | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ProfessorsAPI.Enroll(context.Background(), id).Body(body).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ProfessorsAPI.Enroll``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `Enroll`: DefaultSelectionPrisma36ProfessorCoursePayload
	fmt.Fprintf(os.Stdout, "Response from `ProfessorsAPI.Enroll`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **int32** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiEnrollRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **body** | **PickProfessorCourseExcludeKeyofProfessorCourseProfessorIdOrId** |  | 

### Return type

[**DefaultSelectionPrisma36ProfessorCoursePayload**](DefaultSelectionPrisma36ProfessorCoursePayload.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetProfessor

> DefaultSelectionPrisma36ProfessorPayload GetProfessor(ctx, id).Execute()



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
	id := int32(56) // int32 | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ProfessorsAPI.GetProfessor(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ProfessorsAPI.GetProfessor``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetProfessor`: DefaultSelectionPrisma36ProfessorPayload
	fmt.Fprintf(os.Stdout, "Response from `ProfessorsAPI.GetProfessor`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **int32** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetProfessorRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**DefaultSelectionPrisma36ProfessorPayload**](DefaultSelectionPrisma36ProfessorPayload.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetProfessorAnalysis

> ProfessorAnalysis GetProfessorAnalysis(ctx, id).Execute()



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
	id := int32(56) // int32 | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ProfessorsAPI.GetProfessorAnalysis(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ProfessorsAPI.GetProfessorAnalysis``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetProfessorAnalysis`: ProfessorAnalysis
	fmt.Fprintf(os.Stdout, "Response from `ProfessorsAPI.GetProfessorAnalysis`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **int32** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetProfessorAnalysisRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**ProfessorAnalysis**](ProfessorAnalysis.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetProfessorCourses

> ProfessorCourses GetProfessorCourses(ctx, id).Year(year).Semester(semester).Execute()



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
	id := int32(56) // int32 | 
	year := int32(56) // int32 |  (optional)
	semester := openapiclient._36_Enums.Semester("SPRING") // 36EnumsSemester |  (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ProfessorsAPI.GetProfessorCourses(context.Background(), id).Year(year).Semester(semester).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ProfessorsAPI.GetProfessorCourses``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetProfessorCourses`: ProfessorCourses
	fmt.Fprintf(os.Stdout, "Response from `ProfessorsAPI.GetProfessorCourses`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **int32** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetProfessorCoursesRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **year** | **int32** |  | 
 **semester** | [**36EnumsSemester**](36EnumsSemester.md) |  | 

### Return type

[**ProfessorCourses**](ProfessorCourses.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetProfessorRating

> Rating GetProfessorRating(ctx, id).TopKPercentage(topKPercentage).Execute()



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
	id := int32(56) // int32 | 
	topKPercentage := int32(56) // int32 |  (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ProfessorsAPI.GetProfessorRating(context.Background(), id).TopKPercentage(topKPercentage).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ProfessorsAPI.GetProfessorRating``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetProfessorRating`: Rating
	fmt.Fprintf(os.Stdout, "Response from `ProfessorsAPI.GetProfessorRating`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **int32** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetProfessorRatingRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **topKPercentage** | **int32** |  | 

### Return type

[**Rating**](Rating.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetReviews

> ReviewsSearchResult GetReviews(ctx, id).Cursor(cursor).PageSize(pageSize).Execute()



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
	id := int32(56) // int32 | 
	cursor := "cursor_example" // string |  (optional)
	pageSize := int32(56) // int32 |  (optional) (default to 25)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ProfessorsAPI.GetReviews(context.Background(), id).Cursor(cursor).PageSize(pageSize).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ProfessorsAPI.GetReviews``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetReviews`: ReviewsSearchResult
	fmt.Fprintf(os.Stdout, "Response from `ProfessorsAPI.GetReviews`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **int32** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetReviewsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **cursor** | **string** |  | 
 **pageSize** | **int32** |  | [default to 25]

### Return type

[**ReviewsSearchResult**](ReviewsSearchResult.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## SearchProfessors

> ProfessorSearchResult SearchProfessors(ctx).Name(name).SchoolId(schoolId).Cursor(cursor).PageSize(pageSize).Execute()



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
	name := "name_example" // string |  (optional)
	schoolId := int32(56) // int32 |  (optional)
	cursor := "cursor_example" // string |  (optional)
	pageSize := int32(56) // int32 |  (optional) (default to 10)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ProfessorsAPI.SearchProfessors(context.Background()).Name(name).SchoolId(schoolId).Cursor(cursor).PageSize(pageSize).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ProfessorsAPI.SearchProfessors``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `SearchProfessors`: ProfessorSearchResult
	fmt.Fprintf(os.Stdout, "Response from `ProfessorsAPI.SearchProfessors`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiSearchProfessorsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **string** |  | 
 **schoolId** | **int32** |  | 
 **cursor** | **string** |  | 
 **pageSize** | **int32** |  | [default to 10]

### Return type

[**ProfessorSearchResult**](ProfessorSearchResult.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateProfessor

> DefaultSelectionPrisma36ProfessorPayload UpdateProfessor(ctx, id).UpdatedProfessor(updatedProfessor).Execute()



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
	id := int32(56) // int32 | 
	updatedProfessor := *openapiclient.NewUpdatedProfessor() // UpdatedProfessor | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ProfessorsAPI.UpdateProfessor(context.Background(), id).UpdatedProfessor(updatedProfessor).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ProfessorsAPI.UpdateProfessor``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateProfessor`: DefaultSelectionPrisma36ProfessorPayload
	fmt.Fprintf(os.Stdout, "Response from `ProfessorsAPI.UpdateProfessor`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **int32** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateProfessorRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **updatedProfessor** | [**UpdatedProfessor**](UpdatedProfessor.md) |  | 

### Return type

[**DefaultSelectionPrisma36ProfessorPayload**](DefaultSelectionPrisma36ProfessorPayload.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

