const todoForm = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoListUL = document.querySelector('#todo-list');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo();
})

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = '';
    }
}
function updateTodoList(){
    todoListUL.innerHTML = '';
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem)
    })
}
function createTodoItem (todo, todoIndex){
    const todoId = 'todo-'+todoIndex;
    const todoLI = document.createElement('li');
    const todoText = todo.text;
    todoLI.className = 'todo';
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label for="${todoId}" class="custom-checkbox">
            <img fill="transparent" src="./icons/check_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png" alt="checkIcon" height="25px" width="25px">
        </label>
        <label for="${todoId}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete-button">
            <img fill="var(--secondary-color)" 
            src="./icons/delete_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png" alt="deleteIcon" height="25px" width="25px">
        </button>
    `
    const deleteButton = todoLI.querySelector('.delete-button');
    deleteButton.addEventListener('click', ()=>{
        deleteTodoItem(todoIndex)
    })
    const checkbox = todoLI.querySelector('input');
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLI;
}
function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateTodoList();
}
function saveTodos(){
    const todoJson = JSON.stringify(allTodos);
    localStorage.setItem('todos', todoJson);
}
function getTodos(){
    const todos = localStorage.getItem('todos') || '[]';
    return JSON.parse(todos)
}
