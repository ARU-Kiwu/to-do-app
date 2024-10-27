import { generateIcon } from "./dom"

export function app() {
    const app = document.querySelector('#app')
    
    // Create the project container where you can see all of your current projects
    const projectsContainer = document.createElement('div')
    projectsContainer.setAttribute('data-projects', '')

        const addProjectContainer = document.createElement('button')
        addProjectContainer.setAttribute('data-addProject', '')

            const addProjectButtonText = document.createElement('span')
            addProjectButtonText.textContent = 'Create A project'
            const addProjectIcon = generateIcon('add')

        addProjectContainer.append(addProjectButtonText, addProjectIcon)    

        const projectsDisplayContainer = document.createElement('div')
        projectsDisplayContainer.setAttribute('data-projectDisplay', '')

        const settingsContainer = document.createElement('div')
        settingsContainer.setAttribute('data-settings', '')

    projectsContainer.append(addProjectContainer, projectsDisplayContainer, settingsContainer)

    // Create the page container to display project contents
    const projectPageContainer  = document.createElement('div')
    projectPageContainer.setAttribute('data-project-page', '')

    // Create the container for all the dialog related elements
    const dialogBoxContainer = document.createElement('div')
    dialogBoxContainer.setAttribute('data-dialog', '')

    app.append(projectsContainer, projectPageContainer, dialogBoxContainer)
}

