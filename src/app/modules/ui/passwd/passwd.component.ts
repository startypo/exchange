import { Component, OnInit, OnChanges, Input, Output, EventEmitter, forwardRef, ElementRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { PasswordSettings, PasswordLangs } from './passwd.model';
import { UIService } from '../ui.service';

export const PASSWORD_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PasswdComponent),
    multi: true
};

@Component({
    selector: 'passwd',
    templateUrl: 'passwd.component.html',
    styleUrls: ['passwd.component.css'],
    providers: [PASSWORD_CONTROL_VALUE_ACCESSOR]
})
export class PasswdComponent implements OnInit, OnChanges, ControlValueAccessor {

    @Input() public settings: PasswordSettings;
    @Input() public langs: PasswordLangs;
    @Input() public name: string = '';
    @Input() public placeholder: string = '';
    @Input() public disabled: boolean;

    @Output() public changed: EventEmitter<any> = new EventEmitter();
    @Output() public clicked: EventEmitter<any> = new EventEmitter();
    @Output() public generated: EventEmitter<any> = new EventEmitter();

    @ViewChild('passwordInput') public passwordInput: ElementRef;

    public strongValue: number = 0;
    public showPassword: boolean = false;

    protected innerValue: any = '';
    protected defaultSettings: PasswordSettings;
    protected defaultLangs: PasswordLangs;
    protected strongAvailable: number = 5;

    constructor(private uiService: UIService) {

        this.defaultLangs = uiService.getLangs('password');
        this.defaultSettings = uiService.getSettings('password');
    }

    public ngOnInit() {
        this.settings = (<any> Object).assign({}, this.defaultSettings, this.settings);
        this.langs = (<any> Object).assign({}, this.defaultLangs, this.langs);
    }

    public ngOnChanges(changes: any) {
        if (changes.settings) {
            let data = (<any> Object).assign({}, changes.settings.previousValue, changes.settings.currentValue);
            this.settings = (<any> Object).assign({}, this.defaultSettings, data);
        }

        if (changes.langs) {
            let data = (<any> Object).assign({}, changes.langs.previousValue, changes.langs.currentValue);
            this.langs = (<any> Object).assign({}, this.defaultLangs, data);
        }
    }

    public strong(password: any): void {
        let matches = 0;

        // min length
        if (password.length > this.settings.minLength)
            matches++;
        // contains char
        if (/[a-z]+/.test(password))
            matches++;
        // contains upper char
        if (/[A-Z]+/.test(password))
            matches++;
        // contains symbols
        if (/[$@&+#-/:-?{-~!"^_`\[\]]/g.test(password))
            matches++;
        // contains number
        if (/\d+/g.test(password))
            matches++;

        this.strongValue = matches;
    }

    public strongLevelClass(level: number): string {
        if (level <= this.strongValue)
            return 'passwd__strong_' + level;

        return;
    }

    public generatePassword(): void {

        let length = this.settings.length;
        let str = 'abcdefghijklmnopqrstuvwxyz';
        let numeric = '0123456789';
        let punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
        let passwd = '';
        let character = '';

        while (passwd.length < length) {
            let entity1 = Math.ceil(str.length * Math.random() * Math.random());
            let entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
            let entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
            let hold = str.charAt(entity1);

            hold = (entity1 % 2 === 0) ? hold.toUpperCase() : hold;
            character += hold;
            character += numeric.charAt(entity2);
            character += punctuation.charAt(entity3);
            passwd = character;
        }

        this.value = passwd;

        this.strong(passwd);

        this.generated.emit({password: passwd, strong: this.strongValue});
    }

    public displayPassword() {
        this.showPassword = !this.showPassword;
    }

    public onBlur(event: any): void {
        this.onTouchedCallback();
    }

    public onClick(event: any): void {
        this.clicked.emit({originalEvent: event});
    }

    public onChange(event: any): void {

        this.changed.emit({ovalue: this.innerValue});
        this.strong(this.innerValue);
    }

    public numberReturn(length: number): number[] {
        let result: number[] = [];

        for (let i = 1; i <= length; i++)
            result.push(i);

        return result;
    }

    get value(): any {
        return this.innerValue;
    };

    set value(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
            this.onChangeCallback(value);
        }
    }

    public writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    protected onTouchedCallback: () => void = () => {};
    protected onChangeCallback: (_: any) => void = () => {};
}
