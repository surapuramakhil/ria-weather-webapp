import { LocalStorageUtils } from './localStorageUtils';
import { IndexedDBUtils } from './indexedDBUtils';
import type { CacheData } from '@/types/cacheTypes';


const LOCAL_STORAGE_LIMIT = 1 * 1024 * 512; // 1/2 MB in bytes

export async function setCachedData<T>(key: string, data: T, expirationTime?: number): Promise<void> {
    const cacheData: CacheData<T> = {
        data: data,
        expiresAt: expirationTime ? Date.now() + expirationTime : null
    };

    const serializedData = JSON.stringify(cacheData);

    if (serializedData.length <= LOCAL_STORAGE_LIMIT) {
        LocalStorageUtils.setItem(key, cacheData);
    } else {
        await IndexedDBUtils.setItem(key, cacheData);
    }
}

export async function getCachedData<T>(key: string): Promise<T | null> {
    let cachedData = LocalStorageUtils.getItem<T>(key) || await IndexedDBUtils.getItem<T>(key);

    if (!cachedData) return null;

    if (cachedData.expiresAt !== null && Date.now() > cachedData.expiresAt) {
        await removeCachedData(key);
        return null;
    }

    return cachedData.data;
}

export async function removeCachedData(key: string): Promise<void> {
    LocalStorageUtils.removeItem(key);
    await IndexedDBUtils.removeItem(key);
}
