
export class Validators {

    public static emailErrorMsg: string = 'Not a valid email';
    public  static notBlankErrorMsg: string = '';

    public static email(val: string): boolean {
        return /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i.test(val);
    };

    public static notBlank(val: string): boolean {
        return !(/^\s*$/.test(val));
    }
}

