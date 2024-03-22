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
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

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
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    // Click the button with the id "solve".
    cy.get('#solve').click();
    cy.get('#duration').clear().type("3");
    cy.get('#timeavgconc').should('have.text', '55.86');  // 55.86
  });

  it('solving with duration of 3.5 hours should result in time avg concentrate of 49.21', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    // Click the button with the id "solve"
    cy.get('#solve').click();
    cy.get('#duration').clear().type("3.5");
    cy.get('#timeavgconc').should('have.text', '49.20');  // 49.17
  });

  it('solving with duration of 4.0 hours should result in time avg concentrate of 44.30', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

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
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    // Click the button with the id "solve"
    cy.get('#hematocrit').clear().type("30");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '235.1');
    cy.get('#timeavgconc').should('have.text', '52.00');  // 51.95
  });

  it('hematocrit of 40 should result in average clearance of 234.4 and time avg concentrate of 52.13', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

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
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#additionaluf').clear().type("23");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '240.0'); 
    cy.get('#timeavgconc').should('have.text', '51.13');  // 51.08
  });

  it('additional UF of 30 should result in avg clearance of 241.3 and time avg concentrate of 50.90', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

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
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    // Click the button with the id "solve"
    cy.get('#fluidgain').clear().type("2");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '247.7');
    cy.get('#timeavgconc').should('have.text', '49.74');   // 49.70
  });

  it('fluid gain of 3 should result in avg clearance of 253.0 and time avg concentrate of 48.86', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    // Click the button with the id "solve"
    cy.get('#fluidgain').clear().type("3");
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '253.0');
    cy.get('#timeavgconc').should('have.text', '48.86');  // 48.81
  });

  it('fluid gain of 4 should result in avg clearance of 258.2 and time avg concentrate of 48.01', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

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
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#volumeofdist').clear().type("20");  
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '66.04');  // 66.01
  });
  it('under model 1comp, vod of 30 should result in time avg concentrate value of 55.85', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#volumeofdist').clear().type("30");
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '55.85');  // 55.84
  });
  it('under model 1comp, vod of 40 should result in time avg concentrate value of 52.08', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#volumeofdist').clear().type("40");
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '52.08');  // 52.04
  });
  it('under model 1comp, vod of 50 should result in time avg concentrate value of 50.30', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#volumeofdist').clear().type("50");
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '50.30'); // 50.26
  });
});

describe('Volume of Distribution Test, Model Type 2 Comp Urea', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('under model 2comp urea, vod of 20 should result in time avg conc value of 72.90', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#modeltype').select('2CompUrea');
    cy.get('#volumeofdist').clear().type("20");  
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '72.90');  // 72.87
  });
  it('under model 2comp urea, vod of 30 should result in time avg conc value of 62.04', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#modeltype').select('2CompUrea');
    cy.get('#volumeofdist').clear().type("30");
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '62.04');  // 62.02
  });
  it('under model 2comp urea, vod of 40 should result in time avg conc value of 57.47', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#modeltype').select('2CompUrea');
    cy.get('#volumeofdist').clear().type("40");
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '57.47');  // 57.46
  });
  it('under model 2comp urea, vod of 50 should result in time avg conc value of 55.05', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#modeltype').select('2CompUrea');
    cy.get('#volumeofdist').clear().type("50");
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '55.05'); // 55.04
  });
});


describe('Volume of Distribution Test, Model Type 2 Ad Lib, VOD Comp1 and Comp2', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('under model 2comp ad lib, vod of 14, 28 should result in time avg conc value of 56.86', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#modeltype').select('2CompAdLib');
    cy.get('#volumeofdist').clear().type("14");  
    cy.get('#volumeofdistcomp2l').clear().type("28");  
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '237.2'); // 237.2
    cy.get('#timeavgconc').should('have.text', '56.86');  // 56.87
  });
  it('under model 2comp ad lib, vod of 14, 40 should result in time avg conc value of 56.46', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#modeltype').select('2CompAdLib');
    cy.get('#volumeofdist').clear().type("14");  
    cy.get('#volumeofdistcomp2l').clear().type("40");  
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '237.2'); // 237.2
    cy.get('#timeavgconc').should('have.text', '56.46');  // 56.46
  });
  it('under model 2comp ad lib, vod of 14, 60 should result in time avg conc value of 56.59', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#modeltype').select('2CompAdLib');
    cy.get('#volumeofdist').clear().type("14");  
    cy.get('#volumeofdistcomp2l').clear().type("60");  
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '237.2'); // 237.2
    cy.get('#timeavgconc').should('have.text', '56.59');  // 56.59
  });
  it('under model 2comp ad lib, vod of 14, 100 should result in time avg conc value of 57.14', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#modeltype').select('2CompAdLib');
    cy.get('#volumeofdist').clear().type("14");  
    cy.get('#volumeofdistcomp2l').clear().type("100");  
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '237.2'); // 237.2
    cy.get('#timeavgconc').should('have.text', '57.14');  // 57.14
  });
});

describe('Volume of Distribution Test, Model Type 2 Ad Lib, Intercompartmental KC', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('under model 2comp ad lib, Int KC of 800 should result in time avg conc value of 56.86', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#modeltype').select('2CompAdLib');
    cy.get('#intercompartmentalkc').clear().type("800");  
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '56.86');  // 56.87
  });
  it('under model 2comp ad lib, Int KC of 900 should result in time avg conc value of 56.28', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#modeltype').select('2CompAdLib');
    cy.get('#intercompartmentalkc').clear().type("900");  
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '56.28');  // 56.28
  });
  it('under model 2comp ad lib, Int KC of 1000 should result in time avg conc value of 55.82', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#modeltype').select('2CompAdLib');
    cy.get('#intercompartmentalkc').clear().type("1000");  
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '55.82');  // 55.81
  });
  it('under model 2comp ad lib, Int KC of 1100 should result in time avg conc value of 55.42', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    cy.get('#modeltype').select('2CompAdLib');
    cy.get('#intercompartmentalkc').clear().type("1100");  
    cy.get('#solve').click();

    cy.get('#timeavgconc').should('have.text', '55.42');  // 55.43
  });
});


describe('Debug Mode Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('clicking on the Liters per treatment label should reveal debug table treatmentTable', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

    // Assign an alias
    cy.get('#literspertreatment').as('litersLabel');
    cy.get('@litersLabel').click();
    cy.contains('treatmentTable');
  });

  it('clicking on the Liters per treatment label twice should hide debug table treatmentTable', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("0");
    cy.get('#generationrate').clear().type("9524");
    cy.get('#volumeofdist').clear().type("42");  

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

  it('protein binding of 10 should result in avg clearance of 187.1 and TAC of 63.25', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("33");
    cy.get('#generationrate').clear().type("9524");

    cy.get('#solutetype').select('Plasma'); // Set Solute Type to "Plasma"
    cy.get('#proteinbinding').clear().type("10");
    cy.get('#volumeofdist').clear().type("42");  
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '187.1');
    cy.get('#timeavgconc').should('have.text', '63.25');  //  54.59
  });

  it('protein binding of 20 should result in avg clearance of 175.8 and TAC of 66.85', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("33");
    cy.get('#generationrate').clear().type("9524");


    cy.get('#solutetype').select('Plasma'); // Set Solute Type to "Plasma"
    cy.get('#proteinbinding').clear().type("20");
    cy.get('#volumeofdist').clear().type("42");  
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '175.8');
    cy.get('#timeavgconc').should('have.text', '66.85');  //  58.05  
  });

  it('protein binding of 30 should result in avg clearance of 162.6 and TAC of 71.78', () => {
    cy.get('#duration').clear().type("3.33");
    cy.get('#bloodflow').clear().type("360");
    cy.get('#dialysateflow').clear().type("500");
    cy.get('#koa').clear().type("500");
    cy.get('#hematocrit').clear().type("33");
    cy.get('#generationrate').clear().type("9524");

    cy.get('#solutetype').select('Plasma'); // Set Solute Type to "Plasma"
    cy.get('#proteinbinding').clear().type("30");
    cy.get('#volumeofdist').clear().type("42");  
    cy.get('#solve').click();

    cy.get('#avgclearance').should('have.text', '162.6');
    cy.get('#timeavgconc').should('have.text', '71.78');  //  
  });
});
