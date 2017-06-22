import { Asset } from './asset.model';

export class ExchangeList {

    public sending: Asset[] = [];
    public receiving: Asset[] = [];
    public completed: Asset[] = [];
}
