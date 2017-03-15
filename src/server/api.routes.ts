import { Application } from 'express';
import passport from 'passport';

import UsersController from './controllers/users';
import AuthController from './controllers/auth';

export class ApiRoutes {

    public static config(express: Application): void {

        express.use(ApiRoutes.url, AuthController);
        express.use(ApiRoutes.url + '/users', passport.authenticate('jwt', { session: false }), UsersController);
    }

    private static url: string = '/api/v1';
}
