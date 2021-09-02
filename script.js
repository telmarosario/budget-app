// Elements to target

// Total balance
const balanceElement = document.getElementById("balance");
// Value input
const valueInputElement = document.querySelector("input");
const descriptionElement = document.getElementById("description");
// Income/expense option
const selectElement = document.querySelector("select");
// Add button
const additionButtonElement = document.querySelector("footer button");
// Entry list
const entryListElement = document.querySelector("section ul");

// We want a function to be executed when we click the add button
// that takes the values, then we want to call another function that adds the
// adds  the elements to the list
additionButtonElement.onclick = function () {
  const amount = valueInputElement.value;
  const operation = selectElement.value;

  addEntry(amount, operation);
  // After adding the entry we want to clear the input
  valueInputElement.value = "";

  // The last step we want to make happen is to update the balance. We need to call/make another funtion
  updateBalance();
};

// Defining the function we called on the click event
function addEntry(amount, operation) {
  const listEntry = document.createElement("li");
  // we want to add a class depending if its an income or expense
  // because the operation and the class have the same name, we pass the parameter
  listEntry.classList.add(operation);

  const valueEntry = document.createElement("strong");
  valueEntry.innerText = amount + "$";

  const entryDescription = document.createElement("em");
  entryDescription.innerText = descriptionElement.value;
  listEntry.appendChild(entryDescription);

  const operationEntry = document.createElement("span");
  if (operation === "expense") {
    operationEntry.innerText = "-";
  } else if (operation === "income") {
    operationEntry.innerText = "+";
  }
  listEntry.appendChild(operationEntry);

  listEntry.appendChild(valueEntry);
  entryListElement.appendChild(listEntry);
}

function updateBalance() {
  // Loop over every list entry
  // If statement depending if its an expense or income

  let total = 0;
  // .children gives access to all the children inside the ul
  for (let item of entryListElement.children) {
    // get the value from the entry, we can use queryselector inside every dom
    const valueElement = item.querySelector("strong");
    const operationElement = item.querySelector("span");

    // we are removing the $ from the value, and acessing just the text inside the tags
    const value = parseInt(valueElement.innerText);
    const operation = operationElement.innerText;

    if (operation === "+") {
      total += value;
    } else if (operation === "-") {
      total -= value;
    }
  }

  balanceElement.innerText = total + "$";
}
