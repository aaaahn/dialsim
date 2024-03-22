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

Debugger attached.

> dialsim@0.5 cypress:run
> npx cypress run


DevTools listening on ws://127.0.0.1:46865/devtools/browser/cec69968-3052-418f-b6a0-af0425ee2ed7
Debugger attached.

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        13.6.6                                                                         │
  │ Browser:        Electron 118 (headless)                                                        │
  │ Node Version:   v20.11.0 (/usr/local/share/nvm/versions/node/v20.11.0/bin/node)                │
  │ Specs:          2 found (spec.cy.js, tmeyer_amlk.cy.js)                                        │
  │ Searched:       cypress/e2e/**/*.cy.{js,jsx,ts,tsx}                                            │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────
                                                                                                    
  Running:  spec.cy.js                                                                      (1 of 2)
Browserslist: caniuse-lite is outdated. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme


  Default Values Test
    ✓ solving with default inputs should result in avg clearance of 237.2 and avg concentrate of 51.62 (2371ms)

  Duration Test
    ✓ solving with duration of 3.0 hours should result in time avg concentrate of 55.89 (2547ms)
    ✓ solving with duration of 3.5 hours should result in time avg concentrate of 49.21 (2544ms)
    ✓ solving with duration of 4.0 hours should result in time avg concentrate of 44.30 (2584ms)

  Hematocrit Test
    ✓ hematocrit of 30 should result in average clearance of 235.1 and time avg concentrate of 52.00 (2296ms)
    ✓ hematocrit of 40 should result in average clearance of 234.4 and time avg concentrate of 52.13 (2225ms)

  Additional UF Test
    ✓ additional UF of 23 should result in avg clearance of 240.0 and time avg concentrate of 51.13 (2404ms)
    ✓ additional UF of 30 should result in avg clearance of 241.3 and time avg concentrate of 50.90 (2239ms)

  Fluid Gain Test
    ✓ fluid gain of 2 should result in avg clearance of 247.7 and time avg concentrate of 49.74 (2321ms)
    ✓ fluid gain of 3 should result in avg clearance of 253.0 and time avg concentrate of 48.86 (2287ms)
    ✓ fluid gain of 4 should result in avg clearance of 258.2 and time avg concentrate of 48.01 (2228ms)

  Volume of Distribution Test, Model Type 1Comp
    ✓ under model 1comp, vod of 20 should result in time avg concentrate value of 66.04 (2297ms)
    ✓ under model 1comp, vod of 30 should result in time avg concentrate value of 55.85 (2246ms)
    ✓ under model 1comp, vod of 40 should result in time avg concentrate value of 52.08 (2172ms)
    ✓ under model 1comp, vod of 50 should result in time avg concentrate value of 50.30 (2172ms)

  Volume of Distribution Test, Model Type 2 Comp Urea
    ✓ under model 2comp urea, vod of 20 should result in time avg conc value of 72.90 (2402ms)
    ✓ under model 2comp urea, vod of 30 should result in time avg conc value of 62.04 (2344ms)
    ✓ under model 2comp urea, vod of 40 should result in time avg conc value of 57.47 (2391ms)
    ✓ under model 2comp urea, vod of 50 should result in time avg conc value of 55.05 (2218ms)

  Volume of Distribution Test, Model Type 2 Ad Lib, VOD Comp1 and Comp2
    ✓ under model 2comp ad lib, vod of 14, 28 should result in time avg conc value of 56.86 (2588ms)
    ✓ under model 2comp ad lib, vod of 14, 40 should result in time avg conc value of 56.46 (2506ms)
    ✓ under model 2comp ad lib, vod of 14, 60 should result in time avg conc value of 56.59 (2657ms)
    ✓ under model 2comp ad lib, vod of 14, 100 should result in time avg conc value of 57.14 (2651ms)

  Volume of Distribution Test, Model Type 2 Ad Lib, Intercompartmental KC
    ✓ under model 2comp ad lib, Int KC of 800 should result in time avg conc value of 56.86 (2361ms)
    ✓ under model 2comp ad lib, Int KC of 900 should result in time avg conc value of 56.28 (2400ms)
    ✓ under model 2comp ad lib, Int KC of 1000 should result in time avg conc value of 55.82 (2364ms)
    ✓ under model 2comp ad lib, Int KC of 1100 should result in time avg conc value of 55.42 (2447ms)

  Debug Mode Test
    ✓ clicking on the Liters per treatment label should reveal debug table treatmentTable (1830ms)
    ✓ clicking on the Liters per treatment label twice should hide debug table treatmentTable (1940ms)

  Protein Binding Test, Under Solute Type of Plasma
    ✓ protein binding of 10 should result in avg clearance of 187.1 and TAC of 63.25 (2582ms)
    ✓ protein binding of 20 should result in avg clearance of 175.8 and TAC of 66.85 (2614ms)
    ✓ protein binding of 30 should result in avg clearance of 162.6 and TAC of 71.78 (2344ms)


  32 passing (1m)


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        32                                                                               │
  │ Passing:      32                                                                               │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        false                                                                            │
  │ Duration:     1 minute, 17 seconds                                                             │
  │ Spec Ran:     spec.cy.js                                                                       │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────
                                                                                                    
  Running:  tmeyer_amlk.cy.js                                                               (2 of 2)


  Dr Tim's amLK suite, Time
    ✓ Dur 2, Qb 360, Qd 600, KoA 600 (2561ms)
    ✓ Dur 3, Qb 360, Qd 600, KoA 600 (2089ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600 (2029ms)
    ✓ Dur 5, Qb 360, Qd 600, KoA 600 (2096ms)
    ✓ Dur 8, Qb 360, Qd 600, KoA 600 (1988ms)
    ✓ Dur 12, Qb 360, Qd 600, KoA 600 (2101ms)
    ✓ Dur 18, Qb 360, Qd 600, KoA 600 (2028ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 4 to 9
Warning: loader_scanned_icd_add: Driver /usr/lib/x86_64-linux-gnu/libvulkan_lvp.so supports Vulkan 1.1, but only supports loader interface version 4. Interface version 5 or newer required to support this version of Vulkan (Policy #LDP_DRIVER_7)
Warning: loader_scanned_icd_add: Driver /usr/lib/x86_64-linux-gnu/libvulkan_intel.so supports Vulkan 1.2, but only supports loader interface version 4. Interface version 5 or newer required to support this version of Vulkan (Policy #LDP_DRIVER_7)
Warning: loader_scanned_icd_add: Driver /usr/lib/x86_64-linux-gnu/libvulkan_radeon.so supports Vulkan 1.2, but only supports loader interface version 4. Interface version 5 or newer required to support this version of Vulkan (Policy #LDP_DRIVER_7)
Warning: Layer VK_LAYER_MESA_device_select uses API version 1.2 which is older than the application specified API version of 1.3. May cause issues.
error: XDG_RUNTIME_DIR is invalid or not set in the environment.
error: XDG_RUNTIME_DIR is invalid or not set in the environment.
    ✓ Dur 3.5, Qb 100, Qd 50, KoA 100 (2283ms)
    ✓ Dur 3.5, Qb 100, Qd 50, KoA 200 (2161ms)
    ✓ Dur 3.5, Qb 100, Qd 50, KoA 400 (2152ms)
    ✓ Dur 3.5, Qb 100, Qd 50, KoA 800 (2214ms)
    ✓ Dur 3.5, Qb 100, Qd 50, KoA 1200 (2144ms)
    ✓ Dur 3.5, Qb 100, Qd 50, KoA 1600 (2315ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 12 to 17
    ✓ Dur 3.5, Qb 100, Qd 100, KoA 100 (2489ms)
    ✓ Dur 3.5, Qb 100, Qd 100, KoA 200 (2203ms)
    ✓ Dur 3.5, Qb 100, Qd 100, KoA 400 (2095ms)
    ✓ Dur 3.5, Qb 100, Qd 100, KoA 800 (2048ms)
    ✓ Dur 3.5, Qb 100, Qd 100, KoA 1200 (2274ms)
    ✓ Dur 3.5, Qb 100, Qd 100, KoA 1600 (2149ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 20 to 25
    ✓ Dur 3.5, Qb 100, Qd 300, KoA 100 (2109ms)
    ✓ Dur 3.5, Qb 100, Qd 300, KoA 200 (2092ms)
    ✓ Dur 3.5, Qb 100, Qd 300, KoA 400 (2082ms)
    ✓ Dur 3.5, Qb 100, Qd 300, KoA 800 (2270ms)
    ✓ Dur 3.5, Qb 100, Qd 300, KoA 1200 (2174ms)
    ✓ Dur 3.5, Qb 100, Qd 300, KoA 1600 (2256ms)

  Dr Tim's amLK suite, Qb.Qd.KoA -  rows 36 - 41
    ✓ Dur 3.5, Qb 100, Qd 1200, KoA 100 (2184ms)
    ✓ Dur 3.5, Qb 100, Qd 1200, KoA 200 (2358ms)
    ✓ Dur 3.5, Qb 100, Qd 1200, KoA 400 (2200ms)
    ✓ Dur 3.5, Qb 100, Qd 1200, KoA 800 (2049ms)
    ✓ Dur 3.5, Qb 100, Qd 1200, KoA 1200 (2215ms)
    ✓ Dur 3.5, Qb 100, Qd 1200, KoA 1600 (2046ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 44 to 49
    ✓ Dur 3.5, Qb 200, Qd 50, KoA 100 (2445ms)
    ✓ Dur 3.5, Qb 200, Qd 100, KoA 200 (2347ms)
    ✓ Dur 3.5, Qb 200, Qd 100, KoA 400 (2367ms)
    ✓ Dur 3.5, Qb 200, Qd 100, KoA 800 (2201ms)
    ✓ Dur 3.5, Qb 200, Qd 100, KoA 1200 (2139ms)
    ✓ Dur 3.5, Qb 200, Qd 100, KoA 1600 (2067ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 52 to 57
    ✓ Dur 3.5, Qb 200, Qd 100, KoA 100 (2356ms)
    ✓ Dur 3.5, Qb 200, Qd 100, KoA 200 (2145ms)
    ✓ Dur 3.5, Qb 200, Qd 100, KoA 400 (2082ms)
    ✓ Dur 3.5, Qb 200, Qd 100, KoA 800 (2017ms)
    ✓ Dur 3.5, Qb 200, Qd 100, KoA 1200 (2376ms)
    ✓ Dur 3.5, Qb 200, Qd 100, KoA 1600 (2092ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 60 to 65
    ✓ Dur 3.5, Qb 200, Qd 300, KoA 100 (2086ms)
    ✓ Dur 3.5, Qb 200, Qd 300, KoA 200 (2095ms)
    ✓ Dur 3.5, Qb 200, Qd 300, KoA 400 (2022ms)
    ✓ Dur 3.5, Qb 200, Qd 300, KoA 800 (2051ms)
    ✓ Dur 3.5, Qb 200, Qd 300, KoA 1200 (2279ms)
    ✓ Dur 3.5, Qb 200, Qd 300, KoA 1600 (2263ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 68 to 73
    ✓ Dur 3.5, Qb 200, Qd 600, KoA 100 (2101ms)
    ✓ Dur 3.5, Qb 200, Qd 600, KoA 200 (2099ms)
    ✓ Dur 3.5, Qb 200, Qd 600, KoA 400 (2058ms)
    ✓ Dur 3.5, Qb 200, Qd 600, KoA 800 (2062ms)
    ✓ Dur 3.5, Qb 200, Qd 600, KoA 1200 (2016ms)
    ✓ Dur 3.5, Qb 200, Qd 600, KoA 1600 (2280ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 76 to 81
    ✓ Dur 3.5, Qb 200, Qd 1200, KoA 100 (2136ms)
    ✓ Dur 3.5, Qb 200, Qd 1200, KoA 200 (2061ms)
    ✓ Dur 3.5, Qb 200, Qd 1200, KoA 400 (1921ms)
    ✓ Dur 3.5, Qb 200, Qd 1200, KoA 800 (2051ms)
    ✓ Dur 3.5, Qb 200, Qd 1200, KoA 1200 (2238ms)
    ✓ Dur 3.5, Qb 200, Qd 1200, KoA 1600 (2337ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 84 to 89
    ✓ Dur 3.5, Qb 400, Qd 50, KoA 100 (2110ms)
    ✓ Dur 3.5, Qb 400, Qd 50, KoA 200 (2125ms)
    ✓ Dur 3.5, Qb 400, Qd 50, KoA 400 (2548ms)
    ✓ Dur 3.5, Qb 400, Qd 50, KoA 800 (2225ms)
    ✓ Dur 3.5, Qb 400, Qd 50, KoA 1200 (2217ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 92 to 97
    ✓ Dur 3.5, Qb 400, Qd 100, KoA 100 (2074ms)
    ✓ Dur 3.5, Qb 400, Qd 100, KoA 200  (2400ms)
    ✓ Dur 3.5, Qb 400, Qd 100, KoA 400 (2070ms)
    ✓ Dur 3.5, Qb 400, Qd 100, KoA 800 (2283ms)
    ✓ Dur 3.5, Qb 400, Qd 100, KoA 1200 (2275ms)
    ✓ Dur 3.5, Qb 400, Qd 100, KoA 1600 (2185ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 100 to 105
    ✓ Dur 3.5, Qb 400, Qd 300, KoA 100 (2266ms)
    ✓ Dur 3.5, Qb 400, Qd 300, KoA 200 (2007ms)
    ✓ Dur 3.5, Qb 400, Qd 300, KoA 400 (2006ms)
    ✓ Dur 3.5, Qb 400, Qd 300, KoA 800 (2024ms)
    ✓ Dur 3.5, Qb 400, Qd 300, KoA 1200 (2299ms)
    ✓ Dur 3.5, Qb 400, Qd 300, KoA 1600 (2129ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 108 to 113
    ✓ Dur 3.5, Qb 400, Qd 600, KoA 100 (2245ms)
    ✓ Dur 3.5, Qb 400, Qd 600, KoA 200 (2032ms)
    ✓ Dur 3.5, Qb 400, Qd 600, KoA 400 (2038ms)
    ✓ Dur 3.5, Qb 400, Qd 600, KoA 800 (2057ms)
    ✓ Dur 3.5, Qb 400, Qd 600, KoA 1200 (2020ms)
    ✓ Dur 3.5, Qb 400, Qd 600, KoA 1600 (2077ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 116 to 121
    ✓ Dur 3.5, Qb 400, Qd 1200, KoA 100 (2037ms)
    ✓ Dur 3.5, Qb 400, Qd 1200, KoA 200 (1997ms)
    ✓ Dur 3.5, Qb 400, Qd 1200, KoA 400 (2121ms)
    ✓ Dur 3.5, Qb 400, Qd 1200, KoA 800 (2095ms)
    ✓ Dur 3.5, Qb 400, Qd 1200, KoA 1200 (2050ms)
    ✓ Dur 3.5, Qb 400, Qd 1200, KoA 1600 (2146ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 124 to 129
    ✓ Dur 3.5, Qb 800, Qd 50, KoA 100 (2326ms)
    ✓ Dur 3.5, Qb 800, Qd 50, KoA 200 (2117ms)
    ✓ Dur 3.5, Qb 800, Qd 50, KoA 400 (2356ms)
    ✓ Dur 3.5, Qb 800, Qd 50, KoA 800 (2152ms)
    ✓ Dur 3.5, Qb 800, Qd 50, KoA 1200 (2196ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 132 to 137
    ✓ Dur 3.5, Qb 800, Qd 100, KoA 100 (2461ms)
    ✓ Dur 3.5, Qb 800, Qd 100, KoA 200 (2120ms)
    ✓ Dur 3.5, Qb 800, Qd 100, KoA 400 (2135ms)
    ✓ Dur 3.5, Qb 800, Qd 100, KoA 800 (2376ms)
    ✓ Dur 3.5, Qb 800, Qd 100, KoA 1200 (2061ms)
    ✓ Dur 3.5, Qb 800, Qd 100, KoA 1600 (2134ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 140 to 145
    ✓ Dur 3.5, Qb 800, Qd 300, KoA 100 (2301ms)
    ✓ Dur 3.5, Qb 800, Qd 300, KoA 200 (2293ms)
    ✓ Dur 3.5, Qb 800, Qd 300, KoA 400 (2033ms)
    ✓ Dur 3.5, Qb 800, Qd 300, KoA 800 (2070ms)
    ✓ Dur 3.5, Qb 800, Qd 300, KoA 1200 (2053ms)
    ✓ Dur 3.5, Qb 800, Qd 300, KoA 1600 (2356ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 148 to 153
    ✓ Dur 3.5, Qb 800, Qd 600, KoA 100 (2133ms)
    ✓ Dur 3.5, Qb 800, Qd 600, KoA 200 (2172ms)
    ✓ Dur 3.5, Qb 800, Qd 600, KoA 400 (2078ms)
    ✓ Dur 3.5, Qb 800, Qd 600, KoA 800 (2024ms)
    ✓ Dur 3.5, Qb 800, Qd 600, KoA 1200 (2105ms)
    ✓ Dur 3.5, Qb 800, Qd 600, KoA 1600 (2050ms)

  Dr Tim's amLK suite, Qb.Qd.KoA - rows 156 - 161
    ✓ Dur 3.5, Qb 800, Qd 1200, KoA 100 (2031ms)
    ✓ Dur 3.5, Qb 800, Qd 1200, KoA 200 (2043ms)
    ✓ Dur 3.5, Qb 800, Qd 1200, KoA 400 (2054ms)
    ✓ Dur 3.5, Qb 800, Qd 1200, KoA 800 (2134ms)
    ✓ Dur 3.5, Qb 800, Qd 1200, KoA 1200 (2136ms)
    ✓ Dur 3.5, Qb 800, Qd 1200, KoA 1600 (2016ms)

  Dr Tim's amLK suite, Kr
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 0.5 (2300ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 0.75 (2402ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 1 (2392ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 1.25 (2308ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 1.5 (2299ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 1.75 (2367ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 2 (2274ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 2.5 (2298ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 3 (2226ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 4 (2396ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 5 (2327ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 8 (2288ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 10 (2303ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 15 (2340ms)
    ✓ Dur 3.5, Qb 360, Qd 600, KoA 600, Kr 20 (2276ms)


  134 passing (5m)


  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        134                                                                              │
  │ Passing:      134                                                                              │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        false                                                                            │
  │ Duration:     4 minutes, 59 seconds                                                            │
  │ Spec Ran:     tmeyer_amlk.cy.js                                                                │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  spec.cy.js                               01:17       32       32        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  tmeyer_amlk.cy.js                        04:57      134      134        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        06:14      166      166        -        -        -  

Waiting for the debugger to disconnect...
Waiting for the debugger to disconnect...
Waiting for the debugger to disconnect...
@aaaahn ➜ /workspaces/dialsim (heavy_salt) $ 
```

## License
Dialsim is available under the [MIT license](https://github.com/aaaahn/dialsim/blob/main/LICENSE.md).