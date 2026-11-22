import offlineQuestions from '@/assets/questions.json'

// Baraja un array de forma aleatoria
const randomArray = (arr) => arr.toSorted(() => 0.5 - Math.random())

// Función principal para obtener las preguntas de la partida
export default async function getQuestions (topics, qNumber) {
	const randomTopics = randomArray(topics)
	const messyTopics = []

	// Mezclamos los temas y los repetimos si hacen falta más preguntas que temas disponibles
	for (let i = 0; i < qNumber; i++) messyTopics.push(randomTopics[i % topics.length])

	// Función interna para obtener las preguntas desde el archivo local
	function getOfflineQuestions () {
		const questionsPerTopic = {}

		// Contamos cuántas preguntas necesitamos extraer de cada tema
		messyTopics.forEach(topic => {
			questionsPerTopic[topic] = (questionsPerTopic[topic] || 0) + 1
		})

		const questions = []

		// Extraemos las preguntas de cada tema y randomizamos sus respuestas
		Object.keys(questionsPerTopic).forEach(topic => {
			randomArray(offlineQuestions[topic]).slice(0, questionsPerTopic[topic]).forEach(question => {
				questions.push({
					...question,
					topic,
					answers: randomArray(question.answers),
					userAnswer: undefined,
					ia: false
				})
			})
		})

		return questions
	}

	// En entorno de desarrollo, simulamos un pequeño retraso de carga
	/*if (process.env.NODE_ENV === 'development') {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				// const error = new Error('Custom error')
				// error.statusCode = 350
				// reject(error)

				resolve(randomArray(getOfflineQuestions()))
			}, 1 * 1000)
		})
	}*/

	const iaQuestions = fetch('/api/questions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ topics: messyTopics.slice(0, 3) })
	}).then(res => res.json())
		.then(data => {
			if (data.statusCode >= 400) {
				const error = new Error(data.message)
				error.statusCode = data.status
				throw error
			} else return data
		})
		.catch(err => {
			console.log(err)
			throw err
		})

	return iaQuestions
		.then(iaQuestions => randomArray([
			...iaQuestions,
			...getOfflineQuestions().slice(iaQuestions.length)
		]))
		.catch(() => randomArray(getOfflineQuestions()))
}
