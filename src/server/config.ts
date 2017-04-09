export class Config {

    public static security = {

        issuer: 'xchanges.services',
        audience: 'xchanges.azurewebsites.net',
        secret: '"56`Kp*&403sQd8o9~WwCBKZ/)fk#5',
    };

    public static db = {

        host: 'xchs_db_server',
        name: 'xchs_db',
        user: 'xchs_db_user',
        passwd: 'JT#H\a]&:D52YmjF',
        connString: 'mongodb://172.17.0.2:27017/xchs'
    };

    public static adminUser = {

        name: 'Usenix',
        email: 'usenix@xchs.services',
        hash: 'teste1234b%[fScj#',
        salt: 'b%[fScj#',
        profile: 'admin'
    };
}
