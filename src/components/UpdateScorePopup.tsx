import {TextField} from "@mui/material";
import BaseDialog from "./BaseDialog.tsx";
import React, {useCallback, useState} from "react";

interface UpdateScorePopupProps {
    open: boolean
    onSubmit: (homeScore: number, awayScore: number) => void
    onClose: () => void
    homeTeamLabel: string
    awayTeamLabel: string
    homeTeamScore: number
    awayTeamScore: number
}

export default function UpdateScorePopup(props: UpdateScorePopupProps) {
    const [homeScore, setHomeScore] = useState(props.homeTeamScore)
    const [awayScore, setAwayScore] = useState(props.awayTeamScore)

    const handleNumberInput = useCallback((inputName: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.currentTarget.value)

        if (isNaN(value)) {
            return
        }

        inputName === 'home' ? setHomeScore(value) : setAwayScore(value)
    }, [])

    const handleSubmit = useCallback(() => {
        props.onSubmit(homeScore, awayScore)
    }, [homeScore, awayScore, props.onSubmit])

    const isSubmitDisabled = homeScore === props.homeTeamScore && awayScore === props.awayTeamScore

    return <BaseDialog open={props.open} title={"Update Score"} onClose={props.onClose} onSubmit={handleSubmit} submitDisabled={isSubmitDisabled}>
        <TextField
            data-testid="score-popup-home-score"
            sx={{marginRight: '8px'}}
            label={props.homeTeamLabel}
            value={homeScore}
            inputProps={{
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
                inputMode: 'numeric',
                pattern: '[0-9]*'
            }}
            onChange={handleNumberInput.bind(null, 'away')}
        />
    </BaseDialog>
}