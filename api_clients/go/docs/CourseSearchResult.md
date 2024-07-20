# CourseSearchResult

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**PageInfo** | [**SchoolSearchResultPageInfo**](SchoolSearchResultPageInfo.md) |  | 
**Edges** | [**[]CourseSearchResultEdgesInner**](CourseSearchResultEdgesInner.md) |  | 

## Methods

### NewCourseSearchResult

`func NewCourseSearchResult(pageInfo SchoolSearchResultPageInfo, edges []CourseSearchResultEdgesInner, ) *CourseSearchResult`

NewCourseSearchResult instantiates a new CourseSearchResult object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCourseSearchResultWithDefaults

`func NewCourseSearchResultWithDefaults() *CourseSearchResult`

NewCourseSearchResultWithDefaults instantiates a new CourseSearchResult object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetPageInfo

`func (o *CourseSearchResult) GetPageInfo() SchoolSearchResultPageInfo`

GetPageInfo returns the PageInfo field if non-nil, zero value otherwise.

### GetPageInfoOk

`func (o *CourseSearchResult) GetPageInfoOk() (*SchoolSearchResultPageInfo, bool)`

GetPageInfoOk returns a tuple with the PageInfo field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPageInfo

`func (o *CourseSearchResult) SetPageInfo(v SchoolSearchResultPageInfo)`

SetPageInfo sets PageInfo field to given value.


### GetEdges

`func (o *CourseSearchResult) GetEdges() []CourseSearchResultEdgesInner`

GetEdges returns the Edges field if non-nil, zero value otherwise.

### GetEdgesOk

`func (o *CourseSearchResult) GetEdgesOk() (*[]CourseSearchResultEdgesInner, bool)`

GetEdgesOk returns a tuple with the Edges field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEdges

`func (o *CourseSearchResult) SetEdges(v []CourseSearchResultEdgesInner)`

SetEdges sets Edges field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


