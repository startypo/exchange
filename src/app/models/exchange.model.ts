import { Asset } from './asset.model';
import { UserModel } from '../modules/user/user.model';

export class Exchange {

    public id: string = '';
    public sender: UserModel = new UserModel();
    public receiver: UserModel = new UserModel();
    public asset: Asset = new Asset();
    public createdAt: Date;
    public status: string =  '';
    public trackingCode: string = '';
}
