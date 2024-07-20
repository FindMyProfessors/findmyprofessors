# ReviewsSearchResultEdgesInner

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Node** | [**ReviewResponse**](ReviewResponse.md) |  | 
**Cursor** | **string** |  | 

## Methods

### NewReviewsSearchResultEdgesInner

`func NewReviewsSearchResultEdgesInner(node ReviewResponse, cursor string, ) *ReviewsSearchResultEdgesInner`

NewReviewsSearchResultEdgesInner instantiates a new ReviewsSearchResultEdgesInner object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewReviewsSearchResultEdgesInnerWithDefaults

`func NewReviewsSearchResultEdgesInnerWithDefaults() *ReviewsSearchResultEdgesInner`

NewReviewsSearchResultEdgesInnerWithDefaults instantiates a new ReviewsSearchResultEdgesInner object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetNode

`func (o *ReviewsSearchResultEdgesInner) GetNode() ReviewResponse`

GetNode returns the Node field if non-nil, zero value otherwise.

### GetNodeOk

`func (o *ReviewsSearchResultEdgesInner) GetNodeOk() (*ReviewResponse, bool)`

GetNodeOk returns a tuple with the Node field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNode

`func (o *ReviewsSearchResultEdgesInner) SetNode(v ReviewResponse)`

SetNode sets Node field to given value.


### GetCursor

`func (o *ReviewsSearchResultEdgesInner) GetCursor() string`

GetCursor returns the Cursor field if non-nil, zero value otherwise.

### GetCursorOk

`func (o *ReviewsSearchResultEdgesInner) GetCursorOk() (*string, bool)`

GetCursorOk returns a tuple with the Cursor field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCursor

`func (o *ReviewsSearchResultEdgesInner) SetCursor(v string)`

SetCursor sets Cursor field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


