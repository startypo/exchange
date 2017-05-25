import { Schema, IDocument, IModel, Model, Document } from 'mongoose';
import paginate  from 'mongoose-paginate';

import { DBConnection } from '../db.connection';
import { UserSchema, IUserDocument } from './user.model';
import { IUser } from '../../domain.interfaces';
import { BaseModel } from './base.model';

export interface IAssetDocument extends IDocument {

    name: string;
    description: string;
    price: number;
    imgs: string[];
    owner: IUserDocument | string;
}

export interface IAssetModel extends IModel<IAssetDocument> {

    paginate(query: any, options?: any, callback?: (err: any, result: any) => void): Promise<IAssetModel> | void;
}

let schema = BaseModel.createSchema({

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
    imgs: [String]
});

schema.plugin(paginate);

export const AssetModel = <IAssetModel> DBConnection.createConnection('AssetModel').model<IAssetDocument>('assets', schema);
