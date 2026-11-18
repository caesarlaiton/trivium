// Cantidad inicial de comodines disponibles
const defaultWildCards = { skip: 1, half: 1, lives: 1 }

// Estado encargado de manejar la lógica de los comodines
export const useWildcardsStore = (set, get) => ({
	wildCards: defaultWildCards,

	// Saltar pregunta: busca la respuesta correcta y hace clic automáticamente
	useSkipCard: () => {
		document.querySelectorAll(`.answers-${get().currentQuestion} button`).forEach(answer => {
			if (answer.textContent === get().questions[get().currentQuestion - 1].correctAnswer) {
				answer.click()
			}
		})
		get().setUserAnswer(get().currentQuestion - 1, 2)
		set(state => ({ wildCards: { ...state.wildCards, skip: state.wildCards.skip - 1 } }))
	},

	// 50/50: elimina dos respuestas incorrectas
	useHalfCard: () => {
		set(state => ({ wildCards: { ...state.wildCards, half: state.wildCards.half - 1 } }))

		const answers = document.querySelectorAll(`.answers-${get().currentQuestion} button`)
		const correct = get().questions[get().currentQuestion - 1].correctAnswer
		const wrongs = [...answers].filter(answer => answer.textContent !== correct)

		wrongs.sort(() => Math.random() - 0.5).slice(0, 2).forEach(wrong => {
			wrong.classList.add('wrongAnswer')
			wrong.parentNode.classList.add('vibrate')
			wrong.disabled = true
		})
	},

	// Restar una vida: se usa cuando el tiempo se acaba o se falla
	useLivesCard: () => set(state => ({ wildCards: { ...state.wildCards, lives: state.wildCards.lives - 1 } })),

	// Reinicia los comodines a su estado inicial
	cleanWildCards: () => set({ wildCards: defaultWildCards })
})
