import {useCallback, useState} from "react"
import {TextField} from "@mui/material"
import BaseDialog from "./BaseDialog.tsx";

interface NewGamePopupProps {
    open: boolean
    onSubmit: (homeTeam: string, awayTeam: string) => void
    onClose: () => void
}

export default function NewGamePopup(props: NewGamePopupProps) {
    const [homeTeam, setHomeTeam] = useState('')
    const [awayTeam, setAwayTeam] = useState('')

    const handleSubmit = useCallback(() => {
        props.onSubmit(homeTeam, awayTeam)
    }, [homeTeam, awayTeam, props.onSubmit])

    const isSubmitDisabled = homeTeam === '' || awayTeam === ''

    return <BaseDialog
            open={props.open}
            title="New Game"
            onClose={props.onClose}
            onSubmit={handleSubmit}
            submitDisabled={isSubmitDisabled}>
        <TextField
            onChange={(e) => setHomeTeam(e.target.value)}
            data-testid="game-popup-home-team"
            label="Home Team"
            sx={{marginRight: '8px'}} />
        <TextField
            onChange={(e) => setAwayTeam(e.target.value)}
            data-testid="game-popup-away-team"
            label="Away Team" />
    </BaseDialog>
}