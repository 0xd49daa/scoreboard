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

    const handleGameClick = useCallback(async (gameIndex: number) => {
        const result = await open({
            homeTeamLabel: state[gameIndex].homeTeam,
            awayTeamLabel: state[gameIndex].awayTeam,
            homeTeamScore: state[gameIndex].homeScore,
            awayTeamScore: state[gameIndex].awayScore
        })

        handleUpdateScore(gameIndex, result[0], result[1])
    }, [state, open, handleUpdateScore])

    return <>
        <GameList games={state} onGameClick={handleGameClick} onGameFinish={handleFinishGame} />
        {dialog}
    </>
}
