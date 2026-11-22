
import categories from '@/assets/categories.json'
import Image from 'next/image'

export default function Categories () {
	return (
		<section className='w-full'>
			<div className='mb-4'>
				<p className='mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 sm:text-xs'>
					Explora tus conocimientos
				</p>
				<h2 className='text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl'>
					Categorías
				</h2>
				<p className='mt-1.5 text-xs text-slate-500 sm:text-sm'>
					Encuentra tu tema favorito y demuestra cuánto sabes.
				</p>
			</div>

			<ul className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
				{categories.map(category => (
					<li
						key={category.id}
						title={category.name}
						className='group flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-xl border border-white/60 p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-[115px] sm:p-4'
						style={{
							backgroundColor: category.color
						}}
					>
						<div className='flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11'>
							<Image
								className='drop-shadow-md'
								src={`/categories-icons/${category.name.toLowerCase()}.svg`}
								alt=''
								width={30}
								height={30}
							/>
						</div>

						<h3 className='text-center text-xs font-bold text-white drop-shadow-md sm:text-sm'>
							{category.label}
						</h3>
					</li>
				))}
			</ul>
		</section>
	)
}
