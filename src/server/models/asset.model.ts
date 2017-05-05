import { Schema, IDocument, IModel, Model, Document } from 'mongoose';

import { DBConnection } from '../db.connection';
import { UserSchema, IUserDocument } from './user.model';
import { IUser } from '../../domain.interfaces';
import { BaseModel } from './base.model';

export interface IAssetDocument extends IDocument {

    name: string;
    description: string;
    price: number;
    owner: IUserDocument | string;
}

export interface IAssetModel extends IModel<IAssetDocument> {

}

let schema = new Schema(Object.assign(BaseModel.getSchema(), {

    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: String,
        ref: 'users',
        required: true
    },
}),
{
    timestamps : {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

export const AssetModel = <IAssetModel> DBConnection.createConnection('AssetModel').model<IAssetDocument>('assets', schema);
