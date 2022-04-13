export class CreateUserDTO {
    readonly first_name: string;
    readonly last_name: string;
    readonly user_type: string;
    readonly organization: string;
    readonly email: string;
    readonly email_verified: boolean;
    readonly mobile: string;
    readonly mobile_verified: boolean;
    readonly is_collapsed: boolean;
    readonly createdAt: Date;
}