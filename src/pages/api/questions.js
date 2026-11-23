export default async function handler (req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Solo se permiten peticiones POST', statusCode: 405 })
	}
	if (!req.body.topics || !Array.isArray(req.body.topics)) {
		return res.status(400).json({ message: 'Se requieren los temas (topics)', statusCode: 400 })
	}

	const apiKey = process.env.COHERE_API_KEY
	if (!apiKey) {
		return res.status(500).json({ message: 'COHERE_API_KEY no está configurada', statusCode: 500 })
	}

	// Control de timeout cancelable a 30 segundos
	const controller = new AbortController()
	const timeout = setTimeout(() => controller.abort(), 30000)

	try {
		const topicsList = req.body.topics.join(', ')

		const response = await fetch('https://api.cohere.com/v2/chat', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json'
			},
			signal: controller.signal,
			body: JSON.stringify({
				model: 'command-r7b-12-2024',
				response_format: { type: 'json_object' },
				max_tokens: 500,
				messages: [
					{
						role: 'system',
						content:
							'Eres un generador de preguntas de trivia para un juego. Genera un objeto JSON con una propiedad "questions", que contenga un arreglo de 3 preguntas de trivia en español sobre los temas solicitados. Cada objeto de pregunta debe tener exactamente los campos: "question" (string), "topic" (string), "answers" (arreglo de 4 strings: 1 respuesta correcta y 3 distractores incorrectos), y "correctAnswer" (string idéntico a la opción correcta contenida en answers).'
					},
					{
						role: 'user',
						content: `Genera 3 preguntas de trivia en español para los temas: ${topicsList}.`
					}
				]
			})
		})

		clearTimeout(timeout)

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}))
			throw new Error(errorData.message || `Error de API Cohere: ${response.status}`)
		}

		const data = await response.json()
		const contentText = data.message?.content?.[0]?.text
		if (!contentText) {
			throw new Error('Respuesta vacía de Cohere')
		}

		const parsed = JSON.parse(contentText)
		const rawQuestions = Array.isArray(parsed) ? parsed : (parsed.questions || Object.values(parsed)[0] || [])

		if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) {
			throw new Error('Formato de preguntas inválido devuelto por Cohere')
		}

		// Estructura exacta esperada por el Frontend
		const formattedQuestions = rawQuestions.slice(0, 3).map((q, idx) => {
			const rawAnswers = Array.isArray(q.answers) ? q.answers.map(a => String(a).trim()) : []
			const correctAnswer = typeof q.correctAnswer === 'string' ? q.correctAnswer.trim() : String(rawAnswers[0] || '')

			// Aseguramos que la respuesta correcta esté estrictamente dentro de answers
			const answers = [...rawAnswers]
			if (!answers.includes(correctAnswer)) {
				if (answers.length < 4) answers.push(correctAnswer)
				else answers[0] = correctAnswer
			}

			// Barajamos las opciones para que la correcta no quede siempre en la primera posición
			answers.sort(() => Math.random() - 0.5)

			return {
				question: typeof q.question === 'string' ? q.question.trim() : 'Pregunta sin título',
				topic: typeof q.topic === 'string' ? q.topic.trim() : (req.body.topics[idx] || 'General'),
				answers,
				correctAnswer,
				userAnswer: undefined,
				ia: true
			}
		})

		return res.status(200).json(formattedQuestions)
	} catch (err) {
		clearTimeout(timeout)
		console.error('Error en /api/questions:', err.message)
		return res.status(500).json({
			message: err.message || 'Error al generar preguntas con IA',
			statusCode: 500
		})
	}
}
