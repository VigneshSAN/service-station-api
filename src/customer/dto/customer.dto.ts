export class CreateCustomerDTO {
    readonly name: string;
    readonly email: string;
    readonly mobile: string;
    readonly organization: string;
    readonly is_collapsed: boolean;
    readonly createdBy: string;
    readonly createdAt: Date;
}