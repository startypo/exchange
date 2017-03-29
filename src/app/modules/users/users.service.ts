import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { UserModel } from './user.model';

@Injectable()
export class UsersService {

    private apiUrl: string = 'api/v1/users';

    constructor(private http: Http) {}

    public register(_user: UserModel): Observable<Response> {
        return this.http.post(this.apiUrl + '/register', JSON.stringify({user: _user}), this.getHeaders());
    }

    public login(_email: string, _passwd: string): Observable<Response> {
        return this.http
                   .post(this.apiUrl + '/login', JSON.stringify({ email: _email, passwd: _passwd }), this.getHeaders())
                   .map((res: Response) => res.json());
    }

    public logout(user: UserModel): Observable<Response> {
        return this.http.post(this.apiUrl + '/logout', JSON.stringify(user), this.getHeaders());
    }

    private getHeaders(): RequestOptions {

        let _headers: Headers = new Headers();

        _headers.append('Content-Type', 'application/json');
        let token = localStorage.getItem('auth');

        if (token)
            _headers.append('Authorization', 'Bearer ' + token);

        return new RequestOptions({ headers: _headers });
    }
}
