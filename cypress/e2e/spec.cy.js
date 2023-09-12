/* 
Dialsim Copyright © 2023 Andrew Y Ahn, Timothy W Meyer, Tammy L Sirich
This file is part of dialsim, released under the MIT License.
See LICENSE.md for details.
*/

describe('Default Values Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('solving with default input values should result in avg clearance value of 237.2 and avg concentrate value of 53.06', () => {
    // Click the button with the id "solve"
    cy.get('#solve').click();
    cy.get('#avgclearance').should('have.text', '237.2');
    cy.get('#timeavgconc').should('have.text', '53.06');
  });
});

// https://cap.stanford.edu/profiles/cwmd?fid=134663&cwmId=9495
describe('Duration Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('solving with duration of 3 hours should result in time avg concentrate of 57.19', () => {
    // Click the button with the id "solve". 237.2, 57.33, 86.01
    cy.get('#solve').click();
    cy.get('#duration').clear().type("3");
    cy.get('#timeavgconc').should('have.text', '57.19');
  });

  it('solving with duration of 3.5 hours should result in time avg concentrate of 50.96', () => {
    // Click the button with the id "solve"   237.2, 50.87, 79.30
    cy.get('#solve').click();
    cy.get('#duration').clear().type("3.5");
    cy.get('#timeavgconc').should('have.text', '50.96');
  });

  it('solving with duration of 4 hours should result in time avg concentrate of 46.29', () => {
    // Click the button with the id "solve". 237.2, 46.16, 74.37
    cy.get('#solve').click();
    cy.get('#duration').clear().type("4");
    cy.get('#timeavgconc').should('have.text', '46.29');
  });
});


describe('Hematocrit Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Hematocrit value of 30 should result in average clearance value of 235.1 and time avg concentrate value of 53.48', () => {
    // Click the button with the id "solve"
    cy.get('#hematocrit').clear().type("30");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '235.1');
    cy.get('#timeavgconc').should('have.text', '53.48');
  });
});


describe('Additional UF Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('additional UF value of 23 should result in average clearance value of 240.0 and time avg concentrate value of 52.63', () => {
    // Click the button with the id "solve" 240.0, 52.73, 81.25
    cy.get('#additionaluf').clear().type("23");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '240.0');
    cy.get('#timeavgconc').should('have.text', '52.63');
  });

  it('additional UF value of 30 should result in average clearance value of 241.3 and time avg concentrate value of 52.43', () => {
    // Click the button with the id "solve" 241.3, 52.51, 81.03
    cy.get('#additionaluf').clear().type("30");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '241.3');
    cy.get('#timeavgconc').should('have.text', '52.43');
  });

});


describe('Fluid Gain Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('fluid gain of 2 should result in average clearance value of 247.7 and time avg concentrate value of 51.43', () => {
    // Click the button with the id "solve"
    cy.get('#fluidgain').clear().type("2");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '247.7');
    cy.get('#timeavgconc').should('have.text', '51.43');
  });

  it('fluid gain of 3 should result in average clearance value of 253.0 and time avg concentrate value of 50.56', () => {
    // Click the button with the id "solve"
    cy.get('#fluidgain').clear().type("3");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '253.0');
    cy.get('#timeavgconc').should('have.text', '50.56');
  });

  it('fluid gain of 4 should result in average clearance value of 258.2 and time avg concentrate value of 49.64', () => {
    // Click the button with the id "solve"
    cy.get('#fluidgain').clear().type("4");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '258.2');
    cy.get('#timeavgconc').should('have.text', '49.64');
  });


});

describe('Volume of Distribution Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('volume of distribution of 20 should result in time averaged concentrate value of 65.98', () => {
    // Click the button with the id "solve"
    cy.get('#volumeofdist').clear().type("20");  237.2, 66.01, 117.35
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '65.98');
  });

  it('volume of distribution of 30 should result in time averaged concentrate value of 55.76', () => {
    // Click the button with the id "solve" 237.2, 55.84, 90.05
    cy.get('#volumeofdist').clear().type("30");
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '55.76');
  });

  it('volume of distribution of 40 should result in time averaged concentrate value of 52.27', () => {
    // Click the button with the id "solve" 237.2, 52.04, 77.72
    cy.get('#volumeofdist').clear().type("40");
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '52.27');
  });

  it('volume of distribution of 50 should result in time averaged concentrate value of 50.42', () => {
    // Click the button with the id "solve" 237.2, 50.26, 70.86
    cy.get('#volumeofdist').clear().type("50");
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '50.42');
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



