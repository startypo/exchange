import mongoose from 'mongoose';
import { Config } from './config';
import { IUserDocument, UserModel } from './models/user.model';

export class DBConnection {

    public static connect(): mongoose.Connection {

       mongoose.connect(Config.db.connString, (err) => {

            if (err) {
                console.log(err);
                return;
            }

            console.log('MongoDB: connected at: %s', Config.db.connString);
            this.seedDb();
       });

       return mongoose.connection;
    }

    private static seedDb() {

        UserModel.findOneAndUpdate({ email: Config.adminUser.email }, Config.adminUser, { upsert: true },
                                    (err) => {

                                        if (err) {
                                            console.log(err);
                                            return;
                                        }

                                        console.log('MongoDB: Data base seeded.')
                                    });
    }
}


