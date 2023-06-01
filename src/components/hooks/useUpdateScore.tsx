import {GameContext} from "../../contexts/GameContext.tsx";
import {useCallback, useContext} from "react";
import {ActionType} from "../reducer.ts";

export default function useUpdateScore() {
    const [_, dispatch] = useContext(GameContext)

    return useCallback((gameId: string, homeScore: number, awayScore: number, playerName: string) => {
        dispatch({type: ActionType.UpdateScore, payload: {id: gameId, homeScore, awayScore, by: playerName}})
    }, [])
}