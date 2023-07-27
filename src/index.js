// This work © 2023 by Timothy W Meyer, Andrew Ahn is licensed under CC BY 4.0
import "./styles.css";
import * as goalSeek from "goal-seek";

function calcTable(newCd) {
  let Qb = parseFloat(document.getElementById("bloodflow").value); // let Qb = 360;
  let Qd = parseFloat(document.getElementById("dialysateflow").value); // 500;
  // console.log("dialysateflow: " + parseFloat(Qd));
  let KoA = parseFloat(document.getElementById("koa").value); //  let KoA = 500;
  let sigma = parseFloat(document.getElementById("sigma").value); // 0;
  console.log(`sigma: ${sigma}`);
  let Qf = 0;
  let Qr = 0; // Ask Dr. Tim: is this Fluid Gain?
  let Hct = parseFloat(document.getElementById("hematocrit").value); // 0;
  console.log(`Hct: ${Hct}`);
  // let f = 0.3378;
  let f = 1.0;
  let Calb = 500;
  let Cp = 100;
  let DP0 = 40;
  let DP1 = 40;
  let solute = 0;
  let solute1 = "Urea";
  let solute2 = "Plasma";
  let PureUF = false;
  let PureDialysis = true;
  let Qpmin = 200;
  let Qdmin = 1000;
  let QpQdisneg = false;

  let increment = 0.001;
  let Ka = (Cp - Cp * f) / Cp / f / (Calb - Cp + Cp * f);
  let Pa = (DP1 - DP0) / (DP1 + DP0);
  let Pb = (2 * DP0) / (DP1 + DP0);

  let Qp = Qb * (1 - Hct);
  let Qprbc = 0.86 * Qb * Hct;
  if (solute === 1) {
    Qprbc = 0.86 * Qb * Hct;
  } else {
    Qprbc = 0;
  }
  let Qpoatinlet = 360;
  let Cp0 = 100;
  let Calb0 = (Calb * Qp) / Qpoatinlet;
  let theta_inblood = 0.07;
  let theta_atinlet = 0.07;

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
    vTable[row].x = row * 0.001;
    vTable[row].Phi = 0.5;
    vTable[row].Qp = Qpoatinlet - Qf * (Pa * Math.pow(row, 2) + Pb * row);

    if (row === 0) {
      vTable[row].Qd = Qd + Qf;
    } else {
      vTable[row].Qd =
        vTable[row - 1].Qd - Qf * (Pa * Math.pow(row, 2) + Pb * row);
    }

    if (PureUF) {
      vTable[row].Jv = 0;
    } else {
      vTable[row].Jv = 2 * Qf * Pa * vTable[row].x + Qf * Pb;
    }

    if (row === 0) {
      vTable[row].Calb = Calb;
    } else {
      vTable[row].Calb = (vTable[row - 1].Calb * Qpoatinlet) / vTable[row].Qp;
    }
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

    vTable[row].Pe = (vTable[row].Jv * (1 - sigma)) / KoA;
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
  let clearanceValue = Math.round(
    ((Qp + Qprbc / (1 - theta_inblood)) * Cp -
      (vTable[1000].Qp + Qprbc / (1 - vTable[1000].theta)) * vTable[1000].Cp) /
      Cp,
    10
  );
  console.log(`clearanceValue0: ${clearanceValue}`);
  if (document.getElementById("clearanceValue"))
    document.getElementById("clearanceValue").innerHTML = clearanceValue;
  console.log(`Qp: ${Qp}`);
  console.log(`Cp: ${Cp}`);
  console.log(`Qprbc: ${Qprbc}`);
  console.log(`vTable[1000].theta: ${vTable[1000].theta}`);
  console.log("vTable[1000].Cp: " + vTable[1000].Cp);
  console.log(`vTable[1000].Qp: ${vTable[1000].Qp}`);

  // clearanceValue =                ((Qp + Qprbc / (1 - theta_inblood)) * Cp0 - (vTable[1000].Qp + Qprbc / (1 - vTable[1000].theta)) * vTable[1000].Cp) / Cp0;

  let [weeklyVarNames, weeklyTable] = calcWeeklyTable(clearanceValue); // (clearanceValue) pass in co

  return [varNames, vTable, weeklyVarNames, weeklyTable];
}

function hours_to_mins(duration) {
  return (Math.round(duration * 10) / 10) * 60;
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

function calc_vol_ext() {
  // =IF($AG$21,$AB$26,IF(AND(AM9,NOT(AM10)),$AB$26,AN1688+($AB$28-IF(AND(AM1688,AM9),CHOOSE(AK9,$AG$5,$AG$6,$AG$7,$AG$8,$AG$9,$AG$10,$AG$11)*$AA$22/$AA$24,0))*$AB$15))
  return 36000;
}

function calcWeeklyTable(clearanceValue) {
  console.log(`clearanceValue: ${clearanceValue}`);

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
  let extracell_mid = 0.834522427; // this should come from an prior vTable (as argument to this function)
  let intracell_mid = 0.0;
  var duration = parseFloat(document.getElementById("duration").value); // let duration = 3.33;

  let increment = 1;

  // iterate the calculation until start/end
  wt[sz[0] - 1].conc_ext = extracell_mid + 10; // just add ten to make the first iteration condition true
  console.log(`extracell_mid: ${extracell_mid}`);
  console.log(`wt[sz[0]-1].conc_ext: ${wt[sz[0] - 1].conc_ext}`);
  for (
    let iteration = 0;
    Math.abs(extracell_mid - wt[sz[0] - 1].conc_ext) > 0.01;
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
        wt[row].conc_ext = extracell_mid;
        wt[row].conc_int = intracell_mid;
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
    let extracell_mid_offset = (wt[sz[0] - 1].conc_ext - extracell_mid) / 2;
    extracell_mid = extracell_mid + extracell_mid_offset;
    console.log(`wt[sz[0]].conc_ext: ${wt[sz[0] - 1].conc_ext}`);
    console.log(`extracell_mid_offset: ${extracell_mid_offset}`);
    console.log(`updated extracell_mid: ${extracell_mid}`);
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

// This code runs everytime the submit button is clicked
window.clicked = function clicked() {
  // Read the input values
  // var stock_symbol = document.getElementById("symbol").value;
  // window.ready();
};
window.clicked();
calcTable(100);

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

let chart; // Global variable to hold the chart instance

function createChart(labels, data) {
  console.log("createChart()");
  if (chart) {
    chart.destroy(); // Destroy the previous chart instance if it exists
    // console.log("createChart():destroy()");
  }

  const ctx = document.getElementById("chart").getContext("2d");
  // console.log(`ctx: ${ctx}`);
  // console.log(`labels: ${labels}`);
  // console.log(`data: ${data}`);
  let y_values = data.map((item) => item.y);
  let sum = y_values.reduce((previous, current) => (current += previous));
  let avg = sum / y_values.length;
  // console.log(`avg: ${avg}`);
  chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Concentration (mg/dL) vs. Time (hours)",
          data: data,
          borderColor: "rgba(75, 192, 192, 1)",
          fill: false
        },
        {
          type: "line",
          label: "Average",
          data: data.map((item) => ({ x: item.x, y: avg })),
          borderColor: "rgba(255, 165, 0, 1)", // Light orange color
          borderDash: [5, 10], // Makes line dotted
          fill: false
        }
      ]
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
  });
  console.log(`chart: ${chart}`);
}

// AA This function gets invoked when a gui elements like 'range' changes
window.ready = function ready() {
  var varNames;
  var vTable;
  var weeklyVarNames;
  var weeklyTable;

  function fn(x) {
    const [lvarNames, lvTable, lweeklyVarNames, lweeklyTable] = calcTable(x);
    // console.log(vTable);
    // console.log(lvTable[1000].Cd);
    console.log(`lvTable[1000].Cd: ${lvTable[1000].Cd}`);
    //return calcTable(x)[1][1014].Cd;
    varNames = lvarNames;
    vTable = lvTable;
    weeklyVarNames = lweeklyVarNames;
    weeklyTable = lweeklyTable;
    return lvTable[1000].Cd;
  }
  //console.log(cal)
  var fnParams = [11];

  try {
    var result = goalSeek.default({
      fn,
      fnParams,
      percentTolerance: 1,
      maxIterations: 1000,
      maxStep: 0.9,
      goal: 0.001,
      independentVariableIdx: 0
    });

    console.log(`result: ${result}`);
    // Create and update the line chart when "Solve" button is clicked
    // const labels = weeklyTable.map((row) => row.ptime);
    const labels = [0, 24, 48, 72, 96, 120, 144, 168];
    const chartData = weeklyTable.map((item) => ({
      x: item.ptime,
      y: item.cext
    }));
    createChart(labels, chartData);

    // document.getElementById("GoalSP").innerHTML = result * calcedSP;

    // new code below

    // The code that populates the vTable array...
    // const [varNames, vTable] = calcTable(11);
    // Display the resulting table in HTML
    const wtable = document.getElementById("weeklyTable");
    populateTable(weeklyVarNames, weeklyTable, wtable);
    // const wTable = populateTable("", weeklyVarNames, weeklyTable);

    // The code that populates the vTable array...
    // const [varNames, vTable] = calcTable(11);
    // Display the resulting table in HTML
    const table = document.getElementById("resultTable");
    populateTable(varNames, vTable, table);
    /*
    const headerRow = table.insertRow();
    for (let i = 0; i < varNames.length; i++) {
      const th = document.createElement("th");
      th.textContent = varNames[i];
      headerRow.appendChild(th);
    }
    for (let i = 0; i < vTable.length; i++) {
      const row = table.insertRow();

      for (let j = 0; j < varNames.length; j++) {
        const cell = row.insertCell();
        cell.textContent = vTable[i][varNames[j]];
      }
    }
    */
  } catch (e) {
    console.error("error", e);
  }
};

// ----------save old version for reference ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// This code runs everytime the submit button is clicked
/*
window.clicked_old = function clicked_old() {
  // Read the input values
  var stock_symbol = document.getElementById("symbol").value;
  var growthyrs = document.getElementById("growthyrs").value;
  var discount = document.getElementById("discount").value;
  var tgrowth = document.getElementById("tgrowth").value;

  //set api strings
  let analystdata =
    "https://financialmodelingprep.com/api/v3/analyst-estimates/" +
    stock_symbol +
    "?limit=2&apikey=b141cee98d1c9c98167b2dc688c57810";
  let histdata =
    "https://financialmodelingprep.com/api/v3/cash-flow-statement/" +
    stock_symbol +
    "?limit=2&apikey=b141cee98d1c9c98167b2dc688c57810";
  let balancesheet =
    "https://financialmodelingprep.com/api/v3/balance-sheet-statement/" +
    stock_symbol +
    "?limit=1&apikey=b141cee98d1c9c98167b2dc688c57810";
  let enterprisevalues =
    "https://financialmodelingprep.com/api/v3/enterprise-values/" +
    stock_symbol +
    "?limit=1&apikey=b141cee98d1c9c98167b2dc688c57810";
  let profile =
    "https://financialmodelingprep.com/api/v3/profile/" +
    stock_symbol +
    "?&apikey=b141cee98d1c9c98167b2dc688c57810";
  //get api data
  Promise.all([
    fetch(analystdata),
    fetch(histdata),
    fetch(balancesheet),
    fetch(enterprisevalues),
    fetch(profile)
  ])
    .then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(
        responses.map(function (response) {
          return response.json();
        })
      );
    })
    .then(function (data) {
      //inject the data into matching keys
      var apicount = 5;
      for (let i = 0; i < apicount; i++) {
        for (let key in data[i][0]) {
          try {
            for (let x = 0; x < data[i].length; x++) {
              if (x < 1) {
                document.getElementById(key).innerHTML = data[i][x][key];
              } else {
                document.getElementById(key).innerHTML =
                  data[i][x][key] +
                  "," +
                  document.getElementById(key).innerHTML;
              }
            }
          } catch (error) {
            //continue;
          }
        }
      }
      var histdata = document.getElementById("freeCashFlow").innerHTML;
      histdata = histdata.split(",");

      var analystdata = document.getElementById("estimatedNetIncomeAvg")
        .innerHTML;
      var analystdata = analystdata.split(",");
      var analystCAGR = histdata.concat(analystdata);
      analystCAGR = analystCAGR.map(function (el) {
        return el.trim();
      });

      var i = 0;
      for (i = 0; i < 4; i++) {
        analystCAGR[i] = analystCAGR[i].replace("B", "");
      }

      var CAGR = Math.pow(analystCAGR[3] / analystCAGR[2], 1 / 2) - 1;

      if (isNaN(CAGR)) {
        CAGR = 0;
      }
      document.getElementById("estCAGR").innerHTML =
        (Math.round(CAGR * 1000) / 1000) * 100 + "%";
      var additional = [];
      additional.push(Math.round(analystCAGR[3] * (1 + CAGR)));
      i = 0;
      for (i = 0; i < growthyrs - 1; i++) {
        additional.push(Math.round(additional[i] * (1 + CAGR)));
      }

      var estimates = [];
      estimates.push(histdata[0]);
      estimates.push(histdata[1]);
      estimates.push(analystdata[0]);
      estimates.push(analystdata[1]);

      i = 0;
      for (i = 0; i < growthyrs; i++) {
        estimates.push(additional[i]);
      }

      document.getElementById("combined").innerHTML = estimates;

      estimates.shift();
      estimates.shift();

      var discountarray = [];
      var x = 1;
      i = 0;
      for (i = 0; i < estimates.length; i++) {
        x = x * (1 - discount / 100);
        discountarray.push(x);
      }

      i = 0;
      var nearDCF = 0;
      for (i = 0; i < estimates.length; i++) {
        nearDCF = nearDCF + discountarray[i] * estimates[i];
      }
      var TerminalValue =
        (estimates[estimates.length - 1] * (1 + tgrowth / 100)) /
        (discount / 100 - tgrowth / 100);

      document.getElementById("nearval").innerHTML = nFormatter(nearDCF, 1);
      document.getElementById("tval").innerHTML = nFormatter(TerminalValue, 1);

      var cash = document.getElementById("cashAndCashEquivalents").innerHTML;

      var debt = document.getElementById("longTermDebt").innerHTML;

      document.getElementById("val").innerHTML = nFormatter(
        nearDCF + TerminalValue - cash + debt,
        1
      );

      var numshare = document.getElementById("numberOfShares").innerHTML;

      document.getElementById("calcedSP").innerHTML =
        "$" +
        Math.round(((nearDCF + TerminalValue - cash + debt) / numshare) * 100) /
          100;

      if (document.getElementById("price").innerHTML > 0) {
        window.ready();
      }
    })
    .catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });
};



function nFormatter(num, digits) {
  var isNegative = false;
  if (num < 0) {
    isNegative = true;
    num = num * -1;
  }
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  if (isNegative === false) {
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  } else if (isNegative === true) {
    return item
      ? "-" + (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  }
}


*/
