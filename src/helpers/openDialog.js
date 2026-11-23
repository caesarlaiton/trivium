import { defaultQuery } from '@/helpers/gameConfig'

export const openNewGameModal = (customQueries = {}) => {
	const finalQueries = { ...defaultQuery, ...customQueries }
	if (typeof window !== 'undefined') {
		window.dispatchEvent(new CustomEvent('openNewGameModal', { detail: finalQueries }))
	}
}
