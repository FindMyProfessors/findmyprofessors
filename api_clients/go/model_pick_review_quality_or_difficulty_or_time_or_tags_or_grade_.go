/*
api

No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)

API version: 1.0.0
*/

// Code generated by OpenAPI Generator (https://openapi-generator.tech); DO NOT EDIT.

package openapi

import (
	"encoding/json"
	"time"
	"bytes"
	"fmt"
)

// checks if the PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade{}

// PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade From T, pick a set of properties whose keys are in the union K
type PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade struct {
	Quality int32 `json:"quality"`
	Difficulty int32 `json:"difficulty"`
	Time time.Time `json:"time"`
	Tags []Model36EnumsReviewTag `json:"tags"`
	Grade Model36EnumsGrade `json:"grade"`
}

type _PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade

// NewPickReviewQualityOrDifficultyOrTimeOrTagsOrGrade instantiates a new PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewPickReviewQualityOrDifficultyOrTimeOrTagsOrGrade(quality int32, difficulty int32, time time.Time, tags []Model36EnumsReviewTag, grade Model36EnumsGrade) *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade {
	this := PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade{}
	this.Quality = quality
	this.Difficulty = difficulty
	this.Time = time
	this.Tags = tags
	this.Grade = grade
	return &this
}

// NewPickReviewQualityOrDifficultyOrTimeOrTagsOrGradeWithDefaults instantiates a new PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewPickReviewQualityOrDifficultyOrTimeOrTagsOrGradeWithDefaults() *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade {
	this := PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade{}
	return &this
}

// GetQuality returns the Quality field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) GetQuality() int32 {
	if o == nil {
		var ret int32
		return ret
	}

	return o.Quality
}

// GetQualityOk returns a tuple with the Quality field value
// and a boolean to check if the value has been set.
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) GetQualityOk() (*int32, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Quality, true
}

// SetQuality sets field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) SetQuality(v int32) {
	o.Quality = v
}

// GetDifficulty returns the Difficulty field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) GetDifficulty() int32 {
	if o == nil {
		var ret int32
		return ret
	}

	return o.Difficulty
}

// GetDifficultyOk returns a tuple with the Difficulty field value
// and a boolean to check if the value has been set.
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) GetDifficultyOk() (*int32, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Difficulty, true
}

// SetDifficulty sets field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) SetDifficulty(v int32) {
	o.Difficulty = v
}

// GetTime returns the Time field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) GetTime() time.Time {
	if o == nil {
		var ret time.Time
		return ret
	}

	return o.Time
}

// GetTimeOk returns a tuple with the Time field value
// and a boolean to check if the value has been set.
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) GetTimeOk() (*time.Time, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Time, true
}

// SetTime sets field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) SetTime(v time.Time) {
	o.Time = v
}

// GetTags returns the Tags field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) GetTags() []Model36EnumsReviewTag {
	if o == nil {
		var ret []Model36EnumsReviewTag
		return ret
	}

	return o.Tags
}

// GetTagsOk returns a tuple with the Tags field value
// and a boolean to check if the value has been set.
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) GetTagsOk() ([]Model36EnumsReviewTag, bool) {
	if o == nil {
		return nil, false
	}
	return o.Tags, true
}

// SetTags sets field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) SetTags(v []Model36EnumsReviewTag) {
	o.Tags = v
}

// GetGrade returns the Grade field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) GetGrade() Model36EnumsGrade {
	if o == nil {
		var ret Model36EnumsGrade
		return ret
	}

	return o.Grade
}

// GetGradeOk returns a tuple with the Grade field value
// and a boolean to check if the value has been set.
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) GetGradeOk() (*Model36EnumsGrade, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Grade, true
}

// SetGrade sets field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) SetGrade(v Model36EnumsGrade) {
	o.Grade = v
}

func (o PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["quality"] = o.Quality
	toSerialize["difficulty"] = o.Difficulty
	toSerialize["time"] = o.Time
	toSerialize["tags"] = o.Tags
	toSerialize["grade"] = o.Grade
	return toSerialize, nil
}

func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) UnmarshalJSON(data []byte) (err error) {
	// This validates that all required properties are included in the JSON object
	// by unmarshalling the object into a generic map with string keys and checking
	// that every required field exists as a key in the generic map.
	requiredProperties := []string{
		"quality",
		"difficulty",
		"time",
		"tags",
		"grade",
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

	varPickReviewQualityOrDifficultyOrTimeOrTagsOrGrade := _PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade{}

	decoder := json.NewDecoder(bytes.NewReader(data))
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&varPickReviewQualityOrDifficultyOrTimeOrTagsOrGrade)

	if err != nil {
		return err
	}

	*o = PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade(varPickReviewQualityOrDifficultyOrTimeOrTagsOrGrade)

	return err
}

type NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGrade struct {
	value *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade
	isSet bool
}

func (v NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) Get() *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade {
	return v.value
}

func (v *NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) Set(val *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) {
	v.value = val
	v.isSet = true
}

func (v NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) IsSet() bool {
	return v.isSet
}

func (v *NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGrade(val *PickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) *NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGrade {
	return &NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGrade{value: val, isSet: true}
}

func (v NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGrade) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


