
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
	return (
		<Html lang="es">
			<Head>
				<meta charSet="UTF-8" />
				<link rel="icon" href="/favicon.svg" />

				{/* Meta */}
				<meta name="author" content="Cosmo" />
				<meta name="theme-color" content="#071a3d" />
				<meta
					name="description"
					content="Triveum es un juego de preguntas y trivia donde puedes poner a prueba tus conocimientos. Selecciona diferentes modos de juego y categorías, y utiliza comodines para ayudarte a responder."
				/>
				<meta name="robots" content="index, nofollow" />

				{/* Open Graph */}
				<meta property="og:title" content="Triveum" />
				<meta property="og:type" content="website" />
				<meta
					property="og:image"
					content="https://repository-images.githubusercontent.com/593410779/0555ac47-4bd6-49a9-8869-5b1ec84a58f6"
				/>
				<meta property="og:url" content="https://quizi.vercel.app" />
				<meta
					property="og:description"
					content="Pon a prueba tus conocimientos con Triveum. Disfruta de diferentes modos de juego, categorías y comodines."
				/>

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@Cosmoart" />
				<meta name="twitter:creator" content="@Cosmoart" />
				<meta name="twitter:title" content="Triveum" />
				<meta
					name="twitter:description"
					content="Pon a prueba tus conocimientos con Triveum. Disfruta de diferentes modos de juego, categorías y comodines."
				/>
				<meta
					name="twitter:image"
					content="https://repository-images.githubusercontent.com/593410779/0555ac47-4bd6-49a9-8869-5b1ec84a58f6"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
