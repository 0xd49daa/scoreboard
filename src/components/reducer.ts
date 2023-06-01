
export type Game = {
    homeTeam: string
    awayTeam: string
    homeScore: number
    awayScore: number
    id: string
    events: Date[]
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
        id: string
    }
}

export type FinishGameAction = {
    type: ActionType.FinishGame
    payload: {
        id: string
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
                id: `${id}`,
                events: [new Date()]
            }]
        case ActionType.UpdateScore:
            return state.map((game) => {
                if (game.id === action.payload.id) {
                    return {
                        ...game,
                        homeScore: action.payload.homeScore,
                        awayScore: action.payload.awayScore,
                        events: [...game.events, new Date()]
                    }
                }
                return game
            })
        case ActionType.FinishGame:
            return state.filter((game) => game.id !== action.payload.id)
        default:
            return state
    }
}