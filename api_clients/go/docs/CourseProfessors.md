# CourseProfessors

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Total** | **int32** |  | 
**Professors** | [**[]DefaultSelectionPrisma36ProfessorPayload**](DefaultSelectionPrisma36ProfessorPayload.md) |  | 

## Methods

### NewCourseProfessors

`func NewCourseProfessors(total int32, professors []DefaultSelectionPrisma36ProfessorPayload, ) *CourseProfessors`

NewCourseProfessors instantiates a new CourseProfessors object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCourseProfessorsWithDefaults

`func NewCourseProfessorsWithDefaults() *CourseProfessors`

NewCourseProfessorsWithDefaults instantiates a new CourseProfessors object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetTotal

`func (o *CourseProfessors) GetTotal() int32`

GetTotal returns the Total field if non-nil, zero value otherwise.

### GetTotalOk

`func (o *CourseProfessors) GetTotalOk() (*int32, bool)`

GetTotalOk returns a tuple with the Total field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTotal

`func (o *CourseProfessors) SetTotal(v int32)`

SetTotal sets Total field to given value.


### GetProfessors

`func (o *CourseProfessors) GetProfessors() []DefaultSelectionPrisma36ProfessorPayload`

GetProfessors returns the Professors field if non-nil, zero value otherwise.

### GetProfessorsOk

`func (o *CourseProfessors) GetProfessorsOk() (*[]DefaultSelectionPrisma36ProfessorPayload, bool)`

GetProfessorsOk returns a tuple with the Professors field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProfessors

`func (o *CourseProfessors) SetProfessors(v []DefaultSelectionPrisma36ProfessorPayload)`

SetProfessors sets Professors field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


