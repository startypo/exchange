import { Pipe, PipeTransform } from '@angular/core';

const PADDING = '000000';

// tslint:disable-next-line:pipe-naming
@Pipe({ name: 'xchs' })
export class CurrencyPipe implements PipeTransform {

    private DECIMAL_SEPARATOR: string = '.';
    private THOUSANDS_SEPARATOR: string = ',';
    private PREFIX: string = 'ϝ ';

    public transform(value: number | string, fractionSize: number = 2): string {
        let [ integer, fraction = '' ] = (value || '').toString()
        .split(this.DECIMAL_SEPARATOR);

        fraction = fractionSize > 0
        ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
        : '';

        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);
        integer = this.PREFIX.concat(integer);

        return integer + fraction;
    }

    public parse(value: string, fractionSize: number = 2): string {

        let [ integer, fraction = '' ] = (value || '').split(this.DECIMAL_SEPARATOR);
        integer = integer.replace(this.PREFIX, '');
        integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, 'g'), '');

        fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
        ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
        : '';

        return integer + fraction;
    }
}
