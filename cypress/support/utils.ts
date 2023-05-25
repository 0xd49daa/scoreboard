/// <reference types="cypress" />
import './component'

export function createGame(homeTeam: string, awayTeam: string) {
    cy.getByTestId('new-game-button').click()
    cy.getByTestId('game-popup-home-team').clear().type(homeTeam)
    cy.getByTestId('game-popup-away-team').clear().type(awayTeam)
    cy.getByTestId('popup-submit').click()
}
