import { addTodoToProject, deleteProject } from "./todo"

export function createProjectIcon(icon) {
    const iconEl = generateIcon(icon)
    return iconEl
}

export function deleteProjectIcon(project) {
    const iconEl = document.querySelector(`[data="${project.id}"]`)
    iconEl.remove()
}

export function generateIcon(icon) {
    const icons = {
        default: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 9C19.2016 9 18.9155 8.88147 18.7045 8.6705C18.4935 8.45952 18.375 8.17337 18.375 7.875V5.625H16.125C15.8266 5.625 15.5405 5.50647 15.3295 5.2955C15.1185 5.08452 15 4.79837 15 4.5C15 4.20163 15.1185 3.91548 15.3295 3.7045C15.5405 3.49353 15.8266 3.375 16.125 3.375H18.375V1.125C18.375 0.826631 18.4935 0.540483 18.7045 0.329505C18.9155 0.118526 19.2016 0 19.5 0C19.7984 0 20.0845 0.118526 20.2955 0.329505C20.5065 0.540483 20.625 0.826631 20.625 1.125V3.375H22.875C23.1734 3.375 23.4595 3.49353 23.6705 3.7045C23.8815 3.91548 24 4.20163 24 4.5C24 4.79837 23.8815 5.08452 23.6705 5.2955C23.4595 5.50647 23.1734 5.625 22.875 5.625H20.625V7.875C20.625 8.17337 20.5065 8.45952 20.2955 8.6705C20.0845 8.88147 19.7984 9 19.5 9ZM4.5 20.25C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V4.5C3.75 4.30109 3.82902 4.11032 3.96967 3.96967C4.11032 3.82902 4.30109 3.75 4.5 3.75H10.875C11.1734 3.75 11.4595 3.63147 11.6705 3.4205C11.8815 3.20952 12 2.92337 12 2.625C12 2.32663 11.8815 2.04048 11.6705 1.8295C11.4595 1.61853 11.1734 1.5 10.875 1.5H4.5C3.70435 1.5 2.94129 1.81607 2.37868 2.37868C1.81607 2.94129 1.5 3.70435 1.5 4.5V19.5C1.5 20.2956 1.81607 21.0587 2.37868 21.6213C2.94129 22.1839 3.70435 22.5 4.5 22.5H19.5C20.2956 22.5 21.0587 22.1839 21.6213 21.6213C22.1839 21.0587 22.5 20.2956 22.5 19.5V13.125C22.5 12.8266 22.3815 12.5405 22.1705 12.3295C21.9595 12.1185 21.6734 12 21.375 12C21.0766 12 20.7905 12.1185 20.5795 12.3295C20.3685 12.5405 20.25 12.8266 20.25 13.125V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5Z" fill="black"/>
        </svg>

       `
    }

     const iconEl = document.createElement('div')
     iconEl.innerHTML = icons[icon]

     iconEl.setAttribute('data', icon)
     iconEl.setAttribute('data', 'icon')
    return iconEl
}

export function generateProjectPage(project) {
    const projectPageContainer = document.querySelector('#project-page');
    projectPageContainer.innerHTML = '';

    project.name === '' ? (project.name = 'No Title Set') : (project.name = project.name);
    
    // Title element
    const projectTitleElement = document.createElement('h2');
    projectTitleElement.textContent = project.name;
    projectPageContainer.append(projectTitleElement);

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Project';
    deleteButton.addEventListener('click', () => {
        projectPageContainer.innerHTML = ''; // Clear the project page
        deleteProject(project.id)
        deleteProjectIcon(project)
    });
    projectPageContainer.append(deleteButton);

    // Input for adding to-dos
    const todoInput = document.createElement('input');
    todoInput.type = 'text';
    todoInput.placeholder = 'New to-do';
    todoInput.setAttribute('data-todo-input', '');

    // Button for adding to-dos
    const addTodoButton = document.createElement('button');
    addTodoButton.textContent = 'Add To-Do';
    addTodoButton.addEventListener('click', () => {
      addTodoToProject(project.id, todoInput.value, undefined, undefined, undefined)
      renderTodos(project)
      console.log(project)
    });

    const todoContainer = document.createElement('div')
    todoContainer.classList.add('todo-container')

    projectPageContainer.append(todoInput, addTodoButton, todoContainer);
}

export function renderTodos(project) {
    // Assuming projects is an array or object of project instances
    const container = document.querySelector('.todo-container'); // Ensure this container exists in your HTML
    container.innerHTML = ''; // Clear previous contents

     // Loop through each ToDo in the project
     project.todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Create and append title element
        const titleEl = document.createElement('h4');
        titleEl.textContent = `Title: ${todo.title}`;
        todoDiv.appendChild(titleEl);

        // Create and append description element
        const descEl = document.createElement('p');
        descEl.textContent = `Description: ${todo.description}`;
        todoDiv.appendChild(descEl);

        // Create and append due date element
        const dueDateEl = document.createElement('p');
        dueDateEl.textContent = `Due Date: ${todo.dueDate}`;
        todoDiv.appendChild(dueDateEl);

        // Create and append priority element
        const priorityEl = document.createElement('p');
        priorityEl.textContent = `Priority: ${todo.priority}`;
        todoDiv.appendChild(priorityEl);

        // Create and append status element
        const statusEl = document.createElement('p');
        statusEl.textContent = `Completed: ${todo.completed ? 'Yes' : 'No'}`;
        todoDiv.appendChild(statusEl);

        container.append(todoDiv)
    });

}




