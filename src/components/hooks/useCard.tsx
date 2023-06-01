import {useCallback, useContext} from 'react'
import {GameContext} from '../../contexts/GameContext.tsx'
import {ActionType, CardColor} from '../reducer.ts'

export default function useCard() {
	const [_, dispatch] = useContext(GameContext)

	return useCallback((gameId: string, color: CardColor) => {
		dispatch({type: ActionType.ShowCard, payload: {id: gameId, color}})
	}, [])
}