/// <reference types="cypress" />
import './component'

export function createGame(homeTeam: string, awayTeam: string) {
    cy.getByTestId('new-game-button').click()
    cy.getByTestId('game-popup-home-team').clear().type(homeTeam)
    cy.getByTestId('game-popup-away-team').clear().type(awayTeam)
    cy.getByTestId('popup-submit').click()
}

export function stepUpWithOnChange(id) {
    return cy.getByTestId(id).find('input').then($input => {
        $input.get(0).stepUp()
        cy.wrap($input).trigger('change', {force: true})
    })
}