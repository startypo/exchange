import { Request, Response } from 'express';
import Passport from '../passport';
import HttpStatus  from 'http-status-codes';
import * as multer from 'multer';
import * as path from 'path';

import { BaseController } from './base.controller';
import { Routes } from '../routes';
import { DBConnection } from '../db.connection';

export class FileController extends BaseController {

    public upload(req: any, res: Response): void {

        res.status(HttpStatus.OK).json({ filename: req.file.filename });
    }

    public download(req: any, res: Response): void {

        let execPath = process.env.NODE_ENV === 'production' ?  path.resolve() : path.dirname(process.mainModule.filename);
        res.status(HttpStatus.OK).sendFile(path.join(execPath, 'uploads', req.query.id));
    }

    public delete(req: any, res: Response): void {
        res.status(HttpStatus.OK).json();
    }

    protected config(): void {

        let execPath = process.env.NODE_ENV === 'production' ?  path.resolve() : path.dirname(process.mainModule.filename);
        let upload = multer({ dest: path.join(execPath, 'uploads') });
        this.router.post(Routes.root, Passport.authorize('jwt', this.authOptions), upload.single('img'), this.upload);
        this.router.get(Routes.root, this.download);
    }
}

export default new FileController().router;
