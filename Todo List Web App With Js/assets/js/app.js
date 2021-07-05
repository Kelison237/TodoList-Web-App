//Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const hwtext = document.querySelector('h2');

// Event Listeners
todoBtn.addEventListener('click', addTodo);
document.addEventListener('DOMContentLoaded', getTodos); 
todoList.addEventListener('click', deleteCheck);

// Functions 

function addTodo (event) {
    // This below prevents the page from reloading when clicked
    event.preventDefault();
    if(todoInput.value != ""){
//Todo DIV
const todoDiv = document.createElement('div');
todoDiv.classList.add('todo');
// Create Li
const newTodo = document.createElement('li');
newTodo.innerText = todoInput.value;
newTodo.classList.add('todo-items');
// now appending li into todoDiv
todoDiv.appendChild(newTodo);
//add todo to localstorage
saveLocalTodos(todoInput.value);
//Check mark button
const completedBtn = document.createElement('button');
completedBtn.innerHTML = '<span>✔️</span>';
completedBtn.classList.add("complete-btn");
todoDiv.appendChild(completedBtn);

//Delete button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<span>🗑️</span>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);

//append todoDiv into ul
todoList.appendChild(todoDiv);
// Clear todo input value
todoInput.value = "";
document.querySelector('h2').innerHTML = "😊😊😊😊😊😊😊";
} else {
   document.querySelector('h2').innerText = "Can't add an empty todo";
   document.querySelector('h2').style.color = "red";
}
}

function deleteCheck(e) {
    const item = e.target;
    //delete todo
    if(item.classList[0] === 'trash-btn'){
            const todo= item.parentElement;
            removeLocalTodos(todo);
            todo.classList.add('fall');
            todo.addEventListener('transitionend', function(){
                todo.remove();
            }) 
    }

    // check mark
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
    
}

function saveLocalTodos(todo) {
    //check if i already have items in there
 let todos;
    if(localStorage.getItem('todos')=== null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos () {
    let todos;
    //check if i already have items in there
    if(localStorage.getItem('todos')=== null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
 todos.forEach(function(todo) {
//Todo DIV
const todoDiv = document.createElement('div');
todoDiv.classList.add('todo');
// Create Li
const newTodo = document.createElement('li');
newTodo.innerText = todo;
newTodo.classList.add('todo-items');
// now appending li into todoDiv
todoDiv.appendChild(newTodo);
//Check mark button
const completedBtn = document.createElement('button');
completedBtn.innerHTML = '<li class="fas fa-check"></i>';
completedBtn.classList.add("complete-btn");
todoDiv.appendChild(completedBtn);

//Delete button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<li class="fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);

//append todoDiv into ul
todoList.appendChild(todoDiv);
     
 })
}


function removeLocalTodos(todo) {
    let todos;
    //check if i already have items in there
    if(localStorage.getItem('todos')=== null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
