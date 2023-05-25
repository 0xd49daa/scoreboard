import {IconButton, List, ListItemButton, ListItemText} from "@mui/material";
import {useCallback, useMemo} from "react";
import StopCircleIcon from '@mui/icons-material/StopCircle'
import {Game} from "./reducer.ts";

interface GameListProps {
    games: Game[]
    onGameClick: (gameIndex: number) => void
    onGameFinish: (gameIndex: number) => void
}
export default function GameList(props: GameListProps) {
    const sortedGames = useMemo(() => {
        console.log('sorting games', props.games)

        return props.games.sort((a, b) => {
            const delta = (b.homeScore + b.awayScore) - (a.homeScore + a.awayScore)

            if (delta !== 0) {
                return delta
            } else {
                return props.games.indexOf(b) - props.games.indexOf(a)
            }
        })
    }, [props.games])

    const handleFinishClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, gameIndex: number) => {
        e.stopPropagation()
        props.onGameFinish(gameIndex)
    }, [])

    return <List data-testid="game-list">
        {sortedGames.map((game, index) => {
            return <ListItemButton key={game.id} data-testid="game-list-row" onClick={() => props.onGameClick(index)}>
                <ListItemText primary={`${game.homeTeam} ${game.homeScore} - ${game.awayScore} ${game.awayTeam}`} />
                <IconButton onClick={(e) => handleFinishClick(e, index)} data-testid="stop-button">
                    <StopCircleIcon />
                </IconButton>
            </ListItemButton>
        })}
    </List>
}