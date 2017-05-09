import { Headers } from '@angular/http';
import { UserModel } from '../modules/user/user.model';

export class BaseService {

    protected apiUrl: string = 'api/v1';

    protected getHeaders(): Headers {

        let headers: Headers = new Headers();

        headers.append('Content-Type', 'application/json');
        let user: UserModel = JSON.parse(sessionStorage.getItem('user'));

        if (user)
            headers.append('Authorization', 'Bearer ' + user.token);

        return headers;
    }
}