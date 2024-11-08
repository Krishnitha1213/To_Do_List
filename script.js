const todoForm = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoListUL = document.querySelector('#todo-list');

// Load saved todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos') || '[]');

// Update the todo list UI
function updateTodoList() {
    todoListUL.innerHTML = '';
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo';
        todoItem.innerHTML = `
            <input type="checkbox" id="todo-${index}" ${todo.completed ? 'checked' : ''}>
            <label for="todo-${index}" class="custom-checkbox">
                <img src="./icons/check_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png" alt="check" height="25px" width="25px">
            </label>
            <label for="todo-${index}" class="todo-text">${todo.text}</label>
            <button class="delete-button">
                <img src="./icons/delete_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png" alt="delete" height="25px" width="25px">
            </button>
        `;
        
        // Delete todo
        todoItem.querySelector('.delete-button').addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos();
            updateTodoList();
        });
        
        // Toggle todo completion
        todoItem.querySelector('input').addEventListener('change', (e) => {
            todos[index].completed = e.target.checked;
            saveTodos();
        });
        
        todoListUL.append(todoItem);
    });
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Handle form submission (add new todo)
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        saveTodos();
        updateTodoList();
        todoInput.value = '';
    }
});

// Initial call to display the todo list
updateTodoList();
