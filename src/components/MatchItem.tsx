import {Box, IconButton, ListItemButton, ListItemText} from '@mui/material'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import {EventType, Game, GameEvent, GoalEvent} from './reducer.ts'
import {MouseEvent, useCallback} from 'react'

interface MatchItemProps {
	game: Game,
	onGameClick: (gameId: string) => void,
	onGameFinish: (gameId: string) => void
}

// get floor minutes delta
function getMinutesDelta(date2: Date, date1: Date) {
	const delta = Math.floor((date1.getTime() - date2.getTime()) / 1000 / 60)
	return delta === 1 ? `in ${delta} minute`: `in ${delta} minutes`
}

// get initials from the name
function getInitials(name: string) {
	const names = name.split(' ')
	const initials = names.map((name) => name.charAt(0) + '.')
	return initials.join('')
}

function getEventList(events: GameEvent[]) {
	if (events.length < 2) {
		return []
	}

	const stringEvents = []

	for (let i = 1; i < events.length; i++) {
		if (events[i].type !== EventType.Goal) {
			continue
		}
		const goal = events[i] as GoalEvent
		const scored = 'scored ' + getMinutesDelta(events[0].datetime, goal.datetime)
		const scoredBy = getInitials(goal.by)

		stringEvents.push(`${scored} by ${scoredBy}`)
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