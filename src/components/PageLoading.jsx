
export default function PageLoading () {
    return (
        <div className='fixed inset-0 z-50 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#071a3d] px-6 text-white'>
            {/* Fondo decorativo */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-slate-950/60' />

            <div className='relative z-10 flex flex-col items-center'>
                {/* Indicador de carga */}
                <div className='relative flex h-28 w-28 items-center justify-center rounded-full border border-blue-300/20 bg-white/10 shadow-2xl shadow-blue-950/30 backdrop-blur-sm'>
                    <div className='h-16 w-16 animate-spin rounded-full border-[5px] border-blue-200/20 border-t-blue-400' />

                    <div className='absolute h-3 w-3 rounded-full bg-blue-300 shadow-lg shadow-blue-300/50' />
                </div>

                {/* Nombre */}
                <h1 className='mt-8 text-4xl font-extrabold tracking-tight'>
                    Trivium<span className='text-blue-400'>.</span>
                </h1>

                {/* Mensaje */}
                <p className='mt-3 text-sm font-medium tracking-wide text-blue-100/80'>
                    Preparando tu partida...
                </p>

                {/* Puntos animados */}
                <div className='mt-5 flex items-center gap-2'>
                    <span className='h-2 w-2 animate-bounce rounded-full bg-blue-300 [animation-delay:0ms]' />
                    <span className='h-2 w-2 animate-bounce rounded-full bg-blue-300 [animation-delay:150ms]' />
                    <span className='h-2 w-2 animate-bounce rounded-full bg-blue-300 [animation-delay:300ms]' />
                </div>
            </div>
        </div>
    )
}
