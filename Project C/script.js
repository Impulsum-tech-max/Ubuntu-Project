const calc = document.querySelectorAll(".number");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
const note = document.querySelector(".note");
const noteHeading = note.querySelector("h2");
const noteParagraph = note.querySelector("p");
const radio = document.querySelector(".radio");
const heightUnit = document.querySelector("#height-unit");
const weightUnit = document.querySelector("#weight-unit");

const originalHeading = noteHeading.textContent;
const originalParagraph = noteParagraph.textContent;

function getSelectedUnit() {
  return radio.querySelector('input[name="unit"]:checked');
}

let currentUnit = "metric";

function bmi(weight, height) {
  const select = getSelectedUnit();

  if (select.id === "metric") {
    const bmi = weight / height ** 2;
    return bmi;
  } else if (select.id === "imperial") {
    const bmi = (weight * 703) / height ** 2;
    return bmi;
  }
}

let timer;

function calculateBMI() {
  let result;

  const select = getSelectedUnit();
  if (height.value && weight.value) {
    if (select.id === "metric") {
      const heightToMetres = Number(height.value) / 100;
      result = bmi(Number(weight.value), heightToMetres);
    } else {
      result = bmi(Number(weight.value), Number(height.value));
    }

    noteHeading.textContent = "Your BMI Result:";
    noteParagraph.textContent = result.toFixed(2);
    console.log(result);
  }
}

radio.addEventListener("change", () => {
  const select = getSelectedUnit();
  const newUnit = select.id;

  if (currentUnit !== newUnit && height.value && weight.value) {
    if (newUnit === "imperial") {
      height.value = (Number(height.value) / 2.54).toFixed(2);
      weight.value = (Number(weight.value) * 2.20462).toFixed(2);
    } else {
      height.value = (Number(height.value) * 2.54).toFixed(2);
      weight.value = (Number(weight.value) / 2.20462).toFixed(2);
    }
  }

  if (select.id === "metric") {
    heightUnit.textContent = "cm";
    weightUnit.textContent = "kg";
  } else {
    heightUnit.textContent = "in";
    weightUnit.textContent = "lb";
  }

  calculateBMI();
  currentUnit = newUnit;
});

calc.forEach((input) => {
  input.addEventListener("input", () => {
    calculateBMI();

    note.classList.add("show");

    clearTimeout(timer);

    timer = setTimeout(() => {
      note.classList.remove("show");

      noteHeading.textContent = originalHeading;
      noteParagraph.textContent = originalParagraph;
      weight.value = "";
      height.value = "";
    }, 10000);
  });
});
