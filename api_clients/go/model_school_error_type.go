/*
api

No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)

API version: 1.0.0
*/

// Code generated by OpenAPI Generator (https://openapi-generator.tech); DO NOT EDIT.

package openapi

import (
	"encoding/json"
	"fmt"
)

// SchoolErrorType the model 'SchoolErrorType'
type SchoolErrorType string

// List of SchoolErrorType
const (
	NOT_FOUND      SchoolErrorType = "SCHOOL_NOT_FOUND"
	ALREADY_EXISTS SchoolErrorType = "SCHOOL_ALREADY_EXISTS"
)

// All allowed values of SchoolErrorType enum
var AllowedSchoolErrorTypeEnumValues = []SchoolErrorType{
	"SCHOOL_NOT_FOUND",
	"SCHOOL_ALREADY_EXISTS",
}

func (v *SchoolErrorType) UnmarshalJSON(src []byte) error {
	var value string
	err := json.Unmarshal(src, &value)
	if err != nil {
		return err
	}
	enumTypeValue := SchoolErrorType(value)
	for _, existing := range AllowedSchoolErrorTypeEnumValues {
		if existing == enumTypeValue {
			*v = enumTypeValue
			return nil
		}
	}

	return fmt.Errorf("%+v is not a valid SchoolErrorType", value)
}

// NewSchoolErrorTypeFromValue returns a pointer to a valid SchoolErrorType
// for the value passed as argument, or an error if the value passed is not allowed by the enum
func NewSchoolErrorTypeFromValue(v string) (*SchoolErrorType, error) {
	ev := SchoolErrorType(v)
	if ev.IsValid() {
		return &ev, nil
	} else {
		return nil, fmt.Errorf("invalid value '%v' for SchoolErrorType: valid values are %v", v, AllowedSchoolErrorTypeEnumValues)
	}
}

// IsValid return true if the value is valid for the enum, false otherwise
func (v SchoolErrorType) IsValid() bool {
	for _, existing := range AllowedSchoolErrorTypeEnumValues {
		if existing == v {
			return true
		}
	}
	return false
}

// Ptr returns reference to SchoolErrorType value
func (v SchoolErrorType) Ptr() *SchoolErrorType {
	return &v
}

type NullableSchoolErrorType struct {
	value *SchoolErrorType
	isSet bool
}

func (v NullableSchoolErrorType) Get() *SchoolErrorType {
	return v.value
}

func (v *NullableSchoolErrorType) Set(val *SchoolErrorType) {
	v.value = val
	v.isSet = true
}

func (v NullableSchoolErrorType) IsSet() bool {
	return v.isSet
}

func (v *NullableSchoolErrorType) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableSchoolErrorType(val *SchoolErrorType) *NullableSchoolErrorType {
	return &NullableSchoolErrorType{value: val, isSet: true}
}

func (v NullableSchoolErrorType) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableSchoolErrorType) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}
