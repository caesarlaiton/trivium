
import { ImInfinite } from 'react-icons/im'
import { BiTimeFive } from 'react-icons/bi'
import { TbDeviceGamepad2 } from 'react-icons/tb'

const gameModes = [
	{
		icon: <TbDeviceGamepad2 className='text-2xl sm:text-3xl' />,
		title: 'Clásico',
		description: '¡Completa las preguntas sin fallar para ganar! Tienes comodines que te pueden ayudar'
	},
	{
		icon: <BiTimeFive className='text-2xl sm:text-3xl' />,
		title: 'Tiempo',
		description: '¡Completa las preguntas dentro del límite de tiempo para ganar! Puedes usar comodines'
	},
	{
		icon: <ImInfinite className='text-2xl sm:text-3xl' />,
		title: 'Infinito',
		description: '¡Rompe tu récord completando tantas preguntas como puedas! Puedes usar comodines'
	}
]

export default function GameModes () {
	return (
		<section className='w-full'>
			<div className='mb-4'>
				<p className='mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-xs'>
					Elige tu desafío
				</p>
				<h2 className='text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl'>
					Modos de juego
				</h2>
				<p className='mt-1.5 text-xs text-slate-500 sm:text-sm'>
					Selecciona cómo quieres poner a prueba tus conocimientos.
				</p>
			</div>

			<nav>
				<ul className='grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3 lg:gap-4'>
					{gameModes.map((mode, index) => (
						<li
							key={index + mode.title}
							className='group flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/10 sm:p-4 lg:p-3 xl:p-4'
						>
							<div className='mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white sm:h-11 sm:w-11'>
								{mode.icon}
							</div>

							<h3 className='mb-1.5 text-base font-bold text-slate-900 sm:text-lg'>
								{mode.title}
							</h3>

							<p className='text-xs leading-5 text-slate-500 sm:text-sm sm:leading-5'>
								{mode.description}
							</p>
						</li>
					))}
				</ul>
			</nav>
		</section>
	)
}
