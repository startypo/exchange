
export class Validators {

    public static email(val: string): boolean {
        return /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i.test(val);
    };

    public static notBlank(val: string): boolean {
        return !(/^\s*$/.test(val));
    }
}

