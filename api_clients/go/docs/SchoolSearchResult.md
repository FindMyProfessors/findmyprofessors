# SchoolSearchResult

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**PageInfo** | [**SchoolSearchResultPageInfo**](SchoolSearchResultPageInfo.md) |  | 
**Edges** | [**[]SchoolSearchResultEdgesInner**](SchoolSearchResultEdgesInner.md) |  | 

## Methods

### NewSchoolSearchResult

`func NewSchoolSearchResult(pageInfo SchoolSearchResultPageInfo, edges []SchoolSearchResultEdgesInner, ) *SchoolSearchResult`

NewSchoolSearchResult instantiates a new SchoolSearchResult object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchoolSearchResultWithDefaults

`func NewSchoolSearchResultWithDefaults() *SchoolSearchResult`

NewSchoolSearchResultWithDefaults instantiates a new SchoolSearchResult object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetPageInfo

`func (o *SchoolSearchResult) GetPageInfo() SchoolSearchResultPageInfo`

GetPageInfo returns the PageInfo field if non-nil, zero value otherwise.

### GetPageInfoOk

`func (o *SchoolSearchResult) GetPageInfoOk() (*SchoolSearchResultPageInfo, bool)`

GetPageInfoOk returns a tuple with the PageInfo field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPageInfo

`func (o *SchoolSearchResult) SetPageInfo(v SchoolSearchResultPageInfo)`

SetPageInfo sets PageInfo field to given value.


### GetEdges

`func (o *SchoolSearchResult) GetEdges() []SchoolSearchResultEdgesInner`

GetEdges returns the Edges field if non-nil, zero value otherwise.

### GetEdgesOk

`func (o *SchoolSearchResult) GetEdgesOk() (*[]SchoolSearchResultEdgesInner, bool)`

GetEdgesOk returns a tuple with the Edges field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEdges

`func (o *SchoolSearchResult) SetEdges(v []SchoolSearchResultEdgesInner)`

SetEdges sets Edges field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


