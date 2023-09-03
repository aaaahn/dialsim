
describe('dialsim', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('solving with default values should return clearance value of 237.2', () => {
    // Click the button with the id "solve"
    cy.get('#solve').click();

    // Check for expected changes in the DOM or other side effects
    // For example, if it updates a text element with an id of 'result':
    cy.get('#avgclearance').should('have.text', '237.2');
  });
});


describe('dialsim', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Hematocrit value of 30 should return average clearance value of 235.1', () => {
    // Click the button with the id "solve"
    cy.get('#hematocrit').clear().type("30");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '235.1');
  });
});


describe('dialsim', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('additional UF value of 23 and should return average clearance value of 240.0', () => {
    // Click the button with the id "solve"
    cy.get('#additionaluf').clear().type("23");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '240.0');
  });
});


describe('dialsim', () => {
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

describe('dialsim', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('clicking on the Liters per treatment label should display debug table treatmentTable', () => {
    // Click the button with the id "solve"
    cy.get('#literspertreatment').click();

    cy.contains('treatmentTable');
  });
});


