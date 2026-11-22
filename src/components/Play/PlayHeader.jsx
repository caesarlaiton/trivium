
import { BiArrowBack } from 'react-icons/bi'
import { BsArrowRepeat } from 'react-icons/bs'
import Link from 'next/link'
import { useBoundStore } from '@/store/useBoundStore'

export default function PlayHeader () {
    const { cleanQuestions, cleanWildCards } = useBoundStore(state => state)

    return (
        <nav className='fixed left-4 top-4 z-30 sm:left-6 sm:top-6'>
            <ul className='flex items-center gap-3'>
                <li>
                    <Link
                        href='/'
                        onClick={() => {
                            cleanQuestions()
                            cleanWildCards()
                        }}
                        title='Volver al inicio'
                        aria-label='Volver al inicio'
                        className='group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#071a3d] shadow-lg shadow-slate-950/20 transition-all duration-200 hover:-translate-y-1 hover:bg-slate-100 active:scale-95 sm:h-12 sm:w-12'
                    >
                        <BiArrowBack className='text-2xl transition-transform group-hover:-translate-x-0.5' />
                    </Link>
                </li>

                <li>
                    <button
                        onClick={() => document.getElementById('newGameDialog').showModal()}
                        title='Nueva partida'
                        aria-label='Nueva partida'
                        className='group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#071a3d] shadow-lg shadow-slate-950/20 transition-all duration-200 hover:-translate-y-1 hover:bg-slate-100 active:scale-95 sm:h-12 sm:w-12'
                    >
                        <BsArrowRepeat className='text-2xl transition-transform duration-300 group-hover:rotate-180' />
                    </button>
                </li>
            </ul>
        </nav>
    )
}
