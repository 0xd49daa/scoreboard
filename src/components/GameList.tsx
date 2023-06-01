import {List} from "@mui/material";
import {useMemo} from "react";
import {Game} from "./reducer.ts";
import MatchItem from './MatchItem.tsx'

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

    return <List data-testid="game-list">
        {sortedGames.map((game) => {
            return <MatchItem key={game.id} game={game} onGameClick={props.onGameClick} onGameFinish={props.onGameFinish} />
        })}
    </List>
}