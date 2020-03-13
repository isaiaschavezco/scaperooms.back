/// <reference types="express" />
export declare class UploadService {
    constructor();
    fileupload(req: any, res: any, folder: string): Promise<any>;
    upload: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary>;
    uploadProduct: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary>;
    uploadCampaing: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary>;
    uploadBlog: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary>;
    uploadUser: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary>;
}
