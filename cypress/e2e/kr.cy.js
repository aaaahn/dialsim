const checkWithinTolerance = (actualValue, expectedValue) => {
    const tolerance = 0.01; // 1% tolerance 
    const lowerBoundary = expectedValue * (1 - tolerance);
    const upperBoundary = expectedValue * (1 + tolerance);
    expect(actualValue).to.be.within(lowerBoundary, upperBoundary);
};

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

