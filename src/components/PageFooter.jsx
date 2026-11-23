
import Image from 'next/image'
import playSound from '@/helpers/playSound'
import soundOn from '../assets/sound-on.svg'
import soundOff from '../assets/sound-off.svg'
import { useEffect, useState } from 'react'
import { MdInfo } from 'react-icons/md'
import { GoAlert } from 'react-icons/go'

export default function Footer ({ alert = false }) {
    const [sound, setSound] = useState(false)
    const [showInfo, setShowInfo] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem('sound')) {
            localStorage.setItem('sound', sound)
        } else {
            setSound(localStorage.getItem('sound') === 'true')
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('sound', sound)
    }, [sound])

    function handleClick (info = false) {
        if (info) {
            setShowInfo(value => !value)
        } else {
            setSound(value => !value)
        }

        playSound('switch-on')
    }

    function handleSoundON () {
        setSound(true)
        localStorage.setItem('sound', true)
        playSound('switch-on')
    }

    return (
        <footer className='fixed bottom-4 right-4 z-30 sm:bottom-5 sm:right-6'>
            <nav>
                <ul className='flex items-center gap-3'>

                    {/* Información */}
                    <li className='relative'>
                        <button
                            title='Mostrar información'
                            aria-label='Mostrar información'
                            onClick={() => handleClick(true)}
                            className={`flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#071a3d] shadow-lg shadow-slate-950/20 transition-all duration-200 hover:-translate-y-1 hover:bg-slate-100 active:scale-95 ${
                                showInfo ? 'ring-2 ring-blue-400' : ''
                            }`}
                        >
                            {alert
                                ? <GoAlert className='text-2xl' />
                                : <MdInfo className='text-2xl' />
                            }
                        </button>

                        {/* Panel informativo */}
                        <div
                            className={`absolute bottom-full right-0 mb-3 w-64 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-xl shadow-slate-950/20 transition-all duration-200 sm:w-72 ${
                                showInfo
                                    ? 'translate-y-0 scale-100 opacity-100'
                                    : 'pointer-events-none translate-y-2 scale-95 opacity-0'
                            }`}
                        >
                            {alert
                                ? (
                                    <>
                                        <div className='mb-2 flex items-center gap-2'>
                                            <GoAlert className='text-lg text-amber-500' />
                                            <span className='font-bold text-slate-900'>
                                                Información importante
                                            </span>
                                        </div>

                                        <p className='leading-relaxed'>
                                            Las preguntas hechas por IA pueden tener errores.
                                            Solo algunas preguntas son hechas por IA.
                                        </p>
                                    </>
                                )
                                : (
                                    <>
                                        <p className='mb-2 font-bold text-slate-900'>
                                            Trivium
                                        </p>

                                        <p className='text-xs leading-relaxed text-slate-500'>
                                            Juego interactivo de trivia y conocimiento general con diferentes modos y preguntas dinámicas generadas con IA.
                                        </p>
                                    </>
                                )}
                        </div>
                    </li>

                    {/* Sonido */}
                    <li>
                        <button
                            title={sound ? 'Silenciar' : 'Reproducir música'}
                            aria-label={sound ? 'Silenciar' : 'Activar sonido'}
                            onClick={sound ? () => setSound(false) : handleSoundON}
                            className='flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-950/20 transition-all duration-200 hover:-translate-y-1 hover:bg-slate-100 active:scale-95'
                        >
                            <Image
                                src={sound ? soundOn : soundOff}
                                alt={sound ? 'Sonido activado' : 'Sonido desactivado'}
                                width={26}
                                height={26}
                            />
                        </button>
                    </li>

                </ul>
            </nav>
        </footer>
    )
}
