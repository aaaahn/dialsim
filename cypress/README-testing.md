[![codecov](https://codecov.io/gh/aaaahn/dialsim/graph/badge.svg?token=Y3WU4240QS)](https://codecov.io/gh/aaaahn/dialsim)

# Dialsim Testing with Cypress


## Introduction
Dialsim is an open-source project designed for a multidisciplinary developer community. To uphold the application's accuracy, reliability, and consistency, we've incorporated an automated end-to-end test suite powered by [Cypress](https://www.cypress.io/).


## The Importance of Testing in Open Source Projects

* Quality Assurance: With contributors worldwide, end-to-end testing ensures every contribution upholds the project's quality and avoids regressions.

* Scalability: As Dialsim evolves, testing guarantees that new features or changes don't compromise existing functionalities.

* Collaboration: A robust test suite acts as a safety net, allowing collaborators to make changes confidently, knowing tests will identify any issues.

* Documentation: End-to-end tests serve as live documentation, offering a clear depiction of the application's expected behavior and aiding new contributors.

* Longevity: To ensure Dialsim's sustained success and collaboration, it's vital to maintain a bug-free environment. End-to-end tests play a pivotal role in this by identifying potential issues before they reach users.


## Test Suite Overview

* Default Values Test: Validates that default parameters yield the expected clearance value.

* Duration Test: Assesses the application's response to varied Duration values.

* Hematocrit Test: Assesses the application's response to varied Hematocrit values.

* Additional UF Test: Examines the application's behavior with different UF values.

* Fluid Gain Test: Analyzes the application's response to varied fluid gain values.

* Debug Mode Test: Confirms that the 'Liters per treatment' UI element reveals debugging information upon interaction.

## Automated Testing with GitHub Actions

Our test suite is tightly integrated with GitHub [Actions](https://docs.github.com/en/actions/learn-github-actions). With every code push, tests are triggered automatically. For an overview of the most recent test outcomes, refer to the badge below: <center> [![Cypress Status](https://github.com/aaaahn/dialsim/actions/workflows/main.yml/badge.svg)](https://github.com/aaaahn/dialsim/actions/workflows/main.yml) </center> This badge provides a snapshot of individual test results.  For a deeper dive into test health and analytics, visit Cypress Cloud by clicking on the following badge: <center> [![dialsim](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/xz8xtb&style=plastic&logo=cypress)](https://cloud.cypress.io/projects/xz8xtb/runs)
</center>

## Running Cypress Tests Manually

1. Launch Github Codespaces Development Environment

This project uses a pre-configured GitHub Codespaces development environment customized for `Node.js` coding and testing.  Open the Codespaces IDE in your browser through these [instructions](https://docs.github.com/en/codespaces/developing-in-codespaces/opening-an-existing-codespace).  The Codespaces environment comes preinstalled with `Node.js`, `npm`, and `Visual Studio Code`. This provides everything you need for development without any local setup. The cloud-based IDE allows you to instantly test and run the `Node.js` application right from the browser.

2. Start the Dialsim Web App:

```bash
@aaaahn ➜ /workspaces/dialsim (main) $ npm run start
Debugger attached.

> dialsim@0.1.1 start
> npx parcel index.html --open

Debugger attached.
Debugger attached.
Server running at http://localhost:1234
✨ Built in 864ms
```

3. Install Cypress:

```bash
@aaaahn ➜ /workspaces/dialsim (main) $ npx cypress install
Installing Cypress (version: 13.1.0)

✔  Downloaded Cypress
✔  Unzipped Cypress
✔  Finished Installation /home/codespace/.cache/Cypress/13.1.0

You can now open Cypress by running: node_modules/.bin/cypress open

https://on.cypress.io/installing-cypress

@aaaahn ➜ /workspaces/dialsim (main) $ 

```

4. Execute Tests:

```bash
@aaaahn ➜ /workspaces/dialsim (main) $ npx cypress run
Debugger attached.
Debugger attached.
[51413:0912/010640.339470:ERROR:node_bindings.cc(279)] Most NODE_OPTIONs are not supported in packaged apps. See documentation for more details.
[51413:0912/010640.339527:ERROR:node_bindings.cc(279)] Most NODE_OPTIONs are not supported in packaged apps. See documentation for more details.
[51413:0912/010640.339534:ERROR:node_bindings.cc(279)] Most NODE_OPTIONs are not supported in packaged apps. See documentation for more details.

DevTools listening on ws://127.0.0.1:33259/devtools/browser/00f66d24-4646-4920-8ef6-f1fe7158c68f
[51568:0912/010640.832988:ERROR:gpu_memory_buffer_support_x11.cc(44)] dri3 extension not supported.
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
    ✓ solving with default input values should result in avg clearance value of 237.2 and avg concentrate value of 53.06 (749ms)

  Duration Test
    ✓ solving with duration of 3 hours should result in time avg concentrate of 57.19 (892ms)
    ✓ solving with duration of 3.5 hours should result in time avg concentrate of 50.96 (886ms)
    ✓ solving with duration of 4 hours should result in time avg concentrate of 46.29 (845ms)

  Hematocrit Test
    ✓ Hematocrit value of 30 should result in average clearance value of 235.1 and time avg concentrate value of 53.48 (576ms)

  Additional UF Test
    ✓ additional UF value of 23 should result in average clearance value of 240.0 and time avg concentrate value of 52.63 (683ms)
    ✓ additional UF value of 30 should result in average clearance value of 241.3 and time avg concentrate value of 52.43 (689ms)

  Fluid Gain Test
    ✓ fluid gain of 2 should result in average clearance value of 247.7 and time avg concentrate value of 51.43 (819ms)
    ✓ fluid gain of 3 should result in average clearance value of 253.0 and time avg concentrate value of 50.56 (758ms)
    ✓ fluid gain of 4 should result in average clearance value of 258.2 and time avg concentrate value of 49.64 (701ms)

  Volume of Distribution Test
    ✓ volume of distribution of 20 should result in time averaged concentrate value of 65.98 (693ms)
    ✓ volume of distribution of 30 should result in time averaged concentrate value of 55.76 (547ms)
    ✓ volume of distribution of 40 should result in time averaged concentrate value of 52.27 (590ms)
    ✓ volume of distribution of 50 should result in time averaged concentrate value of 50.42 (647ms)

  Debug Mode Test
    ✓ clicking on the Liters per treatment label should reveal debug table treatmentTable (194ms)
    ✓ clicking on the Liters per treatment label twice should hide debug table treatmentTable (285ms)


  16 passing (11s)


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        16                                                                               │
  │ Passing:      16                                                                               │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        false                                                                            │
  │ Duration:     11 seconds                                                                       │
  │ Spec Ran:     spec.cy.js                                                                       │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  spec.cy.js                               00:11       16       16        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        00:11       16       16        -        -        -  

Waiting for the debugger to disconnect...
Waiting for the debugger to disconnect...
@aaaahn ➜ /workspaces/dialsim (main) $ 
 
```

## License
Dialsim is available under the [MIT license](https://github.com/aaaahn/dialsim/blob/main/LICENSE.md).