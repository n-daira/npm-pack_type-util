"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateStringUtil = void 0;
class ValidateStringUtil {
    static isUUID(value) {
        if (typeof value !== 'string') {
            return false;
        }
        const pattern = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$');
        return pattern.test(value);
    }
    static isHttps(value, extensions) {
        if (typeof value !== 'string') {
            return false;
        }
        if (value.startsWith("https://") === false) {
            return false;
        }
        if (extensions === undefined) {
            return true;
        }
        return this.isExistExtension(value, typeof extensions === 'string' ? [extensions] : extensions);
    }
    static isExistExtension(value, extensions) {
        if (typeof value !== 'string') {
            return false;
        }
        const extension = value.split(".").pop();
        return extensions.includes(extension !== null && extension !== void 0 ? extension : '');
    }
}
exports.ValidateStringUtil = ValidateStringUtil;
