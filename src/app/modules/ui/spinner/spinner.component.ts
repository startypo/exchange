import { Component, OnInit, OnChanges, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { SpinnerSettings } from './spinner.model';

import { UIService } from '../ui.service';

@Component({
    selector: 'spinner',
    templateUrl: 'spinner.component.html',
    styleUrls: ['spinner.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SpinnerComponent),
        multi: true
    }]
})
export class SpinnerComponent implements OnInit, OnChanges, ControlValueAccessor {
    @Input() settings: SpinnerSettings;
    @Input() name: string = '';
    @Input() disabled: boolean;

    @Output() changed: EventEmitter<any> = new EventEmitter();
    @Output() clicked: EventEmitter<any> = new EventEmitter();

    protected innerValue: number = 0;
    protected defaultSettings: SpinnerSettings;

    constructor(private uiService: UIService) {
        this.defaultSettings = uiService.getSettings('spinner');
    }

    public ngOnInit() {
        this.settings = (<any>Object).assign({}, this.defaultSettings, this.settings);
    }

    public ngOnChanges(changes: any) {
        if (changes.settings) {
            let data = (<any>Object).assign({}, changes.settings.previousValue, changes.settings.currentValue);
            this.settings = (<any>Object).assign({}, this.defaultSettings, data);
        }
    }

    public onBlur(event: any) {
        this.onTouchedCallback();
    }

    public onClick(event: any): void {
        this.clicked.emit({originalEvent: event});
    }

    public onChange(event: any): void {
        this.changed.emit({value: this.innerValue});
    }

    get value(): any {
        if (this.innerValue == undefined) {
            this.innerValue = 0;
        }

        return this.innerValue;
    };

    set value(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
            this.onChangeCallback(value);
        }
    }

    public writeValue(value: any) {
        if (value !== undefined && value !== null) {
            this.innerValue = this.forceStep(value);
        }
    }

    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    public forceStep(value: number): any {
        switch (this.settings.forcestep) {
            case 'round':
                return Number((Math.round(value / this.settings.step) * this.settings.step).toFixed(this.settings.decimals));
            case 'floor':
                return Number((Math.floor(value / this.settings.step) * this.settings.step).toFixed(this.settings.decimals));
            case 'ceil':
                return Number((Math.ceil(value / this.settings.step) * this.settings.step).toFixed(this.settings.decimals));
            default:
                return value;
        }
    }

    public increment(event: void): void {
        let value = this.forceStep(this.innerValue + this.settings.step);
        if((value) <= this.settings.max) {
            this.value = value;
        }

        this.changed.emit({originalEvent: event, value: value});
    }

    public decrement(event: any): void {
        let value = this.forceStep(this.innerValue - this.settings.step);
        if((value) >= this.settings.min) {
            this.value = value;
        }

        this.changed.emit({originalEvent: event, value: value});
    }

    protected onTouchedCallback: () => void = () => { };
    protected onChangeCallback: (_: any) => void = () => { };
}