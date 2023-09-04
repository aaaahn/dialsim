# Dialsim Testing with Cypress

## Introduction
Dialsim is an open-source project designed for a diverse user base. To uphold the application's accuracy, reliability, and consistency, we've incorporated an automated end-to-end test suite powered by [Cypress](https://www.cypress.io/).


## The Importance of Testing in Open Source Projects

* Quality Assurance: With contributors worldwide, end-to-end testing ensures every contribution upholds the project's quality and avoids regressions.

* Scalability: As Dialsim evolves, testing guarantees that new features or changes don't compromise existing functionalities.

* Collaboration: A robust test suite acts as a safety net, allowing collaborators to make changes confidently, knowing tests will identify any issues.

* Documentation: End-to-end tests serve as live documentation, offering a clear depiction of the application's expected behavior and aiding new contributors.

* Longevity: To ensure Dialsim's sustained success and collaboration, it's vital to maintain a bug-free environment. End-to-end tests play a pivotal role in this by identifying potential issues before they reach users.


## Test Suite Overview

* Default Values Test: Validates that default parameters yield the expected clearance value.

* Hematocrit Test: Assesses the application's response to varied Hematocrit values.

* Additional UF Test: Examines the application's behavior with different UF values.

* Fluid Gain Test: Analyzes the application's response to varied fluid gain values.

* Debug Mode Test: Confirms that the 'Liters per treatment' UI element reveals debugging information upon interaction.

## Automated Testing with GitHub Actions

Our test suite is tightly integrated with GitHub [Actions](https://github.com/aaaahn/dialsim/actions). With every code push, tests are triggered automatically. For an overview of the most recent test outcomes, refer to the badge below: <p>  [![Cypress Status](https://github.com/aaaahn/dialsim/actions/workflows/main.yml/badge.svg)](https://github.com/aaaahn/dialsim/actions/workflows/main.yml) . &nbsp; This badge provides a snapshot of individual test results. <p> For a deeper dive into test health and analytics, visit Cypress Cloud by clicking on the following badge: [![dialsim](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/xz8xtb&style=plastic&logo=cypress)](https://cloud.cypress.io/projects/xz8xtb/runs).


## Manual Execution of Cypress End-to-End Tests

1. Start the Dialsim Web App:

```bash
@aaaahn ➜ /workspaces/dialsim (more_cypress_changes) $ npm run start
Debugger attached.

> dialsim@0.1.1 start
> npx parcel index.html --open

Debugger attached.
Debugger attached.
Server running at http://localhost:1234
✨ Built in 864ms
```

2. Install Cypress:

```bash
@aaaahn ➜ /workspaces/dialsim (more_cypress_changes) $ npx cypress install
Installing Cypress (version: 13.1.0)

✔  Downloaded Cypress
✔  Unzipped Cypress
✔  Finished Installation /home/codespace/.cache/Cypress/13.1.0

You can now open Cypress by running: node_modules/.bin/cypress open

https://on.cypress.io/installing-cypress

@aaaahn ➜ /workspaces/dialsim (more_cypress_changes) $ 

```

3. Execute Tests via Command Line:

```bash

@aaaahn ➜ /workspaces/dialsim (more_cypress_changes) $ npx cypress run
It looks like this is your first time using Cypress: 13.1.0

✔  Verified Cypress! /home/codespace/.cache/Cypress/13.1.0/Cypress

Opening Cypress...

DevTools listening on ws://127.0.0.1:39767/devtools/browser/498ff072-4c45-422d-877c-19d15028887b
[7525:0904/142339.720245:ERROR:gpu_memory_buffer_support_x11.cc(44)] dri3 extension not supported.

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        13.1.0                                                                         │
  │ Browser:        Electron 106 (headless)                                                        │
  │ Node Version:   v20.5.1 (/usr/local/share/nvm/versions/node/v20.5.1/bin/node)                  │
  │ Specs:          1 found (spec.cy.js)                                                           │
  │ Searched:       cypress/e2e/**/*.cy.{js,jsx,ts,tsx}                                            │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────
                                                                                                    
  Running:  spec.cy.js                                                                      (1 of 1)



  Default Value Test
    ✓ solving with default input values should result in clearance value of 237.2 (925ms)

  Hematocrit Test
    ✓ Hematocrit value of 30 should result in average clearance value of 235.1 (737ms)

  Additional UF Test
    ✓ additional UF value of 23 and should result in average clearance value of 240.0 (693ms)

  Fluid Gain Test
    ✓ fluid gain of 2 should result in average clearance value of 247.7 (817ms)

  Debug Mode Test
    ✓ clicking on the Liters per treatment label should reveal debug table treatmentTable (559ms)
    ✓ clicking on the Liters per treatment label twice should hide debug table treatmentTable (518ms)

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

@aaaahn ➜ /workspaces/dialsim (more_cypress_changes) $ 
```
