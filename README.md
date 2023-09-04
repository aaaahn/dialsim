[![Netlify Status](https://api.netlify.com/api/v1/badges/ebd12782-20e2-4816-816c-5534dbefdbe9/deploy-status)](https://app.netlify.com/sites/dialsim/deploys)  &nbsp;&nbsp; [![Cypress Status](https://github.com/aaaahn/dialsim/actions/workflows/main.yml/badge.svg)](https://github.com/aaaahn/dialsim/actions/workflows/main.yml)  &nbsp;&nbsp;   [![dialsim](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/xz8xtb&style=flat&logo=cypress)](https://cloud.cypress.io/projects/xz8xtb/runs) &nbsp;&nbsp; [![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)

https://dialsim.netlify.app

https://dialsim.com

# Dialysis Simulator: A Web Application

## How this program works on your local device

The Dialysis Simulator is a responsive, single-page web application compatible with any device that has a web browser. You can host its code (comprising of HTML, CSS, and JavaScript) on a traditional web server or even on a local storage file system.

Once you've loaded the application via its [URL](https://dialsim.netlify.app) or through the [Webarchive](https://en.wikipedia.org/wiki/Webarchive) file, it can operate untethered without needing an active internet connection.

Browsers are more than just gateways to the internet; they seamlessly integrate HTML, CSS, and JavaScript to display web content. As users engage with the page—whether it's clicking buttons, typing, or scrolling—JavaScript takes charge. It processes these interactions, offering real-time feedback, calculations, and chart visualizations.

```mermaid

graph RL
    Browser[Web Browser  <br> JavaScript Engine] -.->|"https://dialsim.netlify.app "| WWW[(Web Server)]
    subgraph Local Device
        Browser
    end
    WWW --> |HTML & Javascript Code| Browser

    subgraph Netlify Web Host
        WWW
    end


```

## Untethered operation

```mermaid

graph RL
    Browser[Web Browser  <br> JavaScript Engine] -.->|"file:///dialsim.webarchive"| Disk[(File System)]
    subgraph Local Device
        Browser
    end
    Disk --> |HTML & Javascript Code| Browser

    subgraph Local Device
        Disk
    end
```

## JavaScript Architecture

The inputs from the Web Page are collected in the Javascript code, which triggers with a press of the `Solve!` button or a change in one of the inputs. Both the `calcClearanceTable()` and `calcWeeklyTable()` functions construct a table to hold and report the computations, creating the final table, `weeklyTable`. From this, the Chart data is populated, then rendered via HTML element canvas.


```mermaid


graph TD
    subgraph HTML
       A
    end
    subgraph Javascript
        A[Web Page] -- Solve! --> TT["findClearances() </br> treatmentTable"]
        TT -- n-treatments --> B("calcClearanceTable()  </br> clearanceTable")
        B -. "ClearUFs, ClearanceValues"   .-> TT
        B -- "(ClearUFs, ClearanceValues)" --> D("calcWeeklyTable() </br> weeklyTable")
        D -- "bisectIteration(start, end)" -->D
        D --  "(time, conc_ext)" --> E(renderChart)
        E --> A
        B -- "goalSeek(Cd)" --> B
    end




```

`calcClearanceTable()` - The `goalseek()` function iterates to find a starting `Cd` value minimized to 0 by the end of the dialyzer, or as variable `x` reaches 1.000. The inputs from the website run through a table that uses pseudo-calculus to model the values of several variables through the dialyzer. With an initial `Cd` value that reaches 0, other important values dependent on it can be used in the calculation of the clearance. Protein binding percentage is assumed to be 0%, albumin concentration is assumed to be 500 µM, and ∆P0 and ∆P1 are assumed to be 40 torr.

`calcWeeklyTable()` - Using the clearance value(s) derived from the `calcClearanceTable()` calculations, the table calculates the concentration of urea. The iteratation loop searches for an initial urea concentration that roughly matches the ending concentration by continually bisecting the difference between the initial guess and the resulting final concentration.

## Hold mode

The `Hold` mode allows for the graphing of multiple concentrations vs time scenarios. Under this mode, the inputs are ignored until the `Solve!` button is pressed, and new graph is rendered, overlaying the existing set of scenario(s). When the hold mode is disabled, all scenarios are cleared, leaving behind a graph from the most recent set of inputs.

![](https://github.com/aaaahn/web-calculator/blob/main/dialsimdemo.gif)


