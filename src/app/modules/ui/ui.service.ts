import { Injectable, OnInit } from '@angular/core';

import { EditorSettings, EditorLangs } from './editor/editor.model';
import { ValidateSettings, ValidateLangs } from './validate/validate.model';
import { PasswordSettings, PasswordLangs } from './passwd/passwd.model';
import { FileUploaderSettings, FileUploaderLangs } from './fileuploader/fileuploader.model';
import { SpinnerSettings } from './spinner/spinner.model';
import { NotifySettings } from './notify/notify.model';
import { ModalSettings } from './modal/modal.model';
import { PaginationSettings, PaginationLangs } from './pagination/pagination.model';

@Injectable()
export class UIService implements OnInit {

    /**
     * Editor
     */
    protected editorSettings: EditorSettings = {
        menu: [
            ['bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript'],
            ['pre', 'insertParagraph', 'blockquote', 'removeFormat'],
            ['justifyleft', 'justifycenter', 'justifyright'],
            ['insertorderedlist', 'insertunorderedlist', 'outdent', 'indent'],
        ],
        fontSizes: [
            {
                value: '1',
                size: '10px'
            },
            {
                value: '2',
                size: '13px'
            },
            {
                value: '3',
                size: '16px'
            },
            {
                value: '4',
                size: '18px'
            },
            {
                value: '5',
                size: '24px'
            },
            {
                value: '6',
                size: '32px'
            },
            {
                value: '7',
                size: '48px'
            }
        ],
        height: 200,
        class: 'editor-area',
        id: null,
        color: 'secondary'
    };

    protected editorLangs: EditorLangs = {
        fontSize: 'Font size'
    };

    /**
     * Fileuploader
     */
    protected fileuploaderSettings: FileUploaderSettings = {
        multiple: false,
        color: 'secondary',
        size: 'md',
        filterExtensions: true,
        allowedExtensions: ['jpg', 'png', 'image/jpeg', 'image/png', 'txt', 'pdf', 'text/plain', 'application/pdf'],
        imagesExtensions: ['jpg', 'png', 'image/jpeg', 'image/png'],
        filesExtensions: ['txt', 'pdf', 'text/plain', 'application/pdf'],
        showPreview: true,
        autoupload: false,
        speedProgress: true,
        xhrMethod: 'POST',
        xhrUrl: 'http://localhost',
        xhrCredentials: true,
        xhrHeaders: [],
        xhrAuthToken: null,
        xhrAuthTokenPrefix: '',
        iconsPath: 'app/resources/img/icons',
        viewCounter: false,
        showFilename: false
    };

    protected fileuploaderLangs: FileUploaderLangs = {
        buttonText: 'Upload',
        extensionNotAllowed: 'Extension not allowed to upload',
        zeroBytes: '0 Byte',
        removeFile: '<i class="fa fa-times"></i>',
        uploadedCounter: 'files is uploaded',
        clearAll: 'Clear all'
    };

    /**
     * Password
     */
    protected passwordSettings: PasswordSettings = {
        size: 'md',
        buttonColor: 'secondary',
        length: 10,
        minLength: 6
    };

    protected passwordLangs: PasswordLangs = {
        generate: 'Generate'
    };

    /**
     * Validate
     */
    protected validateLangs: ValidateLangs = {
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

    protected validateSettings: ValidateSettings = {
        errorColor: 'danger',
        showAsterisk: false
    };

    /**
     * Spinner
     */
    protected spinnerSettings: SpinnerSettings = {
        max: 999999,
        min: 1,
        prefix: '',
        postfix: '',
        color: 'secondary',
        size: 'md',
        step: 1,
        decimals: 0,
        forcestep: 'round'
    };

    /**
     * Notify
     */
    protected notifySettings: NotifySettings = {
        position: ['top', 'right'],
        duration: 1,
        closeble: false,
        maxItems: 10,
        addToBottom: false,
        stopOnHover: true
    };

    /**
     * Pagination
     */
    protected paginationSettings: PaginationSettings = {
        prevNext: true,
        lastFirst: true,
        max: 0,
        separator: '...',
        size: 'md',
        color: 'primary'
    };

    protected paginationLangs: PaginationLangs = {
        first: 'First',
        prev: 'Previous',
        next: 'Next',
        last: 'Last'
    };

    /**
     * Modal
     */
    protected modalSettings: ModalSettings = {
        label: '',
        color: 'secondary',
        size: 'md',
        modalSize: 'md',
        icon: null
    };

    constructor() {}

    public ngOnInit() {}

    /**
     * Set component default settings
     *
     * @param {string} name
     * @param {Object} settings
     * @returns {*}
     *
     * @memberOf OverwriteService
     */
    public setSettings(name: string, settings: Object): any {
        let component = name + 'Settings';

        if (this[component])
            this[component] = (<any> Object).assign({}, this[component], settings);
    }

    /**
     * Get component default settings
     *
     * @param {string} name
     * @returns {*}
     *
     * @memberOf OverwriteService
     */
    public getSettings(name: string): any {
        let component = name + 'Settings';

        if (this[component])
            return this[component];

        return;
    }

    /**
     * Set component default langs
     *
     * @param {string} name
     * @param {Object} langs
     * @returns {*}
     *
     * @memberOf OverwriteService
     */
    public setLangs(name: string, langs: Object): any {
        let component = name + 'Langs';

        if (this[component])
            this[component] = (<any> Object).assign({}, this[component], langs);
    }

    /**
     * Get components default langs
     *
     * @param {string} name
     * @returns {*}
     *
     * @memberOf OverwriteService
     */
    public getLangs(name: string): any {
        let component = name + 'Langs';

        if (this[component])
            return this[component];

        return;
    }
}
