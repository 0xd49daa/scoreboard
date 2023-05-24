
export interface Game {
    homeTeam: string
    awayTeam: string
    homeScore: number
    awayScore: number
    id: string
}
interface GameListProps {
    games: Game[]
    onGameClick: (gameIndex: string) => void
    onGameFinish: (gameIndex: string) => void
}
export default function GameList(props: GameListProps) {
    return <div>hello</div>
}