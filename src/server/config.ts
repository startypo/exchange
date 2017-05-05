export class Config {

    public static security = {

        issuer: 'xchanges.services',
        audience: 'xchanges.azurewebsites.net',
        secret: '"56`Kp*&403sQd8o9~WwCBKZ/)fk#5',
    };

    public static db = {

        user: 'xchs_user',
        passwd: 'JT#H\a]&:D52YmjF',
        connString: process.env.NODE_ENV === 'production' ? 'mongodb://104.41.61.154:27017/xchs' : 'mongodb://172.17.0.2:27017/xchs'
    };

    public static adminUser = {

        name: 'Usenix',
        email: 'usenix@xchs.services',
        salt: 'b%[fScj#',
        hash: 'teste1234b%[fScj#',
        profile: 'admin'
    };
}
