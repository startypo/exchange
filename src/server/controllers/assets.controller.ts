import { Request, Response } from 'express';
import Passport from '../passport';
import HttpStatus  from 'http-status-codes';

import { BaseController } from './base.controller';
import { Routes } from '../routes';
import { AssetModel } from '../models/asset.model';

export class AssetsController extends BaseController {

    protected config(): void {

        this.router.post(Routes.root, Passport.authorize('jwt', this.authOptions), this.create);
        this.router.get(Routes.root + ':id', Passport.authorize('jwt', this.authOptions), this.read);
        this.router.put(Routes.root + ':id', Passport.authorize('jwt', this.authOptions), this.update);
        this.router.delete(Routes.root + ':id', Passport.authorize('jwt', this.authOptions), this.delete);
    }
}

export default new AssetsController(AssetModel).router;
