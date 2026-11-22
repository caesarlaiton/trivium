
import Image from 'next/image'
import { BsSkipEndFill } from 'react-icons/bs'
import fiftyImg from '@/assets/fifty.svg'
import { FaHeart } from 'react-icons/fa'
import { useBoundStore } from '@/store/useBoundStore'
import { useEffect } from 'react'

export default function Wildcards () {
    const {
        wildCards,
        useSkipCard,
        queries,
        win,
        useHalfCard,
        currentQuestion,
        score
    } = useBoundStore(state => state)

    useEffect(() => {
        function shortcuts (e) {
            if (e.key === 's') useSkipCard()
            if (e.key === 'h') useHalfCard()
        }

        document.addEventListener('keydown', shortcuts)

        return () => document.removeEventListener('keydown', shortcuts)
    }, [])

    function disabled (type) {
        const finalQuestion = queries.infinitymode
            ? (score % 5 === 0 ? 5 : score % 5)
            : score

        return wildCards[type] < 1 || win !== undefined || currentQuestion !== finalQuestion
    }

    return (
        <aside className='fixed right-4 top-4 z-20 rounded-2xl border border-white/20 bg-[#071a3d]/85 p-3 shadow-xl shadow-slate-950/20 backdrop-blur-md lg:right-6 lg:top-1/2 lg:-translate-y-1/2'>
            <nav>
                <ul className='flex items-center gap-3 lg:flex-col lg:gap-4'>

                    {/* Saltar pregunta */}
                    <li className={`relative transition-all duration-200 ${disabled('skip') ? 'cursor-not-allowed opacity-40 grayscale' : 'hover:-translate-y-1 active:scale-95'}`}>
                        <button
                            autoFocus
                            onClick={useSkipCard}
                            className='flex h-12 w-12 items-center justify-center rounded-xl border border-blue-300/20 bg-blue-600 shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 sm:h-14 sm:w-14'
                            title='Saltar pregunta'
                            disabled={disabled('skip')}
                        >
                            <BsSkipEndFill className='text-2xl text-white' />

                            <span className='absolute -bottom-2 -right-2 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-[#071a3d] bg-white px-1 text-xs font-extrabold text-slate-900'>
                                x{wildCards.skip}
                            </span>
                        </button>
                    </li>

                    {/* Eliminar respuestas */}
                    <li className={`relative transition-all duration-200 ${disabled('half') ? 'cursor-not-allowed opacity-40 grayscale' : 'hover:-translate-y-1 active:scale-95'}`}>
                        <button
                            onClick={useHalfCard}
                            className='flex h-12 w-12 items-center justify-center rounded-xl border border-blue-300/20 bg-blue-600 shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 sm:h-14 sm:w-14'
                            title='Eliminar dos respuestas incorrectas'
                            disabled={disabled('half')}
                        >
                            <Image
                                src={fiftyImg.src}
                                alt='Cincuenta cincuenta'
                                width={26}
                                height={26}
                            />

                            <span className='absolute -bottom-2 -right-2 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-[#071a3d] bg-white px-1 text-xs font-extrabold text-slate-900'>
                                x{wildCards.half}
                            </span>
                        </button>
                    </li>

                    {/* Vidas */}
                    <li
                        className={`relative flex h-12 w-12 items-center justify-center rounded-xl border border-red-300/20 bg-red-500/90 shadow-lg shadow-red-950/20 transition sm:h-14 sm:w-14 ${wildCards.lives < 1 ? 'opacity-40 grayscale' : ''}`}
                        title='Vidas'
                    >
                        <FaHeart className='text-2xl text-white' />

                        <span className='absolute -bottom-2 -right-2 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-[#071a3d] bg-white px-1 text-xs font-extrabold text-slate-900'>
                            x{wildCards.lives}
                        </span>
                    </li>

                </ul>
            </nav>
        </aside>
    )
}
