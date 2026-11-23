
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import PageLoading from '@/components/PageLoading'
import PageError from '@/components/PageError'
import PlayHeader from '@/components/Play/PlayHeader'
import GameInfo from '@/components/Play/GameInfo'
import Footer from '@/components/PageFooter'
import Questions from '@/components/Questions/Questions'

import queryValidator from '@/helpers/gameConfig'
import categories from '@/assets/categories.json'
import { useBoundStore } from '@/store/useBoundStore'

export default function Play () {
    const { loading, error, getQuestions, setQueries } = useBoundStore(state => state)
    const router = useRouter()

    useEffect(() => {
        if (router.isReady) {
            const validQuery = queryValidator(router.query)
            const cate = validQuery.categories.map(cat => categories.find(c => c.id === cat).name)

            setQueries(validQuery)
            getQuestions(cate, validQuery.infinitymode ? 5 : validQuery.questions)
        }
    }, [router.isReady])

    useEffect(() => {
        window.onbeforeunload = () => 'Are you sure you want to leave?'
    }, [])

    return (
        <>
            <Head>
                <title>Trivium | Partida</title>
                <meta name='theme-color' content='#071a3d' />
            </Head>

            {loading && <PageLoading />}
            {error[0] && <PageError />}

            {!loading && !error[0] && (
                <>
                    <PlayHeader />
                    <GameInfo />
                    <Questions />
                    <Footer alert={true} />
                </>
            )}

            <style jsx global>{`
                html,
                body {
                    min-height: 100%;
                    margin: 0;
                    background: #071a3d !important;
                }

                body {
                    position: relative;
                    color: #0f172a;
                    overflow-x: hidden;
                }

                body::before {
                    content: '';
                    position: fixed;
                    inset: -5%;
                    z-index: 0;
                    pointer-events: none;

                    background-image:
                        linear-gradient(
                            rgba(7, 26, 61, 0.15),
                            rgba(7, 26, 61, 0.15)
                        ),
                        url('/images/trivium-background.jpg');

                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;

                    animation: triviumBackgroundMove 18s ease-in-out infinite alternate;
                    will-change: transform;
                }

                #__next {
                    position: relative;
                    z-index: 1;
                    min-height: 100vh;
                    background: transparent !important;
                }

                @keyframes triviumBackgroundMove {
                    0% {
                        transform: scale(1.05) translate3d(-1.5%, 0, 0);
                    }

                    100% {
                        transform: scale(1.15) translate3d(1.5%, -1%, 0);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    body::before {
                        animation: none !important;
                    }
                }
            `}</style>
        </>
    )
}
