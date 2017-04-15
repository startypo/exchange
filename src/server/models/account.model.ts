import { Schema, IDocument, IModel, Model, Document } from 'mongoose';

import { DBConnection } from '../db.connection';
import { UserSchema } from './user.model';


export interface IAccounttDocument extends IDocument {

    credit(value: Number): void;
    debit(value: Number): void;
    getBalance(): number;
}

export interface IAccountModel extends IModel<IAccounttDocument> {

}

function getBalance(balance): number {
    return balance;
};

let schema = new Schema({

    balance: {
        type: Number,
        get: b => getBalance(b)
    },
    owners: UserSchema,
});

export const AccountModel = <IAccountModel> DBConnection.createConnection('AccountModel').model<IAccounttDocument>('accounts', schema);
export const AccountSchema = schema;
