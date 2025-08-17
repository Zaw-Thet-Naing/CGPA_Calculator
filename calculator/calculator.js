// Add course button
document.addEventListener("DOMContentLoaded", () => {
  let courseCount = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  let semesterCount = 1;
  const course = document.getElementsByClassName("course")[0];
  const sem = document.getElementsByClassName("semester");
  const addCourseBtn = document.getElementsByClassName("addCourse");
  const addSemBtn = document.getElementById("addSemester");
  addCourseBtn[0].addEventListener("click", () => {
    const courseList = document.getElementById("courses");
    courseCount[addCourseBtn[0].id]++;
    // clone course
    const newCourse = course.cloneNode(true);
    // assign unique ID for the course card
    newCourse.querySelectorAll("input, select, textarea").forEach((el) => {
      el.value = "";
    });
    const title = newCourse.querySelector(".courseNum");
    if (title) {
      title.textContent = `Course ${courseCount[addCourseBtn[0].id]}`;
      title.id = `${courseCount[addCourseBtn[0].id]}`;
    }

    // append
    courseList.appendChild(newCourse);
  });

  addSemBtn.addEventListener("click", () => {
    const semList = document.getElementById("semesters");
    semesterCount++;
    const newSem = sem[0].cloneNode(true);
    courseCount[semesterCount] = courseCount[1];

    // reset inputs
    newSem.querySelectorAll("input, select, textarea").forEach((el) => {
      el.value = "";
    });

    const newCourseBtn = newSem.querySelector(".addCourse");
    newCourseBtn.id = semesterCount;
    newCourseBtn.addEventListener("click", () => {
      courseCount[newCourseBtn.id]++;
      // clone course
      const newCourse = course.cloneNode(true);
      newCourse.querySelectorAll("input, select, textarea").forEach((el) => {
        el.value = "";
      });
      const title = newCourse.querySelector(".courseNum");
      if (title) {
        title.textContent = `Course ${courseCount[newCourseBtn.id]}`;
        title.id = `${courseCount[addCourseBtn.id]}`;
      }

      // append
      newSem.querySelector("#courses").appendChild(newCourse);
    });

    const title = newSem.querySelector("#semNum");
    if (title) {
      title.textContent = `Semester ${semesterCount}`;
      title.id = `semNum-${semesterCount}`;
    }

    semList.appendChild(newSem);
  });

  document.querySelector(".calculate").addEventListener("click", () => {
    document.querySelector(".cgpa").classList.remove("d-none");
    let total_weight_so_far = 0;
    let total_credit_hours_so_far = 0;

    let gpas = document.querySelectorAll(".gpa");
    document.querySelectorAll(".credit-hour").forEach((c, index) => {
      let creditHour = parseFloat(c.value);
      total_credit_hours_so_far += creditHour;
      total_weight_so_far += creditHour * parseFloat(gpas[index].value);
    });

    let cgpa = (total_weight_so_far / total_credit_hours_so_far).toFixed(2);
    document.querySelector(".cgpa-text").innerHTML = cgpa;
  });
});
