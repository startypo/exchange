import { Asset } from './asset.model';

export class Exchange {

    public id: string = '';
    public sender: string = '';
    public receiver: string = '';
    public asset: Asset = new Asset();
    public createdAt: Date;
    public status: string =  '';
    public trackingCode: string = '';
}
