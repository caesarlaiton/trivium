// Función para reproducir un efecto de sonido
export default function playSound (sound, volume = 0.25) {
	// Verificamos si el sonido está activado en las preferencias del usuario
	if (localStorage.getItem('sound') === 'true') {
		// Creamos una nueva instancia de audio con la ruta del archivo
		const audio = new Audio(`/sounds/${sound}.mp3`)
		// Establecemos el volumen indicado
		audio.volume = volume
		// Reproducimos el sonido
		audio.play()
	}
}
