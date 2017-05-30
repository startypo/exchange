import { Schema, IDocument, IModel, Model, Document } from 'mongoose';

import { DBConnection } from '../db.connection';
import { IUserDocument } from './user.model';
import { BaseModel } from './base.model';


export interface IExchangeDocument extends IDocument {


}

export interface IExchangeModel extends IModel<IExchangeDocument> {

}

let schema = BaseModel.createSchema({

    buyer: {
        type: String,
        ref: 'users',
        required: true
    },
    seller: {
        type: String,
        ref: 'users',
        required: true
    },
    value: Number
});

export const AssetModel = <IExchangeModel> DBConnection.getConnection().model<IExchangeDocument>('exchange', schema);
