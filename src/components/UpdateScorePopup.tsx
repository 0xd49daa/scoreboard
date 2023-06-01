import {TextField, Box} from "@mui/material";
import BaseDialog from "./BaseDialog.tsx";
import React, {useCallback, useState} from "react";

interface UpdateScorePopupProps {
    open: boolean
    onSubmit: (homeScore: number, awayScore: number, playerName: string) => void
    onClose: () => void
    homeTeamLabel: string
    awayTeamLabel: string
    homeTeamScore: number
    awayTeamScore: number
}

export default function UpdateScorePopup(props: UpdateScorePopupProps) {
    const [homeScore, setHomeScore] = useState(props.homeTeamScore)
    const [awayScore, setAwayScore] = useState(props.awayTeamScore)
    const [playerName, setPlayerName] = useState('')

    const handleNumberInput = useCallback((inputName: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.currentTarget.value)

        if (isNaN(value)) {
            return
        }

        const newHomeScore = inputName === 'home' ? value : homeScore
        const newAwayScore = inputName === 'away' ? value : awayScore
        const summaryDelta = (newHomeScore + newAwayScore) - (props.awayTeamScore + props.homeTeamScore)

        if (summaryDelta !== 1) {
            return
        }

        inputName === 'home' ? setHomeScore(value) : setAwayScore(value)
    }, [homeScore, awayScore])

    const handleSubmit = useCallback(() => {
        props.onSubmit(homeScore, awayScore, playerName)
    }, [homeScore, awayScore, playerName, props.onSubmit])

    const isSubmitDisabled = homeScore === props.homeTeamScore && awayScore === props.awayTeamScore

    return <BaseDialog open={props.open} title={"Update Score"} onClose={props.onClose} onSubmit={handleSubmit}
                       submitDisabled={isSubmitDisabled}>
        <TextField
            data-testid="score-popup-home-score"
            sx={{marginRight: '8px'}}
            label={props.homeTeamLabel}
            value={homeScore}
            inputProps={{
                type: 'number',
                inputMode: 'numeric',
                pattern: '[0-9]*'
            }}
            onChange={handleNumberInput.bind(null, 'home')}
        />
        <TextField
            data-testid="score-popup-away-score"
            label={props.awayTeamLabel}
            value={awayScore}
            inputProps={{
                type: 'number',
                inputMode: 'numeric',
                pattern: '[0-9]*'
            }}
            onChange={handleNumberInput.bind(null, 'away')}
        />
        <Box sx={{ margin: '16px' }}>by</Box>
        <TextField
            data-testid="score-popup-player-name"
            label={'Player Name'}
            value={playerName}
            onChange={(e) => setPlayerName(e.currentTarget.value)}
        />
    </BaseDialog>
}