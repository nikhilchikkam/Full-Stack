let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let userInput = document.getElementById("todoUserInput");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    return parsedTodoList === null ? [] : parsedTodoList;
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

// Save tasks to Local Storage
saveTodoButton.addEventListener("click", function () {
    localStorage.setItem("todoList", JSON.stringify(todoList));
});

// Add a new task
function onAddTodo() {
    let userInputValue = userInput.value.trim();
    if (userInputValue === "") {
        alert("Enter a valid task");
        return;
    }

    todosCount++;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };

    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInput.value = "";
}

addTodoButton.addEventListener("click", onAddTodo);

// Delete a task
function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    todoList = todoList.filter(todo => `todo${todo.uniqueNo}` !== todoId);
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Toggle task completion
function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todo = todoList.find(todo => `todo${todo.uniqueNo}` === todoId);
    if (todo) {
        todo.isChecked = checkboxElement.checked;
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }
}

// Create and append a task item
function createAndAppendTodo(todo) {
    let todoId = `todo${todo.uniqueNo}`;
    let checkboxId = `checkbox${todo.uniqueNo}`;
    let labelId = `label${todo.uniqueNo}`;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row", "align-items-center");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");

    inputElement.addEventListener("change", () => onTodoStatusChange(checkboxId, labelId, todoId));
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked) labelElement.classList.add("checked");
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.addEventListener("click", () => onDeleteTodo(todoId));
    deleteIconContainer.appendChild(deleteIcon);
}

// Load tasks from Local Storage
todoList.forEach(todo => createAndAppendTodo(todo));
