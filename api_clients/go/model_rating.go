/*
api

No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)

API version: 1.0.0
*/

// Code generated by OpenAPI Generator (https://openapi-generator.tech); DO NOT EDIT.

package openapi

import (
	"encoding/json"
	"bytes"
	"fmt"
)

// checks if the Rating type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &Rating{}

// Rating struct for Rating
type Rating struct {
	AverageGrade string `json:"averageGrade"`
	TopKMostRecentDifficultyAverage int32 `json:"topKMostRecentDifficultyAverage"`
	TotalDifficultyAverage int32 `json:"totalDifficultyAverage"`
	TopKMostRecentQualityAverage int32 `json:"topKMostRecentQualityAverage"`
	TotalQualityAverage int32 `json:"totalQualityAverage"`
	RatingAmount int32 `json:"ratingAmount"`
}

type _Rating Rating

// NewRating instantiates a new Rating object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewRating(averageGrade string, topKMostRecentDifficultyAverage int32, totalDifficultyAverage int32, topKMostRecentQualityAverage int32, totalQualityAverage int32, ratingAmount int32) *Rating {
	this := Rating{}
	this.AverageGrade = averageGrade
	this.TopKMostRecentDifficultyAverage = topKMostRecentDifficultyAverage
	this.TotalDifficultyAverage = totalDifficultyAverage
	this.TopKMostRecentQualityAverage = topKMostRecentQualityAverage
	this.TotalQualityAverage = totalQualityAverage
	this.RatingAmount = ratingAmount
	return &this
}

// NewRatingWithDefaults instantiates a new Rating object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewRatingWithDefaults() *Rating {
	this := Rating{}
	return &this
}

// GetAverageGrade returns the AverageGrade field value
func (o *Rating) GetAverageGrade() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.AverageGrade
}

// GetAverageGradeOk returns a tuple with the AverageGrade field value
// and a boolean to check if the value has been set.
func (o *Rating) GetAverageGradeOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.AverageGrade, true
}

// SetAverageGrade sets field value
func (o *Rating) SetAverageGrade(v string) {
	o.AverageGrade = v
}

// GetTopKMostRecentDifficultyAverage returns the TopKMostRecentDifficultyAverage field value
func (o *Rating) GetTopKMostRecentDifficultyAverage() int32 {
	if o == nil {
		var ret int32
		return ret
	}

	return o.TopKMostRecentDifficultyAverage
}

// GetTopKMostRecentDifficultyAverageOk returns a tuple with the TopKMostRecentDifficultyAverage field value
// and a boolean to check if the value has been set.
func (o *Rating) GetTopKMostRecentDifficultyAverageOk() (*int32, bool) {
	if o == nil {
		return nil, false
	}
	return &o.TopKMostRecentDifficultyAverage, true
}

// SetTopKMostRecentDifficultyAverage sets field value
func (o *Rating) SetTopKMostRecentDifficultyAverage(v int32) {
	o.TopKMostRecentDifficultyAverage = v
}

// GetTotalDifficultyAverage returns the TotalDifficultyAverage field value
func (o *Rating) GetTotalDifficultyAverage() int32 {
	if o == nil {
		var ret int32
		return ret
	}

	return o.TotalDifficultyAverage
}

// GetTotalDifficultyAverageOk returns a tuple with the TotalDifficultyAverage field value
// and a boolean to check if the value has been set.
func (o *Rating) GetTotalDifficultyAverageOk() (*int32, bool) {
	if o == nil {
		return nil, false
	}
	return &o.TotalDifficultyAverage, true
}

// SetTotalDifficultyAverage sets field value
func (o *Rating) SetTotalDifficultyAverage(v int32) {
	o.TotalDifficultyAverage = v
}

// GetTopKMostRecentQualityAverage returns the TopKMostRecentQualityAverage field value
func (o *Rating) GetTopKMostRecentQualityAverage() int32 {
	if o == nil {
		var ret int32
		return ret
	}

	return o.TopKMostRecentQualityAverage
}

// GetTopKMostRecentQualityAverageOk returns a tuple with the TopKMostRecentQualityAverage field value
// and a boolean to check if the value has been set.
func (o *Rating) GetTopKMostRecentQualityAverageOk() (*int32, bool) {
	if o == nil {
		return nil, false
	}
	return &o.TopKMostRecentQualityAverage, true
}

// SetTopKMostRecentQualityAverage sets field value
func (o *Rating) SetTopKMostRecentQualityAverage(v int32) {
	o.TopKMostRecentQualityAverage = v
}

// GetTotalQualityAverage returns the TotalQualityAverage field value
func (o *Rating) GetTotalQualityAverage() int32 {
	if o == nil {
		var ret int32
		return ret
	}

	return o.TotalQualityAverage
}

// GetTotalQualityAverageOk returns a tuple with the TotalQualityAverage field value
// and a boolean to check if the value has been set.
func (o *Rating) GetTotalQualityAverageOk() (*int32, bool) {
	if o == nil {
		return nil, false
	}
	return &o.TotalQualityAverage, true
}

// SetTotalQualityAverage sets field value
func (o *Rating) SetTotalQualityAverage(v int32) {
	o.TotalQualityAverage = v
}

// GetRatingAmount returns the RatingAmount field value
func (o *Rating) GetRatingAmount() int32 {
	if o == nil {
		var ret int32
		return ret
	}

	return o.RatingAmount
}

// GetRatingAmountOk returns a tuple with the RatingAmount field value
// and a boolean to check if the value has been set.
func (o *Rating) GetRatingAmountOk() (*int32, bool) {
	if o == nil {
		return nil, false
	}
	return &o.RatingAmount, true
}

// SetRatingAmount sets field value
func (o *Rating) SetRatingAmount(v int32) {
	o.RatingAmount = v
}

func (o Rating) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o Rating) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["averageGrade"] = o.AverageGrade
	toSerialize["topKMostRecentDifficultyAverage"] = o.TopKMostRecentDifficultyAverage
	toSerialize["totalDifficultyAverage"] = o.TotalDifficultyAverage
	toSerialize["topKMostRecentQualityAverage"] = o.TopKMostRecentQualityAverage
	toSerialize["totalQualityAverage"] = o.TotalQualityAverage
	toSerialize["ratingAmount"] = o.RatingAmount
	return toSerialize, nil
}

func (o *Rating) UnmarshalJSON(data []byte) (err error) {
	// This validates that all required properties are included in the JSON object
	// by unmarshalling the object into a generic map with string keys and checking
	// that every required field exists as a key in the generic map.
	requiredProperties := []string{
		"averageGrade",
		"topKMostRecentDifficultyAverage",
		"totalDifficultyAverage",
		"topKMostRecentQualityAverage",
		"totalQualityAverage",
		"ratingAmount",
	}

	allProperties := make(map[string]interface{})

	err = json.Unmarshal(data, &allProperties)

	if err != nil {
		return err;
	}

	for _, requiredProperty := range(requiredProperties) {
		if _, exists := allProperties[requiredProperty]; !exists {
			return fmt.Errorf("no value given for required property %v", requiredProperty)
		}
	}

	varRating := _Rating{}

	decoder := json.NewDecoder(bytes.NewReader(data))
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&varRating)

	if err != nil {
		return err
	}

	*o = Rating(varRating)

	return err
}

type NullableRating struct {
	value *Rating
	isSet bool
}

func (v NullableRating) Get() *Rating {
	return v.value
}

func (v *NullableRating) Set(val *Rating) {
	v.value = val
	v.isSet = true
}

func (v NullableRating) IsSet() bool {
	return v.isSet
}

func (v *NullableRating) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableRating(val *Rating) *NullableRating {
	return &NullableRating{value: val, isSet: true}
}

func (v NullableRating) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableRating) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


