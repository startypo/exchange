import { Router } from 'express';
import { Routes } from './routes';

import AuthController from './controllers/auth.controller';
import UsersController from './controllers/users.controller';


export class RoutesMap {

    public static map(): Router {

        let router = Router();

        router.use(Routes.auth, AuthController);
        router.use(Routes.users, UsersController);

        return router;
    }
}
