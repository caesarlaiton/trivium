
import Head from 'next/head'
import MainHome from '@/components/Home/MainHome'
import GameModes from '@/components/Home/GameModes'
import Categories from '@/components/Home/Categories'
import { useEffect } from 'react'

export default function Main () {
	useEffect(() => {
		window.onbeforeunload = () => null
	}, [])

	return (
		<>
			<Head>
				<title>Triveum | Trivia y conocimiento</title>
				<meta
					name='description'
					content='Pon a prueba tus conocimientos con Triveum.'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>

			<main className='triveum-home'>
				<aside className='triveum-home__hero'>
					<MainHome />
				</aside>

				<section className='triveum-home__content'>
					<div className='triveum-home__modes'>
						<GameModes />
					</div>

					<div className='triveum-home__categories'>
						<Categories />
					</div>
				</section>
			</main>

			<style jsx global>{`
				#__next {
					display: block;
					width: 100%;
					min-height: 100%;
				}

				html,
				body {
					margin: 0;
					min-height: 100%;
				}

				.triveum-home {
					display: grid;
					grid-template-columns: minmax(320px, 0.85fr) minmax(0, 1.15fr);
					width: 100%;
					min-height: 100vh;
					background: #f1f5f9;
				}

				.triveum-home__hero {
					position: relative;
					display: flex;
					min-width: 0;
					min-height: 100vh;
					background: #172554;
					overflow: hidden;
				}

				.triveum-home__content {
					display: flex;
					flex-direction: column;
					justify-content: center;
					gap: 28px;
					min-width: 0;
					padding: 28px clamp(20px, 3vw, 48px);
				}

				.triveum-home__modes,
				.triveum-home__categories {
					width: 100%;
					min-width: 0;
				}

				/* Portátiles y pantallas de poca altura */
				@media (min-width: 1024px) and (max-height: 800px) {
					.triveum-home__content {
						gap: 18px;
						padding-top: 18px;
						padding-bottom: 18px;
					}
				}

				/* Tablet */
				@media (max-width: 1023px) {
					.triveum-home {
						grid-template-columns: 1fr;
					}

					.triveum-home__hero {
						min-height: 390px;
					}

					.triveum-home__content {
						gap: 30px;
						padding: 35px clamp(22px, 5vw, 55px);
					}
				}

				/* Móviles */
				@media (max-width: 600px) {
					.triveum-home__hero {
						min-height: 350px;
					}

					.triveum-home__content {
						gap: 28px;
						padding: 28px 18px;
					}
				}
			`}</style>
		</>
	)
}
