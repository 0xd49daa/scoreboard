import {GameContext} from "../../contexts/GameContext.tsx";
import {useCallback, useContext} from "react";
import {ActionType} from "../reducer.ts";

export default function useFinishGame() {
    const [_, dispatch] = useContext(GameContext)

    return useCallback((gameIndex: number) => {
        dispatch({type: ActionType.FinishGame, payload: {index: gameIndex}})
    }, [])
}