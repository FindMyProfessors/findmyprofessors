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

// CourseErrorTypeCOURSENOTFOUND the model 'CourseErrorTypeCOURSENOTFOUND'
type CourseErrorTypeCOURSENOTFOUND string

// List of CourseErrorType.COURSE_NOT_FOUND
const (
	COURSE_NOT_FOUND CourseErrorTypeCOURSENOTFOUND = "COURSE_NOT_FOUND"
)

// All allowed values of CourseErrorTypeCOURSENOTFOUND enum
var AllowedCourseErrorTypeCOURSENOTFOUNDEnumValues = []CourseErrorTypeCOURSENOTFOUND{
	"COURSE_NOT_FOUND",
}

func (v *CourseErrorTypeCOURSENOTFOUND) UnmarshalJSON(src []byte) error {
	var value string
	err := json.Unmarshal(src, &value)
	if err != nil {
		return err
	}
	enumTypeValue := CourseErrorTypeCOURSENOTFOUND(value)
	for _, existing := range AllowedCourseErrorTypeCOURSENOTFOUNDEnumValues {
		if existing == enumTypeValue {
			*v = enumTypeValue
			return nil
		}
	}

	return fmt.Errorf("%+v is not a valid CourseErrorTypeCOURSENOTFOUND", value)
}

// NewCourseErrorTypeCOURSENOTFOUNDFromValue returns a pointer to a valid CourseErrorTypeCOURSENOTFOUND
// for the value passed as argument, or an error if the value passed is not allowed by the enum
func NewCourseErrorTypeCOURSENOTFOUNDFromValue(v string) (*CourseErrorTypeCOURSENOTFOUND, error) {
	ev := CourseErrorTypeCOURSENOTFOUND(v)
	if ev.IsValid() {
		return &ev, nil
	} else {
		return nil, fmt.Errorf("invalid value '%v' for CourseErrorTypeCOURSENOTFOUND: valid values are %v", v, AllowedCourseErrorTypeCOURSENOTFOUNDEnumValues)
	}
}

// IsValid return true if the value is valid for the enum, false otherwise
func (v CourseErrorTypeCOURSENOTFOUND) IsValid() bool {
	for _, existing := range AllowedCourseErrorTypeCOURSENOTFOUNDEnumValues {
		if existing == v {
			return true
		}
	}
	return false
}

// Ptr returns reference to CourseErrorType.COURSE_NOT_FOUND value
func (v CourseErrorTypeCOURSENOTFOUND) Ptr() *CourseErrorTypeCOURSENOTFOUND {
	return &v
}

type NullableCourseErrorTypeCOURSENOTFOUND struct {
	value *CourseErrorTypeCOURSENOTFOUND
	isSet bool
}

func (v NullableCourseErrorTypeCOURSENOTFOUND) Get() *CourseErrorTypeCOURSENOTFOUND {
	return v.value
}

func (v *NullableCourseErrorTypeCOURSENOTFOUND) Set(val *CourseErrorTypeCOURSENOTFOUND) {
	v.value = val
	v.isSet = true
}

func (v NullableCourseErrorTypeCOURSENOTFOUND) IsSet() bool {
	return v.isSet
}

func (v *NullableCourseErrorTypeCOURSENOTFOUND) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableCourseErrorTypeCOURSENOTFOUND(val *CourseErrorTypeCOURSENOTFOUND) *NullableCourseErrorTypeCOURSENOTFOUND {
	return &NullableCourseErrorTypeCOURSENOTFOUND{value: val, isSet: true}
}

func (v NullableCourseErrorTypeCOURSENOTFOUND) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableCourseErrorTypeCOURSENOTFOUND) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}
