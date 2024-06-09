import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStateStore = defineStore('stateStore', () => {
  const appState = ref(0)

  const refresh = () => {
    appState.value += 1
    console.debug('New state:', appState.value)
  }

  return { state: appState, refresh }
})
