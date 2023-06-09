export enum EventType {
    GameStart = 'GAME_START',
    Goal = 'GOAL',
    Card = 'CARD',
}

export type GameStartEvent = {
    type: EventType.GameStart,
    datetime: Date
}

export type GoalEvent = {
    type: EventType.Goal,
    datetime: Date
    by: string
}

export type CardColor = 'yellow' | 'red'

export type CardEvent = {
    type: EventType.Card,
    datetime: Date
    color: CardColor
    playerName: string
}

export type GameEvent = GameStartEvent | GoalEvent | CardEvent

export type Game = {
    homeTeam: string
    awayTeam: string
    homeScore: number
    awayScore: number
    id: string
    events: GameEvent[]
}

export type State = Array<Game>
export enum ActionType {
    NewGame = 'NEW_GAME',
    UpdateScore = 'UPDATE_SCORE',
    FinishGame = 'FINISH_GAME',
    ShowCard = 'SHOW_CARD',
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
        by: string
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

export type ShowCardAction = {
    type: ActionType.ShowCard
    payload: {
        id: string,
        color: CardColor,
        playerName: string
    }
}

export type Action = NewGameAction | UpdateScoreAction | FinishGameAction | ShowCardAction

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
                events: [{
                    type: EventType.GameStart,
                    datetime: new Date()
                }]
            }]
        case ActionType.UpdateScore:
            return state.map((game) => {
                if (game.id === action.payload.id) {
                    return {
                        ...game,
                        homeScore: action.payload.homeScore,
                        awayScore: action.payload.awayScore,
                        events: [...game.events, {
                            type: EventType.Goal,
                            datetime: new Date(),
                            by: action.payload.by
                        }]
                    }
                }
                return game
            })
        case ActionType.ShowCard:
            return state.map((game) => {
                if (game.id === action.payload.id) {
                    return {
                        ...game,
                        events: [...game.events, {
                            type: EventType.Card,
                            datetime: new Date(),
                            color: action.payload.color,
                            playerName: action.payload.playerName
                        }]
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