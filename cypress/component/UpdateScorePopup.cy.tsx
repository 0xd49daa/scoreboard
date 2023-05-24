/// <reference types="cypress" />
import '../support/component'
import UpdateScorePopup from "../../src/components/UpdateScorePopup";

describe('<UpdateScorePopup />', () => {
    beforeEach(() => {
        cy.mount(<UpdateScorePopup
            open={true}
            onSubmit={() => {
            }}
            onClose={() => {
            }}
            homeTeamLabel="Mexico"
            awayTeamLabel="Canada"
            homeTeamScore={3}
            awayTeamScore={2}
        />)
    })

    it('should render', () => {
        cy.getByTestId('score-popup-title').should('have.text', 'Update Score')
        cy.getByTestId('score-popup-home-team').should('have.text', 'Mexico')
        cy.getByTestId('score-popup-away-team').should('have.text', 'Canada')
        cy.getByTestId('score-popup-home-score').should('have.value', '3')
        cy.getByTestId('score-popup-away-score').should('have.value', '2')
        cy.getByTestId('score-popup-submit').should('exist')
        cy.getByTestId('score-popup-close').should('exist')
    })

    it('submit button should be enabled when fields are filled with number', () => {
        cy.getByTestId('score-popup-submit').should('be.disabled')
        cy.getByTestId('score-popup-home-score').clear().type('4')
        cy.getByTestId('score-popup-away-score').clear()
        cy.getByTestId('score-popup-submit').should('be.disabled')
        cy.getByTestId('score-popup-away-score').type('3')
        cy.getByTestId('score-popup-submit').should('be.enabled')
        cy.getByTestId('score-popup-home-score').clear()
        cy.getByTestId('score-popup-submit').should('be.disabled')

        cy.getByTestId('score-popup-home-score').clear().type('a')
        cy.getByTestId('score-popup-away-score').clear().type('4')
        cy.getByTestId('score-popup-submit').should('be.disabled')

        cy.getByTestId('score-popup-home-score').clear().type('4')
        cy.getByTestId('score-popup-away-score').clear().type('b')
        cy.getByTestId('score-popup-submit').should('be.disabled')
    })

    it('should call onSubmit when submit button is clicked', () => {
        const onSubmit = cy.stub()

        cy.mount(<UpdateScorePopup
            open={true}
            onSubmit={onSubmit}
            onClose={() => {}}
            homeTeamLabel="Mexico"
            awayTeamLabel="Canada"
            homeTeamScore={3}
            awayTeamScore={2}
        />)

        cy.getByTestId('score-popup-home-score').clear().type('4')
        cy.getByTestId('score-popup-away-score').clear().type('5')
        cy.wrap(onSubmit).should('have.been.calledOnceWith', 4, 5)
    })

    it('should call onClose when close button is clicked', () => {
        const onClose = cy.stub()

        cy.mount(<UpdateScorePopup
            open={true}
            onSubmit={() => {}}
            onClose={onClose}
            homeTeamLabel="Mexico"
            awayTeamLabel="Canada"
            homeTeamScore={3}
            awayTeamScore={2}
        />)

        cy.getByTestId('score-popup-close').click()
        cy.wrap(onClose).should('have.been.calledOnce')
    })
})

