import { useFetch } from '@vueuse/core'
import { computed } from 'vue'
import { useLastUpdatedStore } from '@/stores/LastUpdatedStore'

export function useCustomFetch(url: string, options = {}) {
  const { data, isFetching, error, execute } = useFetch(url, options)

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
