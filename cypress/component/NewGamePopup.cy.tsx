/// <reference types="cypress" />
import NewGamePopup from "../../src/components/NewGamePopup";
import '../support/component'

describe('<NewGamePopup />', () => {
  beforeEach(() => {
    cy.mount(<NewGamePopup />)
  })

  it('should render', () => {
    cy.getByTestId('game-popup-title').should('have.text', 'New Game')
    cy.getByTestId('game-popup-home-team').should('exist')
    cy.getByTestId('game-popup-away-team').should('exist')
    cy.getByTestId('game-popup-submit').should('exist')
    cy.getByTestId('game-popup-close').should('exist')
  })

  it('submit button should be enabled when fields are filled', () => {
    cy.getByTestId('game-popup-submit').should('be.disabled')
    cy.getByTestId('game-popup-home-team').type('Mexico')
    cy.getByTestId('game-popup-away-team').type('Canada')
    cy.getByTestId('game-popup-submit').should('be.enabled')
  })
})