import mongoose from 'mongoose';
import { Config } from './config';
import { IUserDocument, UserModel } from './models/user.model';

export class DBConnection {

    public static createConnection(model: string): mongoose.Connection {

        const conn = mongoose.createConnection(Config.db.connString, (err) => {

            if (err) {
                console.log(err);
                return;
            }

            console.log('Mongoose: ' + model + ' connected at: %s', Config.db.connString);
        });

        return conn;
    }
}
