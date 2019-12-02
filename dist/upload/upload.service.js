"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const AWS_S3_BUCKET_NAME = 'drenarm-resources';
const s3 = new AWS.S3({
    endpoint: 'sfo2.digitaloceanspaces.com', accessKeyId: 'KRHTNE6L56ZL5O3I3CAC',
    secretAccessKey: 'PTw9+eyo2S0uhADjllA/omEtq4UmDUMqtdWcKepShBk'
});
let UploadService = class UploadService {
    constructor() {
        this.upload = multer({
            storage: multerS3({
                s3: s3,
                bucket: AWS_S3_BUCKET_NAME,
                contentType: multerS3.AUTO_CONTENT_TYPE,
                acl: 'public-read',
                key: function (request, file, cb) {
                    cb(null, `capacitacion/${Date.now().toString()}-${file.originalname.replace(/\s+/g, '')}`);
                },
            }),
        }).array('upload', 1);
    }
    fileupload(req, res, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                switch (folder) {
                    case '1':
                        this.upload(req, res, function (error) {
                            if (error) {
                                console.log(error);
                                return res.status(404).json(`Failed to upload image file: ${error}`);
                            }
                            return res.status(201).json(req.files[0].location);
                        });
                        break;
                    default:
                        console.log("default");
                        break;
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json(`Failed to upload image file: ${error}`);
            }
        });
    }
};
__decorate([
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], UploadService.prototype, "fileupload", null);
UploadService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map