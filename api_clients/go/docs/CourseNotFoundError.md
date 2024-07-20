# CourseNotFoundError

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Message** | [**PickSchoolErrorMessageOrTypeMessage**](PickSchoolErrorMessageOrTypeMessage.md) |  | 
**Type** | [**CourseErrorTypeCOURSENOTFOUND**](CourseErrorTypeCOURSENOTFOUND.md) |  | 

## Methods

### NewCourseNotFoundError

`func NewCourseNotFoundError(message PickSchoolErrorMessageOrTypeMessage, type_ CourseErrorTypeCOURSENOTFOUND, ) *CourseNotFoundError`

NewCourseNotFoundError instantiates a new CourseNotFoundError object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCourseNotFoundErrorWithDefaults

`func NewCourseNotFoundErrorWithDefaults() *CourseNotFoundError`

NewCourseNotFoundErrorWithDefaults instantiates a new CourseNotFoundError object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMessage

`func (o *CourseNotFoundError) GetMessage() PickSchoolErrorMessageOrTypeMessage`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *CourseNotFoundError) GetMessageOk() (*PickSchoolErrorMessageOrTypeMessage, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *CourseNotFoundError) SetMessage(v PickSchoolErrorMessageOrTypeMessage)`

SetMessage sets Message field to given value.


### GetType

`func (o *CourseNotFoundError) GetType() CourseErrorTypeCOURSENOTFOUND`

GetType returns the Type field if non-nil, zero value otherwise.

### GetTypeOk

`func (o *CourseNotFoundError) GetTypeOk() (*CourseErrorTypeCOURSENOTFOUND, bool)`

GetTypeOk returns a tuple with the Type field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetType

`func (o *CourseNotFoundError) SetType(v CourseErrorTypeCOURSENOTFOUND)`

SetType sets Type field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


