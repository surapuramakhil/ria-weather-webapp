import { defineStore } from 'pinia'

export const useStateStore = defineStore('stateStore', {
  state: () => ({
    count: 0
  }),
  actions: {
    refresh() {
      this.count++
    }
  },
  getters: {
    getState: (state) => () => state.count
  }
})
