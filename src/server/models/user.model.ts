import Mongoose from 'mongoose';
import { Schema, IDocument, IModel, Model, Document } from 'mongoose';
import Jwt from 'jsonwebtoken';
import * as Crypto from 'crypto';

import { IUser } from '../../domain.interfaces';
import { Config } from '../config';
import { DBConnection } from '../db.connection';
import { Validators } from './custom.validators';


export interface IUserDocument extends IDocument {

    name: string;
    email: string;
    passwdDigest: string;
    salt: string;
    profile: string;

    secureUser(passwd: string): void;
    verifyPassword(passwd: string): boolean;
    createToken(): string;
}

export interface IUserModel extends IModel<IUserDocument> {

    isRegistred (email: string, callback: (err, registred: boolean) => void): void;
    register (newUser: IUser, callback: (err, user: IUserDocument) => void): void;
}

let schema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        index: {
            unique: true
        },
        required: true,
        lowercase: true,
        trim: true,
        validate: [Validators.email, 'Not a valid email']
    },
    passwdDigest: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    }
});

schema.methods.verifyPassword = function(passwd: string): boolean {

    // const sha256 = Crypto.createHash('sha256');
    // sha256.update(passwd + user.salt);
    // let hash = sha256.digest('base64');

    // return user.hash === hash;

    let doc: IUserDocument = this;
    return doc.passwdDigest === passwd + doc.salt;
};

schema.statics.isRegistred = function(_email: string, callback): void  {

    let model: IUserModel = this;
    model.findOne({ email: _email }, (err, user) => {

        if (err)
            return callback(err, null);

        callback(err, user != null);
    });
};

schema.statics.register = function(newUser: IUser, callback): void {

    let model: IUserModel = this;

    model.findOne({ email: newUser.email })
             .exec()
             .then((user) => {

                if (user)
                    return Promise.reject(new Error('user already exist'));
                if (Validators.notBlank(newUser.passwd))
                    return Promise.reject(new Error('password should not be blank'));

                user = new model(newUser);
                user.secureUser(newUser.passwd);
                return user.save();

             }).catch((err) => {
                 callback(err, null);
             }).then((user) => {
                callback(null, user);
             });
};

schema.methods.createToken = function(): string {

    let doc: IUserDocument = this;
    let payload = {
        iss: Config.security.issuer,
        aud: Config.security.audience,
        iat: Math.floor(Date.now() / 1000) - 30,
        sub: doc.profile
    };

    return Jwt.sign(payload, Config.security.secret);
};

schema.methods.secureUser = function(passwd: string): void {

        let doc: IUserDocument = this;

        doc.salt = '&gh7*-vA=7';
        doc.passwdDigest = passwd + doc.salt;
        doc.profile = 'user';
};

export const UserModel = <IUserModel> DBConnection.connect().model<IUserDocument>('User', schema);
