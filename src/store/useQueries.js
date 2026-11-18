import { defaultQuery } from '@/helpers/gameConfig'

// Estado que maneja la configuración de la partida
export const useQueriesStore = (set) => ({
	queries: defaultQuery,
	setQueries: (queries) => set({ queries })
})
