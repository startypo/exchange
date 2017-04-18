export interface FileUploaderSettings {
    color?: string;
    size?: string;
    multiple?: boolean;
    filterExtensions?: boolean;
    allowedExtensions?: string[];
    imagesExtensions?: string[];
    filesExtensions?: string[];
    showPreview?: boolean;
    autoupload?: boolean;
    speedProgress?: boolean;
    xhrMethod?: string;
    xhrUrl?: string;
    xhrCredentials?: boolean;
    xhrHeaders?: string[];
    xhrAuthToken?: string;
    xhrAuthTokenPrefix?: string;
    iconsPath?: string;
    viewCounter?: boolean;
}

export interface FileUploaderLangs {
    buttonText?: string;
    extensionNotAllowed?: string;
    zeroBytes?: string;
    removeFile?: string;
    uploadedCounter?: string;
    clearAll?: string;
}
