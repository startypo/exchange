import { Request, Response } from 'express';
import Passport from '../passport';
import HttpStatus  from 'http-status-codes';

import { BaseController } from './base.controller';
import { Routes } from '../routes';

export class ExchangesController extends BaseController {

    public create(req: Request, res: Response): void {
        
    }

    protected config(): void {

        this.router.post(Routes.root, this.create);
    }
}