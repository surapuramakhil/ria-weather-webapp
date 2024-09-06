export interface CacheData<T> {
    data: T;
    expiresAt: number | null;
}
