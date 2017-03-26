export class User {

    public static find (opts: Partial<User>, calback: (err: Error, user: User) => void): void {

        if (!opts.email)
            calback(new Error('Invalid argument: email'), null);

        calback(null, this.users.find(u => u.email === opts.email));
    }

    public static save (user: User, calback: (err: Error) => void): void {

        if (!user)
            calback(new Error('Argument null: user'));

        User.users.push(user);

        calback(null);
    }

    public static list(): User[] {
        return User.users;
    }

    private static users: User[] = [
        new User({ id: 1, email: 'usenix@xchanges.services', name: 'usenix', passwd: 'usenix', profile: 'admin'}),
        new User({ id: 2, email: 'carlos@xchanges.services', name: 'carlos', passwd: 'carlos123', profile: 'user'}),
        new User({ id: 3, email: 'renan@xchanges.services',  name: 'renan',  passwd: 'renan123', profile: 'user'}),
        new User({ id: 4, email: 'daniel@xchanges.services', name: 'daniel', passwd: 'daniel123', profile: 'user'})
    ];

    public id: number;
    public name: string;
    public email: string;
    public passwd: string;
    public profile: string;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    public verifyPassword(pass: string): boolean {
        return this.passwd === pass;
    }
}
