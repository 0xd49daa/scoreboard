/// <reference types="cypress" />
import '../support/component'
import Scoreboard from "../../src/components/Scoreboard";
import reducer, {ActionType, CardEvent, EventType, GoalEvent} from "../../src/components/reducer";
import {createGame, stepUpWithOnChange} from "../support/utils";

describe('<Scoreboard />', () => {
    beforeEach(() => {
        cy.mount(<Scoreboard />)
    })

    it('should render', () => {
        cy.getByTestId('new-game-button').should('exist')
        cy.getByTestId('game-list').should('exist')
    })

    it('should create a new game', () => {
        createGame('Mexico', 'Canada')
        cy.getByTestId('game-list-row').eq(0).should('have.text', 'Mexico 0 - 0 Canada')
    })

    it('should update score of the game', () => {
        createGame('Mexico', 'Canada')

        cy.getByTestId('game-list-row').eq(0).click()

        stepUpWithOnChange('score-popup-home-score')
        cy.getByTestId('score-popup-player-name').type('Luke Skywalker')

        cy.getByTestId('popup-submit').click()

        cy.getByTestId('game-list-row').eq(0).should('contain.text', 'Mexico 1 - 0 Canada')
        cy.getByTestId('game-event').eq(0).should('have.text', 'scored in 0 minutes by L.S.')
    })

    it('should log a yellow card', () => {
        createGame('Mexico', 'Canada')
        cy.getByTestId('yellow-card-button').eq(0).click()
        cy.getByTestId('player-name').type('John Doe')
        cy.getByTestId('popup-submit').click()
        cy.getByTestId('game-event').eq(0).should('have.text', 'yellow card to J.D. in 0 minutes')
    })

    it('should log a red card', () => {
        createGame('Mexico', 'Canada')
        cy.getByTestId('red-card-button').eq(0).click()
        cy.getByTestId('player-name').type('John Doe')
        cy.getByTestId('popup-submit').click()
        cy.getByTestId('game-event').eq(0).should('have.text', 'red card to J.D. in 0 minutes')
    })

    it('should delete the game', () => {
        createGame('Mexico', 'Canada')

        cy.getByTestId('stop-button').eq(0).click()
        cy.getByTestId('game-list-row').should('not.exist')
    })

    it('should sort by most recent games first', () => {
        createGame('Mexico', 'Canada')
        createGame('Spain', 'Brazil')
        createGame('Germany', 'France')

        cy.getByTestId('game-list-row').eq(0).should('have.text', 'Germany 0 - 0 France')
        cy.getByTestId('game-list-row').eq(1).should('have.text', 'Spain 0 - 0 Brazil')
        cy.getByTestId('game-list-row').eq(2).should('have.text', 'Mexico 0 - 0 Canada')
    })
})

describe('reducer', () => {
    it('should create a new game', () => {
        const state = reducer([], {type: ActionType.NewGame, payload: {homeTeam: 'Mexico', awayTeam: 'Canada'}})

        expect(state).to.have.lengthOf( 1)
        expect(state[0].homeTeam).to.equal('Mexico')
        expect(state[0].awayTeam).to.equal('Canada')
        expect(state[0].homeScore).to.equal(0)
        expect(state[0].awayScore).to.equal(0)

        const lastEvent = state[0].events[state[0].events.length - 1]

        expect(lastEvent.type).to.equal(EventType.GameStart)
    })

    it('should update score of the game', () => {
        const state = reducer([], {type: ActionType.NewGame, payload: {homeTeam: 'Mexico', awayTeam: 'Canada'}})
        const gameId = state[0].id
        const newState = reducer(state, {type: ActionType.UpdateScore, payload: {id: gameId, homeScore: 4, awayScore: 5, by: 'Kurt Rassmusen'}})

        expect(newState[0].homeScore).to.equal(4)
        expect(newState[0].awayScore).to.equal(5)

        const lastEvent = newState[0].events[newState[0].events.length - 1]

        expect(lastEvent.type).to.equal(EventType.Goal)
        expect((lastEvent as GoalEvent).by).to.equal('Kurt Rassmusen')
    })

    it('should log a card', () => {
        const state = reducer([], {type: ActionType.NewGame, payload: {homeTeam: 'Mexico', awayTeam: 'Canada'}})
        const gameId = state[0].id
        const newState = reducer(state, {type: ActionType.ShowCard, payload: {id: gameId, color: 'yellow', playerName: 'John Doe'}})
        const lastEvent = newState[0].events[newState[0].events.length - 1]

        expect(lastEvent.type).to.equal(EventType.Card)
        expect((lastEvent as CardEvent).color).to.equal('yellow')
        expect((lastEvent as CardEvent).playerName).to.equal('John Doe')
    })

    it('should delete the game', () => {
        const state = reducer([], {type: ActionType.NewGame, payload: {homeTeam: 'Mexico', awayTeam: 'Canada'}})
        const gameId = state[0].id
        const newState = reducer(state, {type: ActionType.FinishGame, payload: {id: gameId}})

        expect(newState).to.have.lengthOf(0)
    })
})