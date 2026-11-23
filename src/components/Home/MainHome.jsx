
import categories from '@/assets/categories.json'
import PageFooter from '../PageFooter'
import { openNewGameModal } from '@/helpers/openDialog'
import { defaultQuery } from '@/helpers/gameConfig'

export default function MainHome () {
	function handleTitleHover (e) {
		e.target.classList.add('jello-vertical')
		e.target.style.color = categories[Math.floor(Math.random() * categories.length)].color
		e.target.addEventListener('animationend', () => e.target.classList.remove('jello-vertical'))
	}

	const handleTitleLeave = (e) => (e.target.style.color = 'white')

	function handlePlay () {
		openNewGameModal(defaultQuery)
	}

	return (
		<main className='mainHome relative flex min-h-full w-full flex-col justify-between overflow-hidden px-6 py-7 text-white sm:px-8 sm:py-9 lg:px-10 lg:py-10 xl:px-14 xl:py-12'>

			<div className='pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full border border-blue-400/10' />
			<div className='pointer-events-none absolute -right-16 -top-8 h-64 w-64 rounded-full border border-blue-400/10' />
			<div className='pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl' />

			<div className='relative z-10 flex items-center gap-3'>
				<div className='flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-950/30'>
					<span className='text-lg font-black text-white'>T</span>
				</div>
				<span className='text-xs font-bold tracking-[0.25em] text-blue-100 uppercase'>
					Trivium
				</span>
			</div>

			<article className='relative z-10 my-auto flex flex-col items-start py-8 text-left sm:py-10 lg:py-12'>
				<div className='mb-5 flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-2'>
					<span className='h-2 w-2 rounded-full bg-blue-400' />
					<span className='text-[10px] font-semibold tracking-widest text-blue-200 uppercase sm:text-xs'>
						Trivia · Conocimiento · Diversión
					</span>
				</div>

				<h1
					className='mb-4 text-6xl font-black leading-none tracking-[-0.07em] sm:text-7xl lg:text-7xl xl:text-8xl'
					translate='no'
				>
					{'Trivium'.split('').map((letter, index) => (
						<span
							key={index}
							id={letter + index + 10}
							className='relative inline-block transition-all duration-300'
							onMouseEnter={handleTitleHover}
							onMouseLeave={handleTitleLeave}
						>
							{letter}
						</span>
					))}
					<span className='text-blue-400'>.</span>
				</h1>

				<div className='mb-5 h-1 w-14 rounded-full bg-blue-500' />

				<p className='max-w-md text-sm leading-7 text-slate-300 sm:text-base lg:text-lg'>
					¡Juega con un número infinito de preguntas posibles!
				</p>

				<p className='mt-2 max-w-sm text-xs leading-6 text-slate-400 sm:text-sm'>
					Descubre cuánto sabes, explora diferentes categorías y supera nuevos desafíos.
				</p>

				<button
					onClick={handlePlay}
					id='play'
					href='play'
					className='group mt-7 flex items-center gap-4 rounded-xl bg-blue-600 px-7 py-3.5 text-xs font-bold tracking-widest text-white shadow-xl shadow-blue-950/30 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-blue-500/20 active:translate-y-0 sm:mt-8 sm:px-8 sm:py-4 sm:text-sm'
				>
					COMENZAR A JUGAR
					<span className='text-xl transition-transform duration-300 group-hover:translate-x-2'>
						→
					</span>
				</button>

				<div className='mt-7 flex items-center gap-3 text-xs text-slate-400'>
					<div className='flex -space-x-2'>
						<span className='flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#172554] bg-blue-500 text-xs font-bold text-white'>T</span>
						<span className='flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#172554] bg-slate-500 text-xs font-bold text-white'>?</span>
						<span className='flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#172554] bg-indigo-500 text-xs font-bold text-white'>!</span>
					</div>
					<span>Un nuevo desafío te espera</span>
				</div>
			</article>

			<div className='relative z-10 border-t border-white/10 pt-4'>
				<PageFooter />
			</div>
		</main>
	)
}
