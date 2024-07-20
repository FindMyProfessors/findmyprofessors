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

// checks if the PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId{}

// PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId From T, pick a set of properties whose keys are in the union K
type PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId struct {
	ProfessorId float64 `json:"professor_id"`
	Quality float64 `json:"quality"`
	Difficulty float64 `json:"difficulty"`
	Time time.Time `json:"time"`
	Tags []Model36EnumsReviewTag `json:"tags"`
	Grade Model36EnumsGrade `json:"grade"`
}

type _PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId

// NewPickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId instantiates a new PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewPickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId(professorId float64, quality float64, difficulty float64, time time.Time, tags []Model36EnumsReviewTag, grade Model36EnumsGrade) *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId {
	this := PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId{}
	this.ProfessorId = professorId
	this.Quality = quality
	this.Difficulty = difficulty
	this.Time = time
	this.Tags = tags
	this.Grade = grade
	return &this
}

// NewPickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorIdWithDefaults instantiates a new PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewPickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorIdWithDefaults() *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId {
	this := PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId{}
	return &this
}

// GetProfessorId returns the ProfessorId field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) GetProfessorId() float64 {
	if o == nil {
		var ret float64
		return ret
	}

	return o.ProfessorId
}

// GetProfessorIdOk returns a tuple with the ProfessorId field value
// and a boolean to check if the value has been set.
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) GetProfessorIdOk() (*float64, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ProfessorId, true
}

// SetProfessorId sets field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) SetProfessorId(v float64) {
	o.ProfessorId = v
}

// GetQuality returns the Quality field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) GetQuality() float64 {
	if o == nil {
		var ret float64
		return ret
	}

	return o.Quality
}

// GetQualityOk returns a tuple with the Quality field value
// and a boolean to check if the value has been set.
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) GetQualityOk() (*float64, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Quality, true
}

// SetQuality sets field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) SetQuality(v float64) {
	o.Quality = v
}

// GetDifficulty returns the Difficulty field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) GetDifficulty() float64 {
	if o == nil {
		var ret float64
		return ret
	}

	return o.Difficulty
}

// GetDifficultyOk returns a tuple with the Difficulty field value
// and a boolean to check if the value has been set.
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) GetDifficultyOk() (*float64, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Difficulty, true
}

// SetDifficulty sets field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) SetDifficulty(v float64) {
	o.Difficulty = v
}

// GetTime returns the Time field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) GetTime() time.Time {
	if o == nil {
		var ret time.Time
		return ret
	}

	return o.Time
}

// GetTimeOk returns a tuple with the Time field value
// and a boolean to check if the value has been set.
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) GetTimeOk() (*time.Time, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Time, true
}

// SetTime sets field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) SetTime(v time.Time) {
	o.Time = v
}

// GetTags returns the Tags field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) GetTags() []Model36EnumsReviewTag {
	if o == nil {
		var ret []Model36EnumsReviewTag
		return ret
	}

	return o.Tags
}

// GetTagsOk returns a tuple with the Tags field value
// and a boolean to check if the value has been set.
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) GetTagsOk() ([]Model36EnumsReviewTag, bool) {
	if o == nil {
		return nil, false
	}
	return o.Tags, true
}

// SetTags sets field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) SetTags(v []Model36EnumsReviewTag) {
	o.Tags = v
}

// GetGrade returns the Grade field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) GetGrade() Model36EnumsGrade {
	if o == nil {
		var ret Model36EnumsGrade
		return ret
	}

	return o.Grade
}

// GetGradeOk returns a tuple with the Grade field value
// and a boolean to check if the value has been set.
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) GetGradeOk() (*Model36EnumsGrade, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Grade, true
}

// SetGrade sets field value
func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) SetGrade(v Model36EnumsGrade) {
	o.Grade = v
}

func (o PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["professor_id"] = o.ProfessorId
	toSerialize["quality"] = o.Quality
	toSerialize["difficulty"] = o.Difficulty
	toSerialize["time"] = o.Time
	toSerialize["tags"] = o.Tags
	toSerialize["grade"] = o.Grade
	return toSerialize, nil
}

func (o *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) UnmarshalJSON(data []byte) (err error) {
	// This validates that all required properties are included in the JSON object
	// by unmarshalling the object into a generic map with string keys and checking
	// that every required field exists as a key in the generic map.
	requiredProperties := []string{
		"professor_id",
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

	varPickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId := _PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId{}

	decoder := json.NewDecoder(bytes.NewReader(data))
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&varPickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId)

	if err != nil {
		return err
	}

	*o = PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId(varPickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId)

	return err
}

type NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId struct {
	value *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId
	isSet bool
}

func (v NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) Get() *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId {
	return v.value
}

func (v *NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) Set(val *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) {
	v.value = val
	v.isSet = true
}

func (v NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) IsSet() bool {
	return v.isSet
}

func (v *NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId(val *PickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) *NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId {
	return &NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId{value: val, isSet: true}
}

func (v NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullablePickReviewQualityOrDifficultyOrTimeOrTagsOrGradeOrProfessorId) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


