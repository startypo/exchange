import { Schema, IDocument, IModel, Model, Document } from 'mongoose';

import { DBConnection } from '../db.connection';
import { BaseModel } from './base.model';
import { IUserDocument } from './user.model';
import { IAssetDocument } from './asset.model';


export class Status {

    public static initiated = new Status('I');
    public static sent = new Status('S');
    public static received = new Status('R');

    constructor(private value: string){}

    public toString() {
        return this.value;
    }
}

export interface IExchangeDocument extends IDocument {

    asset: IAssetDocument | string;
    receiver: IUserDocument | string;
    status: Status;
}

export interface IExchangeModel extends IModel<IExchangeDocument> {}

let schema = BaseModel.createSchema({

    asset: {
        type: Schema.Types.ObjectId,
        required: true
    },
    receiver: {
        type: String,
        ref: 'users',
        required: true
    },
    status: {
        type: String,
        required: true,
        default: Status.initiated
    }
});

export const ExchangeModel = <IExchangeModel> DBConnection.getConnection().model<IExchangeDocument>('exchanges', schema);
