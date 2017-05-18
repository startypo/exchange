import { Request, Response } from 'express';
import Passport from '../passport';
import HttpStatus  from 'http-status-codes';
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';

import { BaseController } from './base.controller';
import { Routes } from '../routes';
import { DBConnection } from '../db.connection';

export class FileController extends BaseController {

    private uploadPath = path.join(process.env.NODE_ENV === 'production' ?
                         path.resolve() :
                         path.dirname(process.mainModule.filename), 'uploads');

    constructor() {
        super();
        this.config();
    }

    public create = (req: any, res: Response): void => {

        res.status(HttpStatus.OK).json({ filename: req.file.filename });
    }

    public read = (req: any, res: Response): void => {

        res.status(HttpStatus.OK).sendFile(path.join(this.uploadPath, req.query.filename));
    }

    public delete = (req: any, res: Response): void => {

        let filePath = path.join(this.uploadPath, req.query.filename);

        fs.access(filePath, fs.constants.W_OK, (err) => {

            if (err) {
                res.status(HttpStatus.FORBIDDEN).json();
                return;
            }

            fs.unlink(filePath, (error) => {

                if (error) {
                    res.status(HttpStatus.FORBIDDEN).json();
                    return;
                }

                res.status(HttpStatus.OK).json();
            });
        });
    }

    protected config(): void {

        let file = multer({ dest: this.uploadPath });

        this.router.post(Routes.root, Passport.authorize('jwt', this.authOptions), file.single('img'), this.create);
        this.router.get(Routes.root, this.read);
        this.router.delete(Routes.root, Passport.authorize('jwt', this.authOptions), this.delete);
    }
}
