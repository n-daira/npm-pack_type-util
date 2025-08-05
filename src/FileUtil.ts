export class FileUtil {
    public static async toBase64(file: File, isExcludeUri: boolean = true): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;

                if (isExcludeUri) {
                    resolve(result.split(',')[1]);
                } else {
                    resolve(result);
                }
            };
            reader.onerror = error => reject(error);
        });
    }

    public static async getImageSize(file: File): Promise<{h: number, w: number, aspectRatio: number}> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve({h: img.height, w: img.width, aspectRatio: img.width / img.height});
            };
            img.onerror = () => {
                reject(new Error('Failed to load image for size calculation'));
            };

            // ファイルをURLに変換する
            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target?.result as string;
            };
            reader.onerror = () => {
                reject(new Error('Failed to read file data'));
            };
            reader.readAsDataURL(file);
        });
    }

    public static isSameRatio(file: File, aspect: number, tolerance?: number): Promise<boolean>;
    public static isSameRatio(file: File, size: {w: number; h: number}, tolerance?: number): Promise<boolean>;
    public static async isSameRatio(file: File, param2: {w: number; h: number} | number, tolerance: number = 0.1): Promise<boolean> {
        try {
            const imageSize = await this.getImageSize(file);
            const ratio = typeof param2 === 'number' ? param2 : param2.w / param2.h;
            return Math.abs(imageSize.aspectRatio - ratio) < tolerance;
        } catch {
            return false;
        }
    }
}