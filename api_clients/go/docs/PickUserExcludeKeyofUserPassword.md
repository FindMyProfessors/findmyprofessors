# PickUserExcludeKeyofUserPassword

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **int32** |  | 
**Email** | **string** |  | 
**Username** | **string** |  | 
**SignupTime** | **time.Time** |  | 
**LastLoginTime** | **time.Time** |  | 
**AccountVerified** | **bool** |  | 
**Role** | [**Model36EnumsUserRole**](36EnumsUserRole.md) |  | 

## Methods

### NewPickUserExcludeKeyofUserPassword

`func NewPickUserExcludeKeyofUserPassword(id int32, email string, username string, signupTime time.Time, lastLoginTime time.Time, accountVerified bool, role Model36EnumsUserRole, ) *PickUserExcludeKeyofUserPassword`

NewPickUserExcludeKeyofUserPassword instantiates a new PickUserExcludeKeyofUserPassword object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewPickUserExcludeKeyofUserPasswordWithDefaults

`func NewPickUserExcludeKeyofUserPasswordWithDefaults() *PickUserExcludeKeyofUserPassword`

NewPickUserExcludeKeyofUserPasswordWithDefaults instantiates a new PickUserExcludeKeyofUserPassword object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *PickUserExcludeKeyofUserPassword) GetId() int32`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *PickUserExcludeKeyofUserPassword) GetIdOk() (*int32, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *PickUserExcludeKeyofUserPassword) SetId(v int32)`

SetId sets Id field to given value.


### GetEmail

`func (o *PickUserExcludeKeyofUserPassword) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *PickUserExcludeKeyofUserPassword) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *PickUserExcludeKeyofUserPassword) SetEmail(v string)`

SetEmail sets Email field to given value.


### GetUsername

`func (o *PickUserExcludeKeyofUserPassword) GetUsername() string`

GetUsername returns the Username field if non-nil, zero value otherwise.

### GetUsernameOk

`func (o *PickUserExcludeKeyofUserPassword) GetUsernameOk() (*string, bool)`

GetUsernameOk returns a tuple with the Username field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsername

`func (o *PickUserExcludeKeyofUserPassword) SetUsername(v string)`

SetUsername sets Username field to given value.


### GetSignupTime

`func (o *PickUserExcludeKeyofUserPassword) GetSignupTime() time.Time`

GetSignupTime returns the SignupTime field if non-nil, zero value otherwise.

### GetSignupTimeOk

`func (o *PickUserExcludeKeyofUserPassword) GetSignupTimeOk() (*time.Time, bool)`

GetSignupTimeOk returns a tuple with the SignupTime field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSignupTime

`func (o *PickUserExcludeKeyofUserPassword) SetSignupTime(v time.Time)`

SetSignupTime sets SignupTime field to given value.


### GetLastLoginTime

`func (o *PickUserExcludeKeyofUserPassword) GetLastLoginTime() time.Time`

GetLastLoginTime returns the LastLoginTime field if non-nil, zero value otherwise.

### GetLastLoginTimeOk

`func (o *PickUserExcludeKeyofUserPassword) GetLastLoginTimeOk() (*time.Time, bool)`

GetLastLoginTimeOk returns a tuple with the LastLoginTime field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLastLoginTime

`func (o *PickUserExcludeKeyofUserPassword) SetLastLoginTime(v time.Time)`

SetLastLoginTime sets LastLoginTime field to given value.


### GetAccountVerified

`func (o *PickUserExcludeKeyofUserPassword) GetAccountVerified() bool`

GetAccountVerified returns the AccountVerified field if non-nil, zero value otherwise.

### GetAccountVerifiedOk

`func (o *PickUserExcludeKeyofUserPassword) GetAccountVerifiedOk() (*bool, bool)`

GetAccountVerifiedOk returns a tuple with the AccountVerified field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAccountVerified

`func (o *PickUserExcludeKeyofUserPassword) SetAccountVerified(v bool)`

SetAccountVerified sets AccountVerified field to given value.


### GetRole

`func (o *PickUserExcludeKeyofUserPassword) GetRole() Model36EnumsUserRole`

GetRole returns the Role field if non-nil, zero value otherwise.

### GetRoleOk

`func (o *PickUserExcludeKeyofUserPassword) GetRoleOk() (*Model36EnumsUserRole, bool)`

GetRoleOk returns a tuple with the Role field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRole

`func (o *PickUserExcludeKeyofUserPassword) SetRole(v Model36EnumsUserRole)`

SetRole sets Role field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


