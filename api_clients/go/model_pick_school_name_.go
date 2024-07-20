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

// checks if the PickSchoolName type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &PickSchoolName{}

// PickSchoolName From T, pick a set of properties whose keys are in the union K
type PickSchoolName struct {
	Name string `json:"name"`
}

type _PickSchoolName PickSchoolName

// NewPickSchoolName instantiates a new PickSchoolName object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewPickSchoolName(name string) *PickSchoolName {
	this := PickSchoolName{}
	this.Name = name
	return &this
}

// NewPickSchoolNameWithDefaults instantiates a new PickSchoolName object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewPickSchoolNameWithDefaults() *PickSchoolName {
	this := PickSchoolName{}
	return &this
}

// GetName returns the Name field value
func (o *PickSchoolName) GetName() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.Name
}

// GetNameOk returns a tuple with the Name field value
// and a boolean to check if the value has been set.
func (o *PickSchoolName) GetNameOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Name, true
}

// SetName sets field value
func (o *PickSchoolName) SetName(v string) {
	o.Name = v
}

func (o PickSchoolName) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o PickSchoolName) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["name"] = o.Name
	return toSerialize, nil
}

func (o *PickSchoolName) UnmarshalJSON(data []byte) (err error) {
	// This validates that all required properties are included in the JSON object
	// by unmarshalling the object into a generic map with string keys and checking
	// that every required field exists as a key in the generic map.
	requiredProperties := []string{
		"name",
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

	varPickSchoolName := _PickSchoolName{}

	decoder := json.NewDecoder(bytes.NewReader(data))
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&varPickSchoolName)

	if err != nil {
		return err
	}

	*o = PickSchoolName(varPickSchoolName)

	return err
}

type NullablePickSchoolName struct {
	value *PickSchoolName
	isSet bool
}

func (v NullablePickSchoolName) Get() *PickSchoolName {
	return v.value
}

func (v *NullablePickSchoolName) Set(val *PickSchoolName) {
	v.value = val
	v.isSet = true
}

func (v NullablePickSchoolName) IsSet() bool {
	return v.isSet
}

func (v *NullablePickSchoolName) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullablePickSchoolName(val *PickSchoolName) *NullablePickSchoolName {
	return &NullablePickSchoolName{value: val, isSet: true}
}

func (v NullablePickSchoolName) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullablePickSchoolName) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


