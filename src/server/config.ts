import { IUser } from '../domain.interfaces';

export class Config {

    public static security = {

        issuer: 'xchanges.services',
        audience: 'xchanges.azurewebsites.net',
        secret: '"56`Kp*&403sQd8o9~WwCBKZ/)fk#5',
        salt: 'Ei(#%kwpU)`Zws5'
    };

    public static db = {

        host: 'xchs_db_server',
        name: 'xchs_db',
        user: 'xchs_db_user',
        passwd: 'JT#H\a]&:D52YmjF',
        connString: 'mongodb://172.17.0.2/xchs_db'
    };

    public static adminUser: IUser = {

        name: 'Usenix',
        email: 'usenix@xchs.services',
        passwd: '',
        salt: 'b%[fScj#',
        profile: 'admin'
    };
}
