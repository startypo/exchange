import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'round'
})
export class RoundPipe implements PipeTransform {
    constructor(){}

    public transform(value: number, accuracy: number = 1, keep: boolean = false) {

        let fixed = value.toFixed(accuracy);
        return keep ? fixed : +fixed;
    }
}
