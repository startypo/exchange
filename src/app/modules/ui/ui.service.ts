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

        color: 'primary',
        size: 'md',
        maxNumberOfFiles: 5,
        filterExtensions: true,
        imagesExtensions: ['jpg', 'png', 'image/jpeg', 'image/png'],
        filesExtensions: ['txt', 'pdf', 'text/plain', 'application/pdf'],
        showPreview: true,
        autoupload: true,
        speedProgress: true,
        url: '/api/v1/file',
        query: 'filename',
        credentials: false,
        headers: [],
        authToken: null,
        authTokenPrefix: 'Bearer',
        iconsPath: '',
        viewCounter: false,
        showFilename: false
    };

    protected fileuploaderLangs: FileUploaderLangs = {
        addFileButton: '<i class="fa fa-plus" aria-hidden="true"></i> Adicionar',
        uploadButton: '<i class="fa fa-upload" aria-hidden="true"></i> Upload',
        clearAllButton: '<i class="fa fa-trash-o" aria-hidden="true"></i> Limpar',
        removeFile: '<i class="fa fa-times"></i>',
        zeroBytes: '0 Byte',
        uploadedCounter: 'files is uploaded',
        extensionNotAllowed: 'Extensão não permitida para upload',
        maxNumberOfFiles: 'O número máximo de arquivos é ' + this.fileuploaderSettings.maxNumberOfFiles
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
        generate: 'Gerar'
    };

    /**
     * Validate
     */
    protected validateLangs: ValidateLangs = {
        email: 'Informe um e-mail válido',
        password: 'Senha incorreta',
        required: 'Campo obrigatório',
        minlength: 'Campo precisa ter pelo menos :requiredLength characters',
        maxlength: 'Limite de :requiredLength characters',
        int: 'Campo deve ser um número inteiro',
        number: 'Campo deve ser um número',
        date: 'Informe uma data válida',
        minDate: 'Field must be at least :date date',
        maxDate: 'Field may not be greater than :date date',
        equal: 'Field must be equal :equal',
        max: 'Field may not be greater than :max number',
        min: 'Field must be at least :min number',
        range: 'Field must be between :min and :max',
        json: 'Field must be valid json',
        boolean: 'Field must be true or false',
        hex: 'Field must be valid hex color',
        rgb: 'Field must be valid rgb color',
        alphaNumeric: 'O campo deve conter caracteres alfanumericos.'
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
