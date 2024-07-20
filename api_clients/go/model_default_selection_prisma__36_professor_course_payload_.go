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

// checks if the DefaultSelectionPrisma36ProfessorCoursePayload type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &DefaultSelectionPrisma36ProfessorCoursePayload{}

// DefaultSelectionPrisma36ProfessorCoursePayload struct for DefaultSelectionPrisma36ProfessorCoursePayload
type DefaultSelectionPrisma36ProfessorCoursePayload struct {
	Semester Model36EnumsSemester `json:"semester"`
	Year int32 `json:"year"`
	CourseId int32 `json:"course_id"`
	ProfessorId int32 `json:"professor_id"`
	Id int32 `json:"id"`
}

type _DefaultSelectionPrisma36ProfessorCoursePayload DefaultSelectionPrisma36ProfessorCoursePayload

// NewDefaultSelectionPrisma36ProfessorCoursePayload instantiates a new DefaultSelectionPrisma36ProfessorCoursePayload object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewDefaultSelectionPrisma36ProfessorCoursePayload(semester Model36EnumsSemester, year int32, courseId int32, professorId int32, id int32) *DefaultSelectionPrisma36ProfessorCoursePayload {
	this := DefaultSelectionPrisma36ProfessorCoursePayload{}
	this.Semester = semester
	this.Year = year
	this.CourseId = courseId
	this.ProfessorId = professorId
	this.Id = id
	return &this
}

// NewDefaultSelectionPrisma36ProfessorCoursePayloadWithDefaults instantiates a new DefaultSelectionPrisma36ProfessorCoursePayload object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewDefaultSelectionPrisma36ProfessorCoursePayloadWithDefaults() *DefaultSelectionPrisma36ProfessorCoursePayload {
	this := DefaultSelectionPrisma36ProfessorCoursePayload{}
	return &this
}

// GetSemester returns the Semester field value
func (o *DefaultSelectionPrisma36ProfessorCoursePayload) GetSemester() Model36EnumsSemester {
	if o == nil {
		var ret Model36EnumsSemester
		return ret
	}

	return o.Semester
}

// GetSemesterOk returns a tuple with the Semester field value
// and a boolean to check if the value has been set.
func (o *DefaultSelectionPrisma36ProfessorCoursePayload) GetSemesterOk() (*Model36EnumsSemester, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Semester, true
}

// SetSemester sets field value
func (o *DefaultSelectionPrisma36ProfessorCoursePayload) SetSemester(v Model36EnumsSemester) {
	o.Semester = v
}

// GetYear returns the Year field value
func (o *DefaultSelectionPrisma36ProfessorCoursePayload) GetYear() int32 {
	if o == nil {
		var ret int32
		return ret
	}

	return o.Year
}

// GetYearOk returns a tuple with the Year field value
// and a boolean to check if the value has been set.
func (o *DefaultSelectionPrisma36ProfessorCoursePayload) GetYearOk() (*int32, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Year, true
}

// SetYear sets field value
func (o *DefaultSelectionPrisma36ProfessorCoursePayload) SetYear(v int32) {
	o.Year = v
}

// GetCourseId returns the CourseId field value
func (o *DefaultSelectionPrisma36ProfessorCoursePayload) GetCourseId() int32 {
	if o == nil {
		var ret int32
		return ret
	}

	return o.CourseId
}

// GetCourseIdOk returns a tuple with the CourseId field value
// and a boolean to check if the value has been set.
func (o *DefaultSelectionPrisma36ProfessorCoursePayload) GetCourseIdOk() (*int32, bool) {
	if o == nil {
		return nil, false
	}
	return &o.CourseId, true
}

// SetCourseId sets field value
func (o *DefaultSelectionPrisma36ProfessorCoursePayload) SetCourseId(v int32) {
	o.CourseId = v
}

// GetProfessorId returns the ProfessorId field value
func (o *DefaultSelectionPrisma36ProfessorCoursePayload) GetProfessorId() int32 {
	if o == nil {
		var ret int32
		return ret
	}

	return o.ProfessorId
}

// GetProfessorIdOk returns a tuple with the ProfessorId field value
// and a boolean to check if the value has been set.
func (o *DefaultSelectionPrisma36ProfessorCoursePayload) GetProfessorIdOk() (*int32, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ProfessorId, true
}

// SetProfessorId sets field value
func (o *DefaultSelectionPrisma36ProfessorCoursePayload) SetProfessorId(v int32) {
	o.ProfessorId = v
}

// GetId returns the Id field value
func (o *DefaultSelectionPrisma36ProfessorCoursePayload) GetId() int32 {
	if o == nil {
		var ret int32
		return ret
	}

	return o.Id
}

// GetIdOk returns a tuple with the Id field value
// and a boolean to check if the value has been set.
func (o *DefaultSelectionPrisma36ProfessorCoursePayload) GetIdOk() (*int32, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Id, true
}

// SetId sets field value
func (o *DefaultSelectionPrisma36ProfessorCoursePayload) SetId(v int32) {
	o.Id = v
}

func (o DefaultSelectionPrisma36ProfessorCoursePayload) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o DefaultSelectionPrisma36ProfessorCoursePayload) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["semester"] = o.Semester
	toSerialize["year"] = o.Year
	toSerialize["course_id"] = o.CourseId
	toSerialize["professor_id"] = o.ProfessorId
	toSerialize["id"] = o.Id
	return toSerialize, nil
}

func (o *DefaultSelectionPrisma36ProfessorCoursePayload) UnmarshalJSON(data []byte) (err error) {
	// This validates that all required properties are included in the JSON object
	// by unmarshalling the object into a generic map with string keys and checking
	// that every required field exists as a key in the generic map.
	requiredProperties := []string{
		"semester",
		"year",
		"course_id",
		"professor_id",
		"id",
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

	varDefaultSelectionPrisma36ProfessorCoursePayload := _DefaultSelectionPrisma36ProfessorCoursePayload{}

	decoder := json.NewDecoder(bytes.NewReader(data))
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&varDefaultSelectionPrisma36ProfessorCoursePayload)

	if err != nil {
		return err
	}

	*o = DefaultSelectionPrisma36ProfessorCoursePayload(varDefaultSelectionPrisma36ProfessorCoursePayload)

	return err
}

type NullableDefaultSelectionPrisma36ProfessorCoursePayload struct {
	value *DefaultSelectionPrisma36ProfessorCoursePayload
	isSet bool
}

func (v NullableDefaultSelectionPrisma36ProfessorCoursePayload) Get() *DefaultSelectionPrisma36ProfessorCoursePayload {
	return v.value
}

func (v *NullableDefaultSelectionPrisma36ProfessorCoursePayload) Set(val *DefaultSelectionPrisma36ProfessorCoursePayload) {
	v.value = val
	v.isSet = true
}

func (v NullableDefaultSelectionPrisma36ProfessorCoursePayload) IsSet() bool {
	return v.isSet
}

func (v *NullableDefaultSelectionPrisma36ProfessorCoursePayload) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableDefaultSelectionPrisma36ProfessorCoursePayload(val *DefaultSelectionPrisma36ProfessorCoursePayload) *NullableDefaultSelectionPrisma36ProfessorCoursePayload {
	return &NullableDefaultSelectionPrisma36ProfessorCoursePayload{value: val, isSet: true}
}

func (v NullableDefaultSelectionPrisma36ProfessorCoursePayload) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableDefaultSelectionPrisma36ProfessorCoursePayload) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


