import { Application } from 'express';

import UsersController from './controllers/users';

export class ApiRoutes {

    public static config(express: Application): void {
        express.use(ApiRoutes.url + '/users', UsersController);
    }

    private static url: string = '/api/v1';
}
