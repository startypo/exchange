export interface IUser {

    name: string;
    email: string;
    passwd: string;
    profile: string;
}

export interface IAsset {

    name: string;
    description: string;
    price: number;
    owner: IUser;
}
