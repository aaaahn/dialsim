/* 
Dialsim Copyright © 2023 Andrew Y Ahn, Timothy W Meyer, Tammy L Sirich
This file is part of dialsim, released under the MIT License.
See LICENSE.md for details.
*/

describe('Default Values Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('solving with default inputs should result in avg clearance of 237.2 and avg concentrate of 51.62', () => {
    // Click the button with the id "solve"
    cy.get('#solve').click();
    cy.get('#avgclearance').should('have.text', '237.2');
    cy.get('#timeavgconc').should('have.text', '51.62');  // 51.57
  });
});

// https://cap.stanford.edu/profiles/cwmd?fid=134663&cwmId=9495
describe('Duration Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('solving with duration of 3.0 hours should result in time avg concentrate of 55.89', () => {
    // Click the button with the id "solve".
    cy.get('#solve').click();
    cy.get('#duration').clear().type("3");
    cy.get('#timeavgconc').should('have.text', '55.86');  // 55.86
  });

  it('solving with duration of 3.5 hours should result in time avg concentrate of 49.21', () => {
    // Click the button with the id "solve"
    cy.get('#solve').click();
    cy.get('#duration').clear().type("3.5");
    cy.get('#timeavgconc').should('have.text', '49.20');  // 49.17
  });

  it('solving with duration of 4.0 hours should result in time avg concentrate of 44.30', () => {
    // Click the button with the id "solve"
    cy.get('#solve').click();
    cy.get('#duration').clear().type("4");
    cy.get('#timeavgconc').should('have.text', '44.30');  // 44.27
  });
});


describe('Hematocrit Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('hematocrit of 30 should result in average clearance of 235.1 and time avg concentrate of 52.00', () => {
    // Click the button with the id "solve"
    cy.get('#hematocrit').clear().type("30");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '235.1');
    cy.get('#timeavgconc').should('have.text', '52.00');  // 51.95
  });

  it('hematocrit of 40 should result in average clearance of 234.4 and time avg concentrate of 52.13', () => {
    // Click the button with the id "solve"
    cy.get('#hematocrit').clear().type("40");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '234.4');
    cy.get('#timeavgconc').should('have.text', '52.13');  // 52.08
  });

});


describe('Additional UF Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('additional UF of 23 should result in avg clearance of 240.0 and time avg concentrate of 51.13', () => {
    cy.get('#additionaluf').clear().type("23");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '240.0'); 
    cy.get('#timeavgconc').should('have.text', '51.13');  // 51.08
  });

  it('additional UF of 30 should result in avg clearance of 241.3 and time avg concentrate of 50.90', () => {
    cy.get('#additionaluf').clear().type("30");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '241.3');
    cy.get('#timeavgconc').should('have.text', '50.90');  // 50.85
  });

});


describe('Fluid Gain Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('fluid gain of 2 should result in avg clearance of 247.7 and time avg concentrate of 49.74', () => {
    // Click the button with the id "solve"
    cy.get('#fluidgain').clear().type("2");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '247.7');
    cy.get('#timeavgconc').should('have.text', '49.74');   // 49.70
  });

  it('fluid gain of 3 should result in avg clearance of 253.0 and time avg concentrate of 48.86', () => {
    // Click the button with the id "solve"
    cy.get('#fluidgain').clear().type("3");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '253.0');
    cy.get('#timeavgconc').should('have.text', '48.86');  // 48.81
  });

  it('fluid gain of 4 should result in avg clearance of 258.2 and time avg concentrate of 48.01', () => {
    // Click the button with the id "solve"
    cy.get('#fluidgain').clear().type("4");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '258.2');
    cy.get('#timeavgconc').should('have.text', '48.01');   // 47.96
  });


});

describe('Volume of Distribution Test, Model Type 1Comp', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('under model 1comp, vod of 20 should result in time avg concentrate value of 66.04', () => {
    cy.get('#volumeofdist').clear().type("20");  
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '66.04');  // 66.01
  });

  it('under model 1comp, vod of 30 should result in time avg concentrate value of 55.85', () => {
    cy.get('#volumeofdist').clear().type("30");
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '55.85');  // 55.84
  });

  it('under model 1comp, vod of 40 should result in time avg concentrate value of 52.08', () => {
    cy.get('#volumeofdist').clear().type("40");
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '52.08');  // 52.04
  });

  it('under model 1comp, vod of 50 should result in time avg concentrate value of 50.30', () => {
    cy.get('#volumeofdist').clear().type("50");
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '50.30'); // 50.26
  });


});


describe('Debug Mode Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('clicking on the Liters per treatment label should reveal debug table treatmentTable', () => {
    // Assign an alias
    cy.get('#literspertreatment').as('litersLabel');
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

describe('Protein Binding Test, Under Solute Type of Plasma', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('protein binding of 10 should result in avg clearance of 221.7 and TAC of 54.59', () => {
    cy.get('#proteinbinding').clear().type("10");
    cy.get('#solutetype').select('Plasma'); // Set Solute Type to "Plasma"
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '221.7');
    cy.get('#timeavgconc').should('have.text', '54.59');  //  54.59
  });

  it('protein binding of 20 should result in avg clearance of 204.5 and TAC of 58.51', () => {
    cy.get('#proteinbinding').clear().type("20");
    cy.get('#solutetype').select('Plasma'); // Set Solute Type to "Plasma"
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '204.5');
    cy.get('#timeavgconc').should('have.text', '58.51');  //  58.05  
  });

  it('protein binding of 30 should result in avg clearance of 185.5 and TAC of 63.74', () => {
    cy.get('#proteinbinding').clear().type("30");
    cy.get('#solutetype').select('Plasma'); // Set Solute Type to "Plasma"
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '185.5');
    cy.get('#timeavgconc').should('have.text', '63.74');  //  
  });
});
