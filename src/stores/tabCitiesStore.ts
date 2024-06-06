// src/stores/cityStore.ts
import { defineStore } from 'pinia'

export const useTabCitiesStore = defineStore('tabCitiesStore', {
  state: () => ({
    tabCities: ['Rio de Janeiro', 'Beijing', 'Los Angeles']
  }),
  actions: {
    addTabCities(city: string) {
      this.tabCities.push(city)
    }
  },
  getters: {
    getTabCities: (state) => () => {
      return state.tabCities
    }
  }
})
