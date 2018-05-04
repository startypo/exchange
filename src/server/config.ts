import * as path from 'path';

export class Config {

    public static security = {

        issuer: 'xchanges.services',
        audience: 'xchanges.azurewebsites.net',
        secret: '"56`Kp*&403sQd8o9~WwCBKZ/)fk#5',
    };

    public static db = {
        uri: 'mongodb://ds014648.mlab.com:14648/exchange',
        user: 'exchange',
        pass: 'gads2014N'
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

    public static execPath = process.env.NODE_ENV === 'local' ?
                             path.dirname(process.mainModule.filename) :
                             path.resolve();

    public static uploadPath = path.join(Config.execPath, 'uploads');
}
