export interface IToken{
    userData:{
        idUser: string;
        nickname: string;
        tier: string;
        exBucks: number;
    };
    jwt: string;

}