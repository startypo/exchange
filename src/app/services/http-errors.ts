export abstract class HttpError {
    constructor(public text: string) { }
}

// tslint:disable-next-line:max-classes-per-file
export class CreateHttpError extends HttpError {}
export class ReadHttpError extends HttpError {}

// tslint:disable-next-line:max-classes-per-file
export class UpdateHttpError extends HttpError {}
export class DeleteHttpError extends HttpError {}

