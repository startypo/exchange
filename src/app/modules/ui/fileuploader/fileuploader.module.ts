import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FileUploaderComponent } from './fileuploader.component';
export { FileUploaderComponent } from './fileuploader.component';

const COMPONENTS = [
    FileUploaderComponent
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        HttpModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class FileUploaderModule {
    public static forRoot(): ModuleWithProviders { return { ngModule: FileUploaderModule, providers: [] }; }
}
