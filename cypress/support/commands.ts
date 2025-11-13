/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to check if an element is visible on the page
       * @example cy.get('.element').shouldBeVisible()
       */
      shouldBeVisible(): Chainable<JQuery<HTMLElement>>

      /**
       * Custom command to toggle dark mode
       * @example cy.toggleDarkMode()
       */
      toggleDarkMode(): Chainable<void>

      /**
       * Custom command to verify theme
       * @example cy.verifyTheme('dark')
       */
      verifyTheme(theme: 'light' | 'dark'): Chainable<void>
    }
  }
}

Cypress.Commands.add('shouldBeVisible', { prevSubject: true }, (subject) => {
  cy.wrap(subject).should('be.visible');
  return cy.wrap(subject);
});

Cypress.Commands.add('toggleDarkMode', () => {
  cy.get('button[aria-label*="theme" i], button[title*="theme" i]').click({ force: true });
});

Cypress.Commands.add('verifyTheme', (theme: 'light' | 'dark') => {
  cy.get('html').should('have.class', theme);
});

export {};
