import { Directive, ElementRef, forwardRef, Input, Inject, NgModule, OnChanges, Provider, Renderer, SimpleChanges, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';

export const MASKEDINPUT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MaskedInputDirective),
  multi: true
}

@Directive({
  selector: '[masquerade]',
  providers: [MASKEDINPUT_VALUE_ACCESSOR]
})
export class MaskedInputDirective implements ControlValueAccessor, OnChanges {

  @Input('masquerade') public settings = {
    mask: [],
    guide: true,
    placeholderChar: '_',
    pipe: undefined,
    keepCharPositions: false,
  };

  private textMaskInputElement: any;
  private inputElement: HTMLInputElement;
  private lastValue: any; // stores the last value for comparison

  constructor(@Inject(Renderer) private renderer: Renderer, @Inject(ElementRef) private element: ElementRef) {}

  @HostListener('blur')
  public _onTouched = () => {};
  public _onChange = (_: any) => {};

  public ngOnChanges(changes: SimpleChanges) {

    this.setupMask();
    if (this.textMaskInputElement !== undefined)
      this.textMaskInputElement.update(this.inputElement.value);
  }

  public writeValue(value: any) {

    if (!this.inputElement)
      this.setupMask();

    const normalizedValue = value == null ? '' : value; // set the initial value for cases where the mask is disabled
    this.renderer.setElementProperty(this.inputElement, 'value', normalizedValue);

    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(value);
    }
  }

  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }

  public registerOnTouched(fn: () => any): void { this._onTouched = fn; }

  public setDisabledState(isDisabled: boolean) {
    this.renderer.setElementProperty(this.element.nativeElement, 'disabled', isDisabled);
  }

  @HostListener('input', ['$event.target.value'])
  public onInput(value) {

    if (!this.inputElement)
      this.setupMask();

    if (this.textMaskInputElement !== undefined) {

      this.textMaskInputElement.update(value);
      value = this.inputElement.value; // get the updated value

      if (this.lastValue !== value) { // check against the last value to prevent firing ngModelChange despite no changes
        this.lastValue = value;
        value = this.settings.pipe !== undefined ? this.settings.pipe.parse(value) : value;
        this._onChange(value);
      }
    }
  }

  private setupMask() {
    if (this.element.nativeElement.tagName === 'INPUT')
      this.inputElement = this.element.nativeElement; // `textMask` directive is used directly on an input element
    else  // `textMask` directive is used on an abstracted input element, `ion-input`, `md-input`, etc
      this.inputElement = this.element.nativeElement.getElementsByTagName('INPUT')[0];

    if (this.inputElement)
      this.textMaskInputElement = createTextMaskInputElement(Object.assign({inputElement: this.inputElement}, this.settings));
  }
}

