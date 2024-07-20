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

// checks if the ProfessorSearchResult type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &ProfessorSearchResult{}

// ProfessorSearchResult struct for ProfessorSearchResult
type ProfessorSearchResult struct {
	PageInfo SchoolSearchResultPageInfo `json:"pageInfo"`
	Edges []ProfessorSearchResultEdgesInner `json:"edges"`
}

type _ProfessorSearchResult ProfessorSearchResult

// NewProfessorSearchResult instantiates a new ProfessorSearchResult object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewProfessorSearchResult(pageInfo SchoolSearchResultPageInfo, edges []ProfessorSearchResultEdgesInner) *ProfessorSearchResult {
	this := ProfessorSearchResult{}
	this.PageInfo = pageInfo
	this.Edges = edges
	return &this
}

// NewProfessorSearchResultWithDefaults instantiates a new ProfessorSearchResult object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewProfessorSearchResultWithDefaults() *ProfessorSearchResult {
	this := ProfessorSearchResult{}
	return &this
}

// GetPageInfo returns the PageInfo field value
func (o *ProfessorSearchResult) GetPageInfo() SchoolSearchResultPageInfo {
	if o == nil {
		var ret SchoolSearchResultPageInfo
		return ret
	}

	return o.PageInfo
}

// GetPageInfoOk returns a tuple with the PageInfo field value
// and a boolean to check if the value has been set.
func (o *ProfessorSearchResult) GetPageInfoOk() (*SchoolSearchResultPageInfo, bool) {
	if o == nil {
		return nil, false
	}
	return &o.PageInfo, true
}

// SetPageInfo sets field value
func (o *ProfessorSearchResult) SetPageInfo(v SchoolSearchResultPageInfo) {
	o.PageInfo = v
}

// GetEdges returns the Edges field value
func (o *ProfessorSearchResult) GetEdges() []ProfessorSearchResultEdgesInner {
	if o == nil {
		var ret []ProfessorSearchResultEdgesInner
		return ret
	}

	return o.Edges
}

// GetEdgesOk returns a tuple with the Edges field value
// and a boolean to check if the value has been set.
func (o *ProfessorSearchResult) GetEdgesOk() ([]ProfessorSearchResultEdgesInner, bool) {
	if o == nil {
		return nil, false
	}
	return o.Edges, true
}

// SetEdges sets field value
func (o *ProfessorSearchResult) SetEdges(v []ProfessorSearchResultEdgesInner) {
	o.Edges = v
}

func (o ProfessorSearchResult) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o ProfessorSearchResult) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["pageInfo"] = o.PageInfo
	toSerialize["edges"] = o.Edges
	return toSerialize, nil
}

func (o *ProfessorSearchResult) UnmarshalJSON(data []byte) (err error) {
	// This validates that all required properties are included in the JSON object
	// by unmarshalling the object into a generic map with string keys and checking
	// that every required field exists as a key in the generic map.
	requiredProperties := []string{
		"pageInfo",
		"edges",
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

	varProfessorSearchResult := _ProfessorSearchResult{}

	decoder := json.NewDecoder(bytes.NewReader(data))
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&varProfessorSearchResult)

	if err != nil {
		return err
	}

	*o = ProfessorSearchResult(varProfessorSearchResult)

	return err
}

type NullableProfessorSearchResult struct {
	value *ProfessorSearchResult
	isSet bool
}

func (v NullableProfessorSearchResult) Get() *ProfessorSearchResult {
	return v.value
}

func (v *NullableProfessorSearchResult) Set(val *ProfessorSearchResult) {
	v.value = val
	v.isSet = true
}

func (v NullableProfessorSearchResult) IsSet() bool {
	return v.isSet
}

func (v *NullableProfessorSearchResult) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableProfessorSearchResult(val *ProfessorSearchResult) *NullableProfessorSearchResult {
	return &NullableProfessorSearchResult{value: val, isSet: true}
}

func (v NullableProfessorSearchResult) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableProfessorSearchResult) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


