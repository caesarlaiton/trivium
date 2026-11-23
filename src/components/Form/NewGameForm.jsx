
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import JsxForm from './JsxForm'
import { IoCloseSharp } from 'react-icons/io5'
import playSound from '@/helpers/playSound'
import queryValidator, { defaultQuery } from '@/helpers/gameConfig'
import categoriesJSON from '@/assets/categories.json'
import { useBoundStore } from '@/store/useBoundStore'

export default function NewGameForm () {
	const { getQuestions, cleanQuestions, queries, setQueries, cleanWildCards } = useBoundStore(state => state)
	const [nowQueries, setNowQueries] = useState(queries)
	const router = useRouter()
	const dialog = useRef(null)

	useEffect(() => setNowQueries(queries), [queries])

	useEffect(() => {
		const handleOpenWithQueries = (e) => {
			const nextQueries = e.detail ? { ...defaultQuery, ...e.detail } : defaultQuery
			setQueries(nextQueries)
			setNowQueries(nextQueries)
			playSound('pop')
			if (dialog.current && !dialog.current.open) {
				dialog.current.showModal()
			}
		}
		window.addEventListener('openNewGameModal', handleOpenWithQueries)
		return () => window.removeEventListener('openNewGameModal', handleOpenWithQueries)
	}, [setQueries])

	useEffect(() => {
		if (router.isReady && router.pathname === '/play') {
			setQueries(queryValidator(router.query))
		}
	}, [router.isReady])

	function handleInputs (e) {
		if (e.target.name === 'infinitymode' || e.target.name === 'timemode') {
			e.target.checked ? playSound('pop-up-on') : playSound('pop-up-off')
			return setNowQueries({ ...nowQueries, [e.target.name]: e.target.checked })
		}

		if (e.target.name === 'categories') {
			e.target.checked ? playSound('pop-up-on') : playSound('pop-up-off')
			return setNowQueries({ ...nowQueries, [e.target.name]: e.target.checked ? [...nowQueries.categories, e.target.value] : nowQueries.categories.filter(cat => cat !== e.target.value) })
		}

		playSound('pop')
		setNowQueries({ ...nowQueries, [e.target.name]: e.target.value })
	}

	function handleSubmit (e) {
		e.preventDefault()
		cleanQuestions()
		cleanWildCards()

		const query = Object.keys(nowQueries).map(key => `${key}=${nowQueries[key]}`).join('&')
		setQueries(queryValidator(nowQueries))
		router.push({ pathname: '/play', query })

		const cate = nowQueries.categories.map(cat => categoriesJSON.find(c => c.id === cat).name)
		if (router.pathname === '/play') getQuestions(cate, nowQueries.infinitymode ? 5 : nowQueries.questions)

		closeDialog()
	}

	function clickOutsideDialog (e) {
		const rect = dialog.current.getBoundingClientRect()
		if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
			closeDialog()
		}
	}

	function closeDialog () {
		playSound('pop-down')
		dialog.current.classList.add('hide')
		function handleAnimationEnd () {
			dialog.current.classList.remove('hide')
			dialog.current.close()
			setNowQueries(queries)
			dialog.current.removeEventListener('animationend', handleAnimationEnd)
		}
		dialog.current.addEventListener('animationend', handleAnimationEnd)
	}

	return (
		<>
			<dialog
				ref={dialog}
				onClick={(e) => clickOutsideDialog(e)}
				onCancel={(e) => {
					e.preventDefault()
					closeDialog()
				}}
				id='newGameDialog'
				className='fixed left-1/2 top-1/2 m-0 max-h-[90dvh] w-[94vw] max-w-[850px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-slate-200 bg-white px-5 py-7 text-slate-900 shadow-2xl sm:px-7 md:px-9'>
				<button
					className='absolute right-4 top-4 z-10 rounded-lg p-1 text-2xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-800'
					onClick={closeDialog}
					aria-label='Cerrar'>
					<IoCloseSharp />
				</button>

				<form onSubmit={(e) => e.preventDefault()} className='pt-4'>
					<div className='mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7'>
						<JsxForm handleInputs={handleInputs} nowQueries={nowQueries}/>
					</div>

					<button
						type='submit'
						className='btn-primary w-full rounded-xl py-3.5 text-sm font-bold uppercase tracking-widest'
						onClick={(e) => handleSubmit(e)}>Nueva partida
					</button>
				</form>
			</dialog>

			<style jsx global>{`
				.new-game-dialog {
					max-height: calc(100dvh - 32px);
					border: 1px solid #e2e8f0;
					border-radius: 20px;
					background: #ffffff;
					color: #0f172a;
					box-shadow: 0 25px 70px rgba(15, 23, 42, 0.25);
					scrollbar-width: thin;
					scrollbar-color: #cbd5e1 transparent;
				}

				.new-game-dialog::backdrop {
					background: rgba(15, 23, 42, 0.72);
					backdrop-filter: blur(6px);
				}

				.new-game-dialog[open] {
					animation: new-game-appear 0.25s ease-out;
				}

				.new-game-dialog.hide {
					animation: new-game-disappear 0.2s ease-in forwards;
				}

				.new-game-form__content {
					display: flex;
					flex-direction: column;
					gap: 20px;
					min-width: 0;
				}

				.new-game-form__content label {
					color: #334155;
					font-size: 13px;
					font-weight: 600;
				}

				.new-game-form__content input:not([type='checkbox']):not([type='radio']):not([type='range']),
				.new-game-form__content select,
				.new-game-form__content textarea {
					width: 100%;
					min-height: 42px;
					border: 1px solid #e2e8f0;
					border-radius: 10px;
					background: #f8fafc;
					padding: 9px 12px;
					color: #0f172a;
					font-size: 13px;
					transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
				}

				.new-game-form__content input:focus,
				.new-game-form__content select:focus,
				.new-game-form__content textarea:focus {
					border-color: #3b82f6;
					background: #ffffff;
					outline: none;
					box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
				}

				.new-game-form__content input[type='checkbox'],
				.new-game-form__content input[type='radio'] {
					accent-color: #2563eb;
				}

				.new-game-form__content input[type='range'] {
					accent-color: #2563eb;
				}

				.new-game-form__content fieldset {
					min-width: 0;
					border: 1px solid #e2e8f0;
					border-radius: 14px;
					padding: 15px;
				}

				.new-game-form__content legend {
					padding: 0 7px;
					color: #172554;
					font-size: 13px;
					font-weight: 800;
				}

				.new-game-form__content p {
					line-height: 1.6;
				}

				@keyframes new-game-appear {
					from {
						opacity: 0;
						transform: translate(-50%, -48%) scale(0.97);
					}
					to {
						opacity: 1;
						transform: translate(-50%, -50%) scale(1);
					}
				}

				@keyframes new-game-disappear {
					to {
						opacity: 0;
						transform: translate(-50%, -48%) scale(0.97);
					}
				}

				@media (max-width: 480px) {
					.new-game-dialog {
						max-height: calc(100dvh - 20px);
						border-radius: 16px;
					}

					.new-game-form__content {
						gap: 15px;
					}
				}

				@media (prefers-reduced-motion: reduce) {
					.new-game-dialog,
					.new-game-dialog * {
						animation-duration: 0.01ms !important;
						transition-duration: 0.01ms !important;
					}
				}
			`}</style>
		</>
	)
}
