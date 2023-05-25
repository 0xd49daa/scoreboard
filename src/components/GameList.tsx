import {IconButton, List, ListItemButton, ListItemText} from "@mui/material";
import {useCallback, useMemo} from "react";
import StopCircleIcon from '@mui/icons-material/StopCircle'
import {Game} from "./reducer.ts";

interface GameListProps {
    games: Game[]
    onGameClick: (gameId: string) => void
    onGameFinish: (gameId: string) => void
}
export default function GameList(props: GameListProps) {
    const sortedGames = useMemo(() => {
        const games = [...props.games]

        return games.sort((a, b) => {
            const delta = (b.homeScore + b.awayScore) - (a.homeScore + a.awayScore)

            if (delta !== 0) {
                return delta
            } else {
                return props.games.indexOf(b) - props.games.indexOf(a)
            }
        })
    }, [props.games])

    const handleFinishClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, gameId: string) => {
        e.stopPropagation()
        props.onGameFinish(gameId)
    }, [])

    return <List data-testid="game-list">
        {sortedGames.map((game) => {
            return <ListItemButton key={game.id} data-testid="game-list-row" onClick={() => props.onGameClick(game.id)}>
                <ListItemText primary={`${game.homeTeam} ${game.homeScore} - ${game.awayScore} ${game.awayTeam}`} />
                <IconButton onClick={(e) => handleFinishClick(e, game.id)} data-testid="stop-button">
                    <StopCircleIcon />
                </IconButton>
            </ListItemButton>
        })}
    </List>
}