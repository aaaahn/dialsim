[![codecov](https://codecov.io/gh/aaaahn/dialsim/graph/badge.svg?token=Y3WU4240QS)](https://codecov.io/gh/aaaahn/dialsim)

# Dialsim Testing with Cypress


## Introduction
Dialsim is an open-source project designed for a multidisciplinary developer community. To uphold the application's accuracy, reliability, and consistency, we've incorporated an automated end-to-end test suite powered by [Cypress](https://www.cypress.io/).


## The Importance of Testing in Open Source Projects

* Quality Assurance: With potential contributors worldwide, end-to-end testing ensures every contribution upholds the project's quality and avoids regressions.

* Scalability: As Dialsim evolves, testing guarantees that new features or changes don't compromise existing functionalities.

* Collaboration: A robust test suite acts as a safety net, allowing collaborators to make changes confidently, knowing tests will identify any issues.

* Documentation: End-to-end tests serve as live documentation, offering a clear depiction of the application's expected behavior and aiding new contributors.

* Longevity: To ensure Dialsim's sustained success and collaboration, it's vital to maintain a bug-free environment. End-to-end tests play a pivotal role in this by identifying potential issues before they reach users.


## Test Suite Overview

* Default Values Test: Validates that default parameters yield the expected average clearance and time-averaged concentrate values.

* Duration Test: Assesses the application's response to varied Duration values.

* Hematocrit Test: Assesses the application's response to varied Hematocrit values.

* Additional UF Test: Examines the application's behavior with different UF values.

* Fluid Gain Test: Analyzes the application's response to varied fluid gain values.

* Debug Mode Test: Confirms that the 'Liters per treatment' UI element reveals debugging information upon interaction.

* Protein Binding Test: Assesses the application's reponse to varied Protein Binding values.

## Automated Testing with GitHub Actions

Our test suite is tightly integrated with GitHub [Actions](https://docs.github.com/en/actions/learn-github-actions). With every code push, tests are triggered automatically. For an overview of the most recent test outcomes, refer to the badge below: <center> [![Cypress Status](https://github.com/aaaahn/dialsim/actions/workflows/main.yml/badge.svg)](https://github.com/aaaahn/dialsim/actions/workflows/main.yml) </center> This badge provides a snapshot of individual test results.  For a deeper dive into test health and analytics, visit Cypress Cloud by clicking on the following badge: <center> [![dialsim](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/xz8xtb&style=plastic&logo=cypress)](https://cloud.cypress.io/projects/xz8xtb/runs)
</center>

## Running Cypress Tests Manually

1. Launch Codespaces

This project is set up with a GitHub Codespaces environment tailored for `Node.js` development. To access it, simply [follow these instructions](https://docs.github.com/en/codespaces/developing-in-codespaces/) to open Codespaces in your browser. The environment is already equipped with `Node.js`, `npm`, and `Visual Studio Code`, eliminating the need for local setup. With this cloud-based IDE, you can immediately run and test the Dialsim application directly in your browser.


2. Start the Dialsim Web App

```
@aaaahn ➜ /workspaces/dialsim (main) $ npm run start
Debugger attached.

> dialsim@0.1.1 start
> npx parcel index.html --open

Debugger attached.
Debugger attached.
Server running at http://localhost:1234
✨ Built in 864ms
```

3. Install Cypress

```
@aaaahn ➜ /workspaces/dialsim (main) $ npx cypress install
Installing Cypress (version: 13.1.0)

✔  Downloaded Cypress
✔  Unzipped Cypress
✔  Finished Installation /home/codespace/.cache/Cypress/13.1.0

You can now open Cypress by running: node_modules/.bin/cypress open

https://on.cypress.io/installing-cypress

@aaaahn ➜ /workspaces/dialsim (main) $ 
```

4. Execute Tests

```
@aaaahn ➜ /workspaces/dialsim (implement-two-comp) $ npm run cypress:run
Debugger attached.

> dialsim@0.3.0 cypress:run
> npx cypress run

Debugger attached.

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        13.1.0                                                                         │
  │ Browser:        Electron 106 (headless)                                                        │
  │ Node Version:   v20.6.0 (/usr/local/share/nvm/versions/node/v20.6.0/bin/node)                  │
  │ Specs:          1 found (spec.cy.js)                                                           │
  │ Searched:       cypress/e2e/**/*.cy.{js,jsx,ts,tsx}                                            │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────
                                                                                                    
  Running:  spec.cy.js                                                                      (1 of 1)


  Default Values Test
    ✓ solving with default inputs should result in avg clearance of 237.2 and avg concentrate of 51.62 (654ms)

  Duration Test
    ✓ solving with duration of 3.0 hours should result in time avg concentrate of 55.89 (1057ms)
    ✓ solving with duration of 3.5 hours should result in time avg concentrate of 49.21 (1122ms)
    ✓ solving with duration of 4.0 hours should result in time avg concentrate of 44.30 (1174ms)

  Hematocrit Test
    ✓ hematocrit of 30 should result in average clearance of 235.1 and time avg concentrate of 52.00 (784ms)
    ✓ hematocrit of 40 should result in average clearance of 234.4 and time avg concentrate of 52.13 (744ms)

  Additional UF Test
    ✓ additional UF of 23 should result in avg clearance of 240.0 and time avg concentrate of 51.13 (932ms)
    ✓ additional UF of 30 should result in avg clearance of 241.3 and time avg concentrate of 50.90 (893ms)

  Fluid Gain Test
    ✓ fluid gain of 2 should result in avg clearance of 247.7 and time avg concentrate of 49.74 (837ms)
    ✓ fluid gain of 3 should result in avg clearance of 253.0 and time avg concentrate of 48.86 (982ms)
    ✓ fluid gain of 4 should result in avg clearance of 258.2 and time avg concentrate of 48.01 (861ms)

  Volume of Distribution Test, Model Type 1Comp
    ✓ under model 1comp, vod of 20 should result in time avg concentrate value of 66.04 (986ms)
    ✓ under model 1comp, vod of 30 should result in time avg concentrate value of 55.85 (733ms)
    ✓ under model 1comp, vod of 40 should result in time avg concentrate value of 52.08 (887ms)
    ✓ under model 1comp, vod of 50 should result in time avg concentrate value of 50.30 (707ms)

  Debug Mode Test
    ✓ clicking on the Liters per treatment label should reveal debug table treatmentTable (201ms)
    ✓ clicking on the Liters per treatment label twice should hide debug table treatmentTable (273ms)

  Protein Binding Test, Under Solute Type of Plasma
    ✓ protein binding of 10 should result in avg clearance of 221.7 and TAC of 54.59 (737ms)
    ✓ protein binding of 20 should result in avg clearance of 204.5 and TAC of 58.51 (1017ms)
    ✓ protein binding of 30 should result in avg clearance of 185.5 and TAC of 63.74 (1116ms)


  20 passing (18s)


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        20                                                                               │
  │ Passing:      20                                                                               │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        false                                                                            │
  │ Duration:     17 seconds                                                                       │
  │ Spec Ran:     spec.cy.js                                                                       │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  spec.cy.js                               00:17       20       20        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        00:17       20       20        -        -        -  

@aaaahn ➜ /workspaces/dialsim (implement-two-comp) $ 
```

## License
Dialsim is available under the [MIT license](https://github.com/aaaahn/dialsim/blob/main/LICENSE.md).