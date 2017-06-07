
import { IExchangeModel, IExchangeDocument } from '../models/exchange.model';
import { IAssetModel } from '../models/asset.model';
import { IHandModel, IHandDocument } from '../models/hand.model';

export class ExchangeService {

    constructor(private model: IExchangeModel, private assetModel: IAssetModel, private handModel: IHandModel){}

    public create(assetId: string, receiverId: string, callback?: (err: any, exchange: IExchangeDocument) => void): void {

        let exchange = new this.model();
        exchange.receiver = receiverId;
        let debitValue: number;

        this.assetModel.findById(assetId)
            .then((asset) => {
                exchange.asset = asset.id;
                debitValue = asset.price;
                return this.handModel.findOne({ owner: receiverId });
            })
            .then((hand: IHandDocument) => {
                hand.debit(debitValue);
                hand.save();
                return exchange.save();
            })
            .then((ex: IExchangeDocument) => {
                callback(null, ex);
            })
            .catch(err => callback(err, null));
    }
}
