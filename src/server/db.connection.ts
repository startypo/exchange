import { Mongoose } from 'mongoose';
import { Config } from './config';
import { UserModel } from './models/user.model';

export class DBConnection {

    public static connect() {

       new Mongoose().connect(Config.db.connString, {
            user: Config.db.user,
            pass: Config.db.passwd
        }, (err) => {
            if (!err)
                this.seedDb();
        });
    }

    private static seedDb() {

        let user = Config.adminUser;
        UserModel.findOneAndUpdate({ email: user.email }, user, { upsert: true });
    }
}
