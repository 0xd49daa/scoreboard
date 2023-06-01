import {Box, IconButton, ListItemButton, ListItemText} from '@mui/material'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import {CardColor, CardEvent, EventType, Game, GameEvent, GoalEvent} from './reducer.ts'
import {MouseEvent, useCallback} from 'react'
import RectangleIcon from '@mui/icons-material/Rectangle'

interface MatchItemProps {
	game: Game,
	onGameClick: (gameId: string) => void,
	onGameFinish: (gameId: string) => void,
	onCard: (gameId: string, color: CardColor) => void
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
		if (![EventType.Goal, EventType.Card].includes(events[i].type)) {
			continue
		}
		const event = events[i] as (GoalEvent | CardEvent)
		const inMinutes = getMinutesDelta(events[0].datetime, event.datetime)

		if (event.type === EventType.Card) {
			const cardEvent = event as CardEvent
			stringEvents.push(`${cardEvent.color} card to ${getInitials(cardEvent.playerName)} ${inMinutes}`)
		} else {
			const goalEvent = event as GoalEvent
			const scoredBy = getInitials(goalEvent.by)

			stringEvents.push(`scored ${inMinutes} by ${scoredBy}`)
		}
	}

	return stringEvents.reverse()
}

export default function MatchItem({ game, onGameClick, onGameFinish, onCard }: MatchItemProps) {
	const handleFinishClick = useCallback((e: MouseEvent, gameId: string) => {
		e.stopPropagation()
		onGameFinish(gameId)
	}, [onGameFinish])

	const handleCard = useCallback((e: MouseEvent, gameId: string, color: CardColor) => {
		e.stopPropagation()
		onCard(gameId, color)
	}, [])

	return <ListItemButton key={game.id} data-testid="game-list-row" onClick={() => onGameClick(game.id)}>
		<ListItemText
			primary={`${game.homeTeam} ${game.homeScore} - ${game.awayScore} ${game.awayTeam}`}
			secondary={<>
				{getEventList(game.events).map((event) => {
					return <Box key={event} data-testid="game-event">
						{event}
					</Box>
				})}
			</>}
		/>
		<IconButton onClick={(e) => handleCard(e, game.id, 'yellow')} data-testid="yellow-card-button">
			<RectangleIcon sx={{ color: 'yellow' }} />
		</IconButton>
		<IconButton onClick={(e) => handleCard(e, game.id, 'red')} data-testid="red-card-button">
			<RectangleIcon sx={{ color: 'red' }} />
		</IconButton>
		<IconButton onClick={(e) => handleFinishClick(e, game.id)} data-testid="stop-button">
			<StopCircleIcon />
		</IconButton>
	</ListItemButton>

}