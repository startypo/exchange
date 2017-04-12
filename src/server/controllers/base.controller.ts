import { Request, Response, Router } from 'express';
import HttpStatus  from 'http-status-codes';
import { IDocument, IModel } from 'mongoose';

export abstract class BaseController {

    public router: Router = Router();

    constructor(protected model: IModel<IDocument>) {
        this.config();
    }

    protected create = (req: Request, res: Response): void => {

        let obj = req.body;

        new this.model(obj).save((err, doc) => {

            if (err) {
                res.status(HttpStatus.BAD_REQUEST).json();
                return;
            }

            res.status(HttpStatus.OK).json({ id : doc.id });
        });
    }

    protected read = (req: Request, res: Response): void => {

        let id: string = req.params.id;

        this.model.findById(id, (err, doc) => {

            if (err) {
                res.status(HttpStatus.BAD_REQUEST).json();
                return;
            }

            if (!doc || doc.deletedAt) {
                res.status(HttpStatus.NOT_FOUND).json();
                return;
            }

            res.status(HttpStatus.OK).json(doc);
        });
    }

    protected update = (req: Request, res: Response): void => {

        let id: string = req.params.id;
        let obj = req.body;

        this.model.findByIdAndUpdate(id, obj, (err, doc) => {

            if (err) {
                res.status(HttpStatus.BAD_REQUEST).json();
                return;
            }

            if (!doc || doc.deletedAt) {
                res.status(HttpStatus.NOT_FOUND).json();
                return;
            }

            res.status(HttpStatus.OK).json();
        });
    }

    protected delete = (req: Request, res: Response): void => {

        let id: string = req.params.id;

        this.model.findByIdAndUpdate(id, { deletedAt: new Date() }, (err, doc) => {

            if (err) {
                res.status(HttpStatus.BAD_REQUEST).json();
                return;
            }

            if (!doc || doc.deletedAt) {
                res.status(HttpStatus.NOT_FOUND).json();
                return;
            }

            res.status(HttpStatus.OK).json();
        });
    }

    protected abstract config(): void;
}
