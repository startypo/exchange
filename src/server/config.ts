import * as path from 'path';

export class Config {

    public static security = {

        issuer: 'xchanges.services',
        audience: 'xchanges.azurewebsites.net',
        secret: '"56`Kp*&403sQd8o9~WwCBKZ/)fk#5',
    };

    public static db = {

        user: 'xchs_user',
        passwd: 'JT#H\a]&:D52YmjF',
        connString: process.env.CUSTOMCONNSTR_DB_CONN === true ? process.env.CUSTOMCONNSTR_DB_CONN : 'mongodb://172.17.0.2:27017/xchs'
    };

    public static redis = {
        url: process.env.NODE_ENV === 'production' ? 'redis://104.41.45.249:6379' : 'redis://172.17.0.3:6379'
    };

    public static adminUser = {

        name: 'Usenix',
        email: 'usenix@xchs.services',
        salt: 'b%[fScj#',
        hash: 'teste1234b%[fScj#',
        profile: 'admin'
    };

    public static uploadPath = path.join(process.env.NODE_ENV === 'production' ?
                               path.resolve() :
                               path.dirname(process.mainModule.filename), 'uploads');
}
