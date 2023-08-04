
[![Netlify Status](https://api.netlify.com/api/v1/badges/ebd12782-20e2-4816-816c-5534dbefdbe9/deploy-status)](https://app.netlify.com/sites/webclear/deploys)

https://webclear.netlify.app

# Dialysis Simulator

`calcClearanceTable()` - The `goalseek()` function iterates to find a starting Cd value minimized to 0 by the end of the dialyzer, or as x reaches 1.000. The inputs from the website run through a table that uses pseudo-calculus to model the values of several variables through the dialyzer. With an initial Cd value that reaches 0, other important values dependent on it can be used in the calculation of the clearance. Protein binding percentage is assumed to be 0%, albumin concentration is assumed to be 500 µM, and ∆P0 and ∆P1 are assumed to be 40 torr.

`calcWeeklyTable()` - Using the clearance value derived from the `calcClearanceTable()` calculations, the table calculates the concentration of urea. The iteratation loop searches for an initial urea concentration that roughly matches the ending concentration by continually bisecting the difference between the initial guess and the resulting final concentration. 

The inputs from the website are used in the Javascript code, which executes all the calculations and table making between the `calcClearanceTable()` and `calcWeeklyTable()` functions. Taking the values from the Weeklytable, the Chart is created, then rendered by HTML.

```mermaid




graph TD
    subgraph HTML
       A 
    end
    subgraph Javascript
        A[Web Page] -- Solve! --> B("calcClearanceTable()")
        B -- ClearanceValue --> D("calcWeeklyTable()")
        D -- "Iterate(start, end)" -->D
        D --  t,cext --> E(Chart)
        E --> A
        B -- "goalSeek(Cd)" --> B
    end







```

Created with CodeSandbox
