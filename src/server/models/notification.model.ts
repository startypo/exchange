import { Schema, IDocument, IModel, Model, Document } from 'mongoose';

import { DBConnection } from '../db.connection';
import { IUserDocument } from './user.model';
import { BaseModel } from './base.model';

export interface INotificationDocument extends IDocument {

    id: string;
    title: string;
    msg: string;
    resourceRoute: string;
    resourceId: string;
    readed: boolean;
    owner: IUserDocument;
}

const schema = BaseModel.createSchema({

    msg: {
        type: String,
        required: true
    },
    resourceId: {
        type: String
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

export const NotificationModel = DBConnection.getConnection().model<INotificationDocument>('notifications', schema);
