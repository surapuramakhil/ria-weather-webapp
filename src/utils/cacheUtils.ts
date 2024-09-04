interface CacheData<T> {
    data: T
    expiresAt: number | null
}

export function setCachedData<T>(key: string, data: T, expirationTime?: number): void {
    try {
        const cacheData: CacheData<T> = {
            data: data,
            expiresAt: expirationTime ? Date.now() + expirationTime : null
        }
        localStorage.setItem(key, JSON.stringify(cacheData))
    } catch (error) {
        // Handle the error here
        console.error("Error while setting cached data:", error)
    }
}

export function getCachedData<T>(key: string): T | null {
    const cachedData = localStorage.getItem(key)
    if (!cachedData) return null

    const parsedData: CacheData<T> = JSON.parse(cachedData)

    if (parsedData.expiresAt !== null && Date.now() > parsedData.expiresAt) {
        localStorage.removeItem(key)
        return null
    }

    return parsedData.data
}