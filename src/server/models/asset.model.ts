import { Schema, IDocument, IModel, Model, Document } from 'mongoose';

import { DBConnection } from '../db.connection';
import { Validators } from './custom.validators';
import { UserSchema } from './user.model';
import { IUser } from '../../domain.interfaces';


export interface IAssetDocument extends IDocument {

    id: string;
    name: string;
    description: string;
    price: number;
    owner: IUser;
}

export interface IAssetModel extends IModel<IAssetDocument> {

}

let schema = new Schema({

    name: String,
    description: String,
    price: Number,
    owner: UserSchema,

    deletedAt: Date

}, { timestamps : { createdAt: 'createdAt', updatedAt: 'updatedAt', deletedAt: 'deletedAt' }});

export const AssetModel = <IAssetModel> DBConnection.createConnection('AssetModel').model<IAssetDocument>('assets', schema);
