import {useCallback, useState} from "react"
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField} from "@mui/material"

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

    return <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle data-testid="game-popup-title">New Game</DialogTitle>
        <DialogContent sx={{display: 'flex', overflow: 'visible' }} >
            <TextField
                onChange={(e) => setHomeTeam(e.target.value)}
                data-testid="game-popup-home-team"
                label="Home Team"
                sx={{marginRight: '8px'}} />
            <TextField
                onChange={(e) => setAwayTeam(e.target.value)}
                data-testid="game-popup-away-team"
                label="Away Team" />
        </DialogContent>
        <DialogActions>
            <Button data-testid="game-popup-close" onClick={props.onClose}>Close</Button>
            <Button
                data-testid="game-popup-submit"
                variant="contained"
                disabled={isSubmitDisabled}
                onClick={handleSubmit}>
                Submit
            </Button>
        </DialogActions>
    </Dialog>

}