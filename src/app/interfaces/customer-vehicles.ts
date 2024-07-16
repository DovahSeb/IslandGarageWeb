export interface CreateVehicleRequest {
    make: string,
    model: string,
    year: string,
    chassisNo: string,
    customerId: number,
    vehicleImageId?: number,
}

export interface UpdateVehicleRequest extends CreateVehicleRequest {
    id: number,
}

export interface VehicleResponse {
    id: number,
    make: string,
    model: string,
    year: string,
    chassisNo: string,
    customerId: number,
    vehicleImage?: string,
}