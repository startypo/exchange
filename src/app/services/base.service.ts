import { Headers, RequestOptions } from '@angular/http';
import { UserModel } from '../modules/user/user.model';

export class BaseService {

    protected apiUrl: string = 'api/v1';

    protected getHeaders(): RequestOptions {

        let _headers: Headers = new Headers();

        _headers.append('Content-Type', 'application/json');
        let user: UserModel = JSON.parse(sessionStorage.getItem('user'));

        if (user)
            _headers.append('Authorization', 'Bearer ' + user.token);

        return new RequestOptions({ headers: _headers });
    }
}