/// <reference types="cypress" />
import NewGamePopup from "../../src/components/NewGamePopup";
import '../support/component'

describe('<NewGamePopup />', () => {
    beforeEach(() => {
        cy.mount(<NewGamePopup open={true} onSubmit={() => {
        }} onClose={() => {
        }}/>)
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

    it('should call onSubmit when submit button is clicked', () => {
        const onSubmit = cy.stub()

        cy.mount(<NewGamePopup open={true} onSubmit={onSubmit} onClose={() => {}}/>)
        cy.getByTestId('game-popup-home-team').type('Mexico')
        cy.getByTestId('game-popup-away-team').type('Canada')
        cy.getByTestId('game-popup-submit').click()
        cy.wrap(onSubmit).should('have.been.calledOnceWith', 'Mexico', 'Canada')
    })

    it('should call onClose when close button is clicked', () => {
        const onClose = cy.stub()

        cy.mount(<NewGamePopup open={true} onSubmit={() => {}} onClose={onClose}/>)
        cy.getByTestId('game-popup-close').click()
        cy.wrap(onClose).should('have.been.calledOnce')
    })
})