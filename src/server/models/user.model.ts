import { Schema, Document, Mongoose, Model } from 'mongoose';
import Jwt from 'jsonwebtoken';
import * as Crypto from 'crypto';

import { IUser } from '../../domain.interfaces';
import { Config } from '../config';

export interface IUserModel extends IUser, Document  {
    verifyPassword(passwd: string): boolean;
    createToken(): string;
}

let schema = new Schema({

    name: String,
    email: String,
    passwd: String,
    profile: String
});

schema.methods.verifyPassword = (passwd: string) => {

    const sha256 = Crypto.createHash('sha256');
    let model: IUser = this;
    sha256.update(passwd + model.salt);
    let hash = sha256.digest('base64');

    return model.passwd === hash;
};

schema.methods.createToken = () => {

    let model: IUser = this;
    let payload = {
        iss: Config.security.issuer,
        aud: Config.security.audience,
        iat: Math.floor(Date.now() / 1000) - 30,
        sub: model.profile
    };

    return Jwt.sign(payload, Config.security.secret);
};


export let UserModel = new Mongoose().model<IUserModel>('User', schema);
