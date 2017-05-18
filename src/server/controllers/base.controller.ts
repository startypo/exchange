import { Request, Response, Router } from 'express';
import HttpStatus  from 'http-status-codes';
import { IDocument, IModel } from 'mongoose';

export abstract class BaseController {

    public router: Router = Router();

    protected authOptions = {
        session: false
    };

    constructor(protected model?: IModel<IDocument>) {
        this.config();
    }

    protected create(req: Request, res: Response): void {

        let obj = req.body;
        obj.owner = req.user.id;

        new this.model(obj).save((err, doc) => {

            if (err) {
                res.status(HttpStatus.FORBIDDEN).json();
                return;
            }

            res.status(HttpStatus.OK).json({ id : doc.id });
        });
    }

    protected read(req: Request, res: Response): void {

        let id: string = req.query.id;

        this.model.findById(id, (err, doc) => {

            if (err) {
                res.status(HttpStatus.FORBIDDEN).json();
                return;
            }

            if (!doc || doc.deletedAt) {
                res.status(HttpStatus.NOT_FOUND).json();
                return;
            }

            res.status(HttpStatus.OK).json(doc);
        });
    }

    protected update(req: Request, res: Response): void {

        let obj: any = req.body;
        let userId = req.user.id;

        this.model.findById(obj.id, (err, doc: any) => {

            if (err) {
                res.status(HttpStatus.FORBIDDEN).json();
                return;
            }

            // If an resource not exist or is excluded, it responds as not found.
            if (!doc || doc.deletedAt) {
                res.status(HttpStatus.NOT_FOUND).json();
                return;
            }

            // If a user is not the owner of the resource, it forbids update.
            if (doc.owner !== userId) {
                res.status(HttpStatus.FORBIDDEN).json();
                return;
            }

            doc.set(obj);

            doc.save((error, updatedDoc) => {

                if (error) {
                    res.status(HttpStatus.FORBIDDEN).json();
                    return;
                }

                res.status(HttpStatus.OK).json();
            });
        });
    }

    protected delete(req: Request, res: Response): void {

        let id: string = req.query.id;
        let userId = req.user.id;

        this.model.findById(id, (err, doc: any) => {

            if (err) {
                res.status(HttpStatus.FORBIDDEN).json();
                return;
            }

            // If an resource not exist or is already excluded, it responds as not found.
            if (!doc || doc.deletedAt) {
                res.status(HttpStatus.NOT_FOUND).json();
                return;
            }

            // If a user is not the owner of the resource, it forbids deletion.
            if (doc.owner !== userId) {
                res.status(HttpStatus.FORBIDDEN).json();
                return;
            }

            doc.deletedAt = new Date();

            doc.save((error, updatedDoc) => {

                if (error) {
                    res.status(HttpStatus.FORBIDDEN).json();
                    return;
                }

                res.status(HttpStatus.OK).json();
            });
        });
    }

    protected abstract config(): void;
}
