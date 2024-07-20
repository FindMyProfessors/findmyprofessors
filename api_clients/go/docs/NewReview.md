# NewReview

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Quality** | **float32** |  | 
**Difficulty** | **float32** |  | 
**Time** | **time.Time** |  | 
**Tags** | [**[]ModelEnumsReviewTag**](ModelEnumsReviewTag.md) |  | 
**Grade** | [**ModelEnumsGrade**](EnumsGrade.md) |  | 
**ProfessorId** | **int32** |  | 

## Methods

### NewNewReview

`func NewNewReview(quality float32, difficulty float32, time time.Time, tags []ModelEnumsReviewTag, grade ModelEnumsGrade, professorId int32, ) *NewReview`

NewNewReview instantiates a new NewReview object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewNewReviewWithDefaults

`func NewNewReviewWithDefaults() *NewReview`

NewNewReviewWithDefaults instantiates a new NewReview object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetQuality

`func (o *NewReview) GetQuality() float32`

GetQuality returns the Quality field if non-nil, zero value otherwise.

### GetQualityOk

`func (o *NewReview) GetQualityOk() (*float32, bool)`

GetQualityOk returns a tuple with the Quality field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetQuality

`func (o *NewReview) SetQuality(v float32)`

SetQuality sets Quality field to given value.


### GetDifficulty

`func (o *NewReview) GetDifficulty() float32`

GetDifficulty returns the Difficulty field if non-nil, zero value otherwise.

### GetDifficultyOk

`func (o *NewReview) GetDifficultyOk() (*float32, bool)`

GetDifficultyOk returns a tuple with the Difficulty field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDifficulty

`func (o *NewReview) SetDifficulty(v float32)`

SetDifficulty sets Difficulty field to given value.


### GetTime

`func (o *NewReview) GetTime() time.Time`

GetTime returns the Time field if non-nil, zero value otherwise.

### GetTimeOk

`func (o *NewReview) GetTimeOk() (*time.Time, bool)`

GetTimeOk returns a tuple with the Time field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTime

`func (o *NewReview) SetTime(v time.Time)`

SetTime sets Time field to given value.


### GetTags

`func (o *NewReview) GetTags() []ModelEnumsReviewTag`

GetTags returns the Tags field if non-nil, zero value otherwise.

### GetTagsOk

`func (o *NewReview) GetTagsOk() (*[]ModelEnumsReviewTag, bool)`

GetTagsOk returns a tuple with the Tags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTags

`func (o *NewReview) SetTags(v []ModelEnumsReviewTag)`

SetTags sets Tags field to given value.


### GetGrade

`func (o *NewReview) GetGrade() ModelEnumsGrade`

GetGrade returns the Grade field if non-nil, zero value otherwise.

### GetGradeOk

`func (o *NewReview) GetGradeOk() (*ModelEnumsGrade, bool)`

GetGradeOk returns a tuple with the Grade field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetGrade

`func (o *NewReview) SetGrade(v ModelEnumsGrade)`

SetGrade sets Grade field to given value.


### GetProfessorId

`func (o *NewReview) GetProfessorId() int32`

GetProfessorId returns the ProfessorId field if non-nil, zero value otherwise.

### GetProfessorIdOk

`func (o *NewReview) GetProfessorIdOk() (*int32, bool)`

GetProfessorIdOk returns a tuple with the ProfessorId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProfessorId

`func (o *NewReview) SetProfessorId(v int32)`

SetProfessorId sets ProfessorId field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


