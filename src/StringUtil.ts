export class StringUtil {
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

    /**
     * 値がメールアドレス形式であるかどうかを検証します
     * Validates if the given value is in the format of an email address
     * @param value - 検証する値, The value to be validated
     * @returns {boolean} - 値がメールアドレス形式であるかどうか, Whether the value is in the format of an email address
     */
    public static isMail(value: any) {
        if (typeof value !== 'string') {
            return false;
        }

        const pattern = new RegExp('^[a-zA-Z0-9_%+-]+([.][a-zA-Z0-9_%+-]+)*@[a-zA-Z0-9]+([-.]?[a-zA-Z0-9]+)*\\.[a-zA-Z]{2,}$');
        return pattern.test(value);
    }

    public static isBase64(value: any): value is string {
        if (typeof value !== 'string') {
            return false;
        }

        // Data URIの場合はBase64部分だけ抽出
        if (value.startsWith('data:')) {
            const parts = value.split(',');
            if (parts.length !== 2) {
                return false;
            }
            value = parts[1];
        }

        if (value.length % 4 !== 0) {
            return false;
        }
        
        // 基本的なbase64パターン
        // 使用可能な文字
        // ・ アルファベット（A-Z, a-z）
        // ・ 数字（0-9）
        // ・ +と/（基本文字）
        // ・ =（パディング文字）
        const base64Pattern = /^[A-Za-z0-9+/]*={0,2}$/;
        return base64Pattern.test(value);
    }

    public static isEmpty(value: string | null | undefined): value is string {
        if (value === undefined || value === null) {
            return true;
        }

        return value.length === 0;
    }
}