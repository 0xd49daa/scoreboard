import {useCallback, useState} from "react"
import {TextField} from "@mui/material"
import BaseDialog from "./BaseDialog.tsx";

interface PlayerNameDialogProps {
	open: boolean
	onSubmit: (playerName: string) => void
	onClose: () => void
}

export default function PlayerNameDialog(props: PlayerNameDialogProps) {
	const [playerName, setPlayerName] = useState('')

	const handleSubmit = useCallback(() => {
		props.onSubmit(playerName)
	}, [playerName, props.onSubmit])

	const isSubmitDisabled = playerName === ''

	return <BaseDialog
		open={props.open}
		title="Player Name"
		onClose={props.onClose}
		onSubmit={handleSubmit}
		submitDisabled={isSubmitDisabled}>
		<TextField
			onChange={(e) => setPlayerName(e.target.value)}
			data-testid="player-name"
			label="Player Name"
			sx={{marginRight: '8px'}} />
	</BaseDialog>
}