let form = document.getElementById("form");
let input = document.getElementById("input");
let items = document.getElementById("items");
let deadlineInput = document.getElementById("deadline");
// let sessionStorageData = JSON.parse(sessionStorage.getItem('items'));
let itemsList = JSON.parse(sessionStorage.getItem("items")) || [];

let deleteButton = document.getElementById(".delete");


// itemsList = JSON.parse(sessionStorage.getItem('items'));
// sessionStorage.setItem('items', sessionStorage.getItem('items'));
// sessionStorage.setItem('items', JSON.stringify({"description":"test1","deadline":"25 days 0 hours 2 minutes left"}));
// let sessionStorageData = JSON.parse(sessionStorage.getItem('items'));
// itemsList.push(JSON.parse(sessionStorage.getItem('items')));
// console.log(sessionStorageData);
// console.log(itemsList);
console.log(sessionStorage.getItem("items"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  acceptData();

  form.reset();
  displayData()
});


function acceptData() {
  itemsList.push({
    description: input.value,
    deadline: calculateTimeLeft(),
  });

  sessionStorage.setItem("items", JSON.stringify(itemsList));
}


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

};


items.addEventListener('click', (e) => {
  e.preventDefault();

  items.removeChild(e.target.parentNode.parentNode);

  for(let item in itemsList) {
    if(itemsList[item].description == e.target.parentNode.innerText.split("delete")[0]) {
      itemsList.splice(itemsList.indexOf(itemsList[item]), 1);
    }
  }

  sessionStorage.setItem("items", JSON.stringify(itemsList));

  console.log(e.target.parentNode.innerText.split("delete")[0])

  console.log(itemsList)
});


// window.onload = (e) => {
//   e.preventDefault();
  
//   // if (itemsList.length == 0) {
//   //   sessionStorage.setItem('items', JSON.stringify({"description":"test1","deadline":"25 days 0 hours 2 minutes left"}));
//   // }
//   // itemsList = JSON.parse(sessionStorage.getItem('items'));

//   // sessionStorage.setItem('items', JSON.stringify({"description":"test1","deadline":"25 days 0 hours 2 minutes left"}));
//   // itemsList = JSON.parse(sessionStorage.getItem('items'));

//   // itemsList.push(JSON.parse(sessionStorage.getItem('items')));
//   // sessionStorageData.forEach((task) => {
//   // createTasks(task);
//   // });

//   //  if (itemsList.length != 0) {
//   //   itemsList.forEach((task) => {
//   //     createTasks(task);
//   //     });  }
//       // itemsList.forEach((task) => {
//       // createTasks(task);
//       // });
//   // displayData()

// }

function displayData() {
  items.innerHTML = "";
  // if (sessionStorage.getItem('items')) {
    // itemsList = JSON.parse(sessionStorage.getItem('items'));

    itemsList.forEach((task) => {
    createTasks(task);
    });
  // }
   
}

displayData()
