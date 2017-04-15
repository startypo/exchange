import { Schema, IDocument, IModel, Model, Document } from 'mongoose';

import { DBConnection } from '../db.connection';
import { UserSchema, IUserDocument } from './user.model';
import { IUser } from '../../domain.interfaces';
import { Base } from './base';

export interface IAssetDocument extends IDocument {

    name: string;
    description: string;
    price: number;
    owner: IUserDocument;
}

export interface IAssetModel extends IModel<IAssetDocument> {

}

let schema = new Schema(Object.assign(Base.getSchema(), {

    name: String,
    description: String,
    price: Number,
    owner: UserSchema,
}),
{
    timestamps : {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

export const AssetModel = <IAssetModel> DBConnection.createConnection('AssetModel').model<IAssetDocument>('assets', schema);
