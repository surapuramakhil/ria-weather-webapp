// src/stores/cityStore.ts
import { defineStore } from 'pinia'
import { fetchCitiesCSV, parseCitiesCSV, type City } from '@/services/cityService'

export const useCityStore = defineStore('cityStore', {
  state: () => ({
    cities: [] as City[]
  }),
  actions: {
    async loadCities() {
      const csvData = await fetchCitiesCSV()
      this.cities = parseCitiesCSV(csvData)
    }
  },
  getters: {
    getCity: (state) => (name: string) => {
      return state.cities.filter((city) => city.name.includes(name))
    },
    getFirstCity: (state) => () => {
      return state.cities[0]
    }
  }
})
