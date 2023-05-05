const form = document.getElementById("form");
const descriptionInput = document.getElementById("input");
const deadlineInput = document.getElementById("deadline");
const sorting = document.getElementById("sort");
const items = document.getElementById("items");
const itemsList = JSON.parse(sessionStorage.getItem("items")) || [];


createTasks();

console.log(sessionStorage.getItem("items"))

// Submit data for storage and display
form.addEventListener("submit", (e) => {
  e.preventDefault();
  acceptData();
  form.reset();
  createTasks();
})

// Add data to session storage
function acceptData() {
  itemsList.unshift({
    description: descriptionInput.value,
    deadline: deadlineInput.value,
    timeLeft: calculateTimeLeft(),
    completed: false
  });
  sessionStorage.setItem("items", JSON.stringify(itemsList));
}

// Calculate time left for task
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
  let sec = Math.floor(diff / 1000);
  if (diff < 0) {
    return "Deadline passed";
  }
  return `${days} days ${hours} hours ${minutes} minutes left ${sec} sec`;
}

// Renders tasks from session storage "itemsList"
function createTasks() {
  items.innerHTML = "";
  itemsList.map((x, y) => {
    return (items.innerHTML += `
    <div id=${y}>
      <span class="itemsList">

        <input id="checkbox" type="checkbox" onClick="complete(this)"
        ${x.completed == "true" ? "checked" : ""}>

        <p ${x.completed == "true" ? `style="text-decoration: line-through"`:
        `style="text-decoration: none"`}>
        ${x.description}
        </p>

        <button onClick ="remove(this)">delete</button>
      </span>
        ${x.timeLeft ? `<p>${x.timeLeft}</p>` : ""}
    </div>
    `);
  });
}

// When confirmed removes item from the list
function remove(task) {
  let text = "Remove task ?";
  if (confirm(text) == true) {
    task.parentElement.parentElement.remove();
    itemsList.splice(task.parentElement.parentElement.id, 1);
    sessionStorage.setItem("items", JSON.stringify(itemsList));
  }
  window.location.reload();
}

// Complete task moves item down the list and applies line-through style
function complete(task) {
  if (task.checked == true){
    const id = task.parentElement.parentElement.id;
    itemsList[id].completed = "true";
    task.parentElement.children[1].style.setProperty("text-decoration", "line-through");

    const element = itemsList[id];
    itemsList.splice(id, 1);
    itemsList.splice(itemsList.length + 1, 0, element);

  } else {
    itemsList[task.parentElement.parentElement.id].completed = "false";
    task.parentElement.children[1].style.setProperty("text-decoration", "none");
  }

  sessionStorage.setItem("items", JSON.stringify(itemsList));
  window.location.reload();
}


function sort() {
  if (sorting.value === "Recently added") {

    console.log("0")
  } else if (sorting.value === "Deadline") {
    itemsList.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    console.log("1")
  } else if (sorting.value === "Recently completed items") {

    console.log("2")
  }

  sessionStorage.setItem("items", JSON.stringify(itemsList));
  window.location.reload();
}





// Prefill sessionStorage with some test data when the app is first loaded.
if(!sessionStorage.getItem("items")){
  sessionStorage.setItem("items", JSON.stringify([
    {
      "description": "TEST1",
      "deadline": "2023-06-06T15:15",
      "timeLeft": "34 days 4 hours 12 minutes left 698462 sec",
      "completed": "false"
    },
    {
      "description": "TEST2",
      "deadline": "2023-06-04T15:15",
      "timeLeft": "32 days 2 hours 1 minutes left 698462 sec",
      "completed": "false"
    },
    {
      "description": "TEST3",
      "deadline": "2023-06-05T15:15",
      "timeLeft": "33 days 2 hours 1 minutes left 698462 sec",
      "completed": "true"
    }
  ])
  )
  window.location.reload();
}

function updateTimeLeft() {
  itemsList.forEach((task) => {
    console.log(task.deadline)

    if (task.deadline == "") {
      task.timeLeft = "";
    }
    let now = new Date();
    task.timeLeft = new Date(task.deadline) - now
    let diff = task.timeLeft
    console.log(task.timeLeft)

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hoursdiff = Math.floor(diff / (1000 * 60 * 60));
    let hours = Math.floor(diff / (1000 * 60 * 60) - days * 24);
    let minutes = Math.floor(diff / (1000 * 60) - hoursdiff * 60);
    let sec = Math.floor(diff / 1000);

    if (diff < 0) {
      task.timeLeft = "Deadline passed";
    } else {
      task.timeLeft = `${days} days ${hours} hours ${minutes} minutes left ${sec} sec`;
    }
  })

  sessionStorage.setItem("items", JSON.stringify(itemsList));
}
