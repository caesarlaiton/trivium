
import { useBoundStore } from '@/store/useBoundStore'
import Link from 'next/link'
import { BiErrorCircle, BiArrowBack } from 'react-icons/bi'

export default function PageError () {
    const error = useBoundStore(state => state.error)

    return (
        <main className='fixed inset-0 z-40 flex min-h-screen items-center justify-center overflow-y-auto bg-[#071a3d] px-5 py-8 text-slate-900'>
            <div className='absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-slate-950/60' />

            <div className='relative z-10 flex w-full max-w-xl flex-col items-center rounded-3xl border border-slate-100 bg-white px-6 py-12 text-center shadow-2xl shadow-slate-950/30 sm:px-10'>
                <div className='mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-100/60'>
                    <BiErrorCircle className='text-6xl text-red-500' />
                </div>

                <span className='mb-2 text-sm font-bold uppercase tracking-widest text-red-500'>
                    Algo salió mal
                </span>

                <h2 className='text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl'>
                    Error {error[1].statusCode || 500}
                </h2>

                <p className='mt-3 break-words text-base font-medium text-slate-600'>
                    {error[1].message || 'Ocurrió un error inesperado.'}
                </p>

                <p className='mt-4 max-w-md text-sm leading-relaxed text-slate-500'>
                    ¡Ups! No pudimos completar tu solicitud. Inténtalo de nuevo más tarde o juega sin conexión.
                </p>

                <Link
                    href='/'
                    className='mt-8 flex w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700'
                >
                    <BiArrowBack className='text-xl' />
                    Volver al inicio
                </Link>
            </div>
        </main>
    )
}
