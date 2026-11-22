
import { useEffect, useState } from 'react'
import Wildcards from './Wildcards'
import GameOver from '../Play/GameOver'
import QuestionsNavbar from './QuestionsNavbar'
import QuestionSlider from './QuestionSlider'

import categories from '@/assets/categories.json'
import playSound from '@/helpers/playSound'
import { useBoundStore } from '@/store/useBoundStore'

export default function Questions () {
    const {
        questions,
        loading,
        loadingInfinity,
        currentQuestion,
        setCurrentQuestion,
        setUserAnswer,
        win,
        score,
        setWin,
        setScore,
        wildCards,
        useLivesCard,
        queries,
        getQuestions
    } = useBoundStore(state => state)

    const [time, setTime] = useState(Number(queries.time))

    useEffect(() => {
        function shortcuts (e) {
            if (!queries.infinitymode) {
                if (e.key === 'ArrowLeft' && currentQuestion > 1) {
                    changueCurrent(currentQuestion - 1)
                }

                if (e.key === 'ArrowRight' && currentQuestion < score) {
                    changueCurrent(currentQuestion + 1)
                }
            }

            if (['a', 'b', 'c', 'd'].includes(e.key)) {
                const answer = ['a', 'b', 'c', 'd'].indexOf(e.key)

                document.querySelector(
                    `.answers-${queries.infinitymode ? currentQuestion : score} .answer-${answer + 1}`
                )?.click()
            }
        }

        document.addEventListener('keydown', shortcuts)
        return () => document.removeEventListener('keydown', shortcuts)
    }, [currentQuestion, score])

    useEffect(() => {
        if (win !== undefined || !queries.timemode || loading || loadingInfinity) return

        const timeInterval = setInterval(() => {
            setTime(time => time > 0 ? time - 1 : time)
        }, 1000)

        return () => clearInterval(timeInterval)
    }, [queries.timemode, win, loading, loadingInfinity])

    useEffect(() => {
        if (win !== undefined || time > 0) return

        if (wildCards.lives < 1) {
            clickCorrectAnswer()
            setUserAnswer(score - 1, -1)
            playSound('wrong_answer', 0.3)
            setWin(false)
        } else {
            if (queries.infinitymode) {
                if (score !== 1 && score % 5 === 0) {
                    clickCorrectAnswer()
                    getAnotherQuestions()
                } else {
                    clickCorrectAnswer(true)
                }
            } else {
                if (score === queries.questions) {
                    setWin(true)
                    clickCorrectAnswer()
                } else {
                    clickCorrectAnswer(true)
                }
            }

            setUserAnswer(score - 1, 2)
            useLivesCard()
            playSound('correct_answer', 0.3)
        }
    }, [time])

    function getAnotherQuestions () {
        setTimeout(() => {
            setTime(Number(queries.time))
            changueCurrent(1)
            setScore(score + 1)

            const topics = categories
                .filter(category => queries.categories.find(cat => cat === category.id))
                .map(cat => cat.name)

            getQuestions(topics, 5, true)
        }, 1000)
    }

    function clickCorrectAnswer (addScore = false) {
        if (addScore) {
            setTimeout(() => {
                setScore(score + 1)
                setTime(Number(queries.time))
                setUserAnswer(score - 1, 1)
                changueCurrent(score + 1)
            }, 1000)
        }

        document.querySelectorAll(`.answers-${score} button`).forEach(answer => {
            answer.disabled = true

            if (answer.textContent === questions[score - 1].correctAnswer) {
                answer.classList.add('correctAnswer')
                answer.parentNode.classList.add('shake-left-right')
            }
        })
    }

    function changueCurrent (number) {
        if (number > questions.length || number < 1) return

        document.querySelectorAll('[id^="question-"]').forEach(question => {
            question.classList.remove('slide-left', 'slide-right')

            if (question.id !== `question-${number}`) {
                question.classList.add(
                    Number(question.id.replace('question-', '')) < number
                        ? 'slide-left'
                        : 'slide-right'
                )
            }
        })

        setCurrentQuestion(number)
    }

    return (
        <>
            <div className='fixed left-1/2 top-1/2 z-10 w-[92%] max-w-5xl -translate-x-1/2 -translate-y-1/2 sm:w-[90%]'>

                <div className='mx-auto w-full max-w-3xl'>
                    <QuestionsNavbar changueCurrent={changueCurrent} />
                </div>

                <QuestionSlider
                    changueCurrent={changueCurrent}
                    setTime={setTime}
                    getAnotherQuestions={getAnotherQuestions}
                />
            </div>

            {win !== undefined && <GameOver />}

            <Wildcards />

            {queries.timemode && (
                <div
                    className={`absolute bottom-5 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-slate-200 bg-white text-2xl font-extrabold text-slate-900 shadow-xl shadow-slate-950/20 sm:bottom-6 sm:h-[4.5rem] sm:w-[4.5rem] ${
                        time < 6 && win === undefined ? 'pulse_animation' : ''
                    }`}
                >
                    {time}

                    <svg className='countdown absolute inset-0 h-full w-full rotate-180 overflow-visible'>
                        <circle
                            className={`stroke-blue-500 transition-all duration-1000 ease-linear ${
                                time < 6 && win === undefined ? 'stroke-red-500' : ''
                            }`}
                            r='30'
                            cx='32'
                            cy='32'
                            fill='none'
                            strokeWidth='4'
                            strokeDasharray='188'
                            style={{
                                strokeDashoffset: 188 / queries.time * time
                            }}
                        />
                    </svg>
                </div>
            )}
        </>
    )
}
