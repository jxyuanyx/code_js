
export enum LoginType{
    ACCOUNT,
    FACEBOOK,
    GOOGLE,
    GUEST,
    TOKEN
}

//帐号类型与后台对应
export enum AccountType{
    GUEST=10,
    PHONE=20,
    FACEBOOK=30,
    GOOGLE=40
}

export class AccountData{
    Type:LoginType;
}

/**
 * 自定义的注册登陆数据
 */
export class CustomAccountData extends AccountData{
    Name:string;
    Token:string;
}

/**
 * facebook帐号数据
 */
export class FaceBookAccountData extends AccountData{
    openid:string;
    token:string;
}

/**
 * google帐号数据
 */
export class GoogleAccountData extends AccountData{
    token:string;
}

/**
 * token登录
 */

export class TokenAccountData extends AccountData{
    token:string;
}

/**
 * google帐号数据
 */
export class GuestAccountData extends AccountData{
}