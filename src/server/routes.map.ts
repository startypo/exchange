import { Router } from 'express';
import { Routes } from './routes';

import { UsersController } from './controllers/users.controller';
import { AssetsController } from './controllers/assets.controller';
import { HandsController } from './controllers/hands.controller';
import { FileController } from './controllers/files.controller';
import { ExchangesController } from './controllers/exchanges.controller';
import { NotificationController } from './controllers/notification.controller';

export class RoutesMap {

    public static map(): Router {

        const router = Router();

        const usersController = new UsersController().router;
        const assetsController = new AssetsController().router;
        const handsController = new HandsController().router;
        const exchangesController = new ExchangesController().router;
        const filesController = new FileController().router;
        const notificationController = new NotificationController().router;

        router.use(Routes.users, usersController);
        router.use(Routes.assets, assetsController);
        router.use(Routes.hands, handsController);
        router.use(Routes.files, filesController);
        router.use(Routes.exchanges, exchangesController);
        router.use(Routes.notifications, notificationController);

        return router;
    }
}
