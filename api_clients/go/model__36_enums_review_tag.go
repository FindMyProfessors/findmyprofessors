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

// 36EnumsReviewTag the model '36EnumsReviewTag'
type 36EnumsReviewTag string

// List of _36_Enums.ReviewTag
const (
	TOUGH_GRADER 36EnumsReviewTag = "TOUGH_GRADER"
	GET_READY_TO_READ 36EnumsReviewTag = "GET_READY_TO_READ"
	PARTICIPATION_MATTERS 36EnumsReviewTag = "PARTICIPATION_MATTERS"
	EXTRA_CREDIT 36EnumsReviewTag = "EXTRA_CREDIT"
	GROUP_PROJECTS 36EnumsReviewTag = "GROUP_PROJECTS"
	AMAZING_LECTURES 36EnumsReviewTag = "AMAZING_LECTURES"
	CLEAR_GRADING_CRITERIA 36EnumsReviewTag = "CLEAR_GRADING_CRITERIA"
	GIVES_GOOD_FEEDBACK 36EnumsReviewTag = "GIVES_GOOD_FEEDBACK"
	INSPIRATIONAL 36EnumsReviewTag = "INSPIRATIONAL"
	LOTS_OF_HOMEWORK 36EnumsReviewTag = "LOTS_OF_HOMEWORK"
	HILARIOUS 36EnumsReviewTag = "HILARIOUS"
	BEWARE_OF_POP_QUIZZES 36EnumsReviewTag = "BEWARE_OF_POP_QUIZZES"
	SO_MANY_PAPERS 36EnumsReviewTag = "SO_MANY_PAPERS"
	CARING 36EnumsReviewTag = "CARING"
	RESPECTED 36EnumsReviewTag = "RESPECTED"
	LECTURE_HEAVY 36EnumsReviewTag = "LECTURE_HEAVY"
	GRADED_BY_FEW_THINGS 36EnumsReviewTag = "GRADED_BY_FEW_THINGS"
	ACCESSIBLE_OUTSIDE_CLASS 36EnumsReviewTag = "ACCESSIBLE_OUTSIDE_CLASS"
	ONLINE_SAVVY 36EnumsReviewTag = "ONLINE_SAVVY"
	TESTS_ARE_TOUGH 36EnumsReviewTag = "TESTS_ARE_TOUGH"
	TEST_HEAVY 36EnumsReviewTag = "TEST_HEAVY"
	WOULD_TAKE_AGAIN 36EnumsReviewTag = "WOULD_TAKE_AGAIN"
	TESTS_NOT_MANY 36EnumsReviewTag = "TESTS_NOT_MANY"
	SKIP_CLASS_YOU_WONT_PASS 36EnumsReviewTag = "SKIP_CLASS_YOU_WONT_PASS"
	CARES_ABOUT_STUDENTS 36EnumsReviewTag = "CARES_ABOUT_STUDENTS"
	RESPECTED_BY_STUDENTS 36EnumsReviewTag = "RESPECTED_BY_STUDENTS"
	EXTRA_CREDIT_OFFERED 36EnumsReviewTag = "EXTRA_CREDIT_OFFERED"
)

// All allowed values of 36EnumsReviewTag enum
var Allowed36EnumsReviewTagEnumValues = []36EnumsReviewTag{
	"TOUGH_GRADER",
	"GET_READY_TO_READ",
	"PARTICIPATION_MATTERS",
	"EXTRA_CREDIT",
	"GROUP_PROJECTS",
	"AMAZING_LECTURES",
	"CLEAR_GRADING_CRITERIA",
	"GIVES_GOOD_FEEDBACK",
	"INSPIRATIONAL",
	"LOTS_OF_HOMEWORK",
	"HILARIOUS",
	"BEWARE_OF_POP_QUIZZES",
	"SO_MANY_PAPERS",
	"CARING",
	"RESPECTED",
	"LECTURE_HEAVY",
	"GRADED_BY_FEW_THINGS",
	"ACCESSIBLE_OUTSIDE_CLASS",
	"ONLINE_SAVVY",
	"TESTS_ARE_TOUGH",
	"TEST_HEAVY",
	"WOULD_TAKE_AGAIN",
	"TESTS_NOT_MANY",
	"SKIP_CLASS_YOU_WONT_PASS",
	"CARES_ABOUT_STUDENTS",
	"RESPECTED_BY_STUDENTS",
	"EXTRA_CREDIT_OFFERED",
}

func (v *36EnumsReviewTag) UnmarshalJSON(src []byte) error {
	var value string
	err := json.Unmarshal(src, &value)
	if err != nil {
		return err
	}
	enumTypeValue := 36EnumsReviewTag(value)
	for _, existing := range Allowed36EnumsReviewTagEnumValues {
		if existing == enumTypeValue {
			*v = enumTypeValue
			return nil
		}
	}

	return fmt.Errorf("%+v is not a valid 36EnumsReviewTag", value)
}

// New36EnumsReviewTagFromValue returns a pointer to a valid 36EnumsReviewTag
// for the value passed as argument, or an error if the value passed is not allowed by the enum
func New36EnumsReviewTagFromValue(v string) (*36EnumsReviewTag, error) {
	ev := 36EnumsReviewTag(v)
	if ev.IsValid() {
		return &ev, nil
	} else {
		return nil, fmt.Errorf("invalid value '%v' for 36EnumsReviewTag: valid values are %v", v, Allowed36EnumsReviewTagEnumValues)
	}
}

// IsValid return true if the value is valid for the enum, false otherwise
func (v 36EnumsReviewTag) IsValid() bool {
	for _, existing := range Allowed36EnumsReviewTagEnumValues {
		if existing == v {
			return true
		}
	}
	return false
}

// Ptr returns reference to _36_Enums.ReviewTag value
func (v 36EnumsReviewTag) Ptr() *36EnumsReviewTag {
	return &v
}

type Nullable36EnumsReviewTag struct {
	value *36EnumsReviewTag
	isSet bool
}

func (v Nullable36EnumsReviewTag) Get() *36EnumsReviewTag {
	return v.value
}

func (v *Nullable36EnumsReviewTag) Set(val *36EnumsReviewTag) {
	v.value = val
	v.isSet = true
}

func (v Nullable36EnumsReviewTag) IsSet() bool {
	return v.isSet
}

func (v *Nullable36EnumsReviewTag) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullable36EnumsReviewTag(val *36EnumsReviewTag) *Nullable36EnumsReviewTag {
	return &Nullable36EnumsReviewTag{value: val, isSet: true}
}

func (v Nullable36EnumsReviewTag) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *Nullable36EnumsReviewTag) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}

