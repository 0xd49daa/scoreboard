import {GameContext} from "../../contexts/GameContext.tsx";
import {useCallback, useContext} from "react";
import {ActionType} from "../reducer.ts";

export default function useUpdateScore() {
    const [_, dispatch] = useContext(GameContext)

    return useCallback((gameIndex: number, homeScore: number, awayScore: number) => {
        dispatch({type: ActionType.UpdateScore, payload: {index: gameIndex, homeScore, awayScore}})
    }, [])
}