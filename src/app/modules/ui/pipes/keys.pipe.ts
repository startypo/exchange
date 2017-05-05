import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'keys'
})
export class KeysPipe implements PipeTransform {

    public transform(value: any, args: string[]): any {
        if (!value)
            return value;

        let keys: any[] = [];
        // tslint:disable-next-line:forin
        for (let key in value)
            keys.push({key: key, value: value[key]});

        return keys;
    }
}
