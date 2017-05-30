import { Router } from 'express';
import { Routes } from './routes';

import { UsersController } from './controllers/users.controller';
import { AssetsController } from './controllers/assets.controller';
import { HandsController } from './controllers/hands.controller';
import { FileController } from './controllers/files.controller';

export class RoutesMap {

    public static map(): Router {

        let router = Router();

        let usersController = new UsersController().router;
        let assetsController = new AssetsController().router;
        let handsController = new HandsController().router;
        let filesController = new FileController().router;

        router.use(Routes.users, usersController);
        router.use(Routes.assets, assetsController);
        router.use(Routes.hands, handsController);
        router.use(Routes.files, filesController);

        return router;
    }
}
