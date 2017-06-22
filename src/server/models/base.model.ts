import { Schema } from 'mongoose';

export class BaseModel {

    public static createSchema(childSchema: any): Schema {

        let schema = new Schema(Object.assign(childSchema, {

            deletedAt: Date
        }),
        {
            timestamps : {
                createdAt: 'createdAt',
                updatedAt: 'updatedAt'
            }
        });

        // Ensure virtual fields are serialised.
        schema.set('toJSON', {
            transform: (doc, ret, options) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        });

        return schema;
    }
};
