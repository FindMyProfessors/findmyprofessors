/*
api

No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)

API version: 1.0.0
*/

// Code generated by OpenAPI Generator (https://openapi-generator.tech); DO NOT EDIT.

package openapi

import (
	"bytes"
	"encoding/json"
	"fmt"
)

// checks if the ReviewsSearchResult type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &ReviewsSearchResult{}

// ReviewsSearchResult struct for ReviewsSearchResult
type ReviewsSearchResult struct {
	PageInfo SchoolSearchResultPageInfo      `json:"pageInfo"`
	Edges    []ReviewsSearchResultEdgesInner `json:"edges"`
}

type _ReviewsSearchResult ReviewsSearchResult

// NewReviewsSearchResult instantiates a new ReviewsSearchResult object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewReviewsSearchResult(pageInfo SchoolSearchResultPageInfo, edges []ReviewsSearchResultEdgesInner) *ReviewsSearchResult {
	this := ReviewsSearchResult{}
	this.PageInfo = pageInfo
	this.Edges = edges
	return &this
}

// NewReviewsSearchResultWithDefaults instantiates a new ReviewsSearchResult object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewReviewsSearchResultWithDefaults() *ReviewsSearchResult {
	this := ReviewsSearchResult{}
	return &this
}

// GetPageInfo returns the PageInfo field value
func (o *ReviewsSearchResult) GetPageInfo() SchoolSearchResultPageInfo {
	if o == nil {
		var ret SchoolSearchResultPageInfo
		return ret
	}

	return o.PageInfo
}

// GetPageInfoOk returns a tuple with the PageInfo field value
// and a boolean to check if the value has been set.
func (o *ReviewsSearchResult) GetPageInfoOk() (*SchoolSearchResultPageInfo, bool) {
	if o == nil {
		return nil, false
	}
	return &o.PageInfo, true
}

// SetPageInfo sets field value
func (o *ReviewsSearchResult) SetPageInfo(v SchoolSearchResultPageInfo) {
	o.PageInfo = v
}

// GetEdges returns the Edges field value
func (o *ReviewsSearchResult) GetEdges() []ReviewsSearchResultEdgesInner {
	if o == nil {
		var ret []ReviewsSearchResultEdgesInner
		return ret
	}

	return o.Edges
}

// GetEdgesOk returns a tuple with the Edges field value
// and a boolean to check if the value has been set.
func (o *ReviewsSearchResult) GetEdgesOk() ([]ReviewsSearchResultEdgesInner, bool) {
	if o == nil {
		return nil, false
	}
	return o.Edges, true
}

// SetEdges sets field value
func (o *ReviewsSearchResult) SetEdges(v []ReviewsSearchResultEdgesInner) {
	o.Edges = v
}

func (o ReviewsSearchResult) MarshalJSON() ([]byte, error) {
	toSerialize, err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o ReviewsSearchResult) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["pageInfo"] = o.PageInfo
	toSerialize["edges"] = o.Edges
	return toSerialize, nil
}

func (o *ReviewsSearchResult) UnmarshalJSON(data []byte) (err error) {
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
		return err
	}

	for _, requiredProperty := range requiredProperties {
		if _, exists := allProperties[requiredProperty]; !exists {
			return fmt.Errorf("no value given for required property %v", requiredProperty)
		}
	}

	varReviewsSearchResult := _ReviewsSearchResult{}

	decoder := json.NewDecoder(bytes.NewReader(data))
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&varReviewsSearchResult)

	if err != nil {
		return err
	}

	*o = ReviewsSearchResult(varReviewsSearchResult)

	return err
}

type NullableReviewsSearchResult struct {
	value *ReviewsSearchResult
	isSet bool
}

func (v NullableReviewsSearchResult) Get() *ReviewsSearchResult {
	return v.value
}

func (v *NullableReviewsSearchResult) Set(val *ReviewsSearchResult) {
	v.value = val
	v.isSet = true
}

func (v NullableReviewsSearchResult) IsSet() bool {
	return v.isSet
}

func (v *NullableReviewsSearchResult) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableReviewsSearchResult(val *ReviewsSearchResult) *NullableReviewsSearchResult {
	return &NullableReviewsSearchResult{value: val, isSet: true}
}

func (v NullableReviewsSearchResult) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableReviewsSearchResult) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}
