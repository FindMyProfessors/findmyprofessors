# InvalidPasswordError

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Message** | [**PickSchoolErrorMessageOrTypeMessage**](PickSchoolErrorMessageOrTypeMessage.md) |  | 
**Type** | [**AuthErrorTypeINVALIDPASSWORD**](AuthErrorTypeINVALIDPASSWORD.md) |  | 

## Methods

### NewInvalidPasswordError

`func NewInvalidPasswordError(message PickSchoolErrorMessageOrTypeMessage, type_ AuthErrorTypeINVALIDPASSWORD, ) *InvalidPasswordError`

NewInvalidPasswordError instantiates a new InvalidPasswordError object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewInvalidPasswordErrorWithDefaults

`func NewInvalidPasswordErrorWithDefaults() *InvalidPasswordError`

NewInvalidPasswordErrorWithDefaults instantiates a new InvalidPasswordError object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMessage

`func (o *InvalidPasswordError) GetMessage() PickSchoolErrorMessageOrTypeMessage`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *InvalidPasswordError) GetMessageOk() (*PickSchoolErrorMessageOrTypeMessage, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *InvalidPasswordError) SetMessage(v PickSchoolErrorMessageOrTypeMessage)`

SetMessage sets Message field to given value.


### GetType

`func (o *InvalidPasswordError) GetType() AuthErrorTypeINVALIDPASSWORD`

GetType returns the Type field if non-nil, zero value otherwise.

### GetTypeOk

`func (o *InvalidPasswordError) GetTypeOk() (*AuthErrorTypeINVALIDPASSWORD, bool)`

GetTypeOk returns a tuple with the Type field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetType

`func (o *InvalidPasswordError) SetType(v AuthErrorTypeINVALIDPASSWORD)`

SetType sets Type field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


