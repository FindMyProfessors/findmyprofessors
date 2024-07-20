# SchoolSearchResultPageInfo

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Total** | **int32** |  | 
**EndCursor** | **NullableString** |  | 
**HasNextPage** | **bool** |  | 

## Methods

### NewSchoolSearchResultPageInfo

`func NewSchoolSearchResultPageInfo(total int32, endCursor NullableString, hasNextPage bool, ) *SchoolSearchResultPageInfo`

NewSchoolSearchResultPageInfo instantiates a new SchoolSearchResultPageInfo object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchoolSearchResultPageInfoWithDefaults

`func NewSchoolSearchResultPageInfoWithDefaults() *SchoolSearchResultPageInfo`

NewSchoolSearchResultPageInfoWithDefaults instantiates a new SchoolSearchResultPageInfo object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetTotal

`func (o *SchoolSearchResultPageInfo) GetTotal() int32`

GetTotal returns the Total field if non-nil, zero value otherwise.

### GetTotalOk

`func (o *SchoolSearchResultPageInfo) GetTotalOk() (*int32, bool)`

GetTotalOk returns a tuple with the Total field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTotal

`func (o *SchoolSearchResultPageInfo) SetTotal(v int32)`

SetTotal sets Total field to given value.


### GetEndCursor

`func (o *SchoolSearchResultPageInfo) GetEndCursor() string`

GetEndCursor returns the EndCursor field if non-nil, zero value otherwise.

### GetEndCursorOk

`func (o *SchoolSearchResultPageInfo) GetEndCursorOk() (*string, bool)`

GetEndCursorOk returns a tuple with the EndCursor field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEndCursor

`func (o *SchoolSearchResultPageInfo) SetEndCursor(v string)`

SetEndCursor sets EndCursor field to given value.


### SetEndCursorNil

`func (o *SchoolSearchResultPageInfo) SetEndCursorNil(b bool)`

 SetEndCursorNil sets the value for EndCursor to be an explicit nil

### UnsetEndCursor
`func (o *SchoolSearchResultPageInfo) UnsetEndCursor()`

UnsetEndCursor ensures that no value is present for EndCursor, not even an explicit nil
### GetHasNextPage

`func (o *SchoolSearchResultPageInfo) GetHasNextPage() bool`

GetHasNextPage returns the HasNextPage field if non-nil, zero value otherwise.

### GetHasNextPageOk

`func (o *SchoolSearchResultPageInfo) GetHasNextPageOk() (*bool, bool)`

GetHasNextPageOk returns a tuple with the HasNextPage field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHasNextPage

`func (o *SchoolSearchResultPageInfo) SetHasNextPage(v bool)`

SetHasNextPage sets HasNextPage field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


