import GameList from "./GameList.tsx";
import {useCallback, useContext} from "react";
import {GameContext} from "../contexts/GameContext.tsx";
import UpdateScorePopup from "./UpdateScorePopup.tsx";
import useUpdateScore from "./hooks/useUpdateScore.tsx";
import useDialog from "./hooks/useDialog.tsx";
import useFinishGame from "./hooks/useFinishGame.tsx";
import useCard from './hooks/useCard.tsx'
import PlayerNameDialog from './PlayerNameDialog.tsx'
import {CardColor} from './reducer.ts'

export default function GameBoard() {
    const [state] = useContext(GameContext)
    const [dialog, open] = useDialog(UpdateScorePopup)
    const [playerNameDialog, openPlayerNameDialog] = useDialog(PlayerNameDialog)
    const handleUpdateScore = useUpdateScore()
    const handleFinishGame = useFinishGame()
    const handleCard = useCard()

    const handleCardClick = useCallback(async (gameId: string, color: CardColor) => {
        const result = await openPlayerNameDialog()

        if (!result) {
            return
        }

        handleCard(gameId, color, result[0])
    }, [handleCard])

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
        <GameList games={state} onGameClick={handleGameClick} onGameFinish={handleFinishGame} onCard={handleCardClick} />
        {dialog}
        {playerNameDialog}
    </>
}
