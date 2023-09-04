# Dialsim End-to-End Testing with Cypress

## Introduction
Dialsim is an open-source project that aims to provide a robust and reliable solution for broad set of users. To ensure the accuracy, reliability, and consistency of the application, we have implemented an end-to-end test suite using [Cypress](https://www.cypress.io/).


## Why End-to-End Testing is Crucial for Open Source Projects

Quality Assurance: Open-source projects often have contributors from around the world. An end-to-end test suite ensures that every contribution maintains the quality and doesn't introduce regressions.

Scalability: As the project grows and evolves, the test suite ensures that new features and changes don't negatively impact existing functionality.

Collaboration: A comprehensive test suite provides a safety net for collaborators. They can confidently make changes, knowing that if something breaks, the tests will catch it.

Documentation: Tests, especially end-to-end tests, act as living documentation. They provide a clear understanding of how the application is supposed to work, making it easier for new contributors to understand the project.

Longevity: For an open-source project to have a long and collaborative life, it's essential to ensure that the software remains bug-free over time. An end-to-end test suite helps in catching issues before they reach the end-users.

## Tests Included in the Suite

Default Values Test: Ensures that solving with default parameters returns the expected clearance value.

Hematocrit Test: Validates the application's response to different Hematocrit values.

Additional UF Test: Checks the behavior of the application with varying UF values.

Fluid Gain Test: Tests the application's reaction to different fluid gain values.

Debug Mode Test: Ensures that UI elements, 'Liters per treatment' label, when clicked reveal the debugging information.



## How to Execute Cypress end-to-end tests

1. Launch the dialsim web app

```bash
➜  ~ cd ~/Documents/GitHub/dialsim 
➜  dialsim git:(cypress-testing) ✗ npm run start                

> dialsim@0.1.1 start
> parcel index.html --open

Server running at http://localhost:1234 
✨  Built in 109ms.
```

2. Install Cypress

```bash
➜  dialsim git:(cypress-testing) ✗ npx cypress install

Installing Cypress (version: 13.1.0)

✔  Downloaded Cypress
✔  Unzipped Cypress
✔  Finished Installation /Users/aahn/Library/Caches/Cypress/13.1.0

You can now open Cypress by running: node_modules/.bin/cypress open

https://on.cypress.io/installing-cypress

➜  dialsim git:(cypress-testing) ✗

```

3. Launch Cypress (Browser)

```bash
➜  dialsim git:(cypress-testing) ✗ npm run cypress:open

> dialsim@0.1.1 cypress:open
> cypress open

```

4. Alternatively, launch and run tests from the command line

```bash

@aaaahn ➜ /workspaces/dialsim (cypress-testing) $ npx cypress run --spec cypress/e2e/spec.cy.js

DevTools listening on ws://127.0.0.1:46703/devtools/browser/dc189530-d939-435e-8eef-85671a7fc3cf
[49610:0904/030330.467852:ERROR:gpu_memory_buffer_support_x11.cc(44)] dri3 extension not supported.

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        13.1.0                                                                         │
  │ Browser:        Electron 106 (headless)                                                        │
  │ Node Version:   v20.5.1 (/usr/local/share/nvm/versions/node/v20.5.1/bin/node)                  │
  │ Specs:          1 found (spec.cy.js)                                                           │
  │ Searched:       cypress/e2e/spec.cy.js                                                         │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────
                                                                                                    
  Running:  spec.cy.js                                                                      (1 of 1)


  dialsim
    ✓ solving with default values should result in clearance value of 237.2 (623ms)

  dialsim
    ✓ Hematocrit value of 30 should result in average clearance value of 235.1 (713ms)

  dialsim
    ✓ additional UF value of 23 and should result in average clearance value of 240.0 (736ms)

  dialsim
    ✓ fluid gain of 2 should result in average clearance value of 247.7 (737ms)

  dialsim
    ✓ clicking on the Liters per treatment label should reveal debug table treatmentTable (492ms)
    ✓ clicking on the Liters per treatment label twice should hide debug table treatmentTable (526ms)


  6 passing (4s)


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        6                                                                                │
  │ Passing:      6                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        false                                                                            │
  │ Duration:     4 seconds                                                                        │
  │ Spec Ran:     spec.cy.js                                                                       │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  spec.cy.js                               00:04        6        6        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        00:04        6        6        -        -        -  

@aaaahn ➜ /workspaces/dialsim (cypress-testing) $ 

```
