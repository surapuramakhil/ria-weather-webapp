import { useFetch } from '@vueuse/core'
import { computed } from 'vue'
import { useLastUpdatedStore } from '@/store/LastUpdatedStore'

export async function useCustomFetch(url: string, options = {}) {
  const { data, isFetching, error, execute } = await useFetch(url, options).get().json()

  console.log('error', error)

  const hasError = computed(() => !!error.value)
  const lastUpdateStore = useLastUpdatedStore()
  lastUpdateStore.updateTimestamp()

  return {
    data,
    isFetching,
    error,
    hasError,
    execute
  }
}
