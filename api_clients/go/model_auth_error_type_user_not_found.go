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

// AuthErrorTypeUSERNOTFOUND the model 'AuthErrorTypeUSERNOTFOUND'
type AuthErrorTypeUSERNOTFOUND string

// List of AuthErrorType.USER_NOT_FOUND
const (
	USER_NOT_FOUND AuthErrorTypeUSERNOTFOUND = "USER_NOT_FOUND"
)

// All allowed values of AuthErrorTypeUSERNOTFOUND enum
var AllowedAuthErrorTypeUSERNOTFOUNDEnumValues = []AuthErrorTypeUSERNOTFOUND{
	"USER_NOT_FOUND",
}

func (v *AuthErrorTypeUSERNOTFOUND) UnmarshalJSON(src []byte) error {
	var value string
	err := json.Unmarshal(src, &value)
	if err != nil {
		return err
	}
	enumTypeValue := AuthErrorTypeUSERNOTFOUND(value)
	for _, existing := range AllowedAuthErrorTypeUSERNOTFOUNDEnumValues {
		if existing == enumTypeValue {
			*v = enumTypeValue
			return nil
		}
	}

	return fmt.Errorf("%+v is not a valid AuthErrorTypeUSERNOTFOUND", value)
}

// NewAuthErrorTypeUSERNOTFOUNDFromValue returns a pointer to a valid AuthErrorTypeUSERNOTFOUND
// for the value passed as argument, or an error if the value passed is not allowed by the enum
func NewAuthErrorTypeUSERNOTFOUNDFromValue(v string) (*AuthErrorTypeUSERNOTFOUND, error) {
	ev := AuthErrorTypeUSERNOTFOUND(v)
	if ev.IsValid() {
		return &ev, nil
	} else {
		return nil, fmt.Errorf("invalid value '%v' for AuthErrorTypeUSERNOTFOUND: valid values are %v", v, AllowedAuthErrorTypeUSERNOTFOUNDEnumValues)
	}
}

// IsValid return true if the value is valid for the enum, false otherwise
func (v AuthErrorTypeUSERNOTFOUND) IsValid() bool {
	for _, existing := range AllowedAuthErrorTypeUSERNOTFOUNDEnumValues {
		if existing == v {
			return true
		}
	}
	return false
}

// Ptr returns reference to AuthErrorType.USER_NOT_FOUND value
func (v AuthErrorTypeUSERNOTFOUND) Ptr() *AuthErrorTypeUSERNOTFOUND {
	return &v
}

type NullableAuthErrorTypeUSERNOTFOUND struct {
	value *AuthErrorTypeUSERNOTFOUND
	isSet bool
}

func (v NullableAuthErrorTypeUSERNOTFOUND) Get() *AuthErrorTypeUSERNOTFOUND {
	return v.value
}

func (v *NullableAuthErrorTypeUSERNOTFOUND) Set(val *AuthErrorTypeUSERNOTFOUND) {
	v.value = val
	v.isSet = true
}

func (v NullableAuthErrorTypeUSERNOTFOUND) IsSet() bool {
	return v.isSet
}

func (v *NullableAuthErrorTypeUSERNOTFOUND) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableAuthErrorTypeUSERNOTFOUND(val *AuthErrorTypeUSERNOTFOUND) *NullableAuthErrorTypeUSERNOTFOUND {
	return &NullableAuthErrorTypeUSERNOTFOUND{value: val, isSet: true}
}

func (v NullableAuthErrorTypeUSERNOTFOUND) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableAuthErrorTypeUSERNOTFOUND) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}
