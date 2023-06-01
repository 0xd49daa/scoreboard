/// <reference types="cypress" />
import '../support/component'
import GameList from "../../src/components/GameList";
import {CardEvent, EventType, Game, GameEvent, GameStartEvent, GoalEvent} from "../../src/components/reducer";

const date5MinutesAgo = new Date(Date.now() - 1000 * 60 * 5)
const date4MinutesAgo = new Date(Date.now() - 1000 * 60 * 4)
const gameStartEvent = {
    type: EventType.GameStart,
    datetime: date5MinutesAgo
} as GameStartEvent

const goal5MinutesEvent = {
    type: EventType.Goal,
    datetime: date5MinutesAgo,
    by: 'John Doe'
} as GoalEvent

const goal4MinutesEvent = {
    type: EventType.Goal,
    datetime: date4MinutesAgo,
    by: 'Karl Crueler'
} as GoalEvent
const goalNowEvent = {
    type: EventType.Goal,
    datetime: new Date(),
    by: 'Eduardo Garcia'
} as GoalEvent

const redCardEvent = {
    type: EventType.Card,
    datetime: date4MinutesAgo,
    color: 'red',
    playerName: 'John Doe'
} as CardEvent

const yellowCardEvent = {
    type: EventType.Card,
    datetime: new Date(),
    color: 'yellow',
    playerName: 'Eduardo Garcia'
} as CardEvent

const emptyFunction = () => {}

const games: Game[] = [
    { id: '1', homeTeam: 'Mexico', awayTeam: 'Canada', homeScore: 0, awayScore: 5, events: [gameStartEvent, goal5MinutesEvent, redCardEvent, goal4MinutesEvent, goalNowEvent, yellowCardEvent] },
    { id: '2', homeTeam: 'Spain', awayTeam: 'Brazil', homeScore: 10, awayScore: 2, events: [gameStartEvent] },
    { id: '3', homeTeam: 'Germany', awayTeam: 'France', homeScore: 2, awayScore: 2, events: [gameStartEvent] },
    { id: '4', homeTeam: 'Uruquay', awayTeam: 'Italy', homeScore: 6, awayScore: 6, events: [gameStartEvent] },
    { id: '5', homeTeam: 'Agrentina', awayTeam: 'Australia', homeScore: 3, awayScore: 1, events: [gameStartEvent] }
]

describe('<GameList />', () => {
    it('should render', () => {
        cy.mount(<GameList games={games} onGameClick={emptyFunction} onGameFinish={emptyFunction}  onCard={emptyFunction} />)

        cy.getByTestId('game-list-row').eq(0).should('contain.text', 'Uruquay 6 - 6 Italy') // 12
        cy.getByTestId('game-list-row').eq(1).should('contain.text', 'Spain 10 - 2 Brazil') // 12
        cy.getByTestId('game-list-row').eq(2).should('contain.text', 'Mexico 0 - 5 Canada') // 5
        cy.getByTestId('game-list-row').eq(3).should('contain.text', 'Agrentina 3 - 1 Australia') // 4
        cy.getByTestId('game-list-row').eq(4).should('contain.text', 'Germany 2 - 2 France') // 4
    })

    it('should call onGameClick when a game is clicked', () => {
        const onGameClick = cy.stub()

        cy.mount(<GameList games={games} onGameClick={onGameClick} onGameFinish={emptyFunction} onCard={emptyFunction} />)

        cy.getByTestId('game-list-row').eq(3).click()
        cy.wrap(onGameClick).should('have.been.calledOnceWith', "5")
    })

    it('should call onGameFinish when a game is finished', () => {
        const onGameFinish = cy.stub()
        const onGameClick = cy.stub()

        cy.mount(<GameList games={games} onGameClick={onGameClick} onGameFinish={onGameFinish} onCard={emptyFunction} />)

        cy.getByTestId('game-list-row').eq(3).find('[data-testid="stop-button"]').click()
        cy.wrap(onGameFinish).should('have.been.calledOnceWith', "5")
        cy.wrap(onGameClick).should('not.have.been.called')
    })

    it('should display the time of the goals and player initials and card information', () => {
        cy.mount(<GameList games={games} onGameClick={emptyFunction} onGameFinish={emptyFunction} onCard={emptyFunction} />)
        cy.getByTestId('game-event').eq(0).should('have.text', 'yellow card to E.G. in 5 minutes')
        cy.getByTestId('game-event').eq(1).should('have.text', 'scored in 5 minutes by E.G.')
        cy.getByTestId('game-event').eq(2).should('have.text', 'scored in 1 minute by K.C.')
        cy.getByTestId('game-event').eq(3).should('have.text', 'red card to J.D. in 1 minute')
        cy.getByTestId('game-event').eq(4).should('have.text', 'scored in 0 minutes by J.D.')
    })
})