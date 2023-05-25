
export type Game = {
    homeTeam: string
    awayTeam: string
    homeScore: number
    awayScore: number
    id: string
}

export type State = Array<Game>
export enum ActionType {
    NewGame = 'NEW_GAME',
    UpdateScore = 'UPDATE_SCORE',
    FinishGame = 'FINISH_GAME'
}

export type NewGameAction = {
    type: ActionType.NewGame
    payload: {
        homeTeam: string
        awayTeam: string
    }
}

export type UpdateScoreAction = {
    type: ActionType.UpdateScore
    payload: {
        homeScore: number
        awayScore: number
        index: number
    }
}

export type FinishGameAction = {
    type: ActionType.FinishGame
    payload: {
        index: number
    }
}

export type Action = NewGameAction | UpdateScoreAction | FinishGameAction

let id = 0
export default function reducer(state: State = [], action: Action): State {
    switch (action.type) {
        case ActionType.NewGame:
            id++
            return [...state, {
                homeTeam: action.payload.homeTeam,
                awayTeam: action.payload.awayTeam,
                homeScore: 0,
                awayScore: 0,
                id: `${id}`
            }]
        case ActionType.UpdateScore:
            return state.map((game, index) => {
                if (index === action.payload.index) {
                    return {
                        ...game,
                        homeScore: action.payload.homeScore,
                        awayScore: action.payload.awayScore
                    }
                }
                return game
            })
        case ActionType.FinishGame:
            state.splice(action.payload.index, 1)
            return [...state]
        default:
            return state
    }
}