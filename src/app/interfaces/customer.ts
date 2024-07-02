export interface CreateCustomerRequest {

}

export interface UpdateCustomerRequest extends CreateCustomerRequest {

}

export interface CustomerResponse {
    customerNumber: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    email: string
}