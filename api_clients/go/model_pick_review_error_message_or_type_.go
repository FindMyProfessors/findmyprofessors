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

// checks if the PickReviewErrorMessageOrType type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &PickReviewErrorMessageOrType{}

// PickReviewErrorMessageOrType From T, pick a set of properties whose keys are in the union K
type PickReviewErrorMessageOrType struct {
	Message PickSchoolErrorMessageOrTypeMessage `json:"message"`
	Type ReviewErrorType `json:"type"`
}

type _PickReviewErrorMessageOrType PickReviewErrorMessageOrType

// NewPickReviewErrorMessageOrType instantiates a new PickReviewErrorMessageOrType object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewPickReviewErrorMessageOrType(message PickSchoolErrorMessageOrTypeMessage, type_ ReviewErrorType) *PickReviewErrorMessageOrType {
	this := PickReviewErrorMessageOrType{}
	this.Message = message
	this.Type = type_
	return &this
}

// NewPickReviewErrorMessageOrTypeWithDefaults instantiates a new PickReviewErrorMessageOrType object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewPickReviewErrorMessageOrTypeWithDefaults() *PickReviewErrorMessageOrType {
	this := PickReviewErrorMessageOrType{}
	return &this
}

// GetMessage returns the Message field value
func (o *PickReviewErrorMessageOrType) GetMessage() PickSchoolErrorMessageOrTypeMessage {
	if o == nil {
		var ret PickSchoolErrorMessageOrTypeMessage
		return ret
	}

	return o.Message
}

// GetMessageOk returns a tuple with the Message field value
// and a boolean to check if the value has been set.
func (o *PickReviewErrorMessageOrType) GetMessageOk() (*PickSchoolErrorMessageOrTypeMessage, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Message, true
}

// SetMessage sets field value
func (o *PickReviewErrorMessageOrType) SetMessage(v PickSchoolErrorMessageOrTypeMessage) {
	o.Message = v
}

// GetType returns the Type field value
func (o *PickReviewErrorMessageOrType) GetType() ReviewErrorType {
	if o == nil {
		var ret ReviewErrorType
		return ret
	}

	return o.Type
}

// GetTypeOk returns a tuple with the Type field value
// and a boolean to check if the value has been set.
func (o *PickReviewErrorMessageOrType) GetTypeOk() (*ReviewErrorType, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Type, true
}

// SetType sets field value
func (o *PickReviewErrorMessageOrType) SetType(v ReviewErrorType) {
	o.Type = v
}

func (o PickReviewErrorMessageOrType) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o PickReviewErrorMessageOrType) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["message"] = o.Message
	toSerialize["type"] = o.Type
	return toSerialize, nil
}

func (o *PickReviewErrorMessageOrType) UnmarshalJSON(data []byte) (err error) {
	// This validates that all required properties are included in the JSON object
	// by unmarshalling the object into a generic map with string keys and checking
	// that every required field exists as a key in the generic map.
	requiredProperties := []string{
		"message",
		"type",
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

	varPickReviewErrorMessageOrType := _PickReviewErrorMessageOrType{}

	decoder := json.NewDecoder(bytes.NewReader(data))
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&varPickReviewErrorMessageOrType)

	if err != nil {
		return err
	}

	*o = PickReviewErrorMessageOrType(varPickReviewErrorMessageOrType)

	return err
}

type NullablePickReviewErrorMessageOrType struct {
	value *PickReviewErrorMessageOrType
	isSet bool
}

func (v NullablePickReviewErrorMessageOrType) Get() *PickReviewErrorMessageOrType {
	return v.value
}

func (v *NullablePickReviewErrorMessageOrType) Set(val *PickReviewErrorMessageOrType) {
	v.value = val
	v.isSet = true
}

func (v NullablePickReviewErrorMessageOrType) IsSet() bool {
	return v.isSet
}

func (v *NullablePickReviewErrorMessageOrType) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullablePickReviewErrorMessageOrType(val *PickReviewErrorMessageOrType) *NullablePickReviewErrorMessageOrType {
	return &NullablePickReviewErrorMessageOrType{value: val, isSet: true}
}

func (v NullablePickReviewErrorMessageOrType) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullablePickReviewErrorMessageOrType) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


