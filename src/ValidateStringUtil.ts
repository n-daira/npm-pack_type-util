export class ValidateStringUtil {
    public static isUUID(value: any): value is string {
        if (typeof value !== 'string') {
            return false;
        }

        const pattern = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$');
        return pattern.test(value);
    }

    public static isHttps(value: any, extensions?: string[] | string): value is string {
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

    public static isExistExtension(value: any, extensions: string[]): value is string {
        if (typeof value !== 'string') {
            return false;
        }

        const extension = value.split(".").pop();
        return extensions.includes(extension ?? '');
    }
}