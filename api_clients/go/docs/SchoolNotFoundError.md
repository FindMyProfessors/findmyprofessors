# SchoolNotFoundError

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Message** | [**PickSchoolErrorMessageOrTypeMessage**](PickSchoolErrorMessageOrTypeMessage.md) |  | 
**Type** | [**SchoolErrorTypeSCHOOLNOTFOUND**](SchoolErrorTypeSCHOOLNOTFOUND.md) |  | 

## Methods

### NewSchoolNotFoundError

`func NewSchoolNotFoundError(message PickSchoolErrorMessageOrTypeMessage, type_ SchoolErrorTypeSCHOOLNOTFOUND, ) *SchoolNotFoundError`

NewSchoolNotFoundError instantiates a new SchoolNotFoundError object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchoolNotFoundErrorWithDefaults

`func NewSchoolNotFoundErrorWithDefaults() *SchoolNotFoundError`

NewSchoolNotFoundErrorWithDefaults instantiates a new SchoolNotFoundError object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMessage

`func (o *SchoolNotFoundError) GetMessage() PickSchoolErrorMessageOrTypeMessage`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *SchoolNotFoundError) GetMessageOk() (*PickSchoolErrorMessageOrTypeMessage, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *SchoolNotFoundError) SetMessage(v PickSchoolErrorMessageOrTypeMessage)`

SetMessage sets Message field to given value.


### GetType

`func (o *SchoolNotFoundError) GetType() SchoolErrorTypeSCHOOLNOTFOUND`

GetType returns the Type field if non-nil, zero value otherwise.

### GetTypeOk

`func (o *SchoolNotFoundError) GetTypeOk() (*SchoolErrorTypeSCHOOLNOTFOUND, bool)`

GetTypeOk returns a tuple with the Type field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetType

`func (o *SchoolNotFoundError) SetType(v SchoolErrorTypeSCHOOLNOTFOUND)`

SetType sets Type field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


