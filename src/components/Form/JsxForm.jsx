
import Image from 'next/image'
import { defaultQuestions } from '@/helpers/gameConfig'
import { BsSkipEndFill } from 'react-icons/bs'
import { IoMdInfinite } from 'react-icons/io'
import { FaHeart } from 'react-icons/fa'
import fiftyImg from '@/assets/fifty.svg'
import categoriesJSON from '@/assets/categories.json'

export default function JsxForm ({ handleInputs, nowQueries }) {
	const WILCARDS = [
		{ name: 'Saltar pregunta', icon: <BsSkipEndFill className='text-2xl text-white' />, amount: 1 },
		{ name: 'Eliminar dos respuestas incorrectas', icon: <Image src={fiftyImg.src} alt='cincuenta cincuenta' width={25} height={25} />, amount: 1 },
		{ name: 'Vidas', icon: <FaHeart className='text-2xl text-white' />, amount: 1 }
	]

	return (
		<>
			<div className='flex min-w-0 flex-col gap-5 sm:gap-6'>

				{/* COMODINES */}
				<fieldset className='min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4'>
					<legend className='px-2 text-sm font-bold text-slate-800 sm:text-base'>
						Comodines
					</legend>

					<ul className='grid grid-cols-3 gap-2 sm:gap-4'>
						{WILCARDS.map(({ name, icon, amount }) => (
							<li key={name} className='flex min-w-0 flex-col items-center gap-2 text-center'>
								<div className='flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-sm sm:h-12 sm:w-12' title={name}>
									{icon}
								</div>
								<span className='text-[11px] font-medium leading-tight text-slate-600 sm:text-xs'>{name}</span>
								<span className='rounded-full bg-blue-100 px-3 py-0.5 text-xs font-bold text-blue-700'>x{amount}</span>
							</li>
						))}
					</ul>
				</fieldset>

				{/* PREGUNTAS */}
				<fieldset className='min-w-0 rounded-xl border border-slate-200 p-3 sm:p-4'>
					<legend className='px-2 text-sm font-bold text-slate-800 sm:text-base'>Preguntas</legend>

					<div className='mb-4 flex items-center justify-between gap-3'>
						<label htmlFor='cbx' className='text-xs font-medium text-slate-600 sm:text-sm'>Modo infinito</label>
						<input id='cbx' onChange={handleInputs} checked={nowQueries.infinitymode} type='checkbox' name='infinitymode' className='h-5 w-5 cursor-pointer accent-blue-600' />
					</div>

					<div className='flex items-center gap-4'>
						<input
							type='range'
							name='questions'
							min={defaultQuestions.minQuestions}
							max={defaultQuestions.maxQuestions}
							value={nowQueries.questions}
							onChange={handleInputs}
							className={`min-w-0 flex-1 cursor-pointer ${nowQueries.infinitymode ? 'grayscale cursor-not-allowed' : ''}`}
							disabled={nowQueries.infinitymode}
						/>
						<span className='flex min-w-8 justify-center text-lg font-bold tabular-nums text-blue-700'>
							{nowQueries.infinitymode ? <IoMdInfinite /> : nowQueries.questions}
						</span>
					</div>
				</fieldset>

				{/* TIEMPO */}
				<fieldset className='min-w-0 rounded-xl border border-slate-200 p-3 sm:p-4'>
					<legend className='px-2 text-sm font-bold text-slate-800 sm:text-base'>Tiempo</legend>

					<div className='mb-4 flex items-center justify-between gap-3'>
						<label htmlFor='cbx2' className='text-xs font-medium text-slate-600 sm:text-sm'>Activar límite de tiempo</label>
						<input id='cbx2' onChange={handleInputs} checked={nowQueries.timemode} type='checkbox' name='timemode' className='h-5 w-5 cursor-pointer accent-blue-600' />
					</div>

					<div className='grid grid-cols-4 gap-2'>
						{[10, 20, 30, 60].map(time => (
							<label key={time} className='min-w-0 cursor-pointer'>
								<input className='peer sr-only' type='radio' name='time' id={`${time}s`} value={time} checked={time === Number(nowQueries.time)} onChange={handleInputs} disabled={!nowQueries.timemode} />
								<span className={`block rounded-lg border border-slate-200 py-2 text-center text-xs font-bold transition-all sm:text-sm peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white ${!nowQueries.timemode ? 'cursor-not-allowed opacity-40' : 'bg-slate-100 text-slate-700 hover:border-blue-300 active:scale-95'}`}>
									{time}s
								</span>
							</label>
						))}
					</div>
				</fieldset>
			</div>

			{/* CATEGORÍAS */}
			<fieldset className='min-w-0'>
				<legend className='mb-3 px-1 text-sm font-bold text-slate-800 sm:text-base'>Categorías</legend>

				<p className='mb-3 px-1 text-xs leading-5 text-slate-500'>
					Selecciona los temas que quieres incluir en tu partida.
				</p>

				<div className='grid grid-cols-3 gap-3 sm:grid-cols-2 md:grid-cols-3'>
					{categoriesJSON.map(category => {
						const selected = nowQueries.categories.includes(category.id)

						return (
							<label
								key={category.id}
								title={category.label}
								className='flex min-h-[88px] min-w-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 p-2 text-center transition-all duration-200'
								style={{
									backgroundColor: selected ? category.color : '#f8fafc',
									borderColor: selected ? category.color : '#e2e8f0',
									boxShadow: selected ? `0 4px 12px ${category.color}55` : 'none',
									cursor: 'pointer'
								}}
							>
								<input
									type='checkbox'
									name='categories'
									id={category.name}
									value={category.id}
									checked={selected}
									onChange={handleInputs}
									className='sr-only'
								/>

								<span
									className='flex h-10 w-10 items-center justify-center rounded-xl p-2'
									style={{
										backgroundColor: selected ? 'rgba(255,255,255,0.25)' : '#e2e8f0'
									}}
								>
									<Image
										src={`/categories-icons/${category.name.toLowerCase()}.svg`}
										alt=''
										width={30}
										height={30}
										className='h-full w-full object-contain'
									/>
								</span>

								<span
									className='text-[10px] font-semibold leading-tight sm:text-xs'
									style={{
										color: selected ? '#ffffff' : '#334155'
									}}
								>
									{category.label}
								</span>
							</label>
						)
					})}
				</div>
			</fieldset>
		</>
	)
}
