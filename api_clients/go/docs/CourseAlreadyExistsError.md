# CourseAlreadyExistsError

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Message** | [**PickSchoolErrorMessageOrTypeMessage**](PickSchoolErrorMessageOrTypeMessage.md) |  | 
**Type** | [**CourseErrorTypeCOURSEALREADYEXISTS**](CourseErrorTypeCOURSEALREADYEXISTS.md) |  | 

## Methods

### NewCourseAlreadyExistsError

`func NewCourseAlreadyExistsError(message PickSchoolErrorMessageOrTypeMessage, type_ CourseErrorTypeCOURSEALREADYEXISTS, ) *CourseAlreadyExistsError`

NewCourseAlreadyExistsError instantiates a new CourseAlreadyExistsError object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCourseAlreadyExistsErrorWithDefaults

`func NewCourseAlreadyExistsErrorWithDefaults() *CourseAlreadyExistsError`

NewCourseAlreadyExistsErrorWithDefaults instantiates a new CourseAlreadyExistsError object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMessage

`func (o *CourseAlreadyExistsError) GetMessage() PickSchoolErrorMessageOrTypeMessage`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *CourseAlreadyExistsError) GetMessageOk() (*PickSchoolErrorMessageOrTypeMessage, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *CourseAlreadyExistsError) SetMessage(v PickSchoolErrorMessageOrTypeMessage)`

SetMessage sets Message field to given value.


### GetType

`func (o *CourseAlreadyExistsError) GetType() CourseErrorTypeCOURSEALREADYEXISTS`

GetType returns the Type field if non-nil, zero value otherwise.

### GetTypeOk

`func (o *CourseAlreadyExistsError) GetTypeOk() (*CourseErrorTypeCOURSEALREADYEXISTS, bool)`

GetTypeOk returns a tuple with the Type field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetType

`func (o *CourseAlreadyExistsError) SetType(v CourseErrorTypeCOURSEALREADYEXISTS)`

SetType sets Type field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


