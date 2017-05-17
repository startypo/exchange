import { Router } from 'express';
import { Routes } from './routes';

import UsersController from './controllers/users.controller';
import AssetsController from './controllers/assets.controller';
import FileController from './controllers/files.controller';

export class RoutesMap {

    public static map(): Router {

        let router = Router();

        router.use(Routes.users, UsersController);
        router.use(Routes.assets, AssetsController);
        router.use(Routes.files, FileController);

        return router;
    }
}
