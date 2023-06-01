import {Box, IconButton, ListItemButton, ListItemText} from '@mui/material'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import {Game} from './reducer.ts'
import {useCallback, MouseEvent} from 'react'

interface MatchItemProps {
	game: Game,
	onGameClick: (gameId: string) => void,
	onGameFinish: (gameId: string) => void
}

// get floor minutes delta
function getMinutesDelta(date2: Date, date1: Date) {
	const delta = Math.floor((date1.getTime() - date2.getTime()) / 1000 / 60)

	console.log(date1, date2, delta)

	return delta === 1 ? `in ${delta} minute`: `in ${delta} minutes`
}

function getEventList(events: Date[]) {
	if (events.length < 2) {
		return []
	}

	const stringEvents = []

	for (let i = 1; i < events.length; i++) {
		stringEvents.push('scored ' + getMinutesDelta(events[0], events[i]))
	}

	return stringEvents.reverse()
}

export default function MatchItem({ game, onGameClick, onGameFinish }: MatchItemProps) {
	const handleFinishClick = useCallback((e: MouseEvent, gameId: string) => {
		e.stopPropagation()
		onGameFinish(gameId)
	}, [onGameFinish])

	return <ListItemButton key={game.id} data-testid="game-list-row" onClick={() => onGameClick(game.id)}>
		<ListItemText
			primary={`${game.homeTeam} ${game.homeScore} - ${game.awayScore} ${game.awayTeam}`}
			secondary={<>
				{getEventList(game.events).map((event) => {
					return <Box key={event} data-testid="game-goal">
						{event}
					</Box>
				})}
			</>}
		/>
		<IconButton onClick={(e) => handleFinishClick(e, game.id)} data-testid="stop-button">
			<StopCircleIcon />
		</IconButton>
	</ListItemButton>

}