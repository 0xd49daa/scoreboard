/// <reference types="cypress" />
import '../support/component'
import GameList from "../../src/components/GameList";
import {Game} from "../../src/components/reducer";

const date5MinutesAgo = new Date(Date.now() - 1000 * 60 * 5)
const date4MinuteAgo = new Date(Date.now() - 1000 * 60 * 4)

const games: Game[] = [
    { id: '1', homeTeam: 'Mexico', awayTeam: 'Canada', homeScore: 0, awayScore: 5, events: [date5MinutesAgo, date5MinutesAgo, date4MinuteAgo, new Date()] },
    { id: '2', homeTeam: 'Spain', awayTeam: 'Brazil', homeScore: 10, awayScore: 2, events: [date5MinutesAgo] },
    { id: '3', homeTeam: 'Germany', awayTeam: 'France', homeScore: 2, awayScore: 2, events: [date5MinutesAgo] },
    { id: '4', homeTeam: 'Uruquay', awayTeam: 'Italy', homeScore: 6, awayScore: 6, events: [date5MinutesAgo] },
    { id: '5', homeTeam: 'Agrentina', awayTeam: 'Australia', homeScore: 3, awayScore: 1, events: [date5MinutesAgo] }
]

describe('<GameList />', () => {
    it('should render', () => {
        cy.mount(<GameList games={games} onGameClick={() => {}} onGameFinish={() => {}} />)

        cy.getByTestId('game-list-row').eq(0).should('have.text', 'Uruquay 6 - 6 Italy') // 12
        cy.getByTestId('game-list-row').eq(1).should('have.text', 'Spain 10 - 2 Brazil') // 12
        cy.getByTestId('game-list-row').eq(2).should('have.text', 'Mexico 0 - 5 Canada') // 5
        cy.getByTestId('game-list-row').eq(3).should('have.text', 'Agrentina 3 - 1 Australia') // 4
        cy.getByTestId('game-list-row').eq(4).should('have.text', 'Germany 2 - 2 France') // 4
    })

    it('should call onGameClick when a game is clicked', () => {
        const onGameClick = cy.stub()

        cy.mount(<GameList games={games} onGameClick={onGameClick} onGameFinish={() => {}} />)

        cy.getByTestId('game-list-row').eq(3).click()
        cy.wrap(onGameClick).should('have.been.calledOnceWith', "5")
    })

    it('should call onGameFinish when a game is finished', () => {
        const onGameFinish = cy.stub()
        const onGameClick = cy.stub()

        cy.mount(<GameList games={games} onGameClick={onGameClick} onGameFinish={onGameFinish} />)

        cy.getByTestId('game-list-row').eq(3).find('button').click()
        cy.wrap(onGameFinish).should('have.been.calledOnceWith', "5")
        cy.wrap(onGameClick).should('not.have.been.called')
    })

    it.only('should display the time of the goals', () => {
        cy.mount(<GameList games={games} onGameClick={() => {}} onGameFinish={() => {}} />)
        cy.getByTestId('game-goal').eq(0).should('have.text', 'scored in 5 minutes')
        cy.getByTestId('game-goal').eq(1).should('have.text', 'scored in 1 minute')
    })
})