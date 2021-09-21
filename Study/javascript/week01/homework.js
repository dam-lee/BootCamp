const todoList = document.getElementsByClassName("todo-list");
const todoBtn = document.getElementsByClassName("todo-btn");
const todoWrap = document.getElementById("todo-list-wrap");
const createTodoTitle = document.getElementsByClassName("create-todo-title")[0];
const createTodo = document.getElementsByClassName("create-todo")[0];
const createBtn = document.getElementsByClassName("create-btn")[0];
const changeBtnBg = (btn) => {
  btn.style.backgroundColor = "red";
};
const sayHello = () => {
  console.log("hello");
};

for (let i = 0; i < todoList.length; i++) {
  todoList[i].addEventListener("click", () => sayHello());
}
for (let i = 0; i < todoBtn.length; i++) {
  todoBtn[i].addEventListener("click", () => changeBtnBg(todoBtn[i]));
}

createBtn.addEventListener("click", () => {
  todoWrap.innerHTML += `
    <div class="todo-list">
        <h3>${createTodoTitle.value}</h3>
        <p>${createTodo.value}</p>
        <button class="todo-btn">완료</button>
    </div>
  `;
  createTodoTitle.value = "";
  createTodo.value = "";
});
