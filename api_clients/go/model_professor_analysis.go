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

// checks if the ProfessorAnalysis type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &ProfessorAnalysis{}

// ProfessorAnalysis struct for ProfessorAnalysis
type ProfessorAnalysis struct {
	AverageRatingValues []ChartValue `json:"averageRatingValues"`
	TagAmount []TagAmount `json:"tagAmount"`
}

type _ProfessorAnalysis ProfessorAnalysis

// NewProfessorAnalysis instantiates a new ProfessorAnalysis object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewProfessorAnalysis(averageRatingValues []ChartValue, tagAmount []TagAmount) *ProfessorAnalysis {
	this := ProfessorAnalysis{}
	this.AverageRatingValues = averageRatingValues
	this.TagAmount = tagAmount
	return &this
}

// NewProfessorAnalysisWithDefaults instantiates a new ProfessorAnalysis object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewProfessorAnalysisWithDefaults() *ProfessorAnalysis {
	this := ProfessorAnalysis{}
	return &this
}

// GetAverageRatingValues returns the AverageRatingValues field value
func (o *ProfessorAnalysis) GetAverageRatingValues() []ChartValue {
	if o == nil {
		var ret []ChartValue
		return ret
	}

	return o.AverageRatingValues
}

// GetAverageRatingValuesOk returns a tuple with the AverageRatingValues field value
// and a boolean to check if the value has been set.
func (o *ProfessorAnalysis) GetAverageRatingValuesOk() ([]ChartValue, bool) {
	if o == nil {
		return nil, false
	}
	return o.AverageRatingValues, true
}

// SetAverageRatingValues sets field value
func (o *ProfessorAnalysis) SetAverageRatingValues(v []ChartValue) {
	o.AverageRatingValues = v
}

// GetTagAmount returns the TagAmount field value
func (o *ProfessorAnalysis) GetTagAmount() []TagAmount {
	if o == nil {
		var ret []TagAmount
		return ret
	}

	return o.TagAmount
}

// GetTagAmountOk returns a tuple with the TagAmount field value
// and a boolean to check if the value has been set.
func (o *ProfessorAnalysis) GetTagAmountOk() ([]TagAmount, bool) {
	if o == nil {
		return nil, false
	}
	return o.TagAmount, true
}

// SetTagAmount sets field value
func (o *ProfessorAnalysis) SetTagAmount(v []TagAmount) {
	o.TagAmount = v
}

func (o ProfessorAnalysis) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o ProfessorAnalysis) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["averageRatingValues"] = o.AverageRatingValues
	toSerialize["tagAmount"] = o.TagAmount
	return toSerialize, nil
}

func (o *ProfessorAnalysis) UnmarshalJSON(data []byte) (err error) {
	// This validates that all required properties are included in the JSON object
	// by unmarshalling the object into a generic map with string keys and checking
	// that every required field exists as a key in the generic map.
	requiredProperties := []string{
		"averageRatingValues",
		"tagAmount",
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

	varProfessorAnalysis := _ProfessorAnalysis{}

	decoder := json.NewDecoder(bytes.NewReader(data))
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&varProfessorAnalysis)

	if err != nil {
		return err
	}

	*o = ProfessorAnalysis(varProfessorAnalysis)

	return err
}

type NullableProfessorAnalysis struct {
	value *ProfessorAnalysis
	isSet bool
}

func (v NullableProfessorAnalysis) Get() *ProfessorAnalysis {
	return v.value
}

func (v *NullableProfessorAnalysis) Set(val *ProfessorAnalysis) {
	v.value = val
	v.isSet = true
}

func (v NullableProfessorAnalysis) IsSet() bool {
	return v.isSet
}

func (v *NullableProfessorAnalysis) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableProfessorAnalysis(val *ProfessorAnalysis) *NullableProfessorAnalysis {
	return &NullableProfessorAnalysis{value: val, isSet: true}
}

func (v NullableProfessorAnalysis) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableProfessorAnalysis) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


