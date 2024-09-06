import type { CacheData } from "@/types/cacheTypes";

const DB_NAME = 'CacheDB';
const STORE_NAME = 'cacheStore';
const DB_VERSION = 1;

export class IndexedDBUtils {
    private static openDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                db.createObjectStore(STORE_NAME);
            };
        });
    }

    static async setItem<T>(key: string, value: CacheData<T>): Promise<void> {
        try {
            const db = await this.openDB();
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);

            await new Promise<void>((resolve, reject) => {
                const request = store.put(JSON.stringify(value), key);
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });

            db.close();
        } catch (error) {
            console.error("Error while setting IndexedDB data:", error);
        }
    }

    static async getItem<T>(key: string): Promise<CacheData<T> | null> {
        try {
            const db = await this.openDB();
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);

            const result = await new Promise<string | undefined>((resolve, reject) => {
                const request = store.get(key);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });

            db.close();
            return result ? JSON.parse(result) : null;
        } catch (error) {
            console.error("Error while getting IndexedDB data:", error);
            return null;
        }
    }

    static async removeItem(key: string): Promise<void> {
        try {
            const db = await this.openDB();
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);

            await new Promise<void>((resolve, reject) => {
                const request = store.delete(key);
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });

            db.close();
        } catch (error) {
            console.error("Error while removing IndexedDB data:", error);
        }
    }
}
