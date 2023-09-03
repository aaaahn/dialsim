// This work © 2023 by Timothy W Meyer, Andrew Ahn is licensed under CC BY 4.0
import "./styles.css";
import * as goalSeek from "goal-seek";

let debug_mode = false;
window.toggle_debug_mode = function toggle_debug_mode() {
  debug_mode = !debug_mode;
  if (debug_mode) {
    // we're in debug more, enable the table visibility
    document.getElementById("tt").style.display = "block";
    document.getElementById("ct").style.display = "block";
    document.getElementById("wt").style.display = "block";
    // and don't clear the
  } else {
    const treatmentTableElement = document.getElementById("treatmentTable");
    treatmentTableElement.innerHTML = "";
    const weeklyTableElement = document.getElementById("weeklyTable");
    weeklyTableElement.innerHTML = "";
    const clearanceTableElement = document.getElementById("clearanceTable");
    clearanceTableElement.innerHTML = "";
    document.getElementById("tt").style.display = "none";
    document.getElementById("ct").style.display = "none";
    document.getElementById("wt").style.display = "none";
  }
  console.log(`debug_mode: ${debug_mode}`);
};

// make this also a global function by attaching to the window object
// this function performs the following duties:
// when the user enters a value into web page element "Additional UF (L/t)"
// and that value is zero
// the two html elements are greyed out to signal the user that it's been disabled as input
// otherwise, when the value is non-zero
// the use entered value is copied into HTML element dilution.
window.render_disabled = function render_disabled() {
  console.log(
    `called - render_disabled: ${document.getElementById("replace").disabled}`
  );

  var additionalufValue = parseFloat(
    document.getElementById("additionaluf").value
  );
  // should we disable the GUI elements?
  var isDisabled = additionalufValue === 0;

  document.getElementById("replace").disabled = isDisabled;
  document.getElementById("dilution").disabled = isDisabled;
  console.log(`isDisabled: ${isDisabled}`);

  // Applying a class to make the difference obviously visible
  if (isDisabled) {
    document.getElementById("dilution").value = 0;
    document.getElementById("replace").classList.add("disabled");
    document.getElementById("dilution").classList.add("disabled");
  } else {
    document.getElementById("dilution").value = additionalufValue;
    document.getElementById("replace").classList.remove("disabled");
    document.getElementById("dilution").classList.remove("disabled");
  }
};

// make this also a global function by attaching to the window object
// when a non-zero value is entered into fluidgain, enable uf and copy a value, then trigger recalc().
// unlike the above function render_disabled_uf, it enables/disables not itself but
// html element id "uf".
window.render_disabled_uf = function render_disabled_uf() {
  const inputData = fetchInputValues();

  console.log(
    `called - render_disabled_uf: ${document.getElementById("uf").disabled}`
  );
  var fluidgainValue = fluidgain();
  console.log(`fluidgainValue: ${fluidgainValue}`);
  var isDisabled = fluidgainValue === 0;

  document.getElementById("uf").disabled = isDisabled;
  console.log(`uf isDisabled: ${isDisabled}`);
  var number_of_treatments =
    inputData["monday"] +
    inputData["tuesday"] +
    inputData["wednesday"] +
    inputData["thursday"] +
    inputData["friday"] +
    inputData["saturday"] +
    inputData["sunday"];
  console.log(`number_of_treatments: ${number_of_treatments}`);

  // Applying a class to make the difference obviously visible
  if (isDisabled) {
    document.getElementById("uf").value = 0; // this does NOT trigger ready() by "uf"'s oninput
    document.getElementById("uf").classList.add("disabled");
    document.getElementById("uflabel").classList.add("disabled");
  } else {
    // this does NOT trigger ready() by "uf"'s oninput
    document.getElementById("uf").value = parseFloat(
      (fluidgainValue * 7) / number_of_treatments
    ).toFixed(1);
    document.getElementById("uf").classList.remove("disabled");
    document.getElementById("uflabel").classList.remove("disabled");
  }
};

// This line ensures that the render_disabled function is called once the document's content has been fully loaded.
document.addEventListener("DOMContentLoaded", render_disabled);
document.addEventListener("DOMContentLoaded", render_disabled_uf);

function calculatePrePostDilution(inputData) {
  let Qf = inputData["additionaluf"];
  if (Qf === 0) {
    return 0;
  }

  var selectedText = inputData["replace"];
  if (selectedText === "Predilution") {
    // AB17 is dialysis duration in mins
    let duration_in_mins = hours_to_mins(inputData["duration"]); // let duration = 3.33;
    let dilution = inputData["dilution"]; // parseFloat(document.getElementById("dilution").value);
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

function calcClearanceTable(newCd, eff_uf, inputData) {
  let Qb = inputData["bloodflow"]; // let Qb = 360;
  let Qd = inputData["dialysateflow"]; // 500;
  let KoA = inputData["koa"]; //  let KoA = 500;
  let sigma = inputData["sigma"]; // 0;
  let Qf = 0; // = inputData["fluidgain"]; // 0;                    // clear_uf gets passed in and gets assigned to Qf
  // let additionaluf = inputData["additionaluf"]; // 0;
  let Qr = calculatePrePostDilution(inputData); // 0;

  if (!inputData["dilution"]) {
    // When dilution is disabled, Qf is zero "default"
    Qf = 0;
  } else {
    // When additionaluf (dilution) is enabled, Qr is copied to Qf
    Qf = Qr;
  }
  // when both dilution and fluidgain have non-zero values
  if (inputData["fluidgain"]) {
    Qf = eff_uf;
  }

  let Hct = inputData["hematocrit"] / 100; // 0;
  // let f = 0.3378;
  let f = 1.0;
  let Calb = 500;
  let Cp = 100;
  let DP0 = 40;
  let DP1 = 40;
  let PureUF = Qd <= 0 ? true : false; // false;
  let PureDialysis = Qf <= 0 ? true : false; //  = true;
  let Qpmin = 200;
  let Qdmin = 1000;
  let QpQdisneg = false;

  let increment = 0.001;
  let Ka = (Cp - Cp * f) / Cp / f / (Calb - Cp + Cp * f);
  let Pa = (DP1 - DP0) / (DP1 + DP0);
  let Pb = (2 * DP0) / (DP1 + DP0);
  let Qp = Qb * (1 - Hct);
  let Qprbc = 0.86 * Qb * Hct;

  if (inputData["solutetype"] === "Urea") {
    Qprbc = 0.86 * Qb * Hct;
  } else {
    Qprbc = 0;
  }

  let Qpoatinlet = Qp + Qr; // =L4+$F$7
  let theta_inblood = 0.07;
  let Calb0 = (Calb * Qp) / Qpoatinlet;
  let theta_atinlet = (theta_inblood * Calb0) / Calb;
  let Cp0 =
    (Cp * Qp + (Cp / (1 - theta_inblood)) * Qprbc) /
    (Qpoatinlet + Qprbc / (1 - theta_atinlet));

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
  let vTable = new Array(sz[0]).fill(null).map(function () {
    const obj = {};
    for (let i = 0; i < varNames.length; i++) {
      obj[varNames[i]] = 0;
    }
    return obj;
  });

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

  /*
  console.log(`----------------------`);
  console.log(`Qf: ${Qf}`);
  console.log(`Qr: ${Qr}`);
  console.log(`----------------------`);
  */
  let clearanceValue =
    ((Qp + Qprbc / (1 - theta_inblood)) * Cp -
      (vTable[1000].Qp + Qprbc / (1 - vTable[1000].theta)) * vTable[1000].Cp) /
    Cp;
  return [vTable, clearanceValue];
}

function hours_to_mins(duration) {
  return (Math.round(duration * 10) / 10) * 60;
}

function frac_uf_to_intracellular(modeltype_val) {
  let fluidgaincompartment1 = parseFloat(
    document.getElementById("fluidgaincompartment1").value
  );
  let interfaceE25 = 0;
  if (modeltype_val === "1Comp") {
    return fluidgaincompartment1 / 100;
  } else if (modeltype_val === "2CompUrea") {
    return 1; // 100 / 100 is simply 1
  } else {
    return interfaceE25 / 100;
  }
}

function frac_uf_to_extracellular(modeltype_val) {
  // console.log(`modeltype_val: ${modeltype_val}`);
  var interfaceE26 = 0;
  if (modeltype_val === "1Comp" || modeltype_val === "2CompUrea") {
    return 0;
  } else {
    return interfaceE26 / 100;
  }
}

function fluidgain() {
  var fluidgain_val = parseFloat(document.getElementById("fluidgain").value);
  console.log(`fluidgain: ${fluidgain_val}`);
  console.log(`uf: ${document.getElementById("uf").value}`);

  return fluidgain_val;
}

function extracellular_dv_per_min_ml(fluidgain_val, modeltype_val) {
  let extracellular_dv_per_min_ml_val =
    ((frac_uf_to_intracellular(modeltype_val) * fluidgain_val) / 24 / 60) *
    1000;
  return extracellular_dv_per_min_ml_val;
}

function calcDV(days_since, fluidgain_val, modeltype_val) {
  let intracellular_dv_ml =
    ((frac_uf_to_extracellular(modeltype_val) * fluidgain_val) / 24 / 60) *
    1000;
  // console.log(`intracellular_dv_ml: ${intracellular_dv_ml}`);

  if (days_since === 0) {
    return 0;
  }

  /*
  console.log(
    `extracellular_dv_per_min_ml(fluidgain_val, modeltype_val): ${extracellular_dv_per_min_ml(
      fluidgain_val,
      modeltype_val
    )}`
  ); */

  return (
    days_since *
    24 *
    60 *
    (extracellular_dv_per_min_ml(fluidgain_val, modeltype_val) +
      intracellular_dv_ml)
  );
}

function map_day_to_kml(dialysis, day_num, time, clearanceValue, duration) {
  if ((time - 720) % 1440 <= hours_to_mins(duration)) {
    return dialysis * clearanceValue;
  } else {
    return 0.0;
  }
}

function extracellular_volume(volumeofdist, modeltype_text) {
  let multiplier =
    modeltype_text === "2CompUrea" || modeltype_text === "2CompAdLib"
      ? 1 / 3
      : 1;
  return volumeofdist * multiplier;
}

function sum_of_fractions(modeltype_val) {
  let sum =
    frac_uf_to_intracellular() + frac_uf_to_extracellular(modeltype_val);
  return sum === 0 ? 1 : sum;
}

function constant_dial(duration, number_of_treatments) {
  let total_treament_time_mins = number_of_treatments * duration * 60;
  return total_treament_time_mins >= 10080;
}

function start_time(dialysis, day, time_before_dialysis_in_mins) {
  if (dialysis) {
    return (day - 1) * 24 * 60 + time_before_dialysis_in_mins;
  } else {
    return -1;
  }
}

function end_time(dialysis, start_time, dialysis_duration_in_mins) {
  if (dialysis) {
    return (start_time + dialysis_duration_in_mins) % 10080;
  } else {
    return -1;
  }
}

function calc_vol_ext0(
  constant_dial_val,
  prev_day_dialysis,
  current_day_dialysis,
  next_day_dialysis,
  prev_day_vol_ext,
  eff_uf,
  time_increment_mins,
  extracellular_volume_val,
  frac_uf_to_intracellular_val,
  extracellular_dv_per_min_ml_val,
  sum_of_fractions_val
) {
  /*
  console.log(`calc_vol_ext0:constant_dial_val: ${constant_dial_val}`);
  console.log(`calc_vol_ext0:prev_day_dialysis: ${prev_day_dialysis}`);
  console.log(`calc_vol_ext0:current_day_dialysis: ${current_day_dialysis}`);
  console.log(`calc_vol_ext0:next_day_dialysis: ${next_day_dialysis}`);
  console.log(`calc_vol_ext0:prev_day_vol_ext: ${prev_day_vol_ext}`);
  console.log(`calc_vol_ext0:eff_uf: ${eff_uf}`);
  console.log(`calc_vol_ext0:time_increment_mins: ${time_increment_mins}`);
  console.log(`calc_vol_ext0:extracellular_volume_val: ${extracellular_volume_val}`);
  console.log(
    `calc_vol_ext0:frac_uf_to_intracellular: ${frac_uf_to_intracellular}`
  );
  console.log(
    `calc_vol_ext0:extracellular_dv_per_min_ml_val: ${extracellular_dv_per_min_ml_val}`
  );
  console.log(`calc_vol_ext0:sum_of_fractions: ${sum_of_fractions}`);
*/
  if (constant_dial_val) {
    return extracellular_volume_val * 1000;
  } else if (current_day_dialysis && !next_day_dialysis) {
    return extracellular_volume_val * 1000;
  } else {
    let chooseValue = eff_uf || 0;

    let innerValue =
      prev_day_dialysis && current_day_dialysis
        ? (chooseValue * frac_uf_to_intracellular_val) / sum_of_fractions_val
        : 0;
    /* console.log(`calc_vol_ext0:innerValue: ${innerValue}`);
    console.log(
      `calc_vol_ext0:(extracellular_dv_per_min_ml_val - innerValue) * time_increment_mins: ${
        (extracellular_dv_per_min_ml_val - innerValue) * time_increment_mins
      }`
    );
      */

    return (
      prev_day_vol_ext +
      (extracellular_dv_per_min_ml_val - innerValue) * time_increment_mins
    );
  }
}

function calc_vol_ext(
  time,
  prev_day_dialysis,
  current_day_dialysis,
  next_day_dialysis,
  prev_day_vol_ext,
  eff_uf,
  time_increment_mins,
  extracellular_volume_val,
  frac_uf_to_intracellular_val,
  extracellular_dv_per_min_ml_val,
  sum_of_fractions
) {
  /*
  if (time === 6678) {
    console.log(`calc_vol_ext:time: ${time}`);
    console.log(`calc_vol_ext:prev_day_dialysis: ${prev_day_dialysis}`);
    console.log(`calc_vol_ext:current_day_dialysis: ${current_day_dialysis}`);
    console.log(`calc_vol_ext:next_day_dialysis: ${next_day_dialysis}`);
    console.log(`calc_vol_ext:prev_day_vol_ext: ${prev_day_vol_ext}`);
    console.log(`calc_vol_ext:eff_uf: ${eff_uf}`);
    console.log(`calc_vol_ext:time_increment_mins: ${time_increment_mins}`);
    console.log(`calc_vol_ext:extracellular_volume_val: ${extracellular_volume_val}`);
    console.log(
      `calc_vol_ext:frac_uf_to_intracellular: ${frac_uf_to_intracellular}`
    );
    console.log(
      `calc_vol_ext:extracellular_dv_per_min_ml_val: ${extracellular_dv_per_min_ml_val}`
    );
    console.log(`calc_vol_ext:sum_of_fractions: ${sum_of_fractions}`);
  }
  */
  // Check the first condition
  if (current_day_dialysis && !next_day_dialysis) {
    return extracellular_volume_val * 1000;
  } else {
    // Get the value from the eff_uf array based on the day
    let chooseValue = eff_uf || 0;

    let innerValue =
      prev_day_dialysis && current_day_dialysis
        ? (chooseValue * frac_uf_to_intracellular_val) / sum_of_fractions
        : 0;
    if (time === 6678) {
      /*
      console.log(`calc_vol_ext0:innerValue: ${innerValue}`);
      console.log(
        `calc_vol_ext0:(extracellular_dv_per_min_ml_val - innerValue) * time_increment_mins: ${
          (extracellular_dv_per_min_ml_val - innerValue) * time_increment_mins
        }`
      );
      */
    }
    return (
      prev_day_vol_ext +
      (extracellular_dv_per_min_ml_val - innerValue) * time_increment_mins
    );
  }
}

function calculateDay(time) {
  let value = time / 60 / 24 - 0.5;
  let modValue = value % 7;
  let result = 1 + Math.floor(modValue);
  return result === 0 ? 7 : result;
}

// pass in eff_ef and clearance inside treatmentTable
function calcWeeklyTable(treatmentTable, inputData) {
  let sz = [1681, 17];
  let varNames = [
    "day",
    "time",
    "dialysis",
    "vol_ext",
    "vol_int",
    "conc_ext",
    "conc_int",
    "point",
    "ptime",
    "cext"
  ];
  let wt = new Array(sz[0]).fill(null).map(function () {
    const obj = {};
    for (let i = 0; i < varNames.length; i++) {
      obj[varNames[i]] = 0;
    }
    return obj;
  });

  var time_increment_minutes = 6;
  var endog_clear = inputData["endogenousclearance"]; // parseFloat(document.getElementById("endogenousclearance").value); // 0; // hard-coded AA37
  var generation = inputData["generationrate"] / (24 * 60); // parseFloat(document.getElementById("generationrate").value) / (24 * 60);
  // console.log(`generation: ${generation}`);

  let kc = 0;
  let extracell = 0.834522427; // this should come from an prior vTable (as argument to this function)
  let intracell = 0.0;
  var duration = inputData["duration"]; // parseFloat(document.getElementById("duration").value); // let duration = 3.33;
  let increment = 1;
  let last = sz[0] - 1;
  // Filter out invalid clearance values and then calculate the average
  const validClearances = treatmentTable
    .map((entry) => entry.clearance)
    .filter((clearance) => clearance && clearance !== 0);
  let number_of_treatments = validClearances.length;
  let extracellular_volume_val = extracellular_volume(
    inputData["volumeofdist"],
    inputData["modeltype"]
  );
  let frac_uf_to_intracellular_val = frac_uf_to_intracellular(
    inputData["modeltype"]
  );
  let extracellular_dv_per_min_ml_val = extracellular_dv_per_min_ml(
    inputData["fluidgain"],
    inputData["modeltype"]
  );
  let sum_of_fractions_val = sum_of_fractions(inputData["modeltype"]);
  let constant_dial_val = constant_dial(duration, number_of_treatments);
  // do not perform any DOM operations inside the loop below.  Fetch the value one above and pass them down as
  // fixed values

  // iterate the calculation until start/end
  wt[0].conc_ext = extracell; // this value has not been assigned yet, so stamp a random value to get overriden with correct calculation in the loop below
  wt[last].conc_ext = extracell + 1; // this value has not been assigned yet, so stamp a random value to get overriden with correct calculation in the loop below
  // console.log(`extracell: ${extracell}`);
  console.log(`LEFT:  wt[0].conc_ext: ${wt[0].conc_ext}`);
  console.log(`RIGHT: wt[last].conc_ext: ${wt[last].conc_ext}`);
  let iteration_enabled = true;
  let start_end_gap = 0.01;
  for (
    let iteration = 0;
    Math.abs(wt[0].conc_ext - wt[last].conc_ext) > start_end_gap &&
    iteration_enabled;
    iteration++
  ) {
    for (let row = 0; row < sz[0]; row++) {
      wt[row].time = row === 0 ? 0 : wt[row - 1].time + time_increment_minutes;
      wt[row].day = calculateDay(wt[row].time);
      wt[row].dialysis =
        treatmentTable[wt[row].day - 1].dialysis &&
        treatmentTable[wt[row].day - 1].start <= wt[row].time &&
        wt[row].time <= treatmentTable[wt[row].day - 1].end;
      // vol_ext and vol_int are affected by UF
      let prev_row = row === 0 ? last - 1 : row - 1;
      let next_row = row === last ? 0 : row + 1;
      let eff_uf = treatmentTable[wt[row].day - 1].eff_uf; // eff_uf[wt[row].day],
      if (row === 0) {
        wt[row].vol_ext = calc_vol_ext0(
          constant_dial_val,
          wt[prev_row].dialysis,
          wt[row].dialysis,
          wt[next_row].dialysis,
          wt[prev_row].vol_ext,
          eff_uf,
          time_increment_minutes,
          extracellular_volume_val,
          frac_uf_to_intracellular_val,
          extracellular_dv_per_min_ml_val,
          sum_of_fractions_val
        );
      } else {
        wt[row].vol_ext = calc_vol_ext(
          wt[row].time,
          wt[prev_row].dialysis,
          wt[row].dialysis,
          wt[next_row].dialysis,
          wt[prev_row].vol_ext,
          eff_uf,
          time_increment_minutes,
          extracellular_volume_val,
          frac_uf_to_intracellular_val,
          extracellular_dv_per_min_ml_val,
          sum_of_fractions_val
        );
      }
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
                    wt[row].dialysis,
                    wt[row].day,
                    wt[row].time,
                    treatmentTable[wt[row].day - 1].clearance,
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
      wt[row].vext = wt[row].vol_ext / 1000.0;
    } // for loop ends here

    // calc the end - start difference, and add 1/2 to start at a mid point again
    // let extracell_mid_offset = (wt[sz[0] - 1].conc_ext - extracell_mid) / 2;
    let half_diff = (wt[last].conc_ext - wt[0].conc_ext) / 2;
    extracell = wt[0].conc_ext + half_diff;
    /*
    console.log(`LEFT:  wt[0].conc_ext: ${wt[0].conc_ext}`);
    console.log(`RIGHT: wt[sz[0]].conc_ext: ${wt[sz[0] - 1].conc_ext}`);
    console.log(`half_diff: ${half_diff}`);
    console.log(`updated extracell: ${extracell}`);
    console.log(
      `Math.abs(wt[0].conc_ext - wt[last].conc_ext): ${Math.abs(
        wt[0].conc_ext - wt[last].conc_ext
      )}`
    ); */
    console.log(`iteration: ${iteration}`);
    if (iteration > 10) {
      // prevent a run-away loop
      console.log(
        `maximum iteration reached wt[last].conc_ext: ${wt[last].conc_ext}`
      );
      break;
    }
  }

  return wt;
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

function populateTable(vTable, tableElement) {
  if (!debug_mode) return;
  if (!tableElement) return;

  tableElement.innerHTML = "";
  // Assuming all objects in vTable have the same keys
  const keys = Object.keys(vTable[0]);

  const headerRow = tableElement.insertRow();
  for (let key of keys) {
    const th = document.createElement("th");
    th.textContent = key;
    headerRow.appendChild(th);
  }

  for (let rowData of vTable) {
    const row = tableElement.insertRow();

    for (let key of keys) {
      const cell = row.insertCell();
      cell.textContent = rowData[key];
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

/*
 * x and y chart config for single chart for the i-th element of the xydata array
 * @param {xydata[]} data of a single set
 * @returns {xyset[]} data for graphing
 */
function buildSingleXYSet(xydata, i) {
  // publish two avgs out
  let y_values = xydata.map((item) => item.y);
  let sum = y_values.reduce((previous, current) => (current += previous));
  let avg = sum / y_values.length;
  document.getElementById("timeavgconc").textContent = parseFloat(avg).toFixed(
    2
  );
  var maxs = find_local_maxima(y_values);
  var avg_max =
    maxs.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0) / maxs.length;
  // console.log(`avg_max: ${avg_max}`);
  let avgpeakconc = parseFloat(avg_max).toFixed(2);
  document.getElementById("avgpeakconc").textContent = isNaN(avgpeakconc)
    ? parseFloat(avg).toFixed(2)
    : avgpeakconc;
  document.getElementById("timeavgconclabel").textContent =
    xydata.timeavgconclabel_text;
  document.getElementById("avgpeakconclabel").textContent =
    xydata.avgpeakconclabel_text;

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
      // label: i === 0 ? "Concentration(mg/dL)vs.Time(hours)" : "Conc" + (i + 1),
      label: i === 0 ? xydata.legend_text : xydata.legend_text_short + (i + 1),
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
  var chartConfig = {
    type: "line",
    data: {
      datasets: xydata_array
    },
    // https://www.chartjs.org/docs/latest/general/performance.html
    options: {
      animation: false,
      spanGaps: true, // enable for all datasets
      showLine: false, // disable for all datasets
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

function daysSinceTrue(weekData) {
  let lastTrueIndex = -1;
  let result = [];

  // First, find the last true index in the array for wrap-around logic
  for (let i = weekData.length - 1; i >= 0; i--) {
    if (weekData[i]) {
      lastTrueIndex = i;
      break;
    }
  }

  for (let i = 0; i < weekData.length; i++) {
    if (weekData[i]) {
      if (lastTrueIndex === -1) {
        result.push(0); // If there's no true value before, return 0
      } else if (i <= lastTrueIndex) {
        result.push(i + weekData.length - lastTrueIndex);
      } else {
        result.push(i - lastTrueIndex);
      }
      lastTrueIndex = i;
    } else {
      result.push(0);
    }
  }

  return result;
}

function calc_clear_uf(
  days_since,
  fluidgain,
  dialysis,
  additionaluf,
  dialysis_duration_in_mins
) {
  // console.log(`dialysis_duration_in_mins: ${dialysis_duration_in_mins}`);

  return (
    ((days_since * fluidgain + (dialysis ? additionaluf : 0)) * 1000) /
    dialysis_duration_in_mins
  );
}

// build out a convenience table.  this table is used to calcClearanceTable()
// n number of times using UF values
function findClearances(inputData) {
  let varNames = [
    "name",
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

  let days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ];

  let wt0 = days.map((day, index) => {
    let obj = {};
    varNames.forEach((key) => {
      if (key === "name") obj[key] = day;
      else if (key === "day") obj[key] = index + 1;
      else obj[key] = 0;
    });
    return obj;
  });

  wt0.forEach((row) => {
    row.dialysis = inputData[row.name];
  });

  let dialysisDays = wt0.map((row) => row.dialysis);
  let daysSinceResults = daysSinceTrue(dialysisDays);
  wt0.forEach((row, index) => {
    row.days_since = daysSinceResults[index];
  });

  wt0.forEach((row) => {
    row.dv = calcDV(
      row.days_since,
      inputData["fluidgain"],
      inputData["modeltype"]
    );
  });

  let duration_in_mins = hours_to_mins(inputData["duration"]);
  wt0.forEach((row) => {
    row.eff_uf = row.dv / duration_in_mins;
  });

  wt0.forEach((row) => {
    row.clear_uf = calc_clear_uf(
      row.days_since,
      inputData["fluidgain"],
      row.dialysis,
      inputData["additionaluf"],
      duration_in_mins
    );
  });

  let time_before_dialysis = 12 * 60;
  wt0.forEach((row) => {
    row.start = start_time(row.dialysis, row.day, time_before_dialysis);
  });
  wt0.forEach((row) => {
    row.end = end_time(row.dialysis, row.start, duration_in_mins);
  });

  return wt0;
}

// for each treachment apply clearanceTable(eff_uf, inputData)
function applyTreatment(eff_uf, inputData) {
  var clearanceTable;
  var clearance;

  function fn(x, y, z) {
    console.log(`goalseek fn(x) - try: x : ${x}`);
    [clearanceTable, clearance] = calcClearanceTable(x, y, z);
    // console.log(`goalseek: clearanceTable[1000].Cd: ${clearanceTable[1000].Cd}`);
    return clearanceTable[1000].Cd;
  }
  var fnParams = [45, eff_uf, inputData]; // first guess

  // goal is to get Cd (result) to 0.001
  try {
    var result = goalSeek.default({
      fn,
      fnParams,
      percentTolerance: 10,
      maxIterations: 100,
      maxStep: 5,
      goal: 0.001,
      independentVariableIdx: 0 // the index position of the independent variable x in the fnParams array.
    });

    console.log(`final clearanceTable[1000].Cd: ${clearanceTable[1000].Cd}`);
    console.log(`final clearance: ${clearance}`);
    console.log(`result: ${result}`);
  } catch (e) {
    console.error("error", e);
  }
  return [clearanceTable, clearance];
}

/*
  VBA SolveDialSim() 
  0. Pull input data from Web Page, build treatmentTable
  1. Calculate clearance value via goalSeek
  2. pass that clearance value to weeklyTableCalculator (which then iterates)
  3. draw chart, write out 3 values to web page
*/
var chartDataStack = [];
window.calculateAndDraw = function calculateAndDraw() {
  const inputData = fetchInputValues();
  console.log(inputData);

  // assemble a list of eff_uf so that clearance values for each treatment day can be collected
  const ttable = document.getElementById("treatmentTable");
  const treatmentTable = findClearances(inputData);

  // loop thru treatmentTable[0..6].eff_uf and build out treatmentTable[0..6].clearance
  // apply clearanceCalculation via goalSeek
  var vTable;
  for (let i = 0; i < treatmentTable.length; i++) {
    if (treatmentTable[i].dialysis) {
      // is there another treatment day with the same eff_uf? re-cycle the clearance
      for (let j = 0; j < treatmentTable.length; j++) {
        if (
          i !== j &&
          treatmentTable[i].eff_uf === treatmentTable[j].eff_uf &&
          treatmentTable[j].clearance
        ) {
          treatmentTable[i].clearance = treatmentTable[j].clearance;
          // console.log(`ttcd copy: i: ${i}, j: ${j}`);
          break;
        }
      } // end inner cache search loop

      // did the loop above manage to find a recylced clearance value?  if not, go calcualte one
      if (!treatmentTable[i].clearance) {
        [vTable, treatmentTable[i].clearance] = applyTreatment(
          // treatmentTable[i].eff_uf,
          treatmentTable[i].clear_uf,
          inputData
        );
        console.log(`ttcd apply i: ${i}`);
      }
    }
  }
  // Filter out invalid clearance values and then calculate the average
  const validClearances = treatmentTable
    .map((entry) => entry.clearance)
    .filter((clearance) => clearance && clearance !== 0);
  const avg_clearance =
    validClearances.length > 0
      ? validClearances.reduce((sum, clearance) => sum + clearance, 0) /
        validClearances.length
      : 0;
  document.getElementById("avgclearance").textContent = parseFloat(
    avg_clearance
  ).toFixed(1);
  const table = document.getElementById("clearanceTable");
  populateTable(vTable, table);

  try {
    populateTable(treatmentTable, ttable);
    let weeklyTable = calcWeeklyTable(treatmentTable, inputData); // (clearanceValue) pass in co

    // Create and update the line chart when "Solve" button is clicked
    const chartData = weeklyTable.map((item) => ({
      x: item.ptime,
      y: inputData["charttype"] === "ConcvsTime" ? item.cext : item.vext
    }));
    chartData.legend_text =
      inputData["charttype"] === "ConcvsTime"
        ? "Concentration(mg/dL) vs. Time(hours)"
        : "Volume (liters) vs. Time (hours)";
    chartData.legend_text_short =
      inputData["charttype"] === "ConcvsTime" ? "Conc" : "Vol";
    chartData.timeavgconclabel_text =
      inputData["charttype"] === "ConcvsTime"
        ? "Time-Averaged Conc. (mg/dL)"
        : "Time-Averaged Volume (liters)";
    chartData.avgpeakconclabel_text =
      inputData["charttype"] === "ConcvsTime"
        ? "Average Peak Conc. (mg/dL)"
        : "Average Peak Volume (liters)";

    // chartData is an array of xs and ys:
    // [{x: 0, y: 123}, {x: 1, y: 134}..]
    // pass on charting data under two conditions:
    //  1. when the stack is empty (which means web page is in "factory state")
    //  2. when hold is turned on
    if (chartDataStack.length === 0 || !is_in_dynamic_mode()) {
      chartDataStack.push(chartData);
    }
    // createChart(chartData);
    // console.log(`chartDataStack.length: ${chartDataStack.length}`);
    createChart(chartDataStack);

    const wtable = document.getElementById("weeklyTable");
    populateTable(weeklyTable, wtable);
  } catch (e) {
    console.error("error", e);
  }
};

function fetchInputValues() {
  // Select all input elements and convert NodeList to an array
  const inputs = Array.from(document.querySelectorAll("input, select"));

  // Create an object to store the input values
  const data = {};

  // Iterate over each input element and store its value in the data object
  inputs.forEach((input) => {
    // For checkboxes, store the checked state
    if (input.type === "checkbox") {
      data[input.id] = input.checked;
    }
    // For number input types, convert the value to a float
    else if (input.type === "number") {
      data[input.id] = parseFloat(input.value);
    }
    // For select elements, store the selected option's value
    else if (input.tagName === "SELECT") {
      data[input.id] = input.options[input.selectedIndex].value;
    }
    // For other input types, store the input value
    else {
      data[input.id] = input.value;
    }
  });

  return data;
}

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
