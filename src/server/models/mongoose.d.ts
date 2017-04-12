declare module 'mongoose' {
    
    // methods
    export interface IDocument extends Document {

        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }

    // statics
    export interface IModel<T extends IDocument> extends Model<T> {
        findOrCreate(conditions: any, document: any, options?: any, callback?: (err: any, found: any, created: boolean) => void): void;
    }

    export interface ISchema extends Schema {}
 
    export interface Connection {
        model<T extends IDocument>(name: string, schema?: ISchema, collection?: string, skipInit?: boolean): IModel<T>;
    }

    export function model<T extends IDocument>(
        name: string,
        schema?: ISchema,
        collection?: string,
        skipInit?: boolean
    ): IModel<T>;
}