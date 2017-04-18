import { Component, OnInit, OnChanges, Input, Output } from '@angular/core';
import { ValidateSettings, ValidateLangs } from './validate.model';
import { UIService } from '../ui.service';

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

    constructor(private uiService: UIService) {

        this.defaultSettings = uiService.getSettings('validate');
        this.defaultLangs = uiService.getLangs('validate');
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
