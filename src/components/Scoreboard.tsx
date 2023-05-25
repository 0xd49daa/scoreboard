import NewGame from "./NewGame.tsx";
import {GameContext} from "../contexts/GameContext.tsx";
import React, {useMemo, useReducer} from "react";
import reducer, {Action, State} from "./reducer.ts";
import GameBoard from "./GameBoard.tsx";

export default function Scoreboard() {
    const [state, dispatch] = useReducer(reducer, [])
    const value = useMemo((): [State, React.Dispatch<Action>] => ([state, dispatch]), [state, dispatch])

    return <GameContext.Provider value={value}>
        <NewGame />
        <GameBoard />
    </GameContext.Provider>
}