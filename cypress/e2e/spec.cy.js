/* 
Dialsim Copyright © 2023 Andrew Y Ahn, Timothy W Meyer, Tammy L Sirich
This file is part of dialsim, released under the MIT License.
See LICENSE.md for details.
*/

describe('Default Value Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('solving with default input values should result in clearance value of 237.2', () => {
    // Click the button with the id "solve"
    cy.get('#solve').click();

    // Check for expected changes in the DOM or other side effects
    // For example, if it updates a text element with an id of 'result':
    cy.get('#avgclearance').should('have.text', '237.2');
  });
});


describe('Hematocrit Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Hematocrit value of 30 should result in average clearance value of 235.1', () => {
    // Click the button with the id "solve"
    cy.get('#hematocrit').clear().type("30");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '235.1');
  });
});


describe('Additional UF Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('additional UF value of 23 should result in average clearance value of 240.0', () => {
    // Click the button with the id "solve"
    cy.get('#additionaluf').clear().type("23");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '240.0');
  });
});


describe('Fluid Gain Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('fluid gain of 2 should result in average clearance value of 247.7', () => {
    // Click the button with the id "solve"
    cy.get('#fluidgain').clear().type("2");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '247.7');
  });
});

describe('Debug Mode Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('clicking on the Liters per treatment label should reveal debug table treatmentTable', () => {
    // Assign an alias
    cy.get('#literspertreatment').as('litersLabel');

    // Use the alias to click on the element
    cy.get('@litersLabel').click();

    cy.contains('treatmentTable');
  });

  it('clicking on the Liters per treatment label twice should hide debug table treatmentTable', () => {
    // Use the alias again to click on the element
    cy.get('#literspertreatment').as('litersLabel');
    cy.get('@litersLabel').click();
    cy.get('@litersLabel').click();
    cy.contains('treatmentTable').should('not.be.visible');
  });
});



