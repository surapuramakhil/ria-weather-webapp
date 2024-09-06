import type { CacheData } from "@/types/cacheTypes";


export class LocalStorageUtils {

    static setItem<T>(key: string, value: CacheData<T>): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error while setting localStorage data:", error);
        }
    }

    static getItem<T>(key: string): CacheData<T> | null {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error("Error while getting localStorage data:", error);
            return null;
        }
    }

    static removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("Error while removing localStorage data:", error);
        }
    }

}
