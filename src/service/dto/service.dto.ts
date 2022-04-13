export class CreateServiceDTO {
    readonly customer: string;
    readonly vehicle: string;
    readonly organization: string;
    readonly service_list: any;
    readonly bill_amount: string;
    readonly discount: string;
    readonly bill_total: string;
    readonly bill_status: string;
    readonly bill_mode: string;
    readonly is_collapsed: boolean;
    readonly createdAt: Date;
}