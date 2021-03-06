import { IExchangeModel, IExchangeDocument, Status } from '../models/exchange.model';
import { IAssetModel, IAssetDocument } from '../models/asset.model';
import { IHandModel, IHandDocument } from '../models/hand.model';
import { XChangesError, ErrorType } from '../xchanges.error';

export class ExchangeService {

    constructor(private exchangeModel: IExchangeModel, private assetModel: IAssetModel, private handModel: IHandModel) {}

    public create(assetId: string, receiverId: string, callback: (err: any) => void): void {

        this.assetModel.findById(assetId).populate('exchange').exec((error, asset: IAssetDocument) => {

            if (error) {
                callback(error);
                return;
            }

            if (asset.exchange) {
                callback(new XChangesError(ErrorType.exchangeAlreadyExists));
                return;
            }

            this.handModel.findOne({ owner: receiverId }, (err, hand: IHandDocument) => {

                if (err) {
                    callback(err);
                    return;
                }

                try {
                    hand.debit(asset.price);
                } catch (e) {
                    callback(e);
                    return;
                }

                const exchange = new this.exchangeModel();
                exchange.receiver = receiverId;
                exchange.sender = asset.owner;
                exchange.asset = asset;
                asset.exchange = exchange;

                exchange.save();
                hand.save();
                asset.save((e, doc) => {

                    if (e)
                        callback(e);

                    callback(null);
                });
            });
        });
    }

    public list(userId: string, callback: (err: any, result) => void): void {

        let result: any = {
            sending: [],
            receiving: [],
            completed: []
        };

        this.exchangeModel.find({ $or: [{ receiver: userId }, { sender: userId }] })
                            .populate('asset')
                            .exec((err, exchange) => {

            if (err) {
                callback(err, null);
                return;
            }

            for (let e of exchange) {

                if (e.status != Status.received) {
                    if (e.sender.toString() === userId)
                        result.sending.push(e.asset);
                    if (e.receiver.toString() === userId)
                        result.receiving.push(e.asset);
                } else
                    result.completed.push(e.asset);
            }

            callback(null, result);
        });
    }

    public send(doc: IExchangeDocument, senderId: string, callback: (err: any, result) => void): void {

        this.exchangeModel.findById(doc.id, (err, exchange) => {

            if (err) {
                callback(err, null);
                return;
            }

            if (exchange.sender.toString() !== senderId) {
                callback(new XChangesError(ErrorType.unauthorizedUser), null);
                return;
            }

            if (exchange.status != Status.initiated) {
                callback(new XChangesError(ErrorType.statusChangeNotAllowed), null);
                return;
            }

            exchange.status = Status.sent;
            exchange.trackingCode = doc.trackingCode;

            exchange.save((er, result) => {

                if (er)
                    callback(err, null);

                callback(null, result);
            });
        });
    }

    public receive(doc: IExchangeDocument, receiverId: string, callback: (err: any, result) => void): void {

        this.exchangeModel.findById(doc.id).populate('asset').exec((err, exchange) => {

            if (err) {
                callback(err, null);
                return;
            }

            if (exchange.receiver.toString() !== receiverId) {
                callback(new XChangesError(ErrorType.unauthorizedUser), null);
                return;
            }

            if (exchange.status != Status.sent) {
                callback(new XChangesError(ErrorType.statusChangeNotAllowed), null);
                return;
            }

            const asset: IAssetDocument = exchange.asset as IAssetDocument;
            exchange.status = Status.received;

            this.handModel.findOne({ owner: asset.owner }, (er, hand: IHandDocument) => {

                if (er) {
                    callback(er, null);
                    return;
                }

                try {
                    hand.credit(asset.price);
                } catch (ex) {
                    callback(ex, null);
                }

                hand.save();
                exchange.save((e, result) => {

                    if (e)
                        callback(e, null);

                    callback(null, result);
                });
            });
        });
    }
}
