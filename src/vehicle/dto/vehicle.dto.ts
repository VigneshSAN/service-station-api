export class CreateVehicleDTO {
    readonly vehicle_type: string;
    readonly vehicle_number: string;
    readonly vehicle_name: string;
    readonly organization: string;
    readonly customer: string;
    readonly is_collapsed: boolean;
    readonly createdAt: Date;
}