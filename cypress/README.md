[![codecov](https://codecov.io/gh/aaaahn/dialsim/graph/badge.svg?token=Y3WU4240QS)](https://codecov.io/gh/aaaahn/dialsim)

# Dialsim Testing with Cypress


## Introduction
Dialsim is an open-source project designed for a multidisciplinary developer community. To uphold the application's accuracy, reliability, and consistency, we've incorporated an automated end-to-end test suite powered by open-source testing framework [Cypress](https://www.cypress.io/).


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

* Volume of Distribution Test:  Assesses the application's response to varied VoD inputs across all model types.

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
@aaaahn ➜ /workspaces/dialsim (implement-two-comp) $ npx cypress run


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
    ✓ solving with default inputs should result in avg clearance of 237.2 and avg concentrate of 51.62 (797ms)

  Duration Test
    ✓ solving with duration of 3.0 hours should result in time avg concentrate of 55.89 (1003ms)
    ✓ solving with duration of 3.5 hours should result in time avg concentrate of 49.21 (1012ms)
    ✓ solving with duration of 4.0 hours should result in time avg concentrate of 44.30 (1092ms)

  Hematocrit Test
    ✓ hematocrit of 30 should result in average clearance of 235.1 and time avg concentrate of 52.00 (914ms)
    ✓ hematocrit of 40 should result in average clearance of 234.4 and time avg concentrate of 52.13 (789ms)

  Additional UF Test
    ✓ additional UF of 23 should result in avg clearance of 240.0 and time avg concentrate of 51.13 (833ms)
    ✓ additional UF of 30 should result in avg clearance of 241.3 and time avg concentrate of 50.90 (976ms)

  Fluid Gain Test
    ✓ fluid gain of 2 should result in avg clearance of 247.7 and time avg concentrate of 49.74 (846ms)
    ✓ fluid gain of 3 should result in avg clearance of 253.0 and time avg concentrate of 48.86 (983ms)
    ✓ fluid gain of 4 should result in avg clearance of 258.2 and time avg concentrate of 48.01 (838ms)

  Volume of Distribution Test, Model Type 1Comp
    ✓ under model 1comp, vod of 20 should result in time avg concentrate value of 66.04 (735ms)
    ✓ under model 1comp, vod of 30 should result in time avg concentrate value of 55.85 (828ms)
    ✓ under model 1comp, vod of 40 should result in time avg concentrate value of 52.08 (877ms)
    ✓ under model 1comp, vod of 50 should result in time avg concentrate value of 50.30 (796ms)

  Volume of Distribution Test, Model Type 2 Comp Urea
    ✓ under model 2comp urea, vod of 20 should result in time avg conc value of 72.90 (1268ms)
    ✓ under model 2comp urea, vod of 30 should result in time avg conc value of 62.04 (1328ms)
    ✓ under model 2comp urea, vod of 40 should result in time avg conc value of 57.47 (934ms)
    ✓ under model 2comp urea, vod of 50 should result in time avg conc value of 55.05 (845ms)

  Volume of Distribution Test, Model Type 2 Ad Lib, VOD Comp1 and Comp2
    ✓ under model 2comp ad lib, vod of 14, 28 should result in time avg conc value of 56.86 (1238ms)
    ✓ under model 2comp ad lib, vod of 14, 40 should result in time avg conc value of 56.46 (1231ms)
    ✓ under model 2comp ad lib, vod of 14, 60 should result in time avg conc value of 56.59 (1139ms)
    ✓ under model 2comp ad lib, vod of 14, 100 should result in time avg conc value of 57.14 (1205ms)

  Volume of Distribution Test, Model Type 2 Ad Lib, Intercompartmental KC
    ✓ under model 2comp ad lib, Int KC of 800 should result in time avg conc value of 56.86 (853ms)
    ✓ under model 2comp ad lib, Int KC of 900 should result in time avg conc value of 56.28 (1094ms)
    ✓ under model 2comp ad lib, Int KC of 1000 should result in time avg conc value of 55.82 (1157ms)
    ✓ under model 2comp ad lib, Int KC of 1100 should result in time avg conc value of 55.42 (946ms)

  Debug Mode Test
    ✓ clicking on the Liters per treatment label should reveal debug table treatmentTable (240ms)
    ✓ clicking on the Liters per treatment label twice should hide debug table treatmentTable (273ms)

  Protein Binding Test, Under Solute Type of Plasma
    ✓ protein binding of 10 should result in avg clearance of 221.7 and TAC of 54.59 (751ms)
    ✓ protein binding of 20 should result in avg clearance of 204.5 and TAC of 58.51 (1090ms)
    ✓ protein binding of 30 should result in avg clearance of 185.5 and TAC of 63.74 (1116ms)


  32 passing (32s)


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        32                                                                               │
  │ Passing:      32                                                                               │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        false                                                                            │
  │ Duration:     32 seconds                                                                       │
  │ Spec Ran:     spec.cy.js                                                                       │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  spec.cy.js                               00:32       32       32        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        00:32       32       32        -        -        -  

@aaaahn ➜ /workspaces/dialsim (implement-two-comp) $ 
```

## License
Dialsim is available under the [MIT license](https://github.com/aaaahn/dialsim/blob/main/LICENSE.md).