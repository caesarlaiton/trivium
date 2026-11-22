
import { useBoundStore } from '@/store/useBoundStore'

export default function QuestionsNavbar ({ changueCurrent }) {
    const { queries, questions, currentQuestion, score } = useBoundStore(state => state)

    if (queries.infinitymode) {
        return (
            <div className='mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-4 border-blue-400 bg-white text-xl font-extrabold text-blue-900 shadow-lg shadow-slate-950/20'>
                {score}
            </div>
        )
    }

    function buttonBg (i) {
        let bg = 'border-2 border-slate-200 bg-white text-slate-500'

        if (i + 1 === score) {
            bg = 'border-2 border-blue-500 bg-blue-50 text-blue-700'
        }

        if (questions[i].userAnswer === 1) {
            bg = 'border-2 border-green-500 bg-green-500 text-white'
        }

        if (questions[i].userAnswer === -1) {
            bg = 'border-2 border-red-500 bg-red-500 text-white'
        }

        if (questions[i].userAnswer === 2) {
            bg = 'border-2 border-blue-600 bg-blue-600 text-white'
        }

        if (i + 1 <= score) {
            bg += ' cursor-pointer hover:-translate-y-0.5 hover:shadow-md'
        }

        if (i + 1 === currentQuestion) {
            bg += ' outline outline-2 outline-offset-2 outline-blue-400'
        }

        return bg
    }

    return (
        <ol
            className='progressBar mx-auto mt-8 mb-5 flex w-full max-w-none items-center justify-between gap-3 overflow-visible px-5 py-3 text-white md:mt-0 md:mb-10'
            style={{
                '--segments': parseInt(questions.length) - 1,
                '--current': score - 1
            }}
        >
            {[...Array(parseInt(questions.length))].map((_, i) => (
                <li key={i} className='shrink-0'>
                    <button
                        onClick={() => changueCurrent(i + 1)}
                        disabled={i + 1 > score}
                        title={`Pregunta ${i + 1}`}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm transition-all duration-200 disabled:cursor-not-allowed sm:h-11 sm:w-11 ${buttonBg(i)}`}
                    >
                        {i + 1}
                    </button>
                </li>
            ))}
        </ol>
    )
}
