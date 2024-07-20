# \ReviewsAPI

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateReview**](ReviewsAPI.md#CreateReview) | **Post** /reviews/create | 
[**DeleteReview**](ReviewsAPI.md#DeleteReview) | **Delete** /reviews/reviews/{review_id} | 
[**GetReview**](ReviewsAPI.md#GetReview) | **Get** /reviews/reviews/{review_id} | 
[**UpdateReview**](ReviewsAPI.md#UpdateReview) | **Put** /reviews/reviews/{review_id} | 



## CreateReview

> DefaultSelectionPrisma36ReviewPayload CreateReview(ctx).Body(body).Execute()



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
	body := PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId(987) // PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ReviewsAPI.CreateReview(context.Background()).Body(body).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ReviewsAPI.CreateReview``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateReview`: DefaultSelectionPrisma36ReviewPayload
	fmt.Fprintf(os.Stdout, "Response from `ReviewsAPI.CreateReview`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateReviewRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId** |  | 

### Return type

[**DefaultSelectionPrisma36ReviewPayload**](DefaultSelectionPrisma36ReviewPayload.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteReview

> DeleteReview(ctx, reviewId).Execute()



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
	reviewId := int32(56) // int32 | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.ReviewsAPI.DeleteReview(context.Background(), reviewId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ReviewsAPI.DeleteReview``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**reviewId** | **int32** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteReviewRequest struct via the builder pattern


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


## GetReview

> DefaultSelectionPrisma36ReviewPayload GetReview(ctx, reviewId).Execute()



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
	reviewId := int32(56) // int32 | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ReviewsAPI.GetReview(context.Background(), reviewId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ReviewsAPI.GetReview``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetReview`: DefaultSelectionPrisma36ReviewPayload
	fmt.Fprintf(os.Stdout, "Response from `ReviewsAPI.GetReview`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**reviewId** | **int32** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetReviewRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**DefaultSelectionPrisma36ReviewPayload**](DefaultSelectionPrisma36ReviewPayload.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateReview

> DefaultSelectionPrisma36ReviewPayload UpdateReview(ctx, reviewId).Body(body).Execute()



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
	reviewId := int32(56) // int32 | 
	body := PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade(987) // PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ReviewsAPI.UpdateReview(context.Background(), reviewId).Body(body).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ReviewsAPI.UpdateReview``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateReview`: DefaultSelectionPrisma36ReviewPayload
	fmt.Fprintf(os.Stdout, "Response from `ReviewsAPI.UpdateReview`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**reviewId** | **int32** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateReviewRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **body** | **PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade** |  | 

### Return type

[**DefaultSelectionPrisma36ReviewPayload**](DefaultSelectionPrisma36ReviewPayload.md)

### Authorization

[jwt](../README.md#jwt)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

