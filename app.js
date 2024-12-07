let addButton = document.getElementById("btn-add");
let clearButton = document.getElementById("btn-clr");
let addInput = document.getElementById("inp-add");
let searchInput = document.getElementById("inp-search");
let todoList = document.getElementsByTagName("ul");

addButton.addEventListener("click", addTodo);

function addTodo() {
  createListItem();
  attachDeleteEvent();
}

function visualizeList(value) {
  let newListItem = document.createElement("li");
  let newSpan = document.createElement("span");
  let newIcon = document.createElement("i");
  newIcon.classList.add("bi", "bi-x");
  newSpan.textContent = value;
  newListItem.appendChild(newSpan);
  newListItem.appendChild(newIcon);
  todoList[0].appendChild(newListItem);
}

function createListItem() {
  let value = addInput.value.trim();
  if (!value) return;
  saveTodos(value);
  visualizeList(value);
  addInput.value = "";
}

function saveTodos(todo) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  let todos = JSON.parse(localStorage.getItem("todos"));
  if (todos) {
    todos.forEach((todo) => {
      visualizeList(todo);
    });
  }

  attachDeleteEvent();
}

window.addEventListener("load", loadTodos);

clearButton.addEventListener("click", clearTodos);

function clearTodos() {
  localStorage.removeItem("todos");
  while (todoList[0].firstChild) {
    todoList[0].removeChild(todoList[0].firstChild);
  }
}

function attachDeleteEvent() {
  let clearXButtons = document.getElementsByClassName("bi-x");
  Array.from(clearXButtons).forEach((button) => {
    button.addEventListener("click", (e) => {
      e.target.parentElement.remove();
      removeTodoFromStorage(
        e.target.parentElement.querySelector("span").textContent
      );
    });
  });
}

function removeTodoFromStorage(todo) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.filter((item) => item !== todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function filterTodos(todo) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.filter((item) =>
    item.toLowerCase().includes(todo.toLowerCase())
  );
  return todos;
}

searchInput.addEventListener("keyup", (e) => {
  let inpSearch = e.target.value;
  while (todoList[0].firstChild) {
    todoList[0].removeChild(todoList[0].firstChild);
  }
  filterTodos(inpSearch).forEach((inp) => visualizeList(inp));
  attachDeleteEvent();
});

