import {Button} from "@mui/material";
import {useCallback} from "react";
import NewGamePopup from "./NewGamePopup.tsx";
import useDialog from "./hooks/useDialog.tsx";
import useNewGame from "./hooks/useNewGame.tsx";

export default function NewGame() {
    const [dialog, open] = useDialog(NewGamePopup)

    const handleCreateNewGame = useNewGame()

    const handleNewGame = useCallback(async () => {
        const result = await open()
        if (result) {
            handleCreateNewGame(result[0], result[1])
        }
    }, [open, handleCreateNewGame])

    return <>
        <Button data-testid="new-game-button" onClick={handleNewGame}>New game</Button>
        {dialog}
    </>
}