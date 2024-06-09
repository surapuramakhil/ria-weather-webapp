import { useFetch } from '@vueuse/core'
import { computed } from 'vue'
import { useLastUpdatedStore } from '@/stores/LastUpdatedStore'

export async function useCustomFetch(url: string, options = {}) {
  const { data, isFetching, error, execute } = await useFetch(url, options).get().json()

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
