// This work © 2023 by Timothy W Meyer, Andrew Ahn is licensed under CC BY 4.0
import "./styles.css";
import * as goalSeek from "goal-seek";

// make this also a global function by attaching to the window object
window.render_disabled = function render_disabled() {
  console.log(
    `called - render_disabled: ${document.getElementById("replace").disabled}`
  );
  document
    .getElementById("additionaluf")
    .addEventListener("input", function () {
      var additionalufValue = parseFloat(this.value);
      var isDisabled = additionalufValue === 0;

      document.getElementById("replace").disabled = isDisabled;
      document.getElementById("dilution").disabled = isDisabled;
      console.log(`isDisabled: ${isDisabled}`);

      // Applying a class to make the difference obviously visible
      if (isDisabled) {
        document.getElementById("replace").classList.add("disabled");
        document.getElementById("dilution").classList.add("disabled");
      } else {
        document.getElementById("dilution").value = additionalufValue;
        document.getElementById("replace").classList.remove("disabled");
        document.getElementById("dilution").classList.remove("disabled");
      }
    });
};

// make this also a global function by attaching to the window object
window.render_disabled_uf = function render_disabled_uf() {
  console.log(
    `called - render_disabled_uf: ${document.getElementById("uf").disabled}`
  );
  document.getElementById("fluidgain").addEventListener("input", function () {
    var fluidgainValue = parseFloat(this.value);
    console.log(`fluidgainValue: ${fluidgainValue}`);
    var isDisabled = fluidgainValue === 0;

    document.getElementById("uf").disabled = isDisabled;
    console.log(`uf isDisabled: ${isDisabled}`);

    // Applying a class to make the difference obviously visible
    if (isDisabled) {
      document.getElementById("uf").value = 0;
      document.getElementById("uf").classList.add("disabled");
      document.getElementById("uflabel").classList.add("disabled");
    } else {
      document.getElementById("uf").value = 7;
      document.getElementById("uf").classList.remove("disabled");
      document.getElementById("uflabel").classList.remove("disabled");
    }
  });
};

// This line ensures that the render_disabled function is called once the document's content has been fully loaded.
document.addEventListener("DOMContentLoaded", render_disabled);

function calculatePrePostDilution(Qf) {
  if (Qf === 0) {
    return 0;
  }

  // =IF(C6=1,Interface!E10*1000/AB17,0)
  var selectElement = document.getElementById("replace");
  var selectedValue = selectElement.value;
  var selectedText = selectElement.options[selectElement.selectedIndex].text;
  console.log("Selected value is: " + selectedValue);
  console.log("Selected text is: " + selectedText);
  console.log(`selectedText: ${selectedText}`);
  if (selectedText === "Predilution") {
    // AB17 is dialysis duration in mins
    let duration_in_mins = hours_to_mins(
      parseFloat(document.getElementById("duration").value)
    ); // let duration = 3.33;
    let dilution = parseFloat(document.getElementById("dilution").value);
    let predilution = (dilution * 1000) / duration_in_mins;
    console.log(`predilution: ${predilution}`);
    return predilution;
  } else {
    return 0;
  }
}

function calculatePhi(KoA, Pe) {
  if (KoA === 0) {
    return 0;
  } else if (Pe === 0) {
    return 0.5;
  } else if (isNaN(Math.exp(Pe))) {
    return 0;
  } else {
    return 1 / Pe - 1 / (Math.exp(Pe) - 1);
  }
}

function calculateClearUF(day) {
  // =(AE5*Interface!$E$14+IF(AA5,Interface!$E$9,0))*1000/$AB$17
  var fluidgain = parseFloat(document.getElementById("fluidgain").value);
  var additionaluf = parseFloat(document.getElementById("additionaluf").value);
  let duration_in_mins = hours_to_mins(
    parseFloat(document.getElementById("duration").value)
  );
  let dialysis = build_dialysis_array();
  let days_since = 1; // TODO: fix this with a real calculation

  return (
    ((days_since * fluidgain + dialysis[day] ? additionaluf : 0) * 1000) /
    duration_in_mins
  );
}

function calcClearanceTable(newCd) {
  let Qb = parseFloat(document.getElementById("bloodflow").value); // let Qb = 360;
  let Qd = parseFloat(document.getElementById("dialysateflow").value); // 500;
  console.log("dialysateflow: " + parseFloat(Qd));
  let KoA = parseFloat(document.getElementById("koa").value); //  let KoA = 500;
  let sigma = parseFloat(document.getElementById("sigma").value); // 0;
  console.log(`sigma: ${sigma}`);
  let Qf = parseFloat(document.getElementById("fluidgain").value); // 0;
  let additionaluf = parseFloat(document.getElementById("additionaluf").value); // 0;
  let Qr = calculatePrePostDilution(additionaluf); // 0;
  // when Additional UF is non-zero, dilution is enabled
  // Qr is assigned Qf
  if (!document.getElementById("dilution").disabled) {
    Qf = Qr;
  }
  console.log(`Qr: ${Qr}`);
  console.log(`Qf: ${Qf}`);
  let Hct = parseFloat(document.getElementById("hematocrit").value); // 0;
  console.log(`Hct: ${Hct}`);
  // let f = 0.3378;
  let f = 1.0;
  let Calb = 500;
  let Cp = 100;
  console.log(`Cp: ${Cp}`);
  let DP0 = 40;
  let DP1 = 40;
  let solute = 0;
  let solute1 = "Urea";
  let solute2 = "Plasma";
  let PureUF = Qd <= 0 ? true : false; // false;
  console.log("PureUF: " + PureUF);
  let PureDialysis = Qf <= 0 ? true : false; //  = true;
  let Qpmin = 200;
  let Qdmin = 1000;
  let QpQdisneg = false;

  let increment = 0.001;
  let Ka = (Cp - Cp * f) / Cp / f / (Calb - Cp + Cp * f);
  let Pa = (DP1 - DP0) / (DP1 + DP0);
  console.log(`Pa: ${Pa}`);
  let Pb = (2 * DP0) / (DP1 + DP0);
  console.log(`Pb: ${Pb}`);

  let Qp = Qb * (1 - Hct);
  console.log(`Qp: ${Qp}`);
  let Qprbc = 0.86 * Qb * Hct;
  console.log(`Qprbc: ${Qprbc}`);

  if (solute === 1) {
    Qprbc = 0.86 * Qb * Hct;
  } else {
    Qprbc = 0;
  }
  console.log(`Qprbc: ${Qprbc}`);

  // let Qpoatinlet = 360;
  let Qpoatinlet = Qp + Qr; // =L4+$F$7
  console.log(`Qpoatinlet: ${Qpoatinlet}`);
  let theta_inblood = 0.07;
  let Calb0 = (Calb * Qp) / Qpoatinlet;
  console.log(`Calb0: ${Calb0}`);
  let theta_atinlet = (theta_inblood * Calb0) / Calb;
  console.log(`theta_inblood * Calb0: ${theta_inblood * Calb0}`);
  console.log(`Calb: ${Calb}`);
  // let theta_atinlet = 0.07;
  console.log(`theta_atinlet: ${theta_atinlet}`);
  // let Cp0 = 100;
  let Cp0 =
    (Cp * Qp + (Cp / (1 - theta_inblood)) * Qprbc) /
    (Qpoatinlet + Qprbc / (1 - theta_atinlet));
  console.log(`Cp0: ${Cp0}`);

  let sz = [1001, 17];
  let varNames = [
    "x",
    "Qp",
    "Qd",
    "Jv",
    "Calb",
    "theta",
    "Cp",
    "Cpf",
    "Cpfw",
    "Cd",
    "Cpm",
    "f",
    "Js",
    "Phi",
    "Pe",
    "Massp",
    "Massd"
  ];
  let vTable = new Array(sz[0]).fill(null).map(() =>
    Object.assign(
      {},
      Array.from(varNames, () => 0)
    )
  );

  for (let row = 0; row < sz[0]; row++) {
    // vTable[row].x = row * 0.001;
    vTable[row].x = row === 0 ? 0.0 : vTable[row - 1].x + 0.001;
    vTable[row].x = parseFloat(vTable[row].x.toFixed(3));
    // vTable[row].Phi = 0.5;
    vTable[row].Qp =
      Qpoatinlet - Qf * (Pa * Math.pow(vTable[row].x, 2) + Pb * vTable[row].x);

    if (row === 0) {
      vTable[row].Qd = Qd + Qf;
    } else {
      vTable[row].Qd =
        vTable[0].Qd -
        Qf * (Pa * Math.pow(vTable[row].x, 2) + Pb * vTable[row].x);
    }

    if (PureUF) {
      vTable[row].Jv = 0;
    } else {
      vTable[row].Jv = 2 * Qf * Pa * vTable[row].x + Qf * Pb;
    }

    vTable[row].Calb = (Calb0 * Qpoatinlet) / vTable[row].Qp;
    // (row === 0) ? vTable[row].Calb = Calb : vTable[row].Calb = (vTable[row - 1].Calb * Qpoatinlet) / vTable[row].Qp;

    if (row === 0) {
      vTable[row].theta = theta_atinlet;
    } else {
      vTable[row].theta =
        (vTable[row - 1].theta * vTable[row].Calb) / vTable[row - 1].Calb;
    }

    if (row === 0) {
      vTable[row].Cp = Cp0;
    } else {
      vTable[row].Cp =
        (vTable[row - 1].Cp * vTable[row - 1].Qp +
          vTable[row - 1].Cpfw * Qprbc -
          vTable[row - 1].Js * increment) /
        (vTable[row].Qp + Qprbc / (1 - vTable[row].theta));
    }

    if (f === 0) {
      vTable[row].f = 0;
    } else if (f === 1) {
      vTable[row].f = 1;
    } else {
      vTable[row].f =
        (vTable[row].Cp -
          vTable[row].Calb -
          1 / Ka +
          Math.sqrt(
            Math.pow(vTable[row].Calb - vTable[row].Cp + 1 / Ka, 2) +
              (4 * vTable[row].Cp) / Ka
          )) /
        (2 * vTable[row].Cp);
    }

    vTable[row].Cpf = vTable[row].Cp * vTable[row].f;
    vTable[row].Cpfw = vTable[row].Cpf / (1 - vTable[row].theta);

    if (row === 0) {
      vTable[row].Cd = newCd;
      //vTable[row].Cd = 10.3345678837018;
    } else {
      if (PureUF) {
        if (PureDialysis) {
          vTable[row].Cd = 0;
        } else {
          vTable[row].Cd = vTable[row].Massd / vTable[row].Qd;
        }
      } else {
        vTable[row].Cd =
          (vTable[row - 1].Cd * vTable[row - 1].Qd -
            vTable[row - 1].Js * increment) /
          vTable[row].Qd;
      }
    }

    vTable[row].Pe = (vTable[row].Jv * (1 - sigma)) / KoA;
    vTable[row].Phi = calculatePhi(KoA, vTable[row].Pe);

    if (PureUF) {
      vTable[row].Cpm = vTable[row].Cpfw;
    } else {
      vTable[row].Cpm =
        (1 - vTable[row].Phi) * vTable[row].Cpfw +
        vTable[row].Phi * vTable[row].Cd;
    }

    if (PureUF) {
      vTable[row].Js = 0 + vTable[row].Cpm * vTable[row].Jv * (1 - sigma);
    } else {
      vTable[row].Js =
        KoA * (vTable[row].Cpfw - vTable[row].Cd) +
        vTable[row].Cpm * vTable[row].Jv * (1 - sigma);
    }

    vTable[row].Massp = (vTable[row].Qp + Qprbc) * vTable[row].Cp;

    if (PureUF) {
      vTable[row].Massd =
        vTable[row - 1].Massp - vTable[row].Massp + vTable[row].Massd;
    } else {
      vTable[row].Massd = vTable[row].Qd * vTable[row].Cd;
    }
  }

  ////console.table(vTable);
  // let clearanceValue = 237.1902397;
  // =ROUND(((L4+L5/(1-L9))*F13-(I1012+L5/(1-M1012))*N1012)/F13,10)let clearanceValue = ((Qp + Qprbc/(1-theta_inblood))* Cp0 - (vTable[1000].Qp + Qprbc/(1-vTable[1000].theta))*vTable[1000].Cp)/Cp0
  // -----------  weekly calculators
  //let clearanceValue = Math.round(((L4 + L5 / (1 - L9)) * F13 - (I1012 + L5 / (1 - M1012)) * N1012) / F13, 10);
  /*
  console.log(`----------------------`);
  console.log(`Qp: ${Qp}`);
  console.log(`Qprbc: ${Qprbc}`);
  console.log(`theta_inblood: ${theta_inblood}`);
  console.log(`Cp: ${Cp}`);
  console.log("vTable[1000].Cp: " + vTable[1000].Cp);
  console.log(`Qprbc: ${Qprbc}`);
  console.log(`vTable[1000].Calb: ${vTable[1000].Calb}`);
  console.log(`vTable[1000].theta: ${vTable[1000].theta}`);
  console.log(`----------------------`);
  */
  let clearanceValue =
    ((Qp + Qprbc / (1 - theta_inblood)) * Cp -
      (vTable[1000].Qp + Qprbc / (1 - vTable[1000].theta)) * vTable[1000].Cp) /
    Cp;
  console.log(`clearanceValue0: ${clearanceValue}`);
  return [varNames, vTable, clearanceValue];
}

function hours_to_mins(duration) {
  return (Math.round(duration * 10) / 10) * 60;
}

// returns a value based on the first TRUE cell it encounters.
function days_since(dialysis) {
  let result = 0;
  // 1 2 3 4 5 6 7
  // M T W T F S S

  if (!dialysis[1]) {
    result = 0;
  } else if (dialysis[7]) {
    result = 1;
  } else if (dialysis[6]) {
    result = 2;
  } else if (dialysis[5]) {
    result = 3;
  } else if (dialysis[4]) {
    result = 4;
  } else if (dialysis[3]) {
    result = 5;
  } else if (dialysis[2]) {
    result = 6;
  }
  console.log(result); // This will log the result to the console.
  return result;
}

function map_day_to_kml(dialysis, day_num, time, clearanceValue, duration) {
  // todo: figure out column AI for Monday to Sunday are calculated
  //  return dialysis[day_num] * 237.1902396608; // kml_per_min;
  // console.log(`hours_to_mins(duration): ${hours_to_mins(duration)}`);

  if ((time - 720) % 1440 <= hours_to_mins(duration)) {
    return dialysis[day_num] * clearanceValue;
  } else {
    return 0.0;
  }
}

//TODO: ask dr tim
function calc_vol_ext() {
  // =IF($AG$21,$AB$26,IF(AND(AM9,NOT(AM10)),$AB$26,AN1688+($AB$28-IF(AND(AM1688,AM9),CHOOSE(AK9,$AG$5,$AG$6,$AG$7,$AG$8,$AG$9,$AG$10,$AG$11)*$AA$22/$AA$24,0))*$AB$15))
  return 36000;
}

function build_dialysis_array() {
  let Monday = document.getElementById("monday").checked; // true;
  let Tuesday = document.getElementById("tuesday").checked; //false;
  let Wednesday = document.getElementById("wednesday").checked; // true;
  let Thursday = document.getElementById("thursday").checked; // false;
  let Friday = document.getElementById("friday").checked; // true;
  let Saturday = document.getElementById("saturday").checked; // false;
  let Sunday = document.getElementById("sunday").checked; // false;
  let dialysis = [
    Sunday,
    Monday, // dialysis[1] --> true
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday, //
    Sunday // dialysis[day] --> false
  ]; // javascript arrays are zero indexed
  return dialysis;
}

function calcWeeklyTable(clearanceValue) {
  console.log(`calcWeeklyTable:clearanceValue: ${clearanceValue}`);
  let dialysis = build_dialysis_array();
  let sz = [1681, 17];
  let varNames = [
    "day",
    "time",
    "dialysis",
    "vol_ext",
    "vol_int",
    "conc_ext",
    "conc_int",
    "debug",
    "point",
    "ptime",
    "cext"
  ];
  let wt = new Array(sz[0]).fill(null).map(() =>
    Object.assign(
      {},
      Array.from(varNames, () => 0)
    )
  );

  var time_increment_minutes = 6;
  var endog_clear = parseFloat(
    document.getElementById("endogenousclearance").value
  ); // 0; // hard-coded AA37
  // var generation = 6.613888888;
  var generation =
    parseFloat(document.getElementById("generationrate").value) / (24 * 60);
  console.log(`generation: ${generation}`);

  let kc = 0;
  let extracell = 0.834522427; // this should come from an prior vTable (as argument to this function)
  let intracell = 0.0;
  var duration = parseFloat(document.getElementById("duration").value); // let duration = 3.33;

  let increment = 1;
  let last = sz[0] - 1;

  // iterate the calculation until start/end
  wt[0].conc_ext = extracell; // this value has not been assigned yet, so stamp a random value to get overriden with correct calculation in the loop below
  wt[last].conc_ext = extracell + 1; // this value has not been assigned yet, so stamp a random value to get overriden with correct calculation in the loop below
  console.log(`extracell: ${extracell}`);
  console.log(`LEFT:  wt[0].conc_ext: ${wt[0].conc_ext}`);
  console.log(`RIGHT: wt[last].conc_ext: ${wt[last].conc_ext}`);
  let iteration_enabled = true;
  for (
    let iteration = 0;
    Math.abs(wt[0].conc_ext - wt[last].conc_ext) > 0.01 && iteration_enabled;
    iteration++
  ) {
    for (let row = 0; row < sz[0]; row++) {
      wt[row].time = row === 0 ? 0 : wt[row - 1].time + time_increment_minutes;
      wt[row].day = 1 + (Math.floor(wt[row].time / 60 / 24 - 0.5) % 7);
      wt[row].dialysis = dialysis[wt[row].day];
      wt[row].vol_ext = calc_vol_ext();
      wt[row].vol_int = 0.0;

      // this if block calculates cols: conc_ext and conc_int
      if (row === 0) {
        wt[row].conc_ext = extracell;
        wt[row].conc_int = intracell;
      } else {
        // is vol_ext less than zero?
        if (wt[row - 1].vol_ext <= 0) {
          wt[row].conc_ext = 0.0;
        } else {
          wt[row].conc_ext =
            (wt[row - 1].conc_ext * wt[row - 1].vol_ext -
              (wt[row - 1].dialysis && wt[row].dialysis
                ? map_day_to_kml(
                    dialysis,
                    wt[row].day,
                    wt[row].time,
                    clearanceValue,
                    duration
                  )
                : endog_clear) *
                wt[row - 1].conc_ext *
                time_increment_minutes +
              kc *
                (wt[row - 1].conc_int - wt[row - 1].conc_ext) *
                time_increment_minutes +
              generation * time_increment_minutes) /
            wt[row - 1].vol_ext;
          wt[row].debug = 0.0;
        }
        // is vol_int less than zero?
        if (wt[row - 1].vol_int <= 0) {
          wt[row].conc_int = 0.0;
        } else {
          wt[row].conc_int =
            wt[row - 1].conc_int * wt[row - 1].vol_int -
            ((wt[row - 1].conc_int - wt[row - 1].conc_ext) *
              time_increment_minutes) /
              wt[row - 1].vol_int;
        }
      }
      wt[row].point = row;
      wt[row].ptime = calculate_ptime(
        wt[row].point,
        increment,
        time_increment_minutes
      );
      wt[row].cext = wt[row].conc_ext * 100.0;
    } // for loop ends here

    // calc the end - start difference, and add 1/2 to start at a mid point again
    // let extracell_mid_offset = (wt[sz[0] - 1].conc_ext - extracell_mid) / 2;
    let half_diff = (wt[last].conc_ext - wt[0].conc_ext) / 2;
    extracell = wt[0].conc_ext + half_diff;
    console.log(`LEFT:  wt[0].conc_ext: ${wt[0].conc_ext}`);
    console.log(`RIGHT: wt[sz[0]].conc_ext: ${wt[sz[0] - 1].conc_ext}`);
    console.log(`half_diff: ${half_diff}`);
    console.log(`updated extracell: ${extracell}`);
    console.log(
      `Math.abs(wt[0].conc_ext - wt[last].conc_ext): ${Math.abs(
        wt[0].conc_ext - wt[last].conc_ext
      )}`
    );
    console.log(`iteration: ${iteration}`);
  }

  return [varNames, wt];
}

function calculate_ptime(AX9, AG15, AB15) {
  if (!isNaN(AX9)) {
    if (Math.round(AX9 * AG15 * AB15) <= 10080) {
      return (Math.round(AX9 * AG15) * AB15) / 60;
    } else {
      return 168;
    }
  } else {
    return 168;
  }
}

function populateTable(varNames, vTable, tableElement) {
  if (tableElement) tableElement.innerHTML = "";
  else return;
  const headerRow = tableElement.insertRow();
  for (let i = 0; i < varNames.length; i++) {
    const th = document.createElement("th");
    th.textContent = varNames[i];
    headerRow.appendChild(th);
  }
  for (let i = 0; i < vTable.length; i++) {
    const row = tableElement.insertRow();

    for (let j = 0; j < varNames.length; j++) {
      const cell = row.insertCell();
      cell.textContent = vTable[i][varNames[j]];
    }
  }
}

/** https://www.samproell.io/posts/signal/peak-finding-python-js/
 * Get indices of all local maxima in a sequence.
 * @param {number[]} xs - sequence of numbers
 * @returns {number[]} values of local maxima
 */
function find_local_maxima(xs) {
  let maxima = [];
  // iterate through all points and compare direct neighbors
  for (let i = 1; i < xs.length - 1; ++i) {
    if (xs[i] > xs[i - 1] && xs[i] > xs[i + 1]) maxima.push(xs[i]);
  }
  return maxima;
}

//
/*
 * x and y chart config for single chart for the i-th element of the xydata array
 * @param {xydata[]} data of a single set
 * @returns {xyset[]} data for graphing
 */
function buildSingleXYSet(xydata, i) {
  let y_values = xydata.map((item) => item.y);
  let sum = y_values.reduce((previous, current) => (current += previous));
  let avg = sum / y_values.length;
  document.getElementById("timeavgconc").textContent = parseFloat(avg).toFixed(
    1
  );
  var maxs = find_local_maxima(y_values);
  // console.log(`maxs: ${maxs}`);
  var avg_max =
    maxs.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0) / maxs.length;
  // console.log(`avg_max: ${avg_max}`);
  document.getElementById("avgpeakconc").textContent = parseFloat(
    avg_max
  ).toFixed(1);
  // https://www.schemecolor.com/tools/color-scheme-generator/rose
  let color_wheel_conc = [
    "rgba(75, 192, 192, 1)",
    "#E0BBE4",
    "#E69816",
    "#86BD9E",
    "#7F826E",
    "#7C1F3A",
    "#C6466D",
    "#FD6165"
  ];
  let color_wheel_avg = [
    "rgba(255, 165, 0, 1)", // Light orange color
    "#957DAD",
    "#F7D527",
    "#D1B488",
    "#AC9484",
    "#FE7C6B",
    "#007498",
    "#FE96A0"
  ];
  var xyset = [
    {
      label: i === 0 ? "Concentration(mg/dL)vs.Time(hours)" : "Conc" + (i + 1),
      data: xydata,
      borderColor: color_wheel_conc[i],
      fill: false
    },
    {
      type: "line",
      label: i === 0 ? "Avg" : "Avg" + (i + 1),
      data: xydata.map((item) =>
        item.x % 3 === 0 ? { x: item.x, y: avg } : {}
      ),
      borderColor: color_wheel_avg[i],
      borderDash: [5, 5],
      borderWidth: 1,
      fill: false
    }
  ];
  return xyset;
}

//
/*
 * given an array of xy data sets, build an array of chart configs with embedded data
 * @param {datasets[]} data of multiple datasets
 * @returns {charConfig[]} data for graphing
 */
function buildChartConfig(datasets) {
  var xydata_array = [];
  for (let i = 0; i < datasets.length; i++) {
    xydata_array = xydata_array.concat(buildSingleXYSet(datasets[i], i));
  }
  // console.log(`xydata_array: ${xydata_array}`);
  var chartConfig = {
    type: "line",
    data: {
      datasets: xydata_array
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          mins: 0,
          max: 168,
          ticks: {
            stepSize: 24,
            maxTicksLimit: 10
          }
        },
        y: {
          min: 0
        }
      }
    }
  };
  return chartConfig;
}

let chart; // Global variable to hold the chart instance
// always start with a clean canvas
// build an array of chart dataset composed of two arrays
//  [ [ {x: 1, 2, 3}, {y: 81, 82, 83} ],     // dataset1
//    [ {x: 1, 2, 3}, {y: 181, 182, 183} ],  // dataset2
//    ..]
function createChart(data) {
  // console.log("createChart()");
  if (chart) {
    chart.destroy(); // Destroy the previous chart instance if it exists
  }

  const ctx = document.getElementById("chart").getContext("2d");
  var chartConfig = buildChartConfig(data);
  chart = new Chart(ctx, chartConfig);
  // console.log(`chart: ${chart}`);
}

let dynamic_calc_state = true;
// this global state is used to toggle back & forth from two modes:
// 1. default dynamic calculation state where each input change triggers Solve!
// 2. non-dynamic (or hold) state where input changes are ignored until Solve! button is pressed
function set_dynamic_calc_state() {
  let hold = document.getElementById("hold").checked;
  if (hold) {
    dynamic_calc_state = false;
    // this means we're entering hold state
    document.body.style.backgroundColor = "#D6EAF8";
  } else {
    // reset to factory settings
    dynamic_calc_state = true;
    chartDataStack = [];
    document.body.style.backgroundColor = "#FFFFFF";
  }
}

function is_in_dynamic_mode() {
  return dynamic_calc_state;
}

function findClearances() {
  let sz = [7, 7];
  let varNames = [
    "day_of_the_week",
    "dialysis",
    "day",
    "start",
    "end",
    "days_since",
    "dv",
    "eff_uf",
    "clear_uf",
    "clearance"
  ];
  let wt = new Array(sz[0]).fill(null).map(() =>
    Object.assign(
      {},
      Array.from(varNames, () => 0)
    )
  );

  return wt;
}

/*
  VBA SolveDialSim() 
  1. Calculate clearance value via goalSeek
  2. pass that clearance value to weeklyTableCalculator (which then iterates)
  3. draw chart
*/
var chartDataStack = [];
window.calculateAndDraw = function calculateAndDraw() {
  var varNames;
  var vTable;
  var clearance;

  function fn(x) {
    console.log(`goalseek fn(x) - try: x : ${x}`);
    [varNames, vTable, clearance] = calcClearanceTable(x);
    console.log(`goalseek: lvTable[1000].Cd: ${vTable[1000].Cd}`);
    return vTable[1000].Cd;
  }
  //console.log(cal)
  var fnParams = [30]; // first guess

  // goal is to get Cd (result) to 0.001
  try {
    var result = goalSeek.default({
      fn,
      fnParams,
      percentTolerance: 10,
      maxIterations: 100,
      maxStep: 5,
      goal: 0.001,
      independentVariableIdx: 0
    });

    console.log(`final vTable[1000].Cd: ${vTable[1000].Cd}`);
    console.log(`final clearance: ${clearance}`);
    document.getElementById("avgclearance").textContent = parseFloat(
      clearance
    ).toFixed(1);
    let [weeklyVarNames, weeklyTable] = calcWeeklyTable(clearance); // (clearanceValue) pass in co

    // Create and update the line chart when "Solve" button is clicked
    const chartData = weeklyTable.map((item) => ({
      x: item.ptime,
      y: item.cext
    }));
    // chartData is an array of xs and ys:
    // [{x: 0, y: 123}, {x: 1, y: 134}..]
    // pass on charting data under two conditions:
    //  1. when the stack is empty (which means web page is in "factory state")
    //  2. when hold is turned on
    if (chartDataStack.length === 0 || !is_in_dynamic_mode()) {
      chartDataStack.push(chartData);
    }
    // createChart(chartData);
    console.log(`chartDataStack.length: ${chartDataStack.length}`);
    createChart(chartDataStack);

    const wtable = document.getElementById("weeklyTable");
    populateTable(weeklyVarNames, weeklyTable, wtable);

    const table = document.getElementById("resultTable");
    populateTable(varNames, vTable, table);
  } catch (e) {
    console.error("error", e);
  }
};

// AA This function gets invoked when a gui element changes
window.ready = function ready() {
  set_dynamic_calc_state();
  console.log(`ready(): dynamic_calc_state : ${dynamic_calc_state}`);
  if (!is_in_dynamic_mode()) {
    // hold is enabled.  ignore input
    return;
  } else {
    // hold is disabled.  process input and solve!
    calculateAndDraw();
  }
};
