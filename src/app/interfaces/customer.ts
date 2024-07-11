export interface CreateCustomerRequest {
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    email: string
}

export interface UpdateCustomerRequest extends CreateCustomerRequest {
    id: number,
}

export interface CustomerResponse {
    id: number,
    customerNumber: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    email: string
}