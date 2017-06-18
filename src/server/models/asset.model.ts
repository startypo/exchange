import { Schema, IDocument, IModel, Model, Document, Types } from 'mongoose';
import paginate from 'mongoose-paginate';

import { DBConnection } from '../db.connection';
import { BaseModel } from './base.model';
import { IUserDocument } from './user.model';
import { IExchangeDocument } from './exchange.model';

export interface IAssetDocument extends IDocument {

    name: string;
    description: string;
    price: number;
    imgs: string[];
    owner: IUserDocument;
    exchange: IExchangeDocument;
}

export interface IAssetModel extends IModel<IAssetDocument> {}

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
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    exchange: {
        type: Schema.Types.ObjectId,
        ref: 'exchanges',
        default: null
    },
    imgs: [String]
});

schema.plugin(paginate);

export const AssetModel = <IAssetModel> DBConnection.getConnection().model<IAssetDocument>('assets', schema);
