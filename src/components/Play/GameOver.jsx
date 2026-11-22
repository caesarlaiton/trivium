
import Image from 'next/image'
import Link from 'next/link'

import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai'
import { useCallback, useEffect, useRef } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { BiArrowBack } from 'react-icons/bi'
import trophyIcon from '@/assets/trophy.svg'

import playSound from '@/helpers/playSound'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { useBoundStore } from '@/store/useBoundStore'

const canvasStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 100
}

export default function GameOver () {
    const { queries, score, win } = useBoundStore(state => state)
    const refAnimationInstance = useRef(null)

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance
    }, [])

    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
            refAnimationInstance.current({
                ...opts,
                origin: { y: 0.7 },
                particleCount: Math.floor(200 * particleRatio)
            })
    }, [])

    const fire = useCallback(() => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55
        })

        makeShot(0.2, {
            spread: 60
        })

        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        })

        makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        })

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45
        })
    }, [makeShot])

    useEffect(() => {
        if (win === true) {
            fire()
            playSound('win', 0.2)
        }
    }, [win])

    function closeDialog () {
        playSound('pop', 0.2)
        document.getElementById('gameoverdialog').close()
        document.getElementById('gameoverbg').style.display = 'none'
    }

    function finalImage () {
        if (queries.infinitymode) {
            return (
                <div className='flex h-28 w-28 items-center justify-center rounded-full bg-amber-50 ring-8 ring-amber-100/70'>
                    <Image src={trophyIcon} width={76} height={90} alt='Trofeo' />
                </div>
            )
        }

        if (win === true) {
            return (
                <div className='flex h-28 w-28 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-100/70'>
                    <AiFillCheckCircle className='text-7xl text-green-500' />
                </div>
            )
        }

        return (
            <div className='flex h-28 w-28 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-100/70'>
                <AiFillCloseCircle className='text-7xl text-red-500' />
            </div>
        )
    }

    function finalTitle () {
        if (queries.infinitymode) return '¡Felicidades!'
        if (win === true) return '¡Ganaste!'
        return '¡Perdiste!'
    }

    function finalText () {
        if (queries.infinitymode) return `¡Respondiste bien ${score} preguntas!`
        if (win === true) return '¡Felicidades! \nCuestionario completado con éxito.'
        return '¡Más suerte la próxima vez! \nPuedes intentarlo de nuevo.'
    }

    return (
        <>
            <div
                onClick={closeDialog}
                id='gameoverbg'
                className='fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm'
            />

            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />

            <dialog
                id='gameoverdialog'
                open={true}
                className='fixed left-1/2 top-1/2 z-40 m-0 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-slate-100 bg-white px-6 py-10 text-slate-900 shadow-2xl shadow-slate-950/30 sm:px-9 sm:py-12'
            >
                <button
                    className='absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-500 transition hover:bg-slate-200 hover:text-slate-900'
                    onClick={closeDialog}
                    aria-label='Cerrar'
                >
                    <IoCloseSharp />
                </button>

                <div className='flex flex-col items-center gap-5 text-center'>
                    {finalImage()}

                    <div className='space-y-2'>
                        <h2 className='text-3xl font-extrabold tracking-tight text-slate-900'>
                            {finalTitle()}
                        </h2>

                        <p className='whitespace-pre-line text-base leading-relaxed text-slate-600'>
                            {finalText()}
                        </p>
                    </div>

                    {queries.infinitymode && (
                        <div className='w-full rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4'>
                            <p className='text-sm font-semibold uppercase tracking-wider text-amber-700'>
                                Preguntas correctas
                            </p>
                            <p className='mt-1 text-3xl font-extrabold tabular-nums text-amber-600'>
                                {score}
                            </p>
                        </div>
                    )}

                    <div className='mt-2 flex w-full flex-col gap-3 sm:flex-row'>
                        <Link
                            href='/'
                            className='flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-200'
                        >
                            <BiArrowBack className='mr-2 text-xl' />
                            Volver
                        </Link>

                        <button
                            onClick={() => document.getElementById('newGameDialog').showModal()}
                            className='flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/30'
                        >
                            {queries.infinitymode || win !== false
                                ? 'Jugar de nuevo'
                                : 'Intentar de nuevo'}
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    )
}
