import { defineStore } from 'pinia'

export const useLastUpdatedStore = defineStore('lastUpdatedStore', {
  state: () => ({
    lastUpdatedAt: new Date() as Date | null
  }),
  actions: {
    updateTimestamp() {
      this.lastUpdatedAt = new Date()
    }
  }
})
