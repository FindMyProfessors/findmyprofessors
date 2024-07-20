# Rating

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**AverageGrade** | [**Model36EnumsGrade**](36EnumsGrade.md) |  | 
**TopKMostRecentDifficultyAverage** | **float32** |  | 
**TotalDifficultyAverage** | **float32** |  | 
**TopKMostRecentQualityAverage** | **float32** |  | 
**TotalQualityAverage** | **float32** |  | 
**RatingAmount** | **int32** |  | 

## Methods

### NewRating

`func NewRating(averageGrade Model36EnumsGrade, topKMostRecentDifficultyAverage float32, totalDifficultyAverage float32, topKMostRecentQualityAverage float32, totalQualityAverage float32, ratingAmount int32, ) *Rating`

NewRating instantiates a new Rating object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewRatingWithDefaults

`func NewRatingWithDefaults() *Rating`

NewRatingWithDefaults instantiates a new Rating object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetAverageGrade

`func (o *Rating) GetAverageGrade() Model36EnumsGrade`

GetAverageGrade returns the AverageGrade field if non-nil, zero value otherwise.

### GetAverageGradeOk

`func (o *Rating) GetAverageGradeOk() (*Model36EnumsGrade, bool)`

GetAverageGradeOk returns a tuple with the AverageGrade field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAverageGrade

`func (o *Rating) SetAverageGrade(v Model36EnumsGrade)`

SetAverageGrade sets AverageGrade field to given value.


### GetTopKMostRecentDifficultyAverage

`func (o *Rating) GetTopKMostRecentDifficultyAverage() float32`

GetTopKMostRecentDifficultyAverage returns the TopKMostRecentDifficultyAverage field if non-nil, zero value otherwise.

### GetTopKMostRecentDifficultyAverageOk

`func (o *Rating) GetTopKMostRecentDifficultyAverageOk() (*float32, bool)`

GetTopKMostRecentDifficultyAverageOk returns a tuple with the TopKMostRecentDifficultyAverage field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTopKMostRecentDifficultyAverage

`func (o *Rating) SetTopKMostRecentDifficultyAverage(v float32)`

SetTopKMostRecentDifficultyAverage sets TopKMostRecentDifficultyAverage field to given value.


### GetTotalDifficultyAverage

`func (o *Rating) GetTotalDifficultyAverage() float32`

GetTotalDifficultyAverage returns the TotalDifficultyAverage field if non-nil, zero value otherwise.

### GetTotalDifficultyAverageOk

`func (o *Rating) GetTotalDifficultyAverageOk() (*float32, bool)`

GetTotalDifficultyAverageOk returns a tuple with the TotalDifficultyAverage field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTotalDifficultyAverage

`func (o *Rating) SetTotalDifficultyAverage(v float32)`

SetTotalDifficultyAverage sets TotalDifficultyAverage field to given value.


### GetTopKMostRecentQualityAverage

`func (o *Rating) GetTopKMostRecentQualityAverage() float32`

GetTopKMostRecentQualityAverage returns the TopKMostRecentQualityAverage field if non-nil, zero value otherwise.

### GetTopKMostRecentQualityAverageOk

`func (o *Rating) GetTopKMostRecentQualityAverageOk() (*float32, bool)`

GetTopKMostRecentQualityAverageOk returns a tuple with the TopKMostRecentQualityAverage field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTopKMostRecentQualityAverage

`func (o *Rating) SetTopKMostRecentQualityAverage(v float32)`

SetTopKMostRecentQualityAverage sets TopKMostRecentQualityAverage field to given value.


### GetTotalQualityAverage

`func (o *Rating) GetTotalQualityAverage() float32`

GetTotalQualityAverage returns the TotalQualityAverage field if non-nil, zero value otherwise.

### GetTotalQualityAverageOk

`func (o *Rating) GetTotalQualityAverageOk() (*float32, bool)`

GetTotalQualityAverageOk returns a tuple with the TotalQualityAverage field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTotalQualityAverage

`func (o *Rating) SetTotalQualityAverage(v float32)`

SetTotalQualityAverage sets TotalQualityAverage field to given value.


### GetRatingAmount

`func (o *Rating) GetRatingAmount() int32`

GetRatingAmount returns the RatingAmount field if non-nil, zero value otherwise.

### GetRatingAmountOk

`func (o *Rating) GetRatingAmountOk() (*int32, bool)`

GetRatingAmountOk returns a tuple with the RatingAmount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRatingAmount

`func (o *Rating) SetRatingAmount(v int32)`

SetRatingAmount sets RatingAmount field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


