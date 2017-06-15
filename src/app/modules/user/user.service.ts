import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { UserModel } from './user.model';

@Injectable()
export class UserService {

    private apiUrl: string = 'api/v1/user';
    private loggedUser: UserModel;

    constructor(private http: Http) {}

    get user(): UserModel {

        if (!this.loggedUser)
            this.loggedUser = JSON.parse(sessionStorage.getItem('user'));

        return this.loggedUser;
    }

    public register(user: UserModel): Observable<Response> {
        return this.http
                   .post(this.apiUrl + '/register', JSON.stringify(user), this.getOptions())
                   .catch((err: any) => {

                        if (err.status >= 500)
                            console.log('Server Error');
                        return Observable.throw(err);
                });
    }

    public login(user: UserModel): Observable<Response> {
        return this.http
                   .post(this.apiUrl + '/login', JSON.stringify({ email: user.email, passwd: user.passwd }), this.getOptions())
                   .map((res) => {

                       this.loggedUser = res.json();
                       this.loggedUser.email = user.email;
                       sessionStorage.setItem('user', JSON.stringify(this.loggedUser));
                       return res;
                    });
    }

    public logout(): void {

        sessionStorage.removeItem('user');
        this.loggedUser = null;
    }

    public isLoggedIn(): boolean {
        return this.user !== null;
    }

    public isOwner(owner: string) {
        return this.user.id === owner;
    }

    private getOptions(): RequestOptions {

        let _headers: Headers = new Headers();

        _headers.append('Content-Type', 'application/json');
        let user: UserModel = JSON.parse(sessionStorage.getItem('user'));

        if (user)
            _headers.append('Authorization', 'Bearer ' + user.token);

        return new RequestOptions({ headers: _headers });
    }
}
