import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { ModalComponent } from './modal.component';

export { ModalComponent } from './modal.component';

const COMPONENTS = [
    ModalComponent
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: COMPONENTS,
    exports:COMPONENTS
})
export class ModalModule {
    public static forRoot(): ModuleWithProviders { return { ngModule: ModalModule, providers: [] }; }
}