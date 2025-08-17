let courseCount = 1;

//for data input

let x = 0;
let y = 0;
let z = 0;
let coursework_marks = 0;
let coursework_passing = 24;
let marks_needed = 0;
const radios = document.querySelectorAll('input[type="radio"]');

function quizMarks() {
  let quizzes = parseFloat(document.getElementById("totalMarkQuiz").value);
  let maxQuizzes = parseFloat(document.getElementById("fullMarkQuiz").value);
  if (quizzes == 0 || maxQuizzes == 0) return;
  quizzes = quizzes / maxQuizzes;
  let weightQuizzes = parseFloat(document.getElementById("weightQuiz").value);
  x = quizzes * weightQuizzes;
}

function midtermMarks() {
  let midterms = parseFloat(document.getElementById("totalMarkTerm").value);
  let maxMidterms = parseFloat(document.getElementById("fullMarkTerm").value);
  if (midterms == 0 || maxMidterms == 0) return;
  midterms = midterms / maxMidterms;
  let weightMidterms = parseFloat(document.getElementById("weightTerm").value);
  y = midterms * weightMidterms;
}

function assignmentMarks() {
  let assignments = parseFloat(
    document.getElementById("totalMarkAssignment").value
  );
  let maxAssignments = parseFloat(
    document.getElementById("fullMarkAssignment").value
  );
  if (assignments == 0 || maxAssignments == 0) return;
  assignments = assignments / maxAssignments;
  let weightAssignments = parseFloat(
    document.getElementById("weightAssignment").value
  );
  z = assignments * weightAssignments;
}

function courseworkMarks() {
  coursework_marks = x + y + z;
}

function targetMarks() {
  let hasUnknown = false;
  radios.forEach((radio) => {
    if (radio.value == "no" && radio.checked) {
      hasUnknown = true;
    }
  });
  let targetMarks = parseFloat(document.getElementById("target").value);
  targetMarks = (targetMarks - 0.23536) / 0.04395; //convert cgpa to mark (approximation equation)
  targetMarks = targetMarks.toFixed(2);
  marks_needed = targetMarks - coursework_marks;
  marks_needed = marks_needed.toFixed(2);
  if (marks_needed <= 40) {
    document.getElementById("target_marks").innerHTML =
      "You will need to get to get a combined mark of " +
      marks_needed +
      " for both coursework and final exam to reach " +
      targetMarks +
      " equivalent to your traget GPA.";
  } else {
    if (hasUnknown) {
      document.getElementById("target_marks").innerHTML =
        "It will be impossible to reach the target since you will need to get to get a mark of " +
        marks_needed +
        " in the final exam";
    } else {
      document.getElementById("target_marks").innerHTML =
        "You will need to get to get a combined mark of " +
        marks_needed +
        " for both coursework and final exam to reach " +
        targetMarks +
        " equivalent to your traget GPA.";
    }
  }
}

function passingMarks() {
  let exam_max = 40;
  let coursework_short = 0;
  let highest = 0;

  if (coursework_marks < coursework_passing) {
    coursework_short = coursework_passing - coursework_marks;
    let adjusted_needed = marks_needed - coursework_short;
    highest = coursework_marks + exam_max;
    let hasUnknown = false;
    radios.forEach((radio) => {
      if (radio.value == "no" && radio.checked) {
        hasUnknown = true;
      }
    });

    if (hasUnknown) {
      if (coursework_marks < 24 && adjusted_needed <= exam_max) {
        document.getElementById("passing_marks").innerHTML =
          "You have not passed the coursework, you will need to get " +
          coursework_short +
          " more marks in coursework and another " +
          adjusted_needed +
          " marks for your final exam to reach your target.";
      } else if (coursework_marks < 24 && adjusted_needed > exam_max) {
        document.getElementById("passing_marks").innerHTML =
          "You have not passed the coursework, you will need to get " +
          coursework_short +
          " more marks in coursework, but you won't be able to reach your target. The highest you can achieve is " +
          highest;
      }
    }

    if (coursework_marks < 24) {
      document.getElementById("passing_marks").innerHTML =
        "You have not passed the coursework. Hence, impossible to reach the target GPA.";
    }
  } else {
    document.getElementById("passing_marks").innerHTML =
      "You have passed the coursework";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("calculate").addEventListener("click", () => {
    document.querySelector(".suggestion").classList.remove("d-none");
  });

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const section = radio.closest(".row").parentNode;

      const inputs = section.querySelectorAll('input[type="number"]');

      if (radio.value === "yes" && radio.checked) {
        // Enable inputs
        inputs.forEach((input) => (input.disabled = false));
      } else if (radio.value === "no" && radio.checked) {
        // Disable inputs
        inputs.forEach((input) => {
          input.disabled = true;
          input.value = 0;
        });
      }
    });
  });
});
