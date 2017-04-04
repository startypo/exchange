declare module 'mongoose' {
    
    // methods
    export interface IDocument extends Document {
        
    }

    // statics
    export interface IModel<T extends IDocument> extends Model<T> {
        
    }

    export interface ISchema extends Schema {
       
    }

    export function model<T extends IDocument>(
        name: string,
        schema?: ISchema,
        collection?: string,
        skipInit?: boolean
    ): IModel<T>;
}