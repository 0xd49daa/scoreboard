import {GameContext} from "../../contexts/GameContext.tsx";
import {useCallback, useContext} from "react";
import {ActionType} from "../reducer.ts";

export default function useNewGame() {
    const [_, dispatch] = useContext(GameContext)

    return useCallback((homeTeam: string, awayTeam: string) => {
        dispatch({type: ActionType.NewGame, payload: {homeTeam, awayTeam}})
    }, [])
}