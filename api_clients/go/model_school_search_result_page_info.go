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

// checks if the SchoolSearchResultPageInfo type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &SchoolSearchResultPageInfo{}

// SchoolSearchResultPageInfo struct for SchoolSearchResultPageInfo
type SchoolSearchResultPageInfo struct {
	Total float64 `json:"total"`
	EndCursor NullableString `json:"endCursor"`
	HasNextPage bool `json:"hasNextPage"`
}

type _SchoolSearchResultPageInfo SchoolSearchResultPageInfo

// NewSchoolSearchResultPageInfo instantiates a new SchoolSearchResultPageInfo object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewSchoolSearchResultPageInfo(total float64, endCursor NullableString, hasNextPage bool) *SchoolSearchResultPageInfo {
	this := SchoolSearchResultPageInfo{}
	this.Total = total
	this.EndCursor = endCursor
	this.HasNextPage = hasNextPage
	return &this
}

// NewSchoolSearchResultPageInfoWithDefaults instantiates a new SchoolSearchResultPageInfo object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewSchoolSearchResultPageInfoWithDefaults() *SchoolSearchResultPageInfo {
	this := SchoolSearchResultPageInfo{}
	return &this
}

// GetTotal returns the Total field value
func (o *SchoolSearchResultPageInfo) GetTotal() float64 {
	if o == nil {
		var ret float64
		return ret
	}

	return o.Total
}

// GetTotalOk returns a tuple with the Total field value
// and a boolean to check if the value has been set.
func (o *SchoolSearchResultPageInfo) GetTotalOk() (*float64, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Total, true
}

// SetTotal sets field value
func (o *SchoolSearchResultPageInfo) SetTotal(v float64) {
	o.Total = v
}

// GetEndCursor returns the EndCursor field value
// If the value is explicit nil, the zero value for string will be returned
func (o *SchoolSearchResultPageInfo) GetEndCursor() string {
	if o == nil || o.EndCursor.Get() == nil {
		var ret string
		return ret
	}

	return *o.EndCursor.Get()
}

// GetEndCursorOk returns a tuple with the EndCursor field value
// and a boolean to check if the value has been set.
// NOTE: If the value is an explicit nil, `nil, true` will be returned
func (o *SchoolSearchResultPageInfo) GetEndCursorOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return o.EndCursor.Get(), o.EndCursor.IsSet()
}

// SetEndCursor sets field value
func (o *SchoolSearchResultPageInfo) SetEndCursor(v string) {
	o.EndCursor.Set(&v)
}

// GetHasNextPage returns the HasNextPage field value
func (o *SchoolSearchResultPageInfo) GetHasNextPage() bool {
	if o == nil {
		var ret bool
		return ret
	}

	return o.HasNextPage
}

// GetHasNextPageOk returns a tuple with the HasNextPage field value
// and a boolean to check if the value has been set.
func (o *SchoolSearchResultPageInfo) GetHasNextPageOk() (*bool, bool) {
	if o == nil {
		return nil, false
	}
	return &o.HasNextPage, true
}

// SetHasNextPage sets field value
func (o *SchoolSearchResultPageInfo) SetHasNextPage(v bool) {
	o.HasNextPage = v
}

func (o SchoolSearchResultPageInfo) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o SchoolSearchResultPageInfo) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["total"] = o.Total
	toSerialize["endCursor"] = o.EndCursor.Get()
	toSerialize["hasNextPage"] = o.HasNextPage
	return toSerialize, nil
}

func (o *SchoolSearchResultPageInfo) UnmarshalJSON(data []byte) (err error) {
	// This validates that all required properties are included in the JSON object
	// by unmarshalling the object into a generic map with string keys and checking
	// that every required field exists as a key in the generic map.
	requiredProperties := []string{
		"total",
		"endCursor",
		"hasNextPage",
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

	varSchoolSearchResultPageInfo := _SchoolSearchResultPageInfo{}

	decoder := json.NewDecoder(bytes.NewReader(data))
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&varSchoolSearchResultPageInfo)

	if err != nil {
		return err
	}

	*o = SchoolSearchResultPageInfo(varSchoolSearchResultPageInfo)

	return err
}

type NullableSchoolSearchResultPageInfo struct {
	value *SchoolSearchResultPageInfo
	isSet bool
}

func (v NullableSchoolSearchResultPageInfo) Get() *SchoolSearchResultPageInfo {
	return v.value
}

func (v *NullableSchoolSearchResultPageInfo) Set(val *SchoolSearchResultPageInfo) {
	v.value = val
	v.isSet = true
}

func (v NullableSchoolSearchResultPageInfo) IsSet() bool {
	return v.isSet
}

func (v *NullableSchoolSearchResultPageInfo) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableSchoolSearchResultPageInfo(val *SchoolSearchResultPageInfo) *NullableSchoolSearchResultPageInfo {
	return &NullableSchoolSearchResultPageInfo{value: val, isSet: true}
}

func (v NullableSchoolSearchResultPageInfo) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableSchoolSearchResultPageInfo) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


