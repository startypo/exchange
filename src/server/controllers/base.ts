import { Router } from 'express';

export abstract class BaseController {

    public router: Router;

    constructor() {
        this.config();
    }

    protected abstract config(): void;
}
