import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { UserModel } from './user.model';

@Injectable()
export class UsersService {

    private headers: Headers = new Headers();
    private apiUrl: string = 'api/v1/users';

    constructor(private http: Http) {

        this.headers.append('Content-Type', 'application/json');
    }

    public register(user: UserModel): Observable<Response> {
        return this.http.post(this.apiUrl + '/register', JSON.stringify(user), { headers: this.headers }).map(res => res.json());
    }

    public login(_email: string, _passwd: string): Observable<Response> {
        return this.http.post(this.apiUrl + '/login',
                              JSON.stringify({ email: _email, passwd: _passwd }),
                              { headers: this.headers }).map(res => res.json());
    }

    public logout(user: UserModel): Observable<Response> {
        return this.http.post(this.apiUrl + '/logout', JSON.stringify(user), { headers: this.headers }).map(res => res.json());
    }
}
