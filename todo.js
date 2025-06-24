let todoList = [];
loadTasks();
displayItems();

function addTodo() {
    let inputElement = document.getElementById("todoInput");
    let dateElement = document.getElementById("todoDate");
    let todoItem = inputElement.value.trim();
    let todoDate = dateElement.value;
     if (todoItem && todoDate) {
        todoList.push({ item: todoItem, dueDate: todoDate, completed: false });
        saveTasks();
        inputElement.value = "";
        dateElement.value = "";
        displayItems();
    }
}

function displayItems() {
    todoList.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    let allTasks = todoList.length;
    let completedTasks = 0;
    let pendingTasks = 0;

    let containerElement = document.querySelector(".todoContainer");
    let newHtml = '';

    for (let i = 0; i < todoList.length; i++) {
        let { item, dueDate, completed } = todoList[i];

        if (completed) {
            completedTasks++;
        } else {
            pendingTasks++;
        }

        newHtml += `
                <input type="checkbox" ${completed ? "checked" : ""} 
                       onchange="toggleTaskCompletion(${i})">
                <span style="text-decoration: ${completed ? 'line-through' : 'none'};">
                    ${item}
                </span>
                <span>${dueDate}</span>
                <button class="deleteButton"  onclick="todoList.splice(${i},1); displayItems(); saveTasks();">Delete</button>
        `;
    }

    containerElement.innerHTML = newHtml;

    document.querySelector(".count").innerText =
        `All Tasks: ${allTasks} | Completed: ${completedTasks} | Pending: ${pendingTasks}`;
}

function toggleTaskCompletion(index) {
    // Toggle completed value
    todoList[index].completed = !todoList[index].completed;
    displayItems(); saveTasks(); // Refresh the display
}
function saveTasks() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function loadTasks() {
    let stored = localStorage.getItem("todoList");
    if (stored) {
        todoList = JSON.parse(stored);
    }
}
