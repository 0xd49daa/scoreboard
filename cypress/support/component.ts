// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import { mount } from 'cypress/react18'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      getByTestId(dataTestIdAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>
    }
  }
}

Cypress.Commands.add('mount', mount)
Cypress.Commands.add(
    'getByTestId',
    { prevSubject: 'optional' },
    (prevSubject, selector, ...args) => {
      if(prevSubject) {
        return cy.wrap(prevSubject).find(`[data-testid=${selector}]`, ...args)
      } else {
        return cy.get(`[data-testid=${selector}]`, ...args)
      }
    }
)


// Example use:
// cy.mount(<MyComponent />)