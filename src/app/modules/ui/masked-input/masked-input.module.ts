import { NgModule } from '@angular/core';
import { MaskedInputDirective } from './masked-input.directive';
import { CurrencyPipe } from '../pipes/currency.pipe';
export { conformToMask } from 'text-mask-core/dist/textMaskCore'

@NgModule({
  declarations: [MaskedInputDirective],
  exports: [MaskedInputDirective],
  providers: [CurrencyPipe]
})
export class MaskedInputModule {}
