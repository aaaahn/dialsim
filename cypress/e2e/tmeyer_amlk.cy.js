/* 
Dialsim Copyright © 2023 Andrew Y Ahn, Timothy W Meyer, Tammy L Sirich
This file is part of dialsim, released under the MIT License.
See LICENSE.md for details.
*/
// Define a reusable function to check within a % tolerance
const checkWithinTolerance = (actualValue, expectedValue) => {
    const tolerance = 0.001; // 0.1% tolerance
    const lowerBoundary = expectedValue * (1 - tolerance);
    const upperBoundary = expectedValue * (1 + tolerance);
    expect(actualValue).to.be.within(lowerBoundary, upperBoundary);
};

describe("Dr Tim's amLK suite, Time", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    // Time
    it('Dur 2, Qb 360, Qd 600, KoA 600', () => {
        cy.get('#duration').clear().type("2");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });

        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 62.52); // 62.52
        });

        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 87.06); // 87.08
        });
    });

    it('Dur 3, Qb 360, Qd 600, KoA 600', () => {
        cy.get('#duration').clear().type("3");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });

        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 44.75); // 44.72
        });

        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 68.83); // 68.80
        });
    });

    it('Dur 3.5, Qb 360, Qd 600, KoA 600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });

        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 39.93); // 39.90
        });

        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 63.83); // 63.78
        });
    });

    it('Dur 5, Qb 360, Qd 600, KoA 600', () => {
        cy.get('#duration').clear().type("5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });

        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 31.73); // 31.70
        });

        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 55.13); // 55.08
        });
    });

    it('Dur 8, Qb 360, Qd 600, KoA 600', () => {
        cy.get('#duration').clear().type("8");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });

        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 25.14); // 25.12
        });

        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 47.91); // 47.89
        });
    });

    it('Dur 12, Qb 360, Qd 600, KoA 600', () => {
        cy.get('#duration').clear().type("12");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });

        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 21.01); // 20.99
        });

        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 43.10); // 43.07
        });
    });

    it('Dur 18, Qb 360, Qd 600, KoA 600', () => {
        cy.get('#duration').clear().type("18");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });

        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 16.57); // 16.55
        });

        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 37.34); // 37.33
        });
    });
});

describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 4 to 9", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    // rows 4 to 9
    it('Dur 3.5, Qb 100, Qd 50, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("50");
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 41.1); // 41.1
        });

        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 216.72); // 216.69
        });

        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 240.88); // 240.86
        });
    });

    it('Dur 3.5, Qb 100, Qd 50, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("50");
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 49.3); // 49.3
        });

        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 180.69); // 180.7
        });

        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 204.84); // 204.86
        });
    });

    it('Dur 3.5, Qb 100, Qd 50, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("50");
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 53.1); // 53.1
        });

        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 168.11); // 168.09
        });

        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 192.25); // 192.24
        });
    });

    it('Dur 3.5, Qb 100, Qd 50, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("50");
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 53.7); // 53.7
        });

        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 166.05); // 166.05
        });

        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 190.18); // 190.2
        });
    });

    it('Dur 3.5, Qb 100, Qd 50, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("50");
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 53.8); // 53.7
        });

        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 165.99); // 166.05
        });

        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 190.12); // 190.15
        });
    });

    it('Dur 3.5, Qb 100, Qd 50, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("50");
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 53.8); // 53.8
        });

        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 165.99); // 165.99
        });

        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 190.12); // 190.14
        });
    });

});


describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 12 to 17", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 100, Qd 100, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("100");
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 52.4); // 52.4
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 170.28); // 170.26
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 194.41); // 194.4
        });
    });

    it('Dur 3.5, Qb 100, Qd 100, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("100");
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 69.2); // 69.2
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 129.47); // 129.46
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 153.57); // 153.56
        });
    });
    it('Dur 3.5, Qb 100, Qd 100, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("100");
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 82.4); // 82.4
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 109.30); // 109.28
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 133.37); // 133.36
        });
    });
    it('Dur 3.5, Qb 100, Qd 100, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("100");
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 90.9); // 90.9
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 99.48); // 99.48
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 123.53); // 123.55
        });
    });
    it('Dur 3.5, Qb 100, Qd 100, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("100");
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 93.9); // 93.9
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 96.40); // 96.39
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 120.46); // 120.46
        });
    });
    it('Dur 3.5, Qb 100, Qd 100, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("100");
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 95.4); // 95.4
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 94.96); // 96.39
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 119.00); // 119.04
        });
    });

});



describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 20 to 25", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 100, Qd 300, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 60.9); // 60.9
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 146.90); // 146.88
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 171.02); // 171.01
        });
    });
    it('Dur 3.5, Qb 100, Qd 300, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 81.9); // 81.9
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 109.94); // 109.92
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 134.01); // 134.00
        });
    });
    it('Dur 3.5, Qb 100, Qd 300, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 94.4); // 94.4
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 95.97); // 95.97
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 120.02); // 120.04
        });
    });
    it('Dur 3.5, Qb 100, Qd 300, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 97.4); // 97.4
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 93.12); // 93.09
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 117.15); // 117.13
        });
    });
    it('Dur 3.5, Qb 100, Qd 300, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 97.5); // 97.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 92.99); // 92.97
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 117.03); // 117.00
        });
    });
    it('Dur 3.5, Qb 100, Qd 300, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 97.5); // 97.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 92.99); // 92.96
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 117.02); // 117.00
        });
    });
});

describe("Dr Tim's amLK suite, Qb.Qd.KoA -  rows 36 - 41", () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('Dur 3.5, Qb 100, Qd 1200, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 64.1); // 64.1
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 139.64); // 139.64
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 163.75); // 163.77
        });
    });
    it('Dur 3.5, Qb 100, Qd 1200, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 85.7); // 85.7
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 105.25); // 105.26
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 129.31); // 129.33
        });
    });
    it('Dur 3.5, Qb 100, Qd 1200, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 96.0); // 96.0
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 94.39); // 94.40
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 118.42); // 118.46
        });
    });
    it('Dur 3.5, Qb 100, Qd 1200, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 97.5); // 97.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 93.01); // 92.98
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 117.04); // 117.02
        });
    });
    it('Dur 3.5, Qb 100, Qd 1200, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 97.5); // 97.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 92.99); // 92.96
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 117.02); // 117.00
        });
    });
    it('Dur 3.5, Qb 100, Qd 1200, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("100");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 97.5); // 97.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 92.99); // 92.96
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 117.02); // 117.00
        });
    });
});

describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 44 to 49", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 200, Qd 50, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("50");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 44.0); // 44.0
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 202.54); // 202.55
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 226.70); // 226.72
        });
    });
    it('Dur 3.5, Qb 200, Qd 100, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("50");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 51.6); // 51.6
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 172.96); // 172.94
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 197.10); // 197.08
        });
    });
    it('Dur 3.5, Qb 200, Qd 100, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("50");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 53.6); // 53.6
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 166.36); // 166.36
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 190.49); // 190.51
        });
    });
    it('Dur 3.5, Qb 200, Qd 100, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("50");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 53.8); // 53.8
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 165.99); // 166
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 190.12); // 190.14
        });
    });
    it('Dur 3.5, Qb 200, Qd 100, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("50");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 53.8); // 53.8
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 165.99); // 165.99
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 190.12); // 190.14
        });
    });
    it('Dur 3.5, Qb 200, Qd 100, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 107.5); // 107.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 84.79); // 84.79
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 108.80); // 108.82
        });
    });
});



describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 52 to 57", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 200, Qd 100, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 60.0); // 60.0
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 149.03); // 149.01
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 173.15); // 173.14
        });
    });


    it('Dur 3.5, Qb 200, Qd 100, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 82.1); // 82.1
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 109.64); // 109.62
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 133.71); // 133.7
        });
    });


    it('Dur 3.5, Qb 200, Qd 100, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 98.7); // 99
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 91.94); // 91.67
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 115.97); // 115.7
        });
    });


    it('Dur 3.5, Qb 200, Qd 100, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 106.2); // 
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 85.78); // 
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 109.80); //
        });
    });


    it('Dur 3.5, Qb 200, Qd 100, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 107.3); //  
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 84.93); //
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 108.94); // 
        });
    });
    it('Dur 3.5, Qb 200, Qd 100, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 107.5); // 
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 84.79); // 
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 108.80); //  
        });
    });


});




describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 60 to 65", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 200, Qd 300, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 74.4); // 74.4
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 120.77); // 120.78
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 144.86); // 144.88
        });
    });
    it('Dur 3.5, Qb 200, Qd 300, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 113.2); // 113.2
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 80.79); // 80.79
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 104.79); // 104.81
        });
    });
    it('Dur 3.5, Qb 200, Qd 300, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 151.9); // 151.9
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 61.74); // 61.74
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 85.68); // 85.70
        });
    });
    it('Dur 3.5, Qb 200, Qd 300, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 180.0); // 180.0
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 53.33); // 53.80
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 77.26); // 77.23
        });
    });
    it('Dur 3.5, Qb 200, Qd 300, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 189.2); // 189.2
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 51.16); // 51.11
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 75.09); // 75.01
        });
    });
    it('Dur 3.5, Qb 200, Qd 300, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 192.6); // 192.6
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 50.38); // 50.34
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 74.30); // 74.24
        });
    });
});




describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 68 to 73", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 200, Qd 600, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 78.4); // 78.4
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 114.67); // 114.69
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 138.74); // 138.79
        });
    });
    it('Dur 3.5, Qb 200, Qd 600, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 121.7); // 121.7
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 75.48); // 75.48
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 99.46); // 99.49
        });
    });
    it('Dur 3.5, Qb 200, Qd 600, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 163.8); // 163.8
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 57.77); // 57.77
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 81.69); // 81.72
        });
    });
    it('Dur 3.5, Qb 200, Qd 600, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 188.7); // 188.7
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 51.26); // 51.21
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 75.19); // 75.11
        });
    });
    it('Dur 3.5, Qb 200, Qd 600, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 193.7); // 193.7
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 50.16); // 50.12
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 74.08); // 74.02
        });
    });
    it('Dur 3.5, Qb 200, Qd 600, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 194.7); // 193.7
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 49.94); // 50.12
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 73.85); // 74.02
        });
    });

});



describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 76 to 81", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 200, Qd 1200, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 80.5); // 80.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 111.77); // 111.75
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 135.84); // 135.83
        });
    });
    it('Dur 3.5, Qb 200, Qd 1200, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 126.0); // 126.0
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 73.10); // 73.10
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 97.08); // 97.11
        });
    });
    it('Dur 3.5, Qb 200, Qd 1200, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 169.0); // 169.0
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 56.24); // 56.24
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 80.15); // 80.18
        });
    });
    it('Dur 3.5, Qb 200, Qd 1200, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 191.1); // 191.1
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 50.71); // 50.67
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 74.63); // 74.57
        });
    });
    it('Dur 3.5, Qb 200, Qd 1200, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 194.4); // 194.4
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 50.00); // 49.96
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 73.92); // 73.86
        });
    });
    it('Dur 3.5, Qb 200, Qd 1200, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("200");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 194.9); // 194.9
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 49.90); // 49.85
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 73.81); // 73.75
        });
    });

});


describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 84 to 89", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 400, Qd 50, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("50");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 45.3); // 45.3
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 196.74); // 196.71
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 220.89); // 220.87
        });
    });
    it('Dur 3.5, Qb 400, Qd 50, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("50");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 52.3); // 52.3
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 170.67); // 170.65
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 194.81); // 194.8
        });
    });
    it('Dur 3.5, Qb 400, Qd 50, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("50");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 53.7); // 53.7
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 166.14); // 166.14
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 190.27); // 190.29
        });
    });
    it('Dur 3.5, Qb 400, Qd 50, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("50");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 53.8); // 53.8
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 165.99); // 165.99
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 190.12); // 190.14
        });
    });
    it('Dur 3.5, Qb 400, Qd 50, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("50");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 53.8); // 53.8
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 165.99); // 165.99
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 190.12); // 190.14
        });
    });

});


describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 92 to 97", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 400, Qd 100, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 63.9); // 63.9
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 139.95); // 139.96
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 164.06); // 164.09
        });
    });
    it('Dur 3.5, Qb 400, Qd 100, KoA 200 ', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 87.9); // 87.9
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 102.66); // 102.66
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 126.71); // 126.73
        });
    });
    it('Dur 3.5, Qb 400, Qd 100, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 103.1); // 87.9
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 88.17); // 102.66
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 112.19); // 126.73
        });
    });
    it('Dur 3.5, Qb 400, Qd 100, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 107.3); // 107.3
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 84.94); // 84.94
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 108.95); // 108.97
        });
    });
    it('Dur 3.5, Qb 400, Qd 100, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 107.5); // 107.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 84.77); // 84.77
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 108.78); // 108.8
        });
    });
    it('Dur 3.5, Qb 400, Qd 100, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 107.5); // 107.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 84.76); // 84.76
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 108.77); // 108.79
        });
    });

});

describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 100 to 105", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 400, Qd 300, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 82.4); // 82.4
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 109.30); // 109.29
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 133.37); // 133.36
        });
    });
    it('Dur 3.5, Qb 400, Qd 300, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 133.6); // 133.6
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 69.31); // 69.30
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 93.28); // 93.28
        });
    });
    it('Dur 3.5, Qb 400, Qd 300, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 193.5); // 193.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 50.20); // 50.15
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 74.11); // 74.05
        });
    });
    it('Dur 3.5, Qb 400, Qd 300, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 249.1); // 249.1
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 41.24); // 41.21
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 65.13); // 65.09
        });
    });
    it('Dur 3.5, Qb 400, Qd 300, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 274.9); // 274.9
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 38.46); // 38.43
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 62.34); // 62.31
        });
    });
    it('Dur 3.5, Qb 400, Qd 300, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 289.5); // 289.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 37.14); // 37.12
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 61.03); // 60.99
        });
    });



});

describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 108 to 113", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 400, Qd 600, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 88.0); // 88.0
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 102.61); // 102.61
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 126.66); // 126.69
        });
    });
    it('Dur 3.5, Qb 400, Qd 600, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 148.7); // 148.7
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 62.92); // 62.91
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 86.86); // 86.88
        });
    });
    it('Dur 3.5, Qb 400, Qd 600, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 226.3); // 226.3
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 44.30); // 44.28
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 68.20); // 68.16
        });
    });
    it('Dur 3.5, Qb 400, Qd 600, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 303.8); // 303.8
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 36.00); // 35.98
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 59.87); // 59.85
        });
    });
    it('Dur 3.5, Qb 400, Qd 600, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 340.3); // 340.3
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 33.62); // 33.6
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 57.50); // 57.48
        });
    });
    it('Dur 3.5, Qb 400, Qd 600, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 360.0); // 360
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 32.59); // 32.55
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 56.47); // 56.42
        });
    });
});

describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 116 to 121", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 400, Qd 1200, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 90.9); // 90.9
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 99.42); // 99.42
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 123.47); // 123.49
        });
    });
    it('Dur 3.5, Qb 400, Qd 1200, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 156.8); // 156.8
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 60.02); // 60.02
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 83.94); // 83.97
        });
    });
    it('Dur 3.5, Qb 400, Qd 1200, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 243.5); // 243.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 41.93); // 41.90
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 65.82); // 65.79
        });
    });
    it('Dur 3.5, Qb 400, Qd 1200, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 327.7); // 327.7
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 34.37); // 34.35
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 58.24); // 58.22
        });
    });
    it('Dur 3.5, Qb 400, Qd 1200, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 362.2); // 362.2
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 32.48); // 32.44
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 56.36); // 56.31
        });
    });
    it('Dur 3.5, Qb 400, Qd 1200, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("400");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 377.4); // 377.4
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 31.79); // 31.76
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 55.68); // 55.64
        });
    });


});


describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 124 to 129", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 800, Qd 50, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("50");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 45.9); // 45.9
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 194.14); // 194.12
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 218.29); // 218.28
        });
    });
    it('Dur 3.5, Qb 800, Qd 50, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("50");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 52.5); // 52.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 169.80); // 169.78
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 193.94); // 193.93
        });
    });
    it('Dur 3.5, Qb 800, Qd 50, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("50");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 53.7); // 53.7
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 166.08); // 166.09
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 190.21); // 190.23
        });
    });

    it('Dur 3.5, Qb 800, Qd 50, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("50");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 53.8); // 53.8
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 165.99); // 165.99
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 190.12); // 190.14
        });
    });
    it('Dur 3.5, Qb 800, Qd 50, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("50");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 53.8); // 53.8
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 165.99); // 165.99
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 190.12); // 190.14
        });
    });


});


describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 132 to 137", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 800, Qd 100, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 65.9); // 65.9
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 135.80); // 135.80
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 159.91); // 159.93
        });
    });
    it('Dur 3.5, Qb 800, Qd 100, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 90.6); // 90.9
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 99.82); // 99.42
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 123.87); // 123.49
        });
    });
    it('Dur 3.5, Qb 800, Qd 100, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 104.5); // 104.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 87.05); // 87.03
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 111.07); // 111.06
        });
    });
    it('Dur 3.5, Qb 800, Qd 100, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 107.4); // 90.9
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 84.83); // 99.42
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 108.84); // 123.49
        });
    });
    it('Dur 3.5, Qb 800, Qd 100, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 107.5); // 107.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 84.76); // 84.76
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 108.77); // 108.79
        });
    });
    it('Dur 3.5, Qb 800, Qd 100, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("100");  // !
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 107.5); // 107.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 84.76); // 84.76
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 108.77); // 108.79
        });
    });




});


describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 140 to 145", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 800, Qd 300, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 86.8); // 86.8
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 103.96); // 103.96
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 128.02); // 128.04
        });
    });
    it('Dur 3.5, Qb 800, Qd 300, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 144.9); // 144.9
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 64.38); // 64.38
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 88.33); // 88.35
        });
    });
    it('Dur 3.5, Qb 800, Qd 300, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 215.8); // 215.8
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 45.98); // 45.95
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 69.88); // 69.84
        });
    });
    it('Dur 3.5, Qb 800, Qd 300, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 279.2); // 279.2
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 38.06); // 38.03
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 61.94); // 61.91
        });
    });
    it('Dur 3.5, Qb 800, Qd 300, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 303.7); // 303.7
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 36.01); // 35.99
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 59.88); // 59.86
        });
    });
    it('Dur 3.5, Qb 800, Qd 300, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("300");  // !
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 314.1); // 314
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 35.26); // 35.24
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 59.13); // 59.11
        });
    });

});

describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 148 to 153", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 800, Qd 600, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 93.3); // 93.3
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 96.99); // 96.99
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 121.04); // 121.06
        });
    });
    it('Dur 3.5, Qb 800, Qd 600, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 164.8); // 164.8
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 57.47); // 57.47
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 81.39); // 81.42
        });
    });
    it('Dur 3.5, Qb 800, Qd 600, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 267.1); // 267.1
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 39.23); // 39.23
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 63.11); // 63.08
        });
    });
    it('Dur 3.5, Qb 800, Qd 600, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 387.0); // 387.0
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 31.38); // 31.36
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 55.28); // 55.24
        });
    });
    it('Dur 3.5, Qb 800, Qd 600, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 454.8); // 387.0
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 29.20); // 31.36
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 53.14); // 55.24
        });
    });
    it('Dur 3.5, Qb 800, Qd 600, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("600");  // !
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 498.1); // 387.0
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 28.24); // 31.36
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 52.20); // 55.24
        });
    });

});


describe("Dr Tim's amLK suite, Qb.Qd.KoA - rows 156 - 161", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Dur 3.5, Qb 800, Qd 1200, KoA 100', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("100");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 96.8); // 96.8
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 93.64); // 93.65
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 117.67); // 117.71
        });
    });
    it('Dur 3.5, Qb 800, Qd 1200, KoA 200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 176.0); // 176.0
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 54.36); // 54.33
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 78.30); // 78.26
        });
    });
    it('Dur 3.5, Qb 800, Qd 1200, KoA 400', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("400");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 297.4); // 297.4
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 36.49); // 36.47
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 60.36); // 60.35
        });
    });
    it('Dur 3.5, Qb 800, Qd 1200, KoA 800', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("800");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 452.7); // 452.7
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 29.26); // 29.23
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 53.19); // 53.17
        });
    });
    it('Dur 3.5, Qb 800, Qd 1200, KoA 1200', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("1200");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 546.3); // 546.3
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 27.43); // 27.41
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 51.43); // 51.41
        });
    });
    it('Dur 3.5, Qb 800, Qd 1200, KoA 1600', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("800");
        cy.get('#dialysateflow').clear().type("1200");  // !
        cy.get('#koa').clear().type("1600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 607.6); // 607.6
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 26.68); // 26.66
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 50.73); // 50.71
        });
    });



});




describe("Dr Tim's amLK suite, Kr", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    // Kr
    it('Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 0.5', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#endogenousclearance').clear().type("0.5");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 38.77); // 38.69
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 61.64); // 61.56
        });
    });
    it('Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 0.75', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#endogenousclearance').clear().type("0.75");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 38.21); // 38.11
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 60.59); // 60.50
        });
    });
    it('Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 1', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#endogenousclearance').clear().type("1");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 37.66); // 37.55
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 59.58); // 59.47
        });
    });
    it('Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 1.25', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#endogenousclearance').clear().type("1.25");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 37.14); // 37.00
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 58.60); // 58.47
        });
    });
    it('Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 1.5', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#endogenousclearance').clear().type("1.5");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 36.62); // 36.47
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 57.64); // 57.50
        });
    });
    it('Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 1.75', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#endogenousclearance').clear().type("1.75");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 36.12); // 36.12
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 56.71); // 56.55
        });
    });
    it('Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 2', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#endogenousclearance').clear().type("2");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 35.64); // 35.45
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 55.81); // 55.64
        });
    });
    it('Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 2.5', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#endogenousclearance').clear().type("2.5");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 34.70); // 34.48
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 54.08); // 53.88
        });
    });
    it('Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 3', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#endogenousclearance').clear().type("3");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 33.81); // 33.57
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 52.43); // 52.21
        });
    });
    it('Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 4', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#endogenousclearance').clear().type("4");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 32.15); // 31.86
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 49.38); // 49.13
        });
    });
    it('Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 5', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#endogenousclearance').clear().type("5");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 30.64); // 30.32
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 46.62); // 46.36
        });
    });
    it('Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 8', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#endogenousclearance').clear().type("8");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 26.81); // 26.44
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 39.70); // 39.43
        });
    });
    it('Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 10', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#endogenousclearance').clear().type("10");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 24.73); // 24.35
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 36.00); // 35.75
        });
    });
    it('Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 15', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#endogenousclearance').clear().type("15");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 20.66); // 20.29
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 28.91); // 28.72
        });
    });
    it('Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 20', () => {
        cy.get('#duration').clear().type("3.5");
        cy.get('#bloodflow').clear().type("360");
        cy.get('#dialysateflow').clear().type("600");
        cy.get('#koa').clear().type("600");
        cy.get('#hematocrit').clear().type("33");
        cy.get('#endogenousclearance').clear().type("20");
        cy.get('#generationrate').clear().type("8000");
        cy.get('#volumeofdist').clear().type("36");

        cy.get('#solve').click();

        cy.get('#avgclearance').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 260.5); // 260.5
        });
        cy.get('#timeavgconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 17.70); // 17.35
        });
        cy.get('#avgpeakconc').invoke('text').then((actualValue) => {
            checkWithinTolerance(parseFloat(actualValue), 23.91); // 23.77
        });
    });


});

