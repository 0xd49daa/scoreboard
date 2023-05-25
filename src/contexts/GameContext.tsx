import React, {createContext} from "react"
import {Action, State} from "../components/reducer.ts";
export const GameContext = createContext<[ State, React.Dispatch<Action> ]>([[], () => {}])