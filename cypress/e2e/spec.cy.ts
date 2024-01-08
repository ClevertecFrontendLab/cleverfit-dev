/// <reference types="cypress" />
describe('sprint 1', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('1440', () => {
        cy.viewport(1440, 900);
        cy.screenshot();
        cy.get('[data-test-id=sider-switch]').click();
        cy.screenshot();
        cy.get('[data-test-id=sider-switch]').click();
        cy.screenshot();
    });
    it('834', () => {
        cy.viewport(834, 1400);
        cy.screenshot();
        cy.get('[data-test-id=sider-switch]').click();
        cy.screenshot();
        cy.get('[data-test-id=sider-switch]').click();
        cy.screenshot();
    });
    it('360', () => {
        cy.viewport(360, 2000);
        cy.screenshot();
        cy.get('[data-test-id=sider-switch]').click();
        cy.screenshot();
        cy.get('[data-test-id=sider-switch]').click();
        cy.screenshot();
    });
});
