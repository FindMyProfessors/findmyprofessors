# ReviewNotFoundError

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Message** | [**PickSchoolErrorMessageOrTypeMessage**](PickSchoolErrorMessageOrTypeMessage.md) |  | 
**Type** | [**ReviewErrorTypeREVIEWNOTFOUND**](ReviewErrorTypeREVIEWNOTFOUND.md) |  | 

## Methods

### NewReviewNotFoundError

`func NewReviewNotFoundError(message PickSchoolErrorMessageOrTypeMessage, type_ ReviewErrorTypeREVIEWNOTFOUND, ) *ReviewNotFoundError`

NewReviewNotFoundError instantiates a new ReviewNotFoundError object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewReviewNotFoundErrorWithDefaults

`func NewReviewNotFoundErrorWithDefaults() *ReviewNotFoundError`

NewReviewNotFoundErrorWithDefaults instantiates a new ReviewNotFoundError object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMessage

`func (o *ReviewNotFoundError) GetMessage() PickSchoolErrorMessageOrTypeMessage`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *ReviewNotFoundError) GetMessageOk() (*PickSchoolErrorMessageOrTypeMessage, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *ReviewNotFoundError) SetMessage(v PickSchoolErrorMessageOrTypeMessage)`

SetMessage sets Message field to given value.


### GetType

`func (o *ReviewNotFoundError) GetType() ReviewErrorTypeREVIEWNOTFOUND`

GetType returns the Type field if non-nil, zero value otherwise.

### GetTypeOk

`func (o *ReviewNotFoundError) GetTypeOk() (*ReviewErrorTypeREVIEWNOTFOUND, bool)`

GetTypeOk returns a tuple with the Type field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetType

`func (o *ReviewNotFoundError) SetType(v ReviewErrorTypeREVIEWNOTFOUND)`

SetType sets Type field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


