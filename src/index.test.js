import { ready, fetchInputValues, calcClearanceTables } from "./index";

/*
test("Tests example", () => {
  expect(true).toBeTruthy();
});
*/

const fs = require("fs");
const { JSDOM } = require("jsdom");

describe("fetchInputValues", () => {
  let document;

  beforeEach(() => {
    const htmlContent = fs.readFileSync("../index.html", "utf-8");
    const dom = new JSDOM(htmlContent);
    document = dom.window.document;
    global.document = document;
  });

  it("should fetch default values correctly", () => {
    const duration = document.getElementById("duration").value;
    const bloodflow = document.getElementById("bloodflow").value;
    const dialysateflow = document.getElementById("dialysateflow").value;
    const koa = document.getElementById("koa").value;
    const sigma = document.getElementById("sigma").value;
    const uf = document.getElementById("uf").value;
    const additionaluf = document.getElementById("additionaluf").value;
    const hematocrit = document.getElementById("hematocrit").value;
    const fluidgain = document.getElementById("fluidgain").value;
    const endogenousclearance = document.getElementById("endogenousclearance")
      .value;
    const recirculation = document.getElementById("recirculation").value;
    const generationrate = document.getElementById("generationrate").value;
    const proteinbinding = document.getElementById("proteinbinding").value;
    const volumeofdist = document.getElementById("volumeofdist").value;
    const fluidgaincompartment1 = document.getElementById(
      "fluidgaincompartment1"
    ).value;

    expect(duration).toBe("3.33");
    expect(bloodflow).toBe("360");
    expect(dialysateflow).toBe("500");
    expect(koa).toBe("500");
    expect(sigma).toBe("0");
    expect(uf).toBe("0");
    expect(additionaluf).toBe("0");
    expect(hematocrit).toBe("0");
    expect(fluidgain).toBe("0");
    expect(endogenousclearance).toBe("0");
    expect(recirculation).toBe("0");
    expect(generationrate).toBe("9524");
    expect(proteinbinding).toBe("0");
    expect(volumeofdist).toBe("36");
    expect(fluidgaincompartment1).toBe("100");
  });
});
