
import Image from 'next/image'
import { AiFillInfoCircle } from 'react-icons/ai'
import categories from '@/assets/categories.json'
import { useState } from 'react'
import { useBoundStore } from '@/store/useBoundStore'

export default function GameInfo () {
    const { queries } = useBoundStore(state => state)
    const [showInfo, setShowInfo] = useState(false)

    const mode = queries.timemode && queries.infinitymode
        ? 'Tiempo | Infinito'
        : !queries.timemode && !queries.infinitymode
            ? 'Clásico'
            : queries.timemode
                ? 'Tiempo'
                : 'Infinito'

    return (
        <>
            {/* Botón de información para móviles */}
            <button
                title={showInfo ? 'Ocultar info' : 'Mostrar info'}
                aria-label={showInfo ? 'Ocultar información' : 'Mostrar información'}
                onClick={() => setShowInfo(showInfo => !showInfo)}
                className='fixed bottom-4 left-4 z-30 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#071a3d] shadow-lg transition hover:bg-slate-100 active:scale-95 lg:hidden'
            >
                <AiFillInfoCircle className='text-2xl' />
            </button>

            {/* Panel de información */}
            <aside
                className={`fixed left-4 z-20 h-fit w-52 rounded-2xl border border-slate-200 bg-white p-3 text-center text-slate-900 shadow-xl shadow-slate-950/20 transition-all duration-300 lg:bottom-6 lg:!top-auto lg:!translate-y-0 lg:!scale-100 lg:!opacity-100 md:top-1/2 md:-translate-y-1/2 ${
                    showInfo
                        ? 'bottom-16 scale-100 opacity-100'
                        : 'bottom-0 scale-90 opacity-0 pointer-events-none lg:pointer-events-auto lg:scale-100 lg:opacity-100'
                }`}
            >
                <p className='mb-3 text-xs font-extrabold uppercase tracking-widest text-slate-400'>
                    Información
                </p>

                {/* Preguntas y tiempo */}
                <div className='grid grid-cols-2 gap-2'>
                    {!queries.infinitymode && (
                        <div className='rounded-xl bg-blue-50 px-2 py-3'>
                            <p className='text-[10px] font-bold uppercase tracking-wide text-blue-500'>
                                Preguntas
                            </p>
                            <p className='mt-1 text-xl font-extrabold text-blue-900'>
                                {queries.questions}
                            </p>
                        </div>
                    )}

                    {queries.timemode && (
                        <div className='rounded-xl bg-blue-50 px-2 py-3'>
                            <p className='text-[10px] font-bold uppercase tracking-wide text-blue-500'>
                                Tiempo
                            </p>
                            <p className='mt-1 text-xl font-extrabold text-blue-900'>
                                {queries.time}
                            </p>
                        </div>
                    )}
                </div>

                {/* Modo de juego */}
                <div className='mt-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3'>
                    <p className='text-[10px] font-bold uppercase tracking-wide text-slate-400'>
                        Modo de juego
                    </p>
                    <p className='mt-1 text-sm font-bold text-slate-800'>
                        {mode}
                    </p>
                </div>

                {/* Categorías */}
                <div className='mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3'>
                    <p className='mb-3 text-[10px] font-bold uppercase tracking-wide text-slate-400'>
                        Categorías
                    </p>

                    <div className='grid grid-cols-3 justify-items-center gap-3'>
                        {queries.categories.map(category => {
                            const cat = categories.find(cat => cat.id === category)

                            if (!cat) return null

                            return (
                                <div
                                    key={category}
                                    title={cat.label}
                                    className='flex h-10 w-10 items-center justify-center rounded-xl shadow-sm'
                                    style={{ backgroundColor: cat.color }}
                                >
                                    <Image
                                        alt={cat.label}
                                        src={`/categories-icons/${cat.name.toLowerCase()}.svg`}
                                        width={27}
                                        height={27}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </aside>

            <style jsx global>
                {`
                    #__next {
                        background: linear-gradient(
                            0deg,
                            rgb(0 0 0 / 10%) 0%,
                            rgba(255, 255, 255, 0.05) 100%
                        );
                    }
                `}
            </style>
        </>
    )
}
