export class Login {
    emailAddress: string;
    password: string;
    rememberMe: boolean;
    grantType: string;
}

export class ForgotPasswordModel {
    public Email: string;
}

export class ResetPasswordModel {
    public password: string;
    public confirmPassword: string;    
}

export class ResetPasswordRequestModel {
    public Password: string;
    public UniqueKey: string;
}

export class ResetTokenRequestModel {
    public Email: string;
    public UniqueKey: string;
}