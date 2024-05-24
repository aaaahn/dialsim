/* 
Dialsim Copyright © 2023 Andrew Y Ahn, Timothy W Meyer, Tammy L Sirich
This file is part of Dialsim, released under the MIT License.
See LICENSE.md for details.
*/
import { brent } from './brent.ts';  
var _ = require('lodash');

let debug_mode = false;
window.toggle_debug_mode = function toggle_debug_mode() {
  debug_mode = !debug_mode;
  if (debug_mode) {
    // in debug mode, enable table visibility
    document.getElementById("tt").style.display = "block";
    document.getElementById("ct").style.display = "block";
    document.getElementById("wt").style.display = "block";
  } else {
    // not in debug mode, clear table data and disable visibility
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
  // console.log(`debug_mode: ${debug_mode}`);
};

// this function performs the following duties:
// when the user enters a value into web page element "Additional UF (L/t)"
// and that value is zero
// the two html elements are greyed out to signal the user that it's been disabled as input
// otherwise, when the value is non-zero
// the user entered value is copied into HTML element dilution.
window.render_disabled = function render_disabled() {
  // console.log(`called - render_disabled: ${document.getElementById("replace").disabled}`);

  var additionalufValue = parseFloat(
    document.getElementById("additionaluf").value
  );
  // should we disable the GUI elements?
  var isDisabled = additionalufValue === 0;

  document.getElementById("replace").disabled = isDisabled;
  document.getElementById("dilution").disabled = isDisabled;
  // console.log(`isDisabled: ${isDisabled}`);

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

// when a non-zero value is entered into fluidgain, enable uf and copy a value, then trigger recalc().
// unlike the above function render_disabled_uf, it enables/disables not itself but
// html element id "uf".
window.render_disabled_uf = function render_disabled_uf() {
  const inputData = fetchInputValues();

  // console.log(`called - render_disabled_uf: ${document.getElementById("uf").disabled}`);
  // var fluidgainValue = fluidgain();  // TODO: replace this with inputData["fluidgain"], retire function fluidgain()
  var fluidgainValue = inputData["fluidgain"];
  console.log(`fluidgainValue: ${fluidgainValue}`);
  var isDisabled = fluidgainValue === 0;

  document.getElementById("uf").disabled = isDisabled;
  // console.log(`uf isDisabled: ${isDisabled}`);
  var number_of_treatments =
    inputData["monday"] +
    inputData["tuesday"] +
    inputData["wednesday"] +
    inputData["thursday"] +
    inputData["friday"] +
    inputData["saturday"] +
    inputData["sunday"];
  // console.log(`number_of_treatments: ${number_of_treatments}`);

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

// when modeltype is changed, enable/disable the appropriate html elements
window.render_model_type = function render_model_type() {
  const inputData = fetchInputValues();
  let modeltype = inputData["modeltype"];

  // Applying a class to make the difference obviously visible
  if (modeltype === "1Comp") {
    document.getElementById("label-volumeofdist").textContent = "Volume of Distribution (L)";
    document.getElementById("volumeofdist").value = 36;
    document.getElementById("fluidgaincompartment1").value = 100;
    document.getElementById("label-volumeofdistcomp2l").style.display = "none";
    document.getElementById("volumeofdistcomp2l").style.display = "none";
    document.getElementById("label-intercompartmentalkc").style.display = "none";
    document.getElementById("intercompartmentalkc").style.display = "none";
    document.getElementById("label-fluidgaincompartment1").style.display = "block"; // show
    document.getElementById("fluidgaincompartment1").style.display = "block";
    document.getElementById("label-fluidgaincompartment2").style.display = "none"; // hide
    document.getElementById("fluidgaincompartment2").style.display = "none";
  } else if (modeltype === "2CompUrea") {
    document.getElementById("label-volumeofdist").textContent = "Volume of Distribution (L)";
    document.getElementById("volumeofdist").value = 42;
    document.getElementById("label-intercompartmentalkc").style.display = "none";
    document.getElementById("intercompartmentalkc").style.display = "none";
    document.getElementById("label-fluidgaincompartment1").style.display = "none";
    document.getElementById("fluidgaincompartment1").style.display = "none";
    document.getElementById("label-fluidgaincompartment2").style.display = "none";
    document.getElementById("fluidgaincompartment2").style.display = "none";
    document.getElementById("label-volumeofdistcomp2l").style.display = "none";
    document.getElementById("volumeofdistcomp2l").style.display = "none";
  } else { // 2CompAdLib
    document.getElementById("label-volumeofdist").textContent = "Volume of Distribution: Comp 1 (L)";
    document.getElementById("volumeofdist").value = 14;
    document.getElementById("volumeofdistcomp2l").value = 28;
    document.getElementById("intercompartmentalkc").value = 800;
    document.getElementById("fluidgaincompartment1").value = 100;
    document.getElementById("fluidgaincompartment2").value = 0;
    document.getElementById("label-volumeofdistcomp2l").style.display = "block";
    document.getElementById("volumeofdistcomp2l").style.display = "block";
    document.getElementById("label-intercompartmentalkc").style.display = "block";
    document.getElementById("intercompartmentalkc").style.display = "block";
    document.getElementById("label-fluidgaincompartment1").style.display = "block";
    document.getElementById("fluidgaincompartment1").style.display = "block";
    document.getElementById("label-fluidgaincompartment2").style.display = "block";
    document.getElementById("fluidgaincompartment2").style.display = "block";
  }
};

// when solute type is changed, enable/disable the appropriate html elements
window.render_solute_type = function render_solute_type() {
  const inputData = fetchInputValues();
  let modeltype = inputData["solutetype"];

  // Applying a class to make the difference obviously visible
  if (modeltype === "Urea") {
    document.getElementById("sigmalabel").classList.add("disabled");
    document.getElementById("sigma").classList.add("disabled");
    document.getElementById("label-proteinbinding").classList.add("disabled");
    document.getElementById("proteinbinding").classList.add("disabled");
  } else { // Plasma
    document.getElementById("sigmalabel").classList.remove("disabled");
    document.getElementById("sigma").classList.remove("disabled");
    document.getElementById("label-proteinbinding").classList.remove("disabled");
    document.getElementById("proteinbinding").classList.remove("disabled");
  }
};

// This line ensures that the render_disabled function is called once the document's content has been fully loaded.
document.addEventListener("DOMContentLoaded", render_disabled);
document.addEventListener("DOMContentLoaded", render_disabled_uf);
document.addEventListener("DOMContentLoaded", render_model_type);
document.addEventListener("DOMContentLoaded", render_solute_type);

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
    // console.log(`predilution: ${predilution}`);
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

// =IF(C10=1,1,1-Interface!E19/100)
function calcf(solutetype_val, proteinbinding_val) {
  if (solutetype_val === "Urea") {
    return 1;
  } else {
    return 1 - (proteinbinding_val / 100);
  }
}

function calcClearanceTable(newCd, eff_uf, inputData) {
  let Qb = inputData["bloodflow"]; // let Qb = 360;
  let Qd = inputData["dialysateflow"]; // 500;
  let KoA = inputData["koa"]; //  let KoA = 500;
  let sigma = inputData["sigma"]; // 0;
  let Qf = 0; // = inputData["fluidgain"]; // 0;                    // clear_uf gets passed in and gets assigned to Qf
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

  // console.log(`Qf: ${Qf}`);
  let Hct = inputData["hematocrit"] / 100; // 0;
  let f = calcf(inputData["solutetype"], inputData["proteinbinding"]); // 1.0;
  // console.log(`f: ${f}`);
  let Calb = 500;
  let Cp = 100;
  let DP0 = 40;
  let DP1 = 40;
  let PureUF = Qd <= 0 ? true : false; // false;
  let PureDialysis = Qf <= 0 ? true : false; //  = true;
  
  let increment = 0.001;
  let Ka = (Cp - Cp * f) / Cp / f / (Calb - Cp + Cp * f);
  let Pa = (DP1 - DP0) / (DP1 + DP0);
  // console.log(`Pa: ${Pa}`);
  let Pb = (2 * DP0) / (DP1 + DP0);
  // console.log(`Pb: ${Pb}`);
  let Qp = Qb * (1 - Hct);
  let Qprbc = 0.86 * Qb * Hct;

  if (inputData["solutetype"] === "Urea") {
    Qprbc = 0.86 * Qb * Hct;
  } else {
    Qprbc = 0;
  }

  // console.log(`Qp: ${Qp}`);
  // console.log(`Qr: ${Qr}`);
  let Qpoatinlet = Qp + Qr; // =L4+$F$7
  let theta_inblood = 0.07;
  let Calb0 = (Calb * Qp) / Qpoatinlet;
  let theta_atinlet = (theta_inblood * Calb0) / Calb;
  let Cp0 =
    (Cp * Qp + (Cp / (1 - theta_inblood)) * Qprbc) /
    (Qpoatinlet + Qprbc / (1 - theta_atinlet));

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
    "Massd",
  ];
  let sz = [1001, varNames.length];
  let vTable = new Array(sz[0]).fill(null).map(function () {
    const obj = {};
    for (let i = 0; i < varNames.length; i++) {
      obj[varNames[i]] = 0;
    }
    return obj;
  });

  // console.log(`Qpoatinlet: ${Qpoatinlet}`)
  for (let row = 0; row < sz[0]; row++) {
    vTable[row].x = row === 0 ? 0.0 : vTable[row - 1].x + 0.001;
    vTable[row].x = parseFloat(vTable[row].x.toFixed(3));
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

  let clearanceValue =
    ((Qp + Qprbc / (1 - theta_inblood)) * Cp -
      (vTable[1000].Qp + Qprbc / (1 - vTable[1000].theta)) * vTable[1000].Cp) /
    Cp;
  return [vTable, clearanceValue];
}

function hours_to_mins(duration) {
  return (Math.round(duration * 10) / 10) * 60;
}

// =IF( C15=1,  Interface!E23,  IF(C15=2,100,Interface!$E$25)) / 100
// E23 AND E25 fluidgain comp 1 moves around 
function frac_uf_to_intracellular(modeltype_val, fluidgaincompartment1) {
  if (modeltype_val === "1Comp") {  // when Model Type is 1Comp, E23 is "Fluid Gain to Compartment 1(%)"
    return fluidgaincompartment1 / 100;
  } else if (modeltype_val === "2CompUrea") { // when Model Type is 2 Comp Urea, just return 1 
    return 1; // 100 / 100 is simply 1
  } else {
    // when Model Type is 3 Comp Ad Lib, E25 is "Fluid Gain to Compartment 1 (%)"
    return fluidgaincompartment1 / 100;
  }
}

function frac_uf_to_extracellular(modeltype_val, fluid_gain_to_compartment2) {
  // console.log(`modeltype_val: ${modeltype_val}`);
//  var interfaceE26 = 0;
  if (modeltype_val === "1Comp" || modeltype_val === "2CompUrea") {
    return 0;
  } else {
    return fluid_gain_to_compartment2 / 100;
  }
}

// =IF(C15=1,0,IF(C15=2,Interface!E22*(1-AA31),Interface!E23))
function intracellular_volume(modeltype_val, vol_of_dist_comp1_l, vol_of_dist_comp2_l) {
  let vext_vtotal_for_urea = 1/3;
  // 1 Comp
  if (modeltype_val === "1Comp") {
    return 0;
    // 2 Comp Urea
  } else if (modeltype_val === "2CompUrea") {
      return vol_of_dist_comp1_l * (1 - vext_vtotal_for_urea);
  } else {
      // 2 Comp Ad Lib
      return vol_of_dist_comp2_l;
  }
}

// also intraceullar_dv_per_min_ml
function extracellular_dv_per_min_ml(fluidgain_val, modeltype_val, fluidgaincompartment1_val) {
  let extracellular_dv_per_min_ml_val =
    ((frac_uf_to_intracellular(modeltype_val, fluidgaincompartment1_val) * fluidgain_val) / 24 / 60) *
    1000;
  return extracellular_dv_per_min_ml_val;
}

function intracellular_dv_ml(fluidgain_val, modeltype_val, fluidgaincompartment2_val) {
  return ((frac_uf_to_extracellular(modeltype_val, fluidgaincompartment2_val) * fluidgain_val) / 24 / 60) * 1000;
}

function calcDV(days_since, fluidgain_val, modeltype_val, fluidgaincompartment2_val, fluidgaincompartment1_val) {
  let intracellular_dv_ml_val = intracellular_dv_ml(fluidgain_val, modeltype_val, fluidgaincompartment2_val);
  // console.log(`intracellular_dv_ml: ${intracellular_dv_ml}`);

  if (days_since === 0) {
    return 0;
  }

  return (
    days_since *
    24 *
    60 *
    (extracellular_dv_per_min_ml(fluidgain_val, modeltype_val, fluidgaincompartment1_val) +
      intracellular_dv_ml_val)
  );
}

function map_day_to_kml(dialysis, time, clearanceValue, duration) {
  if ((time - 720) % 1440 <= hours_to_mins(duration)) {
    return dialysis * clearanceValue;
  } else {
    return 0.0;
  }
}

// =Interface!E22 * IF( C15=2, 1/3 , 1)
function extracellular_volume(volumeofdist, modeltype_text) {
  let multiplier = modeltype_text === "2CompUrea" ? 1 / 3 : 1;
  /*
  console.log(`extracellular_volume:volumeofdist ${volumeofdist}`);
  console.log(`extracellular_volume:modeltype_text ${modeltype_text}`);
  console.log(`extracellular_volume:volumeofdist * multiplier ${volumeofdist * multiplier}`); */
  return volumeofdist * multiplier;
}

function sum_of_fractions(modeltype_val, fluidgaincompartment1_val, fluidgaincompartment2_val) {
  let sum =
    frac_uf_to_intracellular(modeltype_val, fluidgaincompartment1_val) + frac_uf_to_extracellular(modeltype_val, fluidgaincompartment2_val);
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

function calc_vol_ext_combined(
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
  if (constant_dial_val || (current_day_dialysis && !next_day_dialysis)) {
    return extracellular_volume_val * 1000;
  } else {
    let chooseValue = eff_uf || 0;
    let innerValue = prev_day_dialysis && current_day_dialysis ? (chooseValue * frac_uf_to_intracellular_val) / sum_of_fractions_val : 0;
    return (prev_day_vol_ext + (extracellular_dv_per_min_ml_val - innerValue) * time_increment_mins);
  }
}

// 0 =IF($AG$21,$AB$27,IF(AND(AM9, NOT(AM10)),$AB$27,AO1688+($AB$29-IF(AND(AM1688,AM9), CHOOSE(AK9, $AG$5,$AG$6,$AG$7,$AG$8,$AG$9,$AG$10,$AG$11)*$AA$23/$AA$24,0))*$AB$15))
// 1 =                 IF(AND(AM10,NOT(AM11)),$AB$27,AO9.  +($AB$29-IF(AND(AM9,   AM10),CHOOSE(AK10,$AG$5,$AG$6,$AG$7,$AG$8,$AG$9,$AG$10,$AG$11)*$AA$23/$AA$24,0))*$AB$15)
// 2 =                 IF(AND(AM11,NOT(AM12)),$AB$27,AO10  +($AB$29-IF(AND(AM10,  AM11),CHOOSE(AK11,$AG$5,$AG$6,$AG$7,$AG$8,$AG$9,$AG$10,$AG$11)*$AA$23/$AA$24,0))*$AB$15)
function calc_vol_int(time, prev_day_dialysis, current_day_dialysis, next_day_dialysis, day, intracellular_volume_ml_val, intracellular_dv_ml_val, prev_day_vol_int, eff_uf_m, eff_uf_t, eff_uf_w, eff_uf_th, eff_uf_f, eff_uf_s, eff_uf_su, frac_uf_to_extracelluar, sum_of_fractions, time_increment_mins) {
/*
  if (time === 810 || time === 10080) {
    console.log(`===================================================================`);
    console.log(`calc_vol_int:time: ${time}`);
    console.log(`calc_vol_int:day: ${day}`);
    console.log(`calc_vol_int:current_day_dialysis: ${current_day_dialysis}`);
    console.log(`calc_vol_int:next_day_dialysis: ${next_day_dialysis}`);
  }
  */
if (current_day_dialysis && !next_day_dialysis) { // flips from true -> false
      return intracellular_volume_ml_val;           // 28 * 1000
  } else {
      let eff_uf_val = [eff_uf_m, eff_uf_t, eff_uf_w, eff_uf_th, eff_uf_f, eff_uf_s, eff_uf_su][day];
/*      if (time === 810 || time === 10080) {
      console.log(`calc_vol_int:prev_day_vol_int: ${prev_day_vol_int}`);
      console.log(`calc_vol_int:intracellular_dv_ml_val: ${intracellular_dv_ml_val}`);
      console.log(`calc_vol_int:prev_day_dialysis: ${prev_day_dialysis}`);
      console.log(`calc_vol_int:current_day_dialysis: ${current_day_dialysis}`);
      console.log(`calc_vol_int:eff_uf_val: ${eff_uf_val}`);
      console.log(`calc_vol_int:frac_uf_to_extracelluar: ${frac_uf_to_extracelluar}`);
      console.log(`calc_vol_int:sum_of_fractions: ${sum_of_fractions}`);
      console.log(`calc_vol_int:time_increment_mins: ${time_increment_mins}`);

    } */
      return prev_day_vol_int + (intracellular_dv_ml_val - (prev_day_dialysis && current_day_dialysis ? (eff_uf_val * frac_uf_to_extracelluar / sum_of_fractions) : 0)) * time_increment_mins;
  }
}



function calculateDay(time) {
  let value = time / 60 / 24 - 0.5;
  let modValue = value % 7;
  let result = 1 + Math.floor(modValue);
  return result === 0 ? 7 : result;
}

// =IF(C15=1,0,IF(C15=2,AA32*(Interface!E22/42)^(2/3),Interface!E24))
function calc_kc_ml_min(model_type_val, kc_for_urea, volumeofdist, intercompartmentalkc) {
    if (model_type_val === "1Comp") {
        return 0;
    } else if (model_type_val === "2CompUrea") {
        return kc_for_urea * Math.pow(volumeofdist / 42, 2/3);
    } else {
        return intercompartmentalkc;
    }
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
    "cext",
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

  let kc_ml_min = calc_kc_ml_min(inputData["modeltype"], 800, inputData["volumeofdist"], inputData["intercompartmentalkc"]);
  // console.log(`kc_ml_min: ${kc_ml_min}`);
  let extracell = 0.834522427; // this should come from an prior vTable (as argument to this function)
  let intracell = 0.817858394;
  var duration = inputData["duration"]; // parseFloat(document.getElementById("duration").value); // let duration = 3.33;
  let increment = 1;
  let last = sz[0] - 1;
  // Filter out invalid clearance values and then calculate the average
  const validClearances = treatmentTable
    .map((entry) => entry.clearance)
    .filter((clearance) => clearance && clearance !== 0);
  let number_of_treatments = validClearances.length;
  let extracellular_volume_val = extracellular_volume(inputData["volumeofdist"], inputData["modeltype"]);
  // console.log(`extracellular_volume_val: ${extracellular_volume_val}`);
  let modeltype_val = inputData["modeltype"];
  let vol_of_dist_comp2_l = inputData["volumeofdistcomp2l"];
  let frac_uf_to_intracellular_val = frac_uf_to_intracellular(inputData["modeltype"], inputData["fluidgaincompartment1"]);
  let fluidgain_val = inputData["fluidgain"];
  // console.log(`fluidgain_val: ${fluidgain_val}`)
  let extracellular_dv_per_min_ml_val = extracellular_dv_per_min_ml(
    fluidgain_val,
    inputData["modeltype"],
    inputData["fluidgaincompartment1"]
  );
  // console.log(`extracellular_dv_per_min_ml_val: ${extracellular_dv_per_min_ml_val}`)
  let fluidgaincompartment2_val = inputData["fluidgaincompartment2"]
  let sum_of_fractions_val = sum_of_fractions(inputData["modeltype"], inputData['fluidgaincompartment1'], inputData['fluidgaincompartment2']);
  let constant_dial_val = constant_dial(duration, number_of_treatments);
  // console.log(`constant_dial_val: ${constant_dial_val}`);
  let intracellular_volume_val = intracellular_volume( modeltype_val, inputData['volumeofdist'], vol_of_dist_comp2_l);
  // console.log(`intracellular_volume_val: ${intracellular_volume_val}`);
  let frac_uf_to_extracellular_val = frac_uf_to_extracellular(modeltype_val, fluidgaincompartment2_val);
  /* console.log(`frac_uf_to_extracellular_val: ${frac_uf_to_extracellular_val}`);
  console.log(`intracellular_volume_val: ${intracellular_volume_val}`);
  console.log(`sum_of_fractions_val: ${sum_of_fractions_val}`); */
  let intracellular_dv_ml_val = intracellular_dv_ml(fluidgain_val, modeltype_val, fluidgaincompartment2_val);
  
  // do not perform any DOM operations inside the loop below.  Fetch the value one above and pass them down as
  // fixed values

  // iterate the calculation until start/end
  wt[0].conc_ext = extracell; // this value has not been assigned yet, so stamp a random value to get overriden with correct calculation in the loop below
  wt[last].conc_ext = extracell + 1; // this value has not been assigned yet, so stamp a random value to get overriden with correct calculation in the loop below
  // console.log(`extracell: ${extracell}`);
  // console.log(`LEFT:  wt[0].conc_ext: ${wt[0].conc_ext}`);
  // console.log(`RIGHT: wt[last].conc_ext: ${wt[last].conc_ext}`);
  let iteration_enabled = true;
  // let start_end_gap = 0.01;
  let start_end_gap = 0.0008;
  for (let iteration = 0; Math.abs(wt[0].conc_ext - wt[last].conc_ext) > start_end_gap && iteration_enabled; iteration++) {
    for (let row = 0; row < sz[0]; row++) {
      wt[row].time = row === 0 ? 0 : wt[row - 1].time + time_increment_minutes;
      wt[row].day = calculateDay(wt[row].time);
      // dialysis boolean value is true if wt[row].time is between start and end time for the day
      wt[row].dialysis =
        treatmentTable[wt[row].day - 1].dialysis &&
        treatmentTable[wt[row].day - 1].start <= wt[row].time &&
        wt[row].time <= treatmentTable[wt[row].day - 1].end;
        // vol_ext and vol_int are affected by UF
      let prev_row = row === 0 ? last - 1 : row - 1;
      let next_row = row === last ? 0 : row + 1;
      let eff_uf = treatmentTable[wt[row].day - 1].eff_uf; // eff_uf[wt[row].day],
      // wt[next_row].time = wt[row].time + time_increment_minutes;
      wt[next_row].day = calculateDay((wt[row].time + time_increment_minutes));
      wt[next_row].dialysis =
        treatmentTable[wt[next_row].day - 1].dialysis &&
        treatmentTable[wt[next_row].day - 1].start <= (wt[row].time + time_increment_minutes) &&
        (wt[row].time + time_increment_minutes) <= treatmentTable[wt[next_row].day - 1].end;
      wt[row].vol_ext = calc_vol_ext_combined(
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

      if (constant_dial_val || row === 0) {
        wt[row].vol_int = intracellular_volume_val * 1000;
      } else {
        wt[row].vol_int = calc_vol_int(
          wt[row].time,
          wt[prev_row].dialysis,
          wt[row].dialysis,
          wt[next_row].dialysis,
          wt[row].day - 1,
          intracellular_volume_val * 1000,
          intracellular_dv_ml_val,
          row === 0 ? intracellular_volume_val * 1000 : wt[prev_row].vol_int,
          treatmentTable[0].eff_uf,
          treatmentTable[1].eff_uf,
          treatmentTable[2].eff_uf,
          treatmentTable[3].eff_uf,
          treatmentTable[4].eff_uf,
          treatmentTable[5].eff_uf,
          treatmentTable[6].eff_uf,
          frac_uf_to_extracellular_val,
          sum_of_fractions_val,
          time_increment_minutes);  
      }

      // this if block calculates cols: conc_ext and conc_int
      if (row === 0) {
        wt[row].conc_ext = extracell;
        wt[row].conc_int = intracell;
      } else {
        // is vol_ext less than zero?
        if (wt[row - 1].vol_ext <= 0) {
          wt[row].conc_ext = 0.0;
        } else {
          // FIX conc_ext and conc_in should auto fix!!
          // =IF(AN9<=0,0,(AP9*AN9-(IF(AND(AM9,AM10),CHOOSE(AK10,$AI$5,$AI$6,$AI$7,$AI$8,$AI$9,$AI$10,$AI$11),$AA$37))*AP9*$AB$15+$AA$34*(AQ9-AP9)*$AB$15+$AA$33*$AB$15)/AN9)
          
          wt[row].conc_ext =
            (wt[row - 1].conc_ext * wt[row - 1].vol_ext - (wt[row - 1].dialysis && wt[row].dialysis
                ? map_day_to_kml(wt[row].dialysis, wt[row].time, treatmentTable[wt[row].day - 1].clearance, duration)
                : endog_clear) *
                wt[row - 1].conc_ext * time_increment_minutes + kc_ml_min * (wt[row - 1].conc_int - wt[row - 1].conc_ext) * time_increment_minutes + generation * time_increment_minutes) / wt[row - 1].vol_ext;
          wt[row].debug = 0.0;
          
         /*
          // =IF(AN9 <=0,0,(AP9 * AN9-(IF(AND(AM9, AM10),CHOOSE(AK10,$AI$5,$AI$6,$AI$7,$AI$8,$AI$9,$AI$10,$AI$11),$AA$37))*AP9 *$AB$15+$AA$34*(AQ9 -AP9) *$AB$15+$AA$33*$AB$15)/AN9)
          // =IF(AN10<=0,0,(AP10*AN10-(IF(AND(AM10,AM11),CHOOSE(AK11,$AI$5,$AI$6,$AI$7,$AI$8,$AI$9,$AI$10,$AI$11),$AA$37))*AP10*$AB$15+$AA$34*(AQ10-AP10)*$AB$15+$AA$33*$AB$15)/AN10)
          if (wt[row-1].dialysis && wt[row].dialysis) {
            result += (treatmentTable[wt[row].day - 1].clearance || 0) * wt[row - 1].conc_ext * time_increment_minutes;
          }
          result += (kc_ml_min * (wt[row - 1].conc_int - wt[row - 1].conc_ext) + generation) * time_increment_minutes;
          console.log(`result: ${result}`); 
          wt[row].conc_ext = (wt[row - 1].conc_ext * wt[row - 1].vol_ext - result) / wt[row - 1].vol_ext;
          console.log(`wt[row].conc_ext: ${wt[row].conc_ext}`);
          */

          // conc_int =IF(AO9<=0,0,(AQ9*AO9-$AA$34*(AQ9-AP9)*$AB$15)/AO9)
          // is vol_int less than zero?
          if (wt[row - 1].vol_int <= 0) {
            wt[row].conc_int = 0.0;
          } else {
            // ( AQ9 * AO9 - $AA$34 * (AQ9-AP9) * $AB$15) / AO9
            wt[row].conc_int =
              (wt[row - 1].conc_int * wt[row - 1].vol_int - kc_ml_min * (wt[row - 1].conc_int - wt[row - 1].conc_ext) * time_increment_minutes) / wt[row - 1].vol_int;
          }
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
    } // inner (row 0 to 10080) for loop ends here

    // calc the end - start difference, and add 1/2 to start at a mid point again
    // let extracell_mid_offset = (wt[sz[0] - 1].conc_ext - extracell_mid) / 2;
    let half_diff = (wt[last].conc_ext - wt[0].conc_ext) / 2;
    extracell = wt[0].conc_ext + half_diff;
    let half_diff2 = (wt[last].conc_int - wt[0].conc_int) / 2;
    intracell = wt[0].conc_int + half_diff2;
    /*
    console.log(`LEFT:  wt[0].conc_ext: ${wt[0].conc_ext}`);
    console.log(`RIGHT: wt[sz[0]].conc_ext: ${wt[sz[0] - 1].conc_ext}`);
    console.log(`half_diff: ${half_diff}`);
    console.log(`updated extracell: ${extracell}`);
    console.log(`Math.abs(wt[0].conc_ext - wt[last].conc_ext): ${Math.abs(wt[0].conc_ext - wt[last].conc_ext)}`); 
    */
    console.log(`iteration: ${iteration}`);
    let max_iteration_limit = 100;
    if (iteration > max_iteration_limit) {
      // prevent a run-away loop
      console.log(`maximum iteration reached wt[last].conc_ext: ${wt[last].conc_ext}`);
      // this we failed to converge
      document.body.style.backgroundColor = "#FFFFE0";  // light yellow
      break;
    }
  } // outer (iteration) for loop ends here

  // calculate pre, post, SRR
  treatmentTable.forEach((row) => {
    row.pre = row.dialysis ? wt[row.start / 6].conc_ext : 0;
    row.post = row.dialysis ? wt[row.end / 6].conc_ext : 0;
    row.srr =  row.dialysis ? parseFloat( (row.pre - row.post) / row.pre).toFixed(2) : 0.0;
  });


  let srr = [];
  treatmentTable.forEach((row) => {
    if (row.dialysis) {
      srr.push(row.srr);
    }
  });
  treatmentTable.forEach((row) => {
    if (!row.dialysis) {
      srr.push("");
    }
  });
  srr.forEach((value, index) => { 
    document.getElementById(`srr${index}`).textContent = value;  
  });

  populateTable(treatmentTable, "treatmentTable");

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

function populateTable(vTable, tableElementName) {
  if (!debug_mode) return;
  const tableElement = document.getElementById(tableElementName);
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
    if (xs[i] > xs[i - 1] && xs[i] > xs[i + 1] && xs[i] > xs[i - 2]&& xs[i] > xs[i + 2]&& xs[i] > xs[i - 3]&& xs[i] > xs[i + 3]) maxima.push(xs[i]);
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
  document.getElementById("timeavgconc").textContent =
    parseFloat(avg).toFixed(2);
  var maxs = find_local_maxima(y_values);
   // console.log(`chart: ${chart}`);
  console.log(`maxs          : ${maxs}`)
  var maxs_above_avg = maxs.filter(x => x > avg);
  console.log(`maxs_above_avg: ${maxs_above_avg}`)
  console.log(`maxs.length: ${maxs.length}`)
  console.log(`maxs_above_avg.length: ${maxs_above_avg.length}`)
  /*
  var avg_max =
  maxs_above_avg.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0) / maxs_above_avg.length;
  */
  var avg_max =
    maxs.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0) / maxs.length;
    // console.log(`avg_max: ${avg_max}`);
  let avgpeakconc = parseFloat(avg_max).toFixed(2);
  console.log(`avgpeakconc: ${avgpeakconc}`)
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
    "#FD6165",
  ];
  let color_wheel_avg = [
    "rgba(255, 165, 0, 1)", // Light orange color
    "#957DAD",
    "#F7D527",
    "#D1B488",
    "#AC9484",
    "#FE7C6B",
    "#007498",
    "#FE96A0",
  ];
  var xyset = [
    {
      label: i === 0 ? xydata.legend_text : xydata.legend_text_short + (i + 1),
      data: xydata,
      borderColor: color_wheel_conc[i],
      fill: false,
    }];
    if (xydata.plottac) {
      xyset.push(
        {
        type: "line",
        label: i === 0 ? "TAC" : "TAC" + (i + 1),
        data: xydata.map((item) =>
          item.x % 3 === 0 ? { x: item.x, y: avg } : {}
        ),
        borderColor: color_wheel_avg[i],
        borderDash: [5, 5],
        borderWidth: 1,
        fill: false,
      })
    }
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
      datasets: xydata_array,
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
          min: 0,
          max: 168,
          ticks: {
            stepSize: 24,
            maxTicksLimit: 10,
          },
        },
        y: {
          min: 0,
        },
      },
    },
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
    "clearance",
  ];

  let days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
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
      inputData["modeltype"],
      inputData["fluidgaincompartment2"],
      inputData["fluidgaincompartment1"]
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

function customToleranceFn(x){
  return Math.abs(x) < 1 // (-1, +1)
}

// for each treachment apply clearanceTable(eff_uf, inputData)
function applyTreatment(eff_uf, inputData) {
  document.body.style.backgroundColor = "#FFFFFF";
  var clearanceTable;
  var clearance;
  var iter_count = 1;

  // (number, number, number ) => number
  function fn(x, y, z) {
    console.log(`goalseek fn(x) - iter_count: ${iter_count} try fn(x) : ${x}`);
    [clearanceTable, clearance] = calcClearanceTable(x, y, z);
    // console.log(`goalseek: clearanceTable[1000].Cd: ${clearanceTable[1000].Cd}`);
    iter_count++;
    return clearanceTable[1000].Cd;
  }
  var fnParams = [99, eff_uf, inputData]; // first guess fn(Cd[0]) --> Cd[1000]

  // goal is to get Cd (result) to 0.001
  try {

    /*
    var result = goalSeek.default({
      fn,
      fnParams,
      customToleranceFn, // percentTolerance: 100,
      maxIterations: 1000,
      maxStep: 1, // 0.002, // 0.27, // 1, // 1.75, // 2.5, // 5,
      goal: 0.000000001,
      independentVariableIdx: 0, // the index position of the independent variable x in the fnParams array.
    })
*/

    var result = brent({
      fn, 
      fnParams,
      lowerBound: 1,
      upperBound: 145,
      tolerance: 0.0000000001, // 0.000000001,
      maxIterations: 200, 
      independentVariableIdx: 0})
    
    ;
/*
    console.log(`final clearanceTable[1000].Cd: ${clearanceTable[1000].Cd}`);
    console.log(`final clearance: ${clearance}`);
    console.log(`result: ${result}`); */
  } catch (e) {
    // this we failed to converge
    document.body.style.backgroundColor = "#FFC0CB";
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
  // const ttable = document.getElementById("treatmentTable");
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
        treatmentTable[i].clearance = treatmentTable[i].clearance + inputData['endogenousclearance']
        console.log(`treatmentTable[i].clearance: ${treatmentTable[i].clearance}`);

        // console.log(`ttcd apply i: ${i}`);
        // console.log(`ttcd apply treatmentTable[i].clearance: ${treatmentTable[i].clearance}`);
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
  document.getElementById("avgclearance").textContent =
    parseFloat(avg_clearance).toFixed(1);
  populateTable(vTable, "clearanceTable");

  try {
    // populateTable(treatmentTable, ttable);
    let weeklyTable = calcWeeklyTable(treatmentTable, inputData); // (clearanceValue) pass in co

    // Create and update the line chart when "Solve" button is clicked
    const chartData = weeklyTable.map((item) => ({
      x: item.ptime,
      y: inputData["charttype"] === "ConcvsTime" ? item.cext : item.vext,
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
    chartData.plottac = inputData["plottac"];

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

    populateTable(weeklyTable, "weeklyTable");
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
  // console.log(`ready(): dynamic_calc_state : ${dynamic_calc_state}`);
  if (!is_in_dynamic_mode()) {
    // hold is enabled.  ignore input
    return;
  } else {
    // hold is disabled.  process input and solve!
    calculateAndDraw();
  }
};

const DEBOUNCE_TIME = 250; 
window.debouncedReady = _.debounce(window.ready, DEBOUNCE_TIME);
// Now ready() will be called at most once every DEBOUNCE_TIME milliseconds
// https://lodash.com/docs/4.17.15#debounce