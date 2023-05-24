/// <reference types="cypress" />
import '../support/component'
import Scoreboard from "../../src/components/Scoreboard";

describe('<Scoreboard />', () => {
    function createGame(homeTeam: string, awayTeam: string) {
        cy.getByTestId('new-game-button').click()
        cy.getByTestId('game-popup-home-team').clear().type(homeTeam)
        cy.getByTestId('game-popup-away-team').clear().type(awayTeam)
        cy.getByTestId('popup-submit').click()
    }

    beforeEach(() => {
        cy.mount(<Scoreboard />)
    })

    it('should render', () => {
        cy.getByTestId('new-game-button').should('exist')
        cy.getByTestId('game-list').should('exist')
    })

    it.only('should create a new game', () => {
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

        cy.getByTestId('game-list-row').eq(0).find('stop-button').click()
        cy.getByTestId('game-list-row').should('not.exist')
    })
})
