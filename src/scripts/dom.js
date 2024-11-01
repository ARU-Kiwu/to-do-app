import { addTodoToProject, createProject, deleteProject, projects, setTodoCompleted } from "./todo"

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
       `,
       add:`
       <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M9 16.0005L9.24433 2.00262" stroke="white" stroke-width="3" stroke-linecap="round"/>
       <path d="M2 9.00049H16" stroke="white" stroke-width="3" stroke-linecap="round"/>
       </svg>                
       `,
       close:`
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 14.122L17.3031 19.425C17.5845 19.7064 17.9661 19.8645 18.3641 19.8645C18.762 19.8645 19.1437 19.7064 19.4251 19.425C19.7065 19.1436 19.8646 18.7619 19.8646 18.364C19.8646 17.966 19.7065 17.5844 19.4251 17.303L14.1201 12L19.4241 6.69699C19.5634 6.55766 19.6738 6.39226 19.7492 6.21024C19.8245 6.02821 19.8633 5.83313 19.8632 5.63613C19.8632 5.43914 19.8243 5.24407 19.7489 5.06209C19.6735 4.8801 19.5629 4.71475 19.4236 4.57549C19.2843 4.43622 19.1189 4.32576 18.9368 4.25042C18.7548 4.17507 18.5597 4.13631 18.3627 4.13636C18.1657 4.13641 17.9707 4.17526 17.7887 4.25069C17.6067 4.32612 17.4414 4.43666 17.3021 4.57599L12.0001 9.87899L6.69709 4.57599C6.55879 4.43266 6.39333 4.31831 6.21036 4.23961C6.02739 4.16091 5.83058 4.11944 5.63141 4.11762C5.43224 4.11579 5.23471 4.15365 5.05033 4.22899C4.86595 4.30432 4.69842 4.41562 4.55752 4.55639C4.41661 4.69717 4.30515 4.86459 4.22964 5.0489C4.15414 5.23321 4.11609 5.43071 4.11773 5.62988C4.11936 5.82905 4.16065 6.02589 4.23917 6.20894C4.3177 6.39198 4.43189 6.55755 4.57509 6.69599L9.88009 12L4.57609 17.304C4.43289 17.4424 4.3187 17.608 4.24017 17.791C4.16165 17.9741 4.12036 18.1709 4.11873 18.3701C4.11709 18.5693 4.15514 18.7668 4.23064 18.9511C4.30615 19.1354 4.41761 19.3028 4.55852 19.4436C4.69942 19.5844 4.86695 19.6957 5.05133 19.771C5.23571 19.8463 5.43324 19.8842 5.63241 19.8824C5.83158 19.8805 6.02839 19.8391 6.21136 19.7604C6.39433 19.6817 6.55979 19.5673 6.69809 19.424L12.0001 14.122Z" fill="black"/>
       </svg>
       `
    }

     const iconEl = document.createElement('div')
     iconEl.innerHTML = icons[icon]

     iconEl.setAttribute('data-icon', '')
     iconEl.setAttribute('data', icon)
    return iconEl
}

export function generateProjectPage(project) {
    const projectPageContainer = document.querySelector('[data-project-page]');
    projectPageContainer.innerHTML = '';

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
    });

    
    const todoContainer = document.createElement('div')
    todoContainer.classList.add('todo-container')

    // Create a completed section where you can see all the completed tasks
    const completedTitle = document.createElement('h4')
    completedTitle.textContent = 'Completed'
    const completedToDosContainer = document.createElement('div')
    completedToDosContainer.classList.add('completed-todo')
    completedToDosContainer.append(completedTitle)
    projectPageContainer.append(todoInput, addTodoButton, todoContainer, completedToDosContainer);
}

export function renderTodos(project) {
    // Assuming projects is an array or object of project instances
    const container = document.querySelector('.todo-container'); // Ensure this container exists in your HTML
    container.innerHTML = ''; // Clear previous contents

    const completedContainer = document.querySelector('.completed-todo'); // Ensure this container exists in your HTML
    completedContainer.innerHTML = ''; // Clear previous contents
  
     // Loop through each ToDo in the project
     project.todos.forEach((todo, index) => {

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        todoDiv.setAttribute('data', `${index}`)


        const todoHeader = document.createElement('div')
        
        //Create to do checkbox for setting the todo complete
        const checkbox = document.createElement('input')
        todo.completed === true ? checkbox.checked = true : checkbox.checked = false;
        checkbox.setAttribute('type', 'checkbox')
        checkbox.addEventListener('change', ()=> {
            setTodoCompleted(project.id, todo.id)
            renderTodos(project)
        })
        todoHeader.append(checkbox)

        // Create and append title element
        const titleEl = document.createElement('h4');
        titleEl.textContent = `Title: ${todo.title}`;
        todoHeader.appendChild(titleEl);

        const infoWrapper = document.createElement('div')
        infoWrapper.classList.add('todo-wrapper')

        // Create and append description element
        const descEl = document.createElement('p');
        descEl.textContent = `Description: ${todo.description}`;
        infoWrapper.appendChild(descEl);

        // Create and append due date element
        const dueDateEl = document.createElement('p');
        dueDateEl.textContent = `Due Date: ${todo.dueDate}`;
        infoWrapper.appendChild(dueDateEl);

        // Create and append priority element
        const priorityEl = document.createElement('p');
        priorityEl.textContent = `Priority: ${todo.priority}`;
        infoWrapper.appendChild(priorityEl);

        // Create and append status element
        const statusEl = document.createElement('p');
        statusEl.textContent = `Completed: ${todo.completed ? 'Yes' : 'No'}`;
        infoWrapper.appendChild(statusEl);
        todoDiv.append(todoHeader)
        todoDiv.append(infoWrapper)
        container.append(todoDiv)
    });

    // // Loop through completed todos 
     project.done.forEach((todo, index) => {
       // Create a div for each completed todo item
       const todoDiv = document.createElement('div');
       todoDiv.classList.add('completed-todo');

       // Create a checkbox and mark it as checked
       const checkbox = document.createElement('input');
       checkbox.type = 'checkbox';
       checkbox.checked = todo.completed;
       todoDiv.appendChild(checkbox);

       // Create a title element with strikethrough style
       const title = document.createElement('span');
       title.textContent = `${todo.title}`;
       todoDiv.appendChild(title);

       // Create a delete button
       const deleteButton = document.createElement('button');
       deleteButton.textContent = 'Delete';
       deleteButton.addEventListener('click', () => {
           // Remove the todo from the done array
           project.done.splice(index, 1);
           renderTodos(project)
       });
       todoDiv.appendChild(deleteButton);

       // Append the completed todo item to the container
       completedContainer.appendChild(todoDiv);
    });

}

export function createProjectDialog() {
    const appendingContainer = document.querySelector('[data-dialog]')
    appendingContainer.classList.add('active')
    const dialog = document.createElement('dialog')

    const wrapper = document.createElement('div')

    const modalHeader = document.createElement('div')
    modalHeader.classList.add('modal-header')
        const modalTitle = document.createElement('span')
        modalTitle.textContent = 'Create a new project'

        const closeButton = generateIcon('close')
        closeButton.addEventListener('click', ()=> {
            dialog.remove()
            appendingContainer.classList.remove('active')
        })

    modalHeader.append(modalTitle, closeButton)

    const inputContainer = document.createElement('div')
    inputContainer.classList.add('input-container')

        const iconSelectionContainer = document.createElement('div')
        iconSelectionContainer.classList.add('icon-selection')

        //Add selection menu logic
        iconSelectionContainer.addEventListener('click', ()=> {
            iconSelectionMenu.classList.toggle('menu-active')
        })

        const defaultIcon = generateIcon('default')
        const iconSelectionMenu = document.createElement('div')
        iconSelectionMenu.classList.add('icon-selection-menu')
        // Add more icons
        const icons = [
            generateIcon('default'), generateIcon('default'), generateIcon('default'), generateIcon('default'), 
            generateIcon('default'), generateIcon('default'), generateIcon('default'), generateIcon('default'), 
            generateIcon('default'), generateIcon('default'), generateIcon('default'), generateIcon('default'), 
        ]
        icons.forEach(icon => {
            iconSelectionMenu.append(icon)
        })
        iconSelectionContainer.append(defaultIcon, iconSelectionMenu)

        const projectTitleInputContainer = document.createElement('div')
        const titleInput = document.createElement('input')
        titleInput.setAttribute('type', 'text')
        titleInput.placeholder = 'Project Title'
        projectTitleInputContainer.append(titleInput)


    inputContainer.append(iconSelectionContainer, projectTitleInputContainer)

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container')

    const createButton = document.createElement('button')
    createButton.textContent = 'Create'
    createButton.addEventListener('click', ()=> {
        let title = titleInput.value
        const icon = iconSelectionContainer.querySelector('[data-icon]').attributes[1].nodeValue
        title === '' ? title = 'No title set' : title = titleInput.value
        
        const projectsAppendingContainer = document.querySelector('[data-projectdisplay]')
        const projectIcon = createProjectIcon(icon)
        const projectIconElement = document.createElement('div')
        const projectTitleText = document.createElement('span')
        const project =  createProject(title, icon)
        projectIconElement.setAttribute('data', `${project.id}`)
        projectTitleText.textContent = title
        projectIconElement.classList.add('project-element')
        projectIconElement.append(projectIcon, projectTitleText)
        console.log(projects)
        //Generate Project Page with its to-dos
        projectIconElement.addEventListener('click', ()=> {
            generateProjectPage(project)
            renderTodos(project)
        })

        projectsAppendingContainer.append(projectIconElement)
        dialog.remove()
        appendingContainer.classList.remove('active')
    })

    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Cancel'
    cancelButton.addEventListener('click', ()=> { dialog.remove(); appendingContainer.classList.remove('active')}) 
   
    buttonContainer.append( cancelButton, createButton)


    wrapper.append(modalHeader, inputContainer, buttonContainer)

    dialog.append(wrapper)
    dialog.setAttribute('open', '')
    appendingContainer.append(dialog)
    return dialog
}







