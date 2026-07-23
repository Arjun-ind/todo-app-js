let addBtnElement = document.getElementById("addBtn");
let inputElement = document.getElementById("inputElement");
let listItemsElement = document.getElementById("listItems");
let clearBtnElement = document.getElementById("clearBtn");
let taskCountElement = document.getElementById("taskCount");

// Load saved todos
let myList = JSON.parse(localStorage.getItem("todoList")) || [];

// Update task count
function updateTaskCount() {
    if (myList.length === 0) {
        taskCountElement.textContent = "No Tasks";
    } else {
        taskCountElement.textContent = "Total Tasks: " + myList.length;
    }
}

// Save to Local Storage
function saveData() {
    localStorage.setItem("todoList", JSON.stringify(myList));
}

// Create Todo
function createAppendTodo(todo) {

    let listTodoItem = document.createElement("li");
    listTodoItem.classList.add("Todo-items");

    let checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.id = todo.id;
    checkboxElement.classList.add("checkbox-element");
    checkboxElement.checked = todo.isChecked;

    let labelElement = document.createElement("label");
    labelElement.classList.add("label-element");
    labelElement.setAttribute("for", todo.id);
    labelElement.textContent = todo.text;

    if (todo.isChecked) {
        labelElement.classList.add("styles");
    }

    checkboxElement.addEventListener("change", function () {

        todo.isChecked = checkboxElement.checked;

        labelElement.classList.toggle("styles");

        saveData();

    });

    let deleteIconElement = document.createElement("i");

    deleteIconElement.classList.add(
        "fa-solid",
        "fa-trash",
        "delete-icon"
    );

    deleteIconElement.addEventListener("click", function () {

        listTodoItem.remove();

        myList = myList.filter(function (item) {
            return item.id !== todo.id;
        });

        saveData();

        updateTaskCount();

    });

    listTodoItem.appendChild(checkboxElement);
    listTodoItem.appendChild(labelElement);
    listTodoItem.appendChild(deleteIconElement);

    listItemsElement.appendChild(listTodoItem);

}

// Add Todo
function addButton() {

    if (inputElement.value.trim() === "") {
        alert("Please Enter a Todo Item");
        return;
    }

    let newTodo = {

        id: Date.now().toString(),

        text: inputElement.value,

        isChecked: false

    };

    myList.push(newTodo);

    createAppendTodo(newTodo);

    saveData();

    inputElement.value = "";

    inputElement.focus();

    updateTaskCount();

}

// Add Button
addBtnElement.addEventListener("click", addButton);

// Press Enter
inputElement.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        addButton();

    }

});

// Clear All
clearBtnElement.addEventListener("click", function () {

    let confirmDelete = confirm("Delete all todos?");

    if (confirmDelete) {

        myList = [];

        listItemsElement.innerHTML = "";

        localStorage.removeItem("todoList");

        updateTaskCount();

    }

});

// Load Saved Todos
for (let todo of myList) {

    createAppendTodo(todo);

}

updateTaskCount();