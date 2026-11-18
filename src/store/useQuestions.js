import getQuestions from '@/helpers/getQuestions'

// Estado encargado de manejar el flujo del juego y las preguntas
export const useQuestionsStore = (set, get) => ({
	// Variables de estado
	questions: [],
	loading: false,
	loadingInfinity: false,
	error: [false, ''],
	currentQuestion: 1,
	score: 1,
	win: undefined,

	// Función asíncrona para cargar nuevas preguntas
	getQuestions: (topics, number, infinity) => {
		// Mostramos el loader correspondiente según el modo
		infinity ? set({ loadingInfinity: true }) : set({ loading: true })
		getQuestions(topics, number)
			.then(data => set({ questions: data }))
			.catch(err => set({ error: [true, err] }))
			.finally(() => infinity ? set({ loadingInfinity: false }) : set({ loading: false }))
	},

	// Actualiza el índice de la pregunta actual
	setCurrentQuestion: (number) => set({ currentQuestion: number }),

	// Guarda la respuesta del usuario
	setUserAnswer: (question, answer) => {
		if (get().queries.infinitymode) return // Si es infinito, no guardamos el historial de respuestas
		set(state => {
			const questions = [...state.questions]
			questions[question].userAnswer = answer
			return { questions }
		})
	},

	// Reinicia el estado del juego para una nueva partida
	cleanQuestions: () => set({ questions: [], score: 1, currentQuestion: 1, win: undefined }),

	// Setters directos para el progreso y el fin del juego
	setScore: (score) => set({ score }),
	setWin: (win) => set({ win })
})
