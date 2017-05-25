export interface FileUploaderSettings {
    color?: string;
    size?: string;
    maxNumberOfFiles?: number;
    filterExtensions?: boolean;
    allowedExtensions?: string[];
    imagesExtensions?: string[];
    filesExtensions?: string[];
    showPreview?: boolean;
    autoupload?: boolean;
    speedProgress?: boolean;
    url?: string;
    query?: string;
    credentials?: boolean;
    headers?: string[];
    authToken?: string;
    authTokenPrefix?: string;
    iconsPath?: string;
    viewCounter?: boolean;
    showFilename?: boolean;
}

export interface FileUploaderLangs {
    addFileButton?: string;
    uploadButton?: string;
    clearAllButton?: string;
    extensionNotAllowed?: string;
    zeroBytes?: string;
    removeFile?: string;
    uploadedCounter?: string;
    maxNumberOfFiles?: string;
}
