import { Schema, IDocument, IModel, Model, Document } from 'mongoose';

import { DBConnection } from '../db.connection';
import { IUserDocument } from './user.model';
import { BaseModel } from './base.model';
import { XChangesError, ErrorType } from '../xchanges.error';

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

schema.methods.credit = function(time: number): void {

    let minutes: number = time / 60;
    let value: number = minutes * 0.25;
    this.amount += +value.toFixed(2);
};

schema.methods.debit = function(value: number): void {

    if (value < 0 || value > this.amount)
        throw new XChangesError(ErrorType.debit);

    this.amount -= value;
};

export const HandModel = <IHandModel> DBConnection.getConnection().model<IHandDocument>('hands', schema);
