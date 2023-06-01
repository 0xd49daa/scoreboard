import GameList from "./GameList.tsx";
import {useCallback, useContext} from "react";
import {GameContext} from "../contexts/GameContext.tsx";
import UpdateScorePopup from "./UpdateScorePopup.tsx";
import useUpdateScore from "./hooks/useUpdateScore.tsx";
import useDialog from "./hooks/useDialog.tsx";
import useFinishGame from "./hooks/useFinishGame.tsx";

export default function GameBoard() {
    const [state] = useContext(GameContext)
    const [dialog, open] = useDialog(UpdateScorePopup)
    const handleUpdateScore = useUpdateScore()
    const handleFinishGame = useFinishGame()

    const handleGameClick = useCallback(async (gameId: string) => {
        const game = state.find((game) => game.id === gameId)

        if (!game) {
            return
        }

        const result = await open({
            homeTeamLabel: game.homeTeam,
            awayTeamLabel: game.awayTeam,
            homeTeamScore: game.homeScore,
            awayTeamScore: game.awayScore
        })

        handleUpdateScore(gameId, result[0], result[1], result[2])
    }, [state, open, handleUpdateScore])

    return <>
        <GameList games={state} onGameClick={handleGameClick} onGameFinish={handleFinishGame} />
        {dialog}
    </>
}
