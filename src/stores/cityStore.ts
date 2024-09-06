import { defineStore } from 'pinia'
import { fetchCitiesCSV, parseCitiesCSV, type City } from '@/services/cityService'
import MiniSearch from 'minisearch'
import { getCachedData, setCachedData } from '@/utils/cacheUtils'

const CITIES_MINI_SEARCH_CACHE_KEY = 'citiesMiniSearch';

export const useCityStore = defineStore('cityStore', {
  state: () => ({
    miniSearch: null as MiniSearch<City> | null,
    cities: [] as City[]
  }),
  actions: {
    async loadCities() {
      const cachedIndex = await getCachedData<{index: any, cities: City[]}>(CITIES_MINI_SEARCH_CACHE_KEY)
      
      if (cachedIndex) {
        try {
          this.miniSearch = MiniSearch.loadJS(cachedIndex.index, {
            fields: ['name'],
            storeFields: ['id', 'name', 'lat', 'lon', 'country', 'state_code', 'country_code']
          });
          this.cities = cachedIndex.cities;
          console.debug('Loaded cities index from cache:', this.miniSearch)
          return
        } catch (error) {
          console.error('Failed to load cached index:', error)
          // If loading from cache fails, proceed to fetch and create a new index
        }
      }

      const csvData = await fetchCitiesCSV()
      this.cities = parseCitiesCSV(csvData)
      this.miniSearch = new MiniSearch({
        fields: ['name'], 
        storeFields: ['id', 'name', 'lat', 'lon', 'country', 'state_code', 'country_code'] 
      })
      this.miniSearch.addAll(this.cities);
      await setCachedData(CITIES_MINI_SEARCH_CACHE_KEY, {
        index: this.miniSearch.toJSON(),
        cities: this.cities
      })
      console.debug('Indexed cities:', this.miniSearch)
    }
  },
  getters: {
    getCity: (state) => (name: string): City[] => {
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

      // Fallback to filtering the cities array if miniSearch is not available
      return state.cities.filter((city) => city.name.toLowerCase().includes(name.toLowerCase()))
    },
  }
})
