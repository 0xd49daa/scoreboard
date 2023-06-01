/// <reference types="cypress" />
import '../support/component'
import UpdateScorePopup from "../../src/components/UpdateScorePopup";
import {stepUpWithOnChange} from '../support/utils'

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
        cy.getByTestId('popup-title').should('have.text', 'Update Score')
        cy.getByTestId('score-popup-home-score').find('label').should('have.text', 'Mexico')
        cy.getByTestId('score-popup-away-score').find('label').should('have.text', 'Canada')
        cy.getByTestId('score-popup-home-score').find('input').should('have.value', '3')
        cy.getByTestId('score-popup-away-score').find('input').should('have.value', '2')
        cy.getByTestId('popup-submit').should('exist')
        cy.getByTestId('popup-close').should('exist')
    })

    it('submit button should be enabled when there are changes', () => {
        cy.getByTestId('popup-submit').should('be.disabled')
        stepUpWithOnChange('score-popup-home-score')
        cy.getByTestId('score-popup-player-name').type('J. D.')
        cy.getByTestId('popup-submit').should('be.enabled')
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

        stepUpWithOnChange('score-popup-away-score')
        cy.getByTestId('score-popup-player-name').type('J. D.')

        cy.getByTestId('popup-submit').click()
        cy.wrap(onSubmit).should('have.been.calledOnceWith', 3, 3, 'J. D.')
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

        cy.getByTestId('popup-close').click()
        cy.wrap(onClose).should('have.been.calledOnce')
    })

    it('should increment value of the score by 1 for home team and cannot be changed for away team later', () => {
        cy.getByTestId('score-popup-player-name').type('J. D.')

        cy.getByTestId('popup-submit').should('be.disabled')
        stepUpWithOnChange('score-popup-home-score')
        cy.getByTestId('score-popup-home-score').find('input').should('have.value', '4')
        cy.getByTestId('popup-submit').should('be.enabled')

        stepUpWithOnChange('score-popup-away-score')
        cy.getByTestId('score-popup-away-score').find('input').should('have.value', '2')
    })

    it('should decrement value of the score by 1 for away team and cannot be changed for home team later', () => {
        cy.getByTestId('score-popup-player-name').type('J. D.')

        cy.getByTestId('popup-submit').should('be.disabled')
        stepUpWithOnChange('score-popup-away-score')
        cy.getByTestId('score-popup-away-score').find('input').should('have.value', '3')
        cy.getByTestId('popup-submit').should('be.enabled')

        stepUpWithOnChange('score-popup-home-score')
        cy.getByTestId('score-popup-home-score').find('input').should('have.value', '3')
    })
})

