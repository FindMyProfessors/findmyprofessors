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

// ReviewErrorTypeREVIEWNOTFOUND the model 'ReviewErrorTypeREVIEWNOTFOUND'
type ReviewErrorTypeREVIEWNOTFOUND string

// List of ReviewErrorType.REVIEW_NOT_FOUND
const (
	REVIEW_NOT_FOUND ReviewErrorTypeREVIEWNOTFOUND = "REVIEW_NOT_FOUND"
)

// All allowed values of ReviewErrorTypeREVIEWNOTFOUND enum
var AllowedReviewErrorTypeREVIEWNOTFOUNDEnumValues = []ReviewErrorTypeREVIEWNOTFOUND{
	"REVIEW_NOT_FOUND",
}

func (v *ReviewErrorTypeREVIEWNOTFOUND) UnmarshalJSON(src []byte) error {
	var value string
	err := json.Unmarshal(src, &value)
	if err != nil {
		return err
	}
	enumTypeValue := ReviewErrorTypeREVIEWNOTFOUND(value)
	for _, existing := range AllowedReviewErrorTypeREVIEWNOTFOUNDEnumValues {
		if existing == enumTypeValue {
			*v = enumTypeValue
			return nil
		}
	}

	return fmt.Errorf("%+v is not a valid ReviewErrorTypeREVIEWNOTFOUND", value)
}

// NewReviewErrorTypeREVIEWNOTFOUNDFromValue returns a pointer to a valid ReviewErrorTypeREVIEWNOTFOUND
// for the value passed as argument, or an error if the value passed is not allowed by the enum
func NewReviewErrorTypeREVIEWNOTFOUNDFromValue(v string) (*ReviewErrorTypeREVIEWNOTFOUND, error) {
	ev := ReviewErrorTypeREVIEWNOTFOUND(v)
	if ev.IsValid() {
		return &ev, nil
	} else {
		return nil, fmt.Errorf("invalid value '%v' for ReviewErrorTypeREVIEWNOTFOUND: valid values are %v", v, AllowedReviewErrorTypeREVIEWNOTFOUNDEnumValues)
	}
}

// IsValid return true if the value is valid for the enum, false otherwise
func (v ReviewErrorTypeREVIEWNOTFOUND) IsValid() bool {
	for _, existing := range AllowedReviewErrorTypeREVIEWNOTFOUNDEnumValues {
		if existing == v {
			return true
		}
	}
	return false
}

// Ptr returns reference to ReviewErrorType.REVIEW_NOT_FOUND value
func (v ReviewErrorTypeREVIEWNOTFOUND) Ptr() *ReviewErrorTypeREVIEWNOTFOUND {
	return &v
}

type NullableReviewErrorTypeREVIEWNOTFOUND struct {
	value *ReviewErrorTypeREVIEWNOTFOUND
	isSet bool
}

func (v NullableReviewErrorTypeREVIEWNOTFOUND) Get() *ReviewErrorTypeREVIEWNOTFOUND {
	return v.value
}

func (v *NullableReviewErrorTypeREVIEWNOTFOUND) Set(val *ReviewErrorTypeREVIEWNOTFOUND) {
	v.value = val
	v.isSet = true
}

func (v NullableReviewErrorTypeREVIEWNOTFOUND) IsSet() bool {
	return v.isSet
}

func (v *NullableReviewErrorTypeREVIEWNOTFOUND) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableReviewErrorTypeREVIEWNOTFOUND(val *ReviewErrorTypeREVIEWNOTFOUND) *NullableReviewErrorTypeREVIEWNOTFOUND {
	return &NullableReviewErrorTypeREVIEWNOTFOUND{value: val, isSet: true}
}

func (v NullableReviewErrorTypeREVIEWNOTFOUND) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableReviewErrorTypeREVIEWNOTFOUND) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

