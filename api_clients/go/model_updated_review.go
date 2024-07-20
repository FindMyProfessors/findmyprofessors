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
)

// checks if the UpdatedReview type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &UpdatedReview{}

// UpdatedReview struct for UpdatedReview
type UpdatedReview struct {
	Quality    *float32              `json:"quality,omitempty"`
	Difficulty *float32              `json:"difficulty,omitempty"`
	Time       *time.Time            `json:"time,omitempty"`
	Tags       []ModelEnumsReviewTag `json:"tags,omitempty"`
	Grade      *ModelEnumsGrade      `json:"grade,omitempty"`
}

// NewUpdatedReview instantiates a new UpdatedReview object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewUpdatedReview() *UpdatedReview {
	this := UpdatedReview{}
	return &this
}

// NewUpdatedReviewWithDefaults instantiates a new UpdatedReview object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewUpdatedReviewWithDefaults() *UpdatedReview {
	this := UpdatedReview{}
	return &this
}

// GetQuality returns the Quality field value if set, zero value otherwise.
func (o *UpdatedReview) GetQuality() float32 {
	if o == nil || IsNil(o.Quality) {
		var ret float32
		return ret
	}
	return *o.Quality
}

// GetQualityOk returns a tuple with the Quality field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *UpdatedReview) GetQualityOk() (*float32, bool) {
	if o == nil || IsNil(o.Quality) {
		return nil, false
	}
	return o.Quality, true
}

// HasQuality returns a boolean if a field has been set.
func (o *UpdatedReview) HasQuality() bool {
	if o != nil && !IsNil(o.Quality) {
		return true
	}

	return false
}

// SetQuality gets a reference to the given float32 and assigns it to the Quality field.
func (o *UpdatedReview) SetQuality(v float32) {
	o.Quality = &v
}

// GetDifficulty returns the Difficulty field value if set, zero value otherwise.
func (o *UpdatedReview) GetDifficulty() float32 {
	if o == nil || IsNil(o.Difficulty) {
		var ret float32
		return ret
	}
	return *o.Difficulty
}

// GetDifficultyOk returns a tuple with the Difficulty field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *UpdatedReview) GetDifficultyOk() (*float32, bool) {
	if o == nil || IsNil(o.Difficulty) {
		return nil, false
	}
	return o.Difficulty, true
}

// HasDifficulty returns a boolean if a field has been set.
func (o *UpdatedReview) HasDifficulty() bool {
	if o != nil && !IsNil(o.Difficulty) {
		return true
	}

	return false
}

// SetDifficulty gets a reference to the given float32 and assigns it to the Difficulty field.
func (o *UpdatedReview) SetDifficulty(v float32) {
	o.Difficulty = &v
}

// GetTime returns the Time field value if set, zero value otherwise.
func (o *UpdatedReview) GetTime() time.Time {
	if o == nil || IsNil(o.Time) {
		var ret time.Time
		return ret
	}
	return *o.Time
}

// GetTimeOk returns a tuple with the Time field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *UpdatedReview) GetTimeOk() (*time.Time, bool) {
	if o == nil || IsNil(o.Time) {
		return nil, false
	}
	return o.Time, true
}

// HasTime returns a boolean if a field has been set.
func (o *UpdatedReview) HasTime() bool {
	if o != nil && !IsNil(o.Time) {
		return true
	}

	return false
}

// SetTime gets a reference to the given time.Time and assigns it to the Time field.
func (o *UpdatedReview) SetTime(v time.Time) {
	o.Time = &v
}

// GetTags returns the Tags field value if set, zero value otherwise.
func (o *UpdatedReview) GetTags() []ModelEnumsReviewTag {
	if o == nil || IsNil(o.Tags) {
		var ret []ModelEnumsReviewTag
		return ret
	}
	return o.Tags
}

// GetTagsOk returns a tuple with the Tags field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *UpdatedReview) GetTagsOk() ([]ModelEnumsReviewTag, bool) {
	if o == nil || IsNil(o.Tags) {
		return nil, false
	}
	return o.Tags, true
}

// HasTags returns a boolean if a field has been set.
func (o *UpdatedReview) HasTags() bool {
	if o != nil && !IsNil(o.Tags) {
		return true
	}

	return false
}

// SetTags gets a reference to the given []ModelEnumsReviewTag and assigns it to the Tags field.
func (o *UpdatedReview) SetTags(v []ModelEnumsReviewTag) {
	o.Tags = v
}

// GetGrade returns the Grade field value if set, zero value otherwise.
func (o *UpdatedReview) GetGrade() ModelEnumsGrade {
	if o == nil || IsNil(o.Grade) {
		var ret ModelEnumsGrade
		return ret
	}
	return *o.Grade
}

// GetGradeOk returns a tuple with the Grade field value if set, nil otherwise
// and a boolean to check if the value has been set.
func (o *UpdatedReview) GetGradeOk() (*ModelEnumsGrade, bool) {
	if o == nil || IsNil(o.Grade) {
		return nil, false
	}
	return o.Grade, true
}

// HasGrade returns a boolean if a field has been set.
func (o *UpdatedReview) HasGrade() bool {
	if o != nil && !IsNil(o.Grade) {
		return true
	}

	return false
}

// SetGrade gets a reference to the given ModelEnumsGrade and assigns it to the Grade field.
func (o *UpdatedReview) SetGrade(v ModelEnumsGrade) {
	o.Grade = &v
}

func (o UpdatedReview) MarshalJSON() ([]byte, error) {
	toSerialize, err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o UpdatedReview) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	if !IsNil(o.Quality) {
		toSerialize["quality"] = o.Quality
	}
	if !IsNil(o.Difficulty) {
		toSerialize["difficulty"] = o.Difficulty
	}
	if !IsNil(o.Time) {
		toSerialize["time"] = o.Time
	}
	if !IsNil(o.Tags) {
		toSerialize["tags"] = o.Tags
	}
	if !IsNil(o.Grade) {
		toSerialize["grade"] = o.Grade
	}
	return toSerialize, nil
}

type NullableUpdatedReview struct {
	value *UpdatedReview
	isSet bool
}

func (v NullableUpdatedReview) Get() *UpdatedReview {
	return v.value
}

func (v *NullableUpdatedReview) Set(val *UpdatedReview) {
	v.value = val
	v.isSet = true
}

func (v NullableUpdatedReview) IsSet() bool {
	return v.isSet
}

func (v *NullableUpdatedReview) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableUpdatedReview(val *UpdatedReview) *NullableUpdatedReview {
	return &NullableUpdatedReview{value: val, isSet: true}
}

func (v NullableUpdatedReview) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableUpdatedReview) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}
