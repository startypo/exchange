import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export class AssetModel {

    public name: string = '';
    public description: string = '';
    public price: number = 0.0;
    public imgs: any[] = new Array();

    public priceMask = createNumberMask({
        prefix: '$',
        allowDecimal: true
    });
}
