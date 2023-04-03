let form = document.getElementById("form");
let input = document.getElementById("input");
let items = document.getElementById("items");
let deadlineInput = document.getElementById("deadline");
let itemsList = JSON.parse(sessionStorage.getItem("items")) || [];
let deleteButton = document.getElementById(".delete");

// Submit data for storage and display
form.addEventListener("submit", (e) => {
  e.preventDefault();
  acceptData();
  form.reset();
  displayData();
});

// Add data to session storage
function acceptData() {
  itemsList.push({
    description: input.value,
    deadline: calculateTimeLeft(),
  });

  sessionStorage.setItem("items", JSON.stringify(itemsList));
}

// Calculate deadline for task
function calculateTimeLeft() {
  if (deadlineInput.value == "") {
    return "";
  }
  let now = new Date();
  let diff = new Date(deadlineInput.value) - now;
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hoursdiff = Math.floor(diff / (1000 * 60 * 60));
  let hours = Math.floor(diff / (1000 * 60 * 60) - days * 24);
  let minutes = Math.floor(diff / (1000 * 60) - hoursdiff * 60);
  if (diff < 0) {
    return "Deadline passed";
  }
  return `${days} days ${hours} hours ${minutes} minutes left`;
}

// Creates div element and populates it task items and data
function createTasks(task) {
  let item = document.createElement("div");
  description = document.createElement("p");
  deadline = document.createElement("p");
  outputRemoveButton = document.createElement("button");
  outputRemoveButton.classList.add("delete");
  description.innerText = task.description;
  deadline.innerText = task.deadline;
  outputRemoveButton.innerText = "delete";

  item.appendChild(description);
  item.appendChild(deadline);
  description.appendChild(outputRemoveButton);
  items.appendChild(item);
  item.classList.add("item");
}

// Delete items from session storage
items.addEventListener("click", (e) => {
  e.preventDefault();

  items.removeChild(e.target.parentNode.parentNode);

  for (let item in itemsList) {
    if (
      itemsList[item].description ==
      e.target.parentNode.innerText.split("delete")[0]
    ) {
      itemsList.splice(itemsList.indexOf(itemsList[item]), 1);
    }
  }

  sessionStorage.setItem("items", JSON.stringify(itemsList));
});

// Renders data from session storage
function displayData() {
  items.innerHTML = "";
  itemsList.forEach((task) => {
    createTasks(task);
  });
}

displayData();
