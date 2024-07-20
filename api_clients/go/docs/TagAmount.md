# TagAmount

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Amount** | **int32** |  | 
**Tag** | [**ModelEnumsReviewTag**](EnumsReviewTag.md) |  | 

## Methods

### NewTagAmount

`func NewTagAmount(amount int32, tag ModelEnumsReviewTag, ) *TagAmount`

NewTagAmount instantiates a new TagAmount object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewTagAmountWithDefaults

`func NewTagAmountWithDefaults() *TagAmount`

NewTagAmountWithDefaults instantiates a new TagAmount object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetAmount

`func (o *TagAmount) GetAmount() int32`

GetAmount returns the Amount field if non-nil, zero value otherwise.

### GetAmountOk

`func (o *TagAmount) GetAmountOk() (*int32, bool)`

GetAmountOk returns a tuple with the Amount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAmount

`func (o *TagAmount) SetAmount(v int32)`

SetAmount sets Amount field to given value.


### GetTag

`func (o *TagAmount) GetTag() ModelEnumsReviewTag`

GetTag returns the Tag field if non-nil, zero value otherwise.

### GetTagOk

`func (o *TagAmount) GetTagOk() (*ModelEnumsReviewTag, bool)`

GetTagOk returns a tuple with the Tag field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTag

`func (o *TagAmount) SetTag(v ModelEnumsReviewTag)`

SetTag sets Tag field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


