import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';

import { SpinnerComponent } from './spinner.component';
import { PipesModule } from '../pipes/pipes.module';

const COMPONENTS = [
    SpinnerComponent
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        PipesModule,
        TextMaskModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class SpinnerModule {
    static forRoot(): ModuleWithProviders { return {ngModule: SpinnerModule, providers: []}; }
}