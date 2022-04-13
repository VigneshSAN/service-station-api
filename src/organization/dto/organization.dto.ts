export class CreateOrganizationDTO {
    readonly name: string;
    readonly email: string;
    readonly email_verified: boolean;
    readonly mobile: string;
    readonly mobile_verified: boolean;
    readonly createdAt: Date;
}