import { defineStore } from 'pinia'
import { fetchCitiesCSV, parseCitiesCSV, type City } from '@/services/cityService'
import MiniSearch from 'minisearch'

export const useCityStore = defineStore('cityStore', {
  state: () => ({
    cities: [] as City[],
    miniSearch: null as MiniSearch<City> | null
  }),
  actions: {
    async loadCities() {
      const csvData = await fetchCitiesCSV()
      this.cities = parseCitiesCSV(csvData)
      this.miniSearch = new MiniSearch({
        fields: ['name'], // Fields to index for full-text search
        storeFields: ['id', 'name', 'lat', 'lon', 'country', 'state_code', 'country_code'] // Fields to return with search results
      })
      this.miniSearch.addAll(this.cities)
      console.log('Indexed cities:', this.miniSearch)
    }
  },
  getters: {
    getCity:
      (state) =>
      (name: string): City[] => {
        console.debug('Searching for city:', name)

        if (!name) {
          return []
        }

        if (state.miniSearch) {
          const res = state.miniSearch.search(name).map((result) => ({
            id: result.id,
            name: result.name,
            lat: result.lat,
            lon: result.lon,
            country: result.country,
            state_code: result.state_code,
            country_code: result.country_code
          }))
          console.debug('Search results:', res)
          return res
        }

        return state.cities.filter((city) => city.name.includes(name))
      },
    getFirstCity: (state) => () => {
      return state.cities[0]
    }
  }
})
