import { Schema, IDocument, IModel, Model, Document } from 'mongoose';

import { DBConnection } from '../db.connection';
import { Validators } from './custom.validators';
import { AccountSchema } from './account.model';


export interface IExchangeDocument extends IDocument {


}

export interface IExchangeModel extends IModel<IExchangeDocument> {

}

let schema = new Schema({

    buyer: AccountSchema,
    seller: AccountSchema,
    value: Number,
    location: { type: String, coordinates: [] },
}, { typeKey: '$type' });



export const AssetModel = <IExchangeModel> DBConnection.createConnection('ExchangeModel').model<IExchangeDocument>('assets', schema);
