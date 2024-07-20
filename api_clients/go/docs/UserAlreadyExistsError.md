# UserAlreadyExistsError

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Message** | [**PickSchoolErrorMessageOrTypeMessage**](PickSchoolErrorMessageOrTypeMessage.md) |  | 
**Type** | [**AuthErrorTypeUSERALREADYEXISTS**](AuthErrorTypeUSERALREADYEXISTS.md) |  | 

## Methods

### NewUserAlreadyExistsError

`func NewUserAlreadyExistsError(message PickSchoolErrorMessageOrTypeMessage, type_ AuthErrorTypeUSERALREADYEXISTS, ) *UserAlreadyExistsError`

NewUserAlreadyExistsError instantiates a new UserAlreadyExistsError object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewUserAlreadyExistsErrorWithDefaults

`func NewUserAlreadyExistsErrorWithDefaults() *UserAlreadyExistsError`

NewUserAlreadyExistsErrorWithDefaults instantiates a new UserAlreadyExistsError object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMessage

`func (o *UserAlreadyExistsError) GetMessage() PickSchoolErrorMessageOrTypeMessage`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *UserAlreadyExistsError) GetMessageOk() (*PickSchoolErrorMessageOrTypeMessage, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *UserAlreadyExistsError) SetMessage(v PickSchoolErrorMessageOrTypeMessage)`

SetMessage sets Message field to given value.


### GetType

`func (o *UserAlreadyExistsError) GetType() AuthErrorTypeUSERALREADYEXISTS`

GetType returns the Type field if non-nil, zero value otherwise.

### GetTypeOk

`func (o *UserAlreadyExistsError) GetTypeOk() (*AuthErrorTypeUSERALREADYEXISTS, bool)`

GetTypeOk returns a tuple with the Type field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetType

`func (o *UserAlreadyExistsError) SetType(v AuthErrorTypeUSERALREADYEXISTS)`

SetType sets Type field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


