export class Config {

    public static security = {

        issuer: 'xchanges.services',
        audience: 'xchanges.azurewebsites.net',
        secret: '"56`Kp*&403sQd8o9~WwCBKZ/)fk#5',
        expirationTime: null,
        issuedAt: Math.floor(Date.now() / 1000) - 30,
        notBefore: null
    };
}
