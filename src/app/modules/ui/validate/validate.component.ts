import { Component, OnInit, OnChanges, Input, Output } from '@angular/core';
import { ValidateSettings, ValidateLangs } from './validate.model';

@Component({
    selector: 'validate',
    templateUrl: 'validate.component.html',
    styleUrls: ['validate.component.css']
})
export class ValidateComponent implements OnInit, OnChanges {
    @Input() public settings: ValidateSettings;
    @Input() public langs: ValidateLangs;
    @Input() public label: string;
    @Input() public control: any;
    @Input() public help: string;
    @Input() public validated: boolean = true;

    protected defaultLangs: ValidateLangs;
    protected defaultSettings: ValidateSettings;

    constructor() {

        this.defaultSettings = {
            errorColor: 'danger',
            showAsterisk: false
        };

        this.defaultLangs = {
            email: 'Field must be a valid email address',
            password: 'Password is incorrect',
            required: 'Field is required',
            minlength: 'Field must be at least :requiredLength characters',
            maxlength: 'Field may not be greater than :requiredLength characters',
            int: 'Field must be an integer',
            number: 'Field must be a number',
            date: 'Field must be valid date',
            minDate: 'Field must be at least :date date',
            maxDate: 'Field may not be greater than :date date',
            equal: 'Field must be equal :equal',
            max: 'Field may not be greater than :max number',
            min: 'Field must be at least :min number',
            range: 'Field must be between :min and :max',
            json: 'Field must be valid json',
            boolean: 'Field must be true or false',
            hex: 'Field must be valid hex color',
            rgb: 'Field must be valid rgb color'
        };
    }

    public ngOnInit() {
        this.settings = Object.assign({}, this.defaultSettings, this.settings);
        this.langs = Object.assign({}, this.defaultLangs, this.langs);
    }

    public ngOnChanges(changes: any) {
        if (changes.settings) {
            let data = Object.assign({}, changes.settings.previousValue, changes.settings.currentValue);
            this.settings = Object.assign({}, this.defaultSettings, data);
        }

        if (changes.langs) {
            let data = Object.assign({}, changes.langs.previousValue, changes.langs.currentValue);
            this.langs = Object.assign({}, this.defaultLangs, data);
        }
    }

    get errorClass(): string {
        return (this.errorLabel) ? 'has-' + this.settings.errorColor : '';
    }

    get errorLabel(): string {
        if (this.validated && this.control && this.control.errors) {
            for (let propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName) && this.control.pristine === false) {
                    return this.getErrorMessage(propertyName, this.control.errors[propertyName]);
                }
            }
        }

        return null;
    }

    public getErrorMessage(name: string, value?: any): string {

        if (!(value && this.langs[name]))
           return 'undefined';

        // tslint:disable-next-line:forin
        for (let key in value)
            this.langs[name] = this.langs[name].replace(':' + key, value[key]);

        return this.langs[name];
    }
}
