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
@aaaahn ➜ /workspaces/dialsim (main) $ npm run start

> dialsim@0.3.0 start
> npx parcel

Server running at http://localhost:1234
✨ Built in 2.88s
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
 @aaaahn ➜ /workspaces/dialsim (implement-two-comp) $ npx cypress run
====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        13.5.0                                                                         │
  │ Browser:        Electron 114 (headless)                                                        │
  │ Node Version:   v20.9.0 (/usr/local/share/nvm/versions/node/v20.9.0/bin/node)                  │
  │ Specs:          2 found (spec.cy.js, tmeyer_amlk.cy.js)                                        │
  │ Searched:       cypress/e2e/**/*.cy.{js,jsx,ts,tsx}                                            │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘

────────────────────────────────────────────────────────────────────────────────────────────────────
                                                                                                    
  Running:  spec.cy.js                                                                      (1 of 2)


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

────────────────────────────────────────────────────────────────────────────────────────────────────
                                                                                                    
  Running:  tmeyer_amlk.cy.js                                                               (2 of 2)

  Dr Tim's amLK suite, Time
    ✓ Dur 2, Qb 360, Qd 600, KoA 600 (2653ms)
    ✓ Dur 3, Qb 360, Qd 600, KoA 600 (2440ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600 (2449ms)
    ✓ Dur 5, Qb 360, Qd 600, KoA 600 (2354ms)
    ✓ Dur 8, Qb 360, Qd 600, KoA 600 (2285ms)
    ✓ Dur 12, Qb 360, Qd 600, KoA 600 (2339ms)
    ✓ Dur 18, Qb 360, Qd 600, KoA 600 (2499ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 4 to 15
    ✓ Dur 3.5, Qb 100, Qd 100, KoA 100 (2608ms)
    ✓ Dur 3.5, Qb 100, Qd 100, KoA 200 (2765ms)
    ✓ Dur 3.5, Qb 100, Qd 100, KoA 390 (2975ms)
    ✓ Dur 3.5, Qb 100, Qd 100, KoA 400 (2813ms)
    ✓ Dur 3.5, Qb 100, Qd 100, KoA 800 (2936ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 17 to 20
    ✓ Dur 3.5, Qb 100, Qd 300, KoA 100 (2760ms)
    ✓ Dur 3.5, Qb 100, Qd 300, KoA 200 (2924ms)
    ✓ Dur 3.5, Qb 100, Qd 300, KoA 400 (2501ms)
    ✓ Dur 3.5, Qb 100, Qd 300, KoA 800 (2714ms)

  Dr Tim's amLK suite, Qb.Qd.KoA -  rows 22 - 25
    ✓ Dur 3.5, Qb 100, Qd 600, KoA 100 (2969ms)
    ✓ Dur 3.5, Qb 100, Qd 600, KoA 200 (2659ms)
    ✓ Dur 3.5, Qb 100, Qd 600, KoA 400 (2720ms)
    ✓ Dur 3.5, Qb 100, Qd 600, KoA 800 (2588ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 27 to 30
    ✓ Dur 3.5, Qb 100, Qd 1200, KoA 100 (2729ms)
    ✓ Dur 3.5, Qb 100, Qd 1200, KoA 200 (2747ms)
    ✓ Dur 3.5, Qb 100, Qd 1200, KoA 400 (2757ms)
    ✓ Dur 3.5, Qb 100, Qd 1200, KoA 800 (2718ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 33 to 48
    ✓ Dur 3.5, Qb 200, Qd 100, KoA 100 (2633ms)
    ✓ Dur 3.5, Qb 200, Qd 100, KoA 200 (2834ms)
    ✓ Dur 3.5, Qb 200, Qd 100, KoA 300 -- fails to converge when KoA >= 400 (2842ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 50 to 53
    ✓ Dur 3.5, Qb 200, Qd 300, KoA 100 (2915ms)
    ✓ Dur 3.5, Qb 200, Qd 300, KoA 200 (2551ms)
    ✓ Dur 3.5, Qb 200, Qd 300, KoA 400 (2430ms)
    ✓ Dur 3.5, Qb 200, Qd 300, KoA 800 (2477ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 55 to 58
    ✓ Dur 3.5, Qb 200, Qd 600, KoA 100 (2784ms)
    ✓ Dur 3.5, Qb 200, Qd 600, KoA 200 (2579ms)
    ✓ Dur 3.5, Qb 200, Qd 600, KoA 400 (2517ms)
    ✓ Dur 3.5, Qb 200, Qd 600, KoA 800 (2423ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 60 to 63
    ✓ Dur 3.5, Qb 200, Qd 1200, KoA 100 (2796ms)
    ✓ Dur 3.5, Qb 200, Qd 1200, KoA 200 (2786ms)
    ✓ Dur 3.5, Qb 200, Qd 1200, KoA 400 (2554ms)
    ✓ Dur 3.5, Qb 200, Qd 1200, KoA 800 (2614ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 66 to 83
    ✓ Dur 3.5, Qb 400, Qd 100, KoA 100 (2630ms)
    ✓ Dur 3.5, Qb 400, Qd 100, KoA 200  -- fails to converge when KoA >= 300 (2780ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 85 to 88
    ✓ Dur 3.5, Qb 400, Qd 300, KoA 100 (2514ms)
    ✓ Dur 3.5, Qb 400, Qd 300, KoA 200 (2214ms)
    ✓ Dur 3.5, Qb 400, Qd 300, KoA 400 (2478ms)
    ✓ Dur 3.5, Qb 400, Qd 300, KoA 800 (2782ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 90 to 93
    ✓ Dur 3.5, Qb 400, Qd 600, KoA 100 (2631ms)
    ✓ Dur 3.5, Qb 400, Qd 600, KoA 200 (2540ms)
    ✓ Dur 3.5, Qb 400, Qd 600, KoA 400 (2491ms)
    ✓ Dur 3.5, Qb 400, Qd 600, KoA 800 (2386ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 95 to 98
    ✓ Dur 3.5, Qb 400, Qd 1200, KoA 100 (2728ms)
    ✓ Dur 3.5, Qb 400, Qd 1200, KoA 200 (2678ms)
    ✓ Dur 3.5, Qb 400, Qd 1200, KoA 400 (2664ms)
    ✓ Dur 3.5, Qb 400, Qd 1200, KoA 800 (2685ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 101 to 112
    ✓ Dur 3.5, Qb 800, Qd 100, KoA 100  -- fails to converge when KoA >= 200 (2622ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 114 to 122
    ✓ Dur 3.5, Qb 800, Qd 300, KoA 100 (2967ms)
    ✓ Dur 3.5, Qb 800, Qd 300, KoA 200 (2595ms)
    ✓ Dur 3.5, Qb 800, Qd 300, KoA 400 (2919ms)
    ✓ Dur 3.5, Qb 800, Qd 300, KoA 800 (2760ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 124 to 127
    ✓ Dur 3.5, Qb 800, Qd 600, KoA 100 (2715ms)
    ✓ Dur 3.5, Qb 800, Qd 600, KoA 200 (2455ms)
    ✓ Dur 3.5, Qb 800, Qd 600, KoA 400 (2445ms)
    ✓ Dur 3.5, Qb 800, Qd 600, KoA 800 (2668ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 129 - 132
    ✓ Dur 3.5, Qb 800, Qd 1200, KoA 100 (2686ms)
    ✓ Dur 3.5, Qb 800, Qd 1200, KoA 200 (2803ms)
    ✓ Dur 3.5, Qb 800, Qd 1200, KoA 400 (2588ms)
    ✓ Dur 3.5, Qb 800, Qd 1200, KoA 800 (2520ms)

  Dr Tims amLK suite, Kr
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 0.5 (2512ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 0.75 (2777ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 1 (2467ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 1.25 (2580ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 1.5 (2502ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 1.75 (2535ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 2 (2475ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 2.5 (2689ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 3 (2554ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 4 (2551ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 5 (2550ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 8 (2670ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 10 (2645ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 15 (2598ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 20 (2595ms)


  81 passing (4m)


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        81                                                                               │
  │ Passing:      81                                                                               │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        false                                                                            │
  │ Duration:     3 minutes, 40 seconds                                                            │
  │ Spec Ran:     tmeyer_amlk.cy.js                                                                │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────

====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  spec.cy.js                               00:33       32       32        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  tmeyer_amlk.cy.js                        03:42       81       81        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        04:15      113      113        -        -        -  

    
@aaaahn ➜ /workspaces/dialsim (implement-two-comp) $ 
```

## License
Dialsim is available under the [MIT license](https://github.com/aaaahn/dialsim/blob/main/LICENSE.md).