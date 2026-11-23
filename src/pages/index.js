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
				<title>Trivium | Trivia y conocimiento</title>
				<meta
					name='description'
					content='Pon a prueba tus conocimientos con Trivium.'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>

			<main className='trivium-home'>
				<aside className='trivium-home__hero'>
					<MainHome />
				</aside>

				<section className='trivium-home__content'>
					<div className='trivium-home__modes'>
						<GameModes />
					</div>

					<div className='trivium-home__categories'>
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

				.trivium-home {
					display: grid;
					grid-template-columns: minmax(320px, 0.85fr) minmax(0, 1.15fr);
					width: 100%;
					min-height: 100vh;
					background: #f1f5f9;
				}

				.trivium-home__hero {
					position: relative;
					display: flex;
					min-width: 0;
					min-height: 100vh;
					background: #172554;
					overflow: hidden;
				}

				.trivium-home__content {
					display: flex;
					flex-direction: column;
					justify-content: center;
					gap: 28px;
					min-width: 0;
					padding: 28px clamp(20px, 3vw, 48px);
				}

				.trivium-home__modes,
				.trivium-home__categories {
					width: 100%;
					min-width: 0;
				}

				/* Portátiles y pantallas de poca altura */
				@media (min-width: 1024px) and (max-height: 800px) {
					.trivium-home__content {
						gap: 18px;
						padding-top: 18px;
						padding-bottom: 18px;
					}
				}

				/* Tablet */
				@media (max-width: 1023px) {
					.trivium-home {
						grid-template-columns: 1fr;
					}

					.trivium-home__hero {
						min-height: 390px;
					}

					.trivium-home__content {
						gap: 30px;
						padding: 35px clamp(22px, 5vw, 55px);
					}
				}

				/* Móviles */
				@media (max-width: 600px) {
					.trivium-home__hero {
						min-height: 350px;
					}

					.trivium-home__content {
						gap: 28px;
						padding: 28px 18px;
					}
				}
			`}</style>
		</>
	)
}
