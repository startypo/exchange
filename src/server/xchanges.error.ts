import HttpStatus from 'http-status-codes';

export interface IXChangesError {

    name: string;
    message: string;
    code: number;
    status: number;
}

export class XChangesError extends Error implements IXChangesError {

    public status: number;
    public code: number;

    constructor(errorType: IXChangesError) {
        super(errorType.message);

        Object.setPrototypeOf(this, XChangesError.prototype);

        this.name = errorType.name;
        this.status = errorType.status;
        this.code = errorType.code;

        Error.captureStackTrace(this, this.constructor);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ErrorType {

    public static debit: IXChangesError = {

        name: 'Debit Error',
        message: 'You do not have sufficient funds to acquire this asset',
        code: 101,
        status: HttpStatus.BAD_REQUEST
    };

     public static exchangeAlreadyExists: IXChangesError = {

        name: 'Exchange Already Exist',
        message: 'An exchange you are trying to create already exists',
        code: 102,
        status: HttpStatus.BAD_REQUEST
    };
}
