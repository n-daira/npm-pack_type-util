"use strict";
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
exports.FileUtil = void 0;
class FileUtil {
    static toBase64(file_1) {
        return __awaiter(this, arguments, void 0, function* (file, isExcludeUri = true) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const result = reader.result;
                    if (isExcludeUri) {
                        resolve(result.split(',')[1]);
                    }
                    else {
                        resolve(result);
                    }
                };
                reader.onerror = error => reject(error);
            });
        });
    }
    static getImageSize(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    resolve({ h: img.height, w: img.width, aspectRatio: img.width / img.height });
                };
                img.onerror = () => {
                    reject(new Error('Failed to load image for size calculation'));
                };
                // ファイルをURLに変換する
                const reader = new FileReader();
                reader.onload = (e) => {
                    var _a;
                    img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                };
                reader.onerror = () => {
                    reject(new Error('Failed to read file data'));
                };
                reader.readAsDataURL(file);
            });
        });
    }
    static isSameRatio(file_1, param2_1) {
        return __awaiter(this, arguments, void 0, function* (file, param2, tolerance = 0.1) {
            try {
                const imageSize = yield this.getImageSize(file);
                const ratio = typeof param2 === 'number' ? param2 : param2.w / param2.h;
                return Math.abs(imageSize.aspectRatio - ratio) < tolerance;
            }
            catch (_a) {
                return false;
            }
        });
    }
    static convertUrlToFile(imageUrl, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // URLからデータを取得
                const response = yield fetch(imageUrl);
                const blob = yield response.blob();
                // BlobからFileオブジェクトを作成
                const file = new File([blob], fileName, { type: blob.type });
                return file;
            }
            catch (error) {
                throw error;
            }
        });
    }
    ;
}
exports.FileUtil = FileUtil;
