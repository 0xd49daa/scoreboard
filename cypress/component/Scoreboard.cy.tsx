/// <reference types="cypress" />
import '../support/component'
import Scoreboard from "../../src/components/Scoreboard";
import reducer, {ActionType} from "../../src/components/reducer";
import {createGame} from "../support/utils";

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

        cy.getByTestId('score-popup-home-score').clear().type('4')
        cy.getByTestId('score-popup-away-score').clear().type('5')
        cy.getByTestId('popup-submit').click()

        cy.getByTestId('game-list-row').eq(0).should('have.text', 'Mexico 4 - 5 Canada')
    })

    it('should delete the game', () => {
        createGame('Mexico', 'Canada')

        cy.getByTestId('stop-button').eq(0).click()
        cy.getByTestId('game-list-row').should('not.exist')
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
    })

    it('should update score of the game', () => {
        const state = reducer([], {type: ActionType.NewGame, payload: {homeTeam: 'Mexico', awayTeam: 'Canada'}})
        const newState = reducer(state, {type: ActionType.UpdateScore, payload: {index: 0, homeScore: 4, awayScore: 5}})

        expect(newState[0].homeScore).to.equal(4)
        expect(newState[0].awayScore).to.equal(5)
    })

    it('should delete the game', () => {
        const state = reducer([], {type: ActionType.NewGame, payload: {homeTeam: 'Mexico', awayTeam: 'Canada'}})
        const newState = reducer(state, {type: ActionType.FinishGame, payload: {index: 0}})

        expect(newState).to.have.lengthOf(0)
    })
})