import { create } from 'zustand'
import { useWildcardsStore } from './useWildcards'
import { useQueriesStore } from './useQueries'
import { useQuestionsStore } from './useQuestions'

// Combinar los slices usando Zustand para guardar los estados del juego

export const useBoundStore = create((...a) => ({
	...useWildcardsStore(...a),
	...useQueriesStore(...a),
	...useQuestionsStore(...a)
}))
