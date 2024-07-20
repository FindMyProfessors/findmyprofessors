# UpdatedReview

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Quality** | Pointer to **float32** |  | [optional] 
**Difficulty** | Pointer to **float32** |  | [optional] 
**Time** | Pointer to **time.Time** |  | [optional] 
**Tags** | Pointer to [**[]Model36EnumsReviewTag**](Model36EnumsReviewTag.md) |  | [optional] 
**Grade** | Pointer to [**Model36EnumsGrade**](36EnumsGrade.md) |  | [optional] 

## Methods

### NewUpdatedReview

`func NewUpdatedReview() *UpdatedReview`

NewUpdatedReview instantiates a new UpdatedReview object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewUpdatedReviewWithDefaults

`func NewUpdatedReviewWithDefaults() *UpdatedReview`

NewUpdatedReviewWithDefaults instantiates a new UpdatedReview object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetQuality

`func (o *UpdatedReview) GetQuality() float32`

GetQuality returns the Quality field if non-nil, zero value otherwise.

### GetQualityOk

`func (o *UpdatedReview) GetQualityOk() (*float32, bool)`

GetQualityOk returns a tuple with the Quality field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetQuality

`func (o *UpdatedReview) SetQuality(v float32)`

SetQuality sets Quality field to given value.

### HasQuality

`func (o *UpdatedReview) HasQuality() bool`

HasQuality returns a boolean if a field has been set.

### GetDifficulty

`func (o *UpdatedReview) GetDifficulty() float32`

GetDifficulty returns the Difficulty field if non-nil, zero value otherwise.

### GetDifficultyOk

`func (o *UpdatedReview) GetDifficultyOk() (*float32, bool)`

GetDifficultyOk returns a tuple with the Difficulty field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDifficulty

`func (o *UpdatedReview) SetDifficulty(v float32)`

SetDifficulty sets Difficulty field to given value.

### HasDifficulty

`func (o *UpdatedReview) HasDifficulty() bool`

HasDifficulty returns a boolean if a field has been set.

### GetTime

`func (o *UpdatedReview) GetTime() time.Time`

GetTime returns the Time field if non-nil, zero value otherwise.

### GetTimeOk

`func (o *UpdatedReview) GetTimeOk() (*time.Time, bool)`

GetTimeOk returns a tuple with the Time field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTime

`func (o *UpdatedReview) SetTime(v time.Time)`

SetTime sets Time field to given value.

### HasTime

`func (o *UpdatedReview) HasTime() bool`

HasTime returns a boolean if a field has been set.

### GetTags

`func (o *UpdatedReview) GetTags() []Model36EnumsReviewTag`

GetTags returns the Tags field if non-nil, zero value otherwise.

### GetTagsOk

`func (o *UpdatedReview) GetTagsOk() (*[]Model36EnumsReviewTag, bool)`

GetTagsOk returns a tuple with the Tags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTags

`func (o *UpdatedReview) SetTags(v []Model36EnumsReviewTag)`

SetTags sets Tags field to given value.

### HasTags

`func (o *UpdatedReview) HasTags() bool`

HasTags returns a boolean if a field has been set.

### GetGrade

`func (o *UpdatedReview) GetGrade() Model36EnumsGrade`

GetGrade returns the Grade field if non-nil, zero value otherwise.

### GetGradeOk

`func (o *UpdatedReview) GetGradeOk() (*Model36EnumsGrade, bool)`

GetGradeOk returns a tuple with the Grade field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetGrade

`func (o *UpdatedReview) SetGrade(v Model36EnumsGrade)`

SetGrade sets Grade field to given value.

### HasGrade

`func (o *UpdatedReview) HasGrade() bool`

HasGrade returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


