import { Schema, IDocument, IModel, Model, Document } from 'mongoose';

import { DBConnection } from '../db.connection';
import { IUserDocument } from './user.model';
import { BaseModel } from './base.model';


export interface IHandDocument extends IDocument {

    amount: number;
    owner: IUserDocument | string;
    credit(value: number): void;
    debit(value: number): void;
}

export interface IHandModel extends IModel<IDocument> {

}

let schema = BaseModel.createSchema({

    amount: {
        type: Number,
        min: 0.0,
        default: 0.0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

export const HandModel = <IHandModel> DBConnection.getConnection().model<IHandDocument>('hands', schema);

