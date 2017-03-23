import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidateComponent } from './validate.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ValidateComponent
    ],
    exports: [
        ValidateComponent
    ],
    providers: []
})
export class ValidateModule { }
