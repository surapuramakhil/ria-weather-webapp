import Papa from 'papaparse'

export const fetchCitiesCSV = async (): Promise<string> => {
  const response = await fetch(`${import.meta.env.BASE_URL}/src/assets/cities_20000.csv`)
  const csvData = await response.text()
  return csvData
}

export interface City {
  id: string
  name: string
  country: string
  lat: string
  lon: string
  state_code: string
  country_code: string
}

export const parseCitiesCSV = (csvData: string): City[] => {
  const parsedData = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true
  })
  return parsedData.data as City[]
}
