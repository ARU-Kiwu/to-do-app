
import { saveData } from "./storage";
import { addTodoToProject, createProject, deleteProject, deleteTodoFromProject, projects, setTodoCompleted, setTodoUncompleted } from "./todo"
import { format, compareAsc, formatDistance, toDate, startOfToday, add } from "date-fns";
import gsap, { wrap } from "gsap";
import { collapseToTopLeft, expandFromTopLeft, hideAnimation,slideLeft, slideRight ,revealIcon, slideDown, slideDownContainers, slideTodosToRight, slideUp, typewriterAnimation } from "./animations";
import { saveThemeToLocalStorage, getThemeFromLocalStorage } from "./storage";

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
        add: `
       <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M9 16.0005L9.24433 2.00262" stroke="white" stroke-width="3" stroke-linecap="round"/>
       <path d="M2 9.00049H16" stroke="white" stroke-width="3" stroke-linecap="round"/>
       </svg>                
       `,
        close: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 14.122L17.3031 19.425C17.5845 19.7064 17.9661 19.8645 18.3641 19.8645C18.762 19.8645 19.1437 19.7064 19.4251 19.425C19.7065 19.1436 19.8646 18.7619 19.8646 18.364C19.8646 17.966 19.7065 17.5844 19.4251 17.303L14.1201 12L19.4241 6.69699C19.5634 6.55766 19.6738 6.39226 19.7492 6.21024C19.8245 6.02821 19.8633 5.83313 19.8632 5.63613C19.8632 5.43914 19.8243 5.24407 19.7489 5.06209C19.6735 4.8801 19.5629 4.71475 19.4236 4.57549C19.2843 4.43622 19.1189 4.32576 18.9368 4.25042C18.7548 4.17507 18.5597 4.13631 18.3627 4.13636C18.1657 4.13641 17.9707 4.17526 17.7887 4.25069C17.6067 4.32612 17.4414 4.43666 17.3021 4.57599L12.0001 9.87899L6.69709 4.57599C6.55879 4.43266 6.39333 4.31831 6.21036 4.23961C6.02739 4.16091 5.83058 4.11944 5.63141 4.11762C5.43224 4.11579 5.23471 4.15365 5.05033 4.22899C4.86595 4.30432 4.69842 4.41562 4.55752 4.55639C4.41661 4.69717 4.30515 4.86459 4.22964 5.0489C4.15414 5.23321 4.11609 5.43071 4.11773 5.62988C4.11936 5.82905 4.16065 6.02589 4.23917 6.20894C4.3177 6.39198 4.43189 6.55755 4.57509 6.69599L9.88009 12L4.57609 17.304C4.43289 17.4424 4.3187 17.608 4.24017 17.791C4.16165 17.9741 4.12036 18.1709 4.11873 18.3701C4.11709 18.5693 4.15514 18.7668 4.23064 18.9511C4.30615 19.1354 4.41761 19.3028 4.55852 19.4436C4.69942 19.5844 4.86695 19.6957 5.05133 19.771C5.23571 19.8463 5.43324 19.8842 5.63241 19.8824C5.83158 19.8805 6.02839 19.8391 6.21136 19.7604C6.39433 19.6817 6.55979 19.5673 6.69809 19.424L12.0001 14.122Z" fill="black"/>
       </svg>
       `,
        star: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M5.825 21L7.45 13.975L2 9.25L9.2 8.625L12 2L14.8 8.625L22 9.25L16.55 13.975L18.175 21L12 17.275L5.825 21Z" fill="black"/>
       </svg>
       `,
        gym: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M22 14V10C22 9.068 22 8.602 21.848 8.235C21.7475 7.99218 21.6001 7.77155 21.4143 7.58572C21.2284 7.3999 21.0078 7.25251 20.765 7.152C20.398 7 19.932 7 19 7C18.068 7 17.602 7 17.235 7.152C16.9922 7.25251 16.7716 7.3999 16.5857 7.58572C16.3999 7.77155 16.2525 7.99218 16.152 8.235C16 8.602 16 9.568 16 10.5H8C8 9.568 8 8.602 7.848 8.235C7.74749 7.99218 7.6001 7.77155 7.41428 7.58572C7.22845 7.3999 7.00782 7.25251 6.765 7.152C6.398 7 5.932 7 5 7C4.068 7 3.602 7 3.235 7.152C2.99218 7.25251 2.77155 7.3999 2.58572 7.58572C2.3999 7.77155 2.25251 7.99218 2.152 8.235C2 8.602 2 9.068 2 10V14C2 14.932 2 15.398 2.152 15.765C2.25251 16.0078 2.3999 16.2284 2.58572 16.4143C2.77155 16.6001 2.99218 16.7475 3.235 16.848C3.602 17 4.068 17 5 17C5.932 17 6.398 17 6.765 16.848C7.00782 16.7475 7.22845 16.6001 7.41428 16.4143C7.6001 16.2284 7.74749 16.0078 7.848 15.765C8 15.398 8 14.432 8 13.5H16C16 14.432 16 15.398 16.152 15.765C16.2525 16.0078 16.3999 16.2284 16.5857 16.4143C16.7716 16.6001 16.9922 16.7475 17.235 16.848C17.602 17 18.068 17 19 17C19.932 17 20.398 17 20.765 16.848C21.0078 16.7475 21.2284 16.6001 21.4143 16.4143C21.6001 16.2284 21.7475 16.0078 21.848 15.765C22 15.398 22 14.932 22 14Z" fill="black"/>
       </svg>
       `,
        learn: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 17V10.1L12 15L1 9L12 3L23 9V17H21ZM12 21L5 17.2V12.2L12 16L19 12.2V17.2L12 21Z" fill="black"/>
</svg>

       `,
        shop: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 18C15.89 18 15 18.89 15 20C15 20.5304 15.2107 21.0391 15.5858 21.4142C15.9609 21.7893 16.4696 22 17 22C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20C19 19.4696 18.7893 18.9609 18.4142 18.5858C18.0391 18.2107 17.5304 18 17 18ZM1 2V4H3L6.6 11.59L5.24 14.04C5.09 14.32 5 14.65 5 15C5 15.5304 5.21071 16.0391 5.58579 16.4142C5.96086 16.7893 6.46957 17 7 17H19V15H7.42C7.3537 15 7.29011 14.9737 7.24322 14.9268C7.19634 14.8799 7.17 14.8163 7.17 14.75C7.17 14.7 7.18 14.66 7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.58 17.3 11.97L20.88 5.5C20.95 5.34 21 5.17 21 5C21 4.73478 20.8946 4.48043 20.7071 4.29289C20.5196 4.10536 20.2652 4 20 4H5.21L4.27 2M7 18C5.89 18 5 18.89 5 20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22C7.53043 22 8.03914 21.7893 8.41421 21.4142C8.78929 21.0391 9 20.5304 9 20C9 19.4696 8.78929 18.9609 8.41421 18.5858C8.03914 18.2107 7.53043 18 7 18Z" fill="black"/>
</svg>

       `,
        pen: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.71 7.04C20.37 7.38 20.04 7.71 20.03 8.04C20 8.36 20.34 8.69 20.66 9C21.14 9.5 21.61 9.95 21.59 10.44C21.57 10.93 21.06 11.44 20.55 11.94L16.42 16.08L15 14.66L19.25 10.42L18.29 9.46L16.87 10.87L13.12 7.12L16.96 3.29C17.35 2.9 18 2.9 18.37 3.29L20.71 5.63C21.1 6 21.1 6.65 20.71 7.04ZM3 17.25L12.56 7.68L16.31 11.43L6.75 21H3V17.25Z" fill="black"/>
</svg>

       `,
        flower: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.8002 12.8C20.8002 18.096 17.2962 22.4 12.0002 22.4C6.7042 22.4 3.2002 18.096 3.2002 12.8C4.96785 12.8149 6.68719 13.3787 8.12039 14.4135C9.55359 15.4483 10.6298 16.9028 11.2002 18.576V11.2H7.2002C6.56368 11.2 5.95323 10.9472 5.50314 10.4971C5.05305 10.047 4.8002 9.43653 4.8002 8.80001V4.00001C4.8002 3.8321 4.85303 3.66845 4.9512 3.53224C5.04938 3.39603 5.18792 3.29416 5.34721 3.24106C5.5065 3.18796 5.67846 3.18633 5.83873 3.2364C5.999 3.28646 6.13945 3.38568 6.2402 3.52001L8.6882 6.72001L11.3282 1.92001C11.4007 1.80773 11.5002 1.71541 11.6176 1.65149C11.735 1.58757 11.8665 1.55408 12.0002 1.55408C12.1339 1.55408 12.2654 1.58757 12.3828 1.65149C12.5002 1.71541 12.5997 1.80773 12.6722 1.92001L15.3122 6.72001L17.7602 3.52001C17.8609 3.38568 18.0014 3.28646 18.1617 3.2364C18.3219 3.18633 18.4939 3.18796 18.6532 3.24106C18.8125 3.29416 18.951 3.39603 19.0492 3.53224C19.1474 3.66845 19.2002 3.8321 19.2002 4.00001V8.80001C19.2002 9.43653 18.9473 10.047 18.4973 10.4971C18.0472 10.9472 17.4367 11.2 16.8002 11.2H12.8002V18.576C13.3706 16.9028 14.4468 15.4483 15.88 14.4135C17.3132 13.3787 19.0325 12.8149 20.8002 12.8Z" fill="black"/>
</svg>

       `,
        travel: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.9251 21.125L7.4501 16.525L2.8501 14.05L4.6251 12.3L8.2501 12.925L10.8001 10.375L2.8751 7L4.9751 4.85L14.6001 6.55L17.7001 3.45C18.0834 3.06667 18.5584 2.875 19.1251 2.875C19.6918 2.875 20.1668 3.06667 20.5501 3.45C20.9334 3.83333 21.1251 4.304 21.1251 4.862C21.1251 5.42 20.9334 5.891 20.5501 6.275L17.4251 9.4L19.1251 19L17.0001 21.125L13.6001 13.2L11.0501 15.75L11.7001 19.35L9.9251 21.125Z" fill="black"/>
</svg>

       `,
        idea: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.2652 8.10536 17.5196 8.29289 17.7071C8.48043 17.8946 8.73478 18 9 18H15C15.2652 18 15.5196 17.8946 15.7071 17.7071C15.8946 17.5196 16 17.2652 16 17V14.74C17.81 13.47 19 11.38 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2ZM9 21C9 21.2652 9.10536 21.5196 9.29289 21.7071C9.48043 21.8946 9.73478 22 10 22H14C14.2652 22 14.5196 21.8946 14.7071 21.7071C14.8946 21.5196 15 21.2652 15 21V20H9V21Z" fill="black"/>
    </svg>

       `,
        file: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 9V3.5L18.5 9M6 2C4.89 2 4 2.89 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2H6Z" fill="black"/>
        </svg>

       `,
        movie: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 4L6 8H9L7 4H9L11 8H14L12 4H14L16 8H19L17 4H20C20.55 4 21.021 4.196 21.413 4.588C21.805 4.98 22.0007 5.45067 22 6V18C22 18.55 21.8043 19.021 21.413 19.413C21.0217 19.805 20.5507 20.0007 20 20H4C3.45 20 2.97933 19.8043 2.588 19.413C2.19667 19.0217 2.00067 18.5507 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.98 4.19667 3.45067 4.00067 4 4Z" fill="black"/>
</svg>

       `,
        code: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 18L2 12L8 6L9.425 7.425L4.825 12.025L9.4 16.6L8 18ZM16 18L14.575 16.575L19.175 11.975L14.6 7.4L16 6L22 12L16 18Z" fill="black"/>
</svg>

       `,
        delete: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 4H15.5L14.5 3H9.5L8.5 4H5V6H19M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19Z" fill="black"/>
</svg>

       `,
        edit: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 11.9999C20.7348 11.9999 20.4804 12.1053 20.2929 12.2928C20.1054 12.4804 20 12.7347 20 12.9999V18.9999C20 19.2652 19.8946 19.5195 19.7071 19.707C19.5196 19.8946 19.2652 19.9999 19 19.9999H5C4.73478 19.9999 4.48043 19.8946 4.29289 19.707C4.10536 19.5195 4 19.2652 4 18.9999V4.99994C4 4.73472 4.10536 4.48037 4.29289 4.29283C4.48043 4.1053 4.73478 3.99994 5 3.99994H11C11.2652 3.99994 11.5196 3.89458 11.7071 3.70705C11.8946 3.51951 12 3.26516 12 2.99994C12 2.73472 11.8946 2.48037 11.7071 2.29283C11.5196 2.1053 11.2652 1.99994 11 1.99994H5C4.20435 1.99994 3.44129 2.31601 2.87868 2.87862C2.31607 3.44123 2 4.20429 2 4.99994V18.9999C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 21.9999 5 21.9999H19C19.7956 21.9999 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 18.9999V12.9999C22 12.7347 21.8946 12.4804 21.7071 12.2928C21.5196 12.1053 21.2652 11.9999 21 11.9999ZM6 12.7599V16.9999C6 17.2652 6.10536 17.5195 6.29289 17.707C6.48043 17.8946 6.73478 17.9999 7 17.9999H11.24C11.3716 18.0007 11.5021 17.9755 11.6239 17.9257C11.7457 17.8759 11.8566 17.8026 11.95 17.7099L18.87 10.7799L21.71 7.99994C21.8037 7.90698 21.8781 7.79637 21.9289 7.67452C21.9797 7.55266 22.0058 7.42195 22.0058 7.28994C22.0058 7.15793 21.9797 7.02722 21.9289 6.90536C21.8781 6.7835 21.8037 6.6729 21.71 6.57994L17.47 2.28994C17.377 2.19621 17.2664 2.12182 17.1446 2.07105C17.0227 2.02028 16.892 1.99414 16.76 1.99414C16.628 1.99414 16.4973 2.02028 16.3754 2.07105C16.2536 2.12182 16.143 2.19621 16.05 2.28994L13.23 5.11994L6.29 12.0499C6.19732 12.1434 6.12399 12.2542 6.07423 12.376C6.02446 12.4979 5.99924 12.6283 6 12.7599ZM16.76 4.40994L19.59 7.23994L18.17 8.65994L15.34 5.82994L16.76 4.40994ZM8 13.1699L13.93 7.23994L16.76 10.0699L10.83 15.9999H8V13.1699Z" fill="black"/>
</svg>
       ` ,
        priority: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.4 6L14 4H5V21H7V14H12.6L13 16H20V6H14.4Z" fill="black"/>
</svg>
       `,
        date: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_642_13)">
<path d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V12C11.0001 12.2652 11.1055 12.5195 11.293 12.707L14.293 15.707C14.4816 15.8892 14.7342 15.99 14.9964 15.9877C15.2586 15.9854 15.5094 15.8802 15.6948 15.6948C15.8802 15.5094 15.9854 15.2586 15.9877 14.9964C15.99 14.7342 15.8892 14.4816 15.707 14.293L13 11.586V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_642_13">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
       `,
        expand: `
       <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 4.75L10 12.25L2.5 4.75L1 6.25L10 15.25L19 6.25L17.5 4.75Z" fill="black"/>
</svg>
       `,
       theme:`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21C9.78333 21 7.89567 20.2293 6.337 18.688C4.77833 17.1467 3.99933 15.284 4 13.1C4 12 4.20833 10.9833 4.625 10.05C5.04167 9.11665 5.61667 8.28332 6.35 7.54998L10.95 3.02498C11.1 2.89165 11.2667 2.78765 11.45 2.71298C11.6333 2.63832 11.8167 2.60065 12 2.59998C12.1833 2.59932 12.3667 2.63698 12.55 2.71298C12.7333 2.78898 12.9 2.89298 13.05 3.02498L17.65 7.54998C18.3833 8.28332 18.9583 9.11665 19.375 10.05C19.7917 10.9833 20 12 20 13.1C20 15.2833 19.221 17.146 17.663 18.688C16.105 20.23 14.2173 21.0007 12 21ZM12 19V4.79998L7.75 8.99998C7.16667 9.54998 6.72933 10.171 6.438 10.863C6.14667 11.555 6.00067 12.3007 6 13.1C6 14.7167 6.58333 16.1043 7.75 17.263C8.91667 18.4217 10.3333 19.0007 12 19Z" fill="black"/>
</svg>
       `,
       settings:`
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9998 15.5C11.0716 15.5 10.1813 15.1313 9.52497 14.4749C8.86859 13.8185 8.49984 12.9283 8.49984 12C8.49984 11.0717 8.86859 10.1815 9.52497 9.52513C10.1813 8.86875 11.0716 8.5 11.9998 8.5C12.9281 8.5 13.8183 8.86875 14.4747 9.52513C15.1311 10.1815 15.4998 11.0717 15.4998 12C15.4998 12.9283 15.1311 13.8185 14.4747 14.4749C13.8183 15.1313 12.9281 15.5 11.9998 15.5ZM19.4298 12.97C19.4698 12.65 19.4998 12.33 19.4998 12C19.4998 11.67 19.4698 11.34 19.4298 11L21.5398 9.37C21.7298 9.22 21.7798 8.95 21.6598 8.73L19.6598 5.27C19.5398 5.05 19.2698 4.96 19.0498 5.05L16.5598 6.05C16.0398 5.66 15.4998 5.32 14.8698 5.07L14.4998 2.42C14.4795 2.30222 14.4182 2.19543 14.3267 2.11855C14.2351 2.04168 14.1194 1.99968 13.9998 2H9.99984C9.74984 2 9.53984 2.18 9.49984 2.42L9.12984 5.07C8.49984 5.32 7.95984 5.66 7.43984 6.05L4.94984 5.05C4.72984 4.96 4.45984 5.05 4.33984 5.27L2.33984 8.73C2.20984 8.95 2.26984 9.22 2.45984 9.37L4.56984 11C4.52984 11.34 4.49984 11.67 4.49984 12C4.49984 12.33 4.52984 12.65 4.56984 12.97L2.45984 14.63C2.26984 14.78 2.20984 15.05 2.33984 15.27L4.33984 18.73C4.45984 18.95 4.72984 19.03 4.94984 18.95L7.43984 17.94C7.95984 18.34 8.49984 18.68 9.12984 18.93L9.49984 21.58C9.53984 21.82 9.74984 22 9.99984 22H13.9998C14.2498 22 14.4598 21.82 14.4998 21.58L14.8698 18.93C15.4998 18.67 16.0398 18.34 16.5598 17.94L19.0498 18.95C19.2698 19.03 19.5398 18.95 19.6598 18.73L21.6598 15.27C21.7798 15.05 21.7298 14.78 21.5398 14.63L19.4298 12.97Z" fill="black"/>
</svg>
       `,
       timer:`
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 3V1H15V3H9ZM11 14H13V8H11V14ZM12 22C10.7667 22 9.604 21.7627 8.512 21.288C7.42 20.8133 6.466 20.1673 5.65 19.35C4.834 18.5327 4.18833 17.5783 3.713 16.487C3.23767 15.3957 3 14.2333 3 13C3 11.7667 3.23767 10.604 3.713 9.512C4.18833 8.42 4.834 7.466 5.65 6.65C6.466 5.834 7.42033 5.18833 8.513 4.713C9.60567 4.23767 10.768 4 12 4C13.0333 4 14.025 4.16667 14.975 4.5C15.925 4.83333 16.8167 5.31667 17.65 5.95L19.05 4.55L20.45 5.95L19.05 7.35C19.6833 8.18333 20.1667 9.075 20.5 10.025C20.8333 10.975 21 11.9667 21 13C21 14.2333 20.7623 15.396 20.287 16.488C19.8117 17.58 19.166 18.534 18.35 19.35C17.534 20.166 16.5797 20.812 15.487 21.288C14.3943 21.764 13.232 22.0013 12 22Z" fill="black"/>
</svg>
       `,
       dashboard: `
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 12C3 12.2652 3.10536 12.5196 3.29289 12.7071C3.48043 12.8946 3.73478 13 4 13H10C10.2652 13 10.5196 12.8946 10.7071 12.7071C10.8946 12.5196 11 12.2652 11 12V4C11 3.73478 10.8946 3.48043 10.7071 3.29289C10.5196 3.10536 10.2652 3 10 3H4C3.73478 3 3.48043 3.10536 3.29289 3.29289C3.10536 3.48043 3 3.73478 3 4V12ZM3 20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21H10C10.2652 21 10.5196 20.8946 10.7071 20.7071C10.8946 20.5196 11 20.2652 11 20V16C11 15.7348 10.8946 15.4804 10.7071 15.2929C10.5196 15.1054 10.2652 15 10 15H4C3.73478 15 3.48043 15.1054 3.29289 15.2929C3.10536 15.4804 3 15.7348 3 16V20ZM13 20C13 20.2652 13.1054 20.5196 13.2929 20.7071C13.4804 20.8946 13.7348 21 14 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V12C21 11.7348 20.8946 11.4804 20.7071 11.2929C20.5196 11.1054 20.2652 11 20 11H14C13.7348 11 13.4804 11.1054 13.2929 11.2929C13.1054 11.4804 13 11.7348 13 12V20ZM14 3C13.7348 3 13.4804 3.10536 13.2929 3.29289C13.1054 3.48043 13 3.73478 13 4V8C13 8.26522 13.1054 8.51957 13.2929 8.70711C13.4804 8.89464 13.7348 9 14 9H20C20.2652 9 20.5196 8.89464 20.7071 8.70711C20.8946 8.51957 21 8.26522 21 8V4C21 3.73478 20.8946 3.48043 20.7071 3.29289C20.5196 3.10536 20.2652 3 20 3H14Z" fill="black"/>
</svg>
`,
        projects: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.60999L21 6.80613V17.1985L12 22.3946L3 17.1985V6.80613L12 1.60999ZM4.99997 9.00002V16.0437L11 19.5078V12.4641L4.99997 9.00002ZM19 9.00006L13 12.4641V19.5078L19 16.0437V9.00006ZM12 3.91938L6.09998 7.32578L12 10.7321L17.9 7.32569L12 3.91938Z" fill="black"/>
</svg>

        `,
        completedTodos: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 1H8V5H16V1Z" fill="black"/>
<path d="M6 3H3V23H13.876C13.0193 21.9035 12.537 20.5611 12.5002 19.17C12.4633 17.779 12.8739 16.4129 13.6714 15.2726C14.4689 14.1324 15.6113 13.2781 16.9305 12.8355C18.2497 12.3929 19.6762 12.3854 21 12.814V3H18V7H6V3Z" fill="black"/>
<path d="M19.2424 21L17.7422 22.414L16.2424 21L16.3282 21L14.328 19L15.742 17.585L17.7422 19.586L22.3282 15L23.7422 16.415L19.1572 21L19.2424 21Z" fill="black"/>
</svg>

        `,
        uncompletedTodos: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 1H8V5H16V1Z" fill="black"/>
<path d="M6 3H3V23H13.876C13.0193 21.9035 12.537 20.5611 12.5002 19.17C12.4633 17.779 12.8739 16.4129 13.6714 15.2726C14.4689 14.1324 15.6113 13.2781 16.9305 12.8355C18.2497 12.3929 19.6762 12.3854 21 12.814V3H18V7H6V3Z" fill="black"/>
<path d="M23.2428 21.828L21.8288 23.243L18.9998 20.414L16.1718 23.243L14.7578 21.828L17.5858 19L14.7578 16.172L16.1718 14.757L18.9998 17.586L21.8288 14.757L23.2428 16.172L20.4148 19L23.2428 21.828Z" fill="black"/>
</svg>

        `,
        highPriorityTodos: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 1H8V5H16V1Z" fill="black"/>
<path d="M6 3H3V23H13.876C13.0193 21.9035 12.537 20.5611 12.5002 19.17C12.4633 17.779 12.8739 16.4129 13.6714 15.2726C14.4689 14.1324 15.6113 13.2781 16.9305 12.8355C18.2497 12.3929 19.6762 12.3854 21 12.814V3H18V7H6V3Z" fill="black"/>
<g clip-path="url(#clip0_943_26)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.675 20.5L17.8438 14.1719C18.2319 13.3966 19.3344 13.3966 19.7188 14.1719L22.8875 20.5C22.9681 20.6604 23.0064 20.8388 22.9988 21.0181C22.9912 21.1975 22.9379 21.372 22.8441 21.525C22.7502 21.678 22.6188 21.8045 22.4623 21.8926C22.3059 21.9806 22.1295 22.0273 21.95 22.0281H15.6125C14.8306 22.0281 14.3188 21.2013 14.675 20.5ZM19.4844 16.6375C19.4844 16.1406 19.1216 15.9344 18.7813 15.9344C18.441 15.9344 18.0781 16.1425 18.0781 16.6375C18.0781 17.1325 18.2544 18.025 18.3125 18.2781C18.3706 18.5313 18.5225 18.7469 18.7813 18.7469C19.04 18.7469 19.1844 18.5341 19.25 18.2781C19.3156 18.0222 19.4844 17.125 19.4844 16.6375ZM19.4844 20.1531C19.4844 20.3396 19.4103 20.5185 19.2785 20.6503C19.1466 20.7822 18.9678 20.8563 18.7813 20.8563C18.5948 20.8563 18.416 20.7822 18.2841 20.6503C18.1522 20.5185 18.0781 20.3396 18.0781 20.1531C18.0781 19.9666 18.1522 19.7878 18.2841 19.6559C18.416 19.5241 18.5948 19.45 18.7813 19.45C18.9678 19.45 19.1466 19.5241 19.2785 19.6559C19.4103 19.7878 19.4844 19.9666 19.4844 20.1531Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_943_26">
<rect width="15" height="15" fill="white" transform="translate(8 7)"/>
</clipPath>
</defs>
</svg>
        `,
        play: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6386 10.4936C16.9321 10.6497 17.1777 10.8827 17.3489 11.1676C17.5201 11.4526 17.6105 11.7788 17.6105 12.1112C17.6105 12.4436 17.5201 12.7698 17.3489 13.0547C17.1777 13.3397 16.9321 13.5727 16.6386 13.7288L8.80923 17.9863C7.54853 18.6726 6 17.7804 6 16.3693V7.85365C6 6.44201 7.54853 5.55042 8.80923 6.23546L16.6386 10.4936Z" fill="black"/>
</svg>

        `,
        hold: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 6H16C17.1 6 18 6.9 18 8V16C18 17.1 17.1 18 16 18H8C6.9 18 6 17.1 6 16V8C6 6.9 6.9 6 8 6Z" fill="black"/>
</svg>

        `,
        restart: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.4036 6.72C14.0836 6.72 15.6836 7.36 16.8836 8.56C19.3636 11.04 19.3636 15.12 16.8836 17.6C15.4436 19.12 13.4436 19.68 11.5236 19.44L11.9236 17.84C13.2836 18 14.7236 17.52 15.7636 16.48C17.6036 14.64 17.6036 11.6 15.7636 9.68C14.8836 8.8 13.6036 8.32 12.4036 8.32V12L8.40364 8L12.4036 4V6.72ZM7.84364 17.6C5.76364 15.52 5.44364 12.32 6.88364 9.84L8.08364 11.04C7.20364 12.8 7.52364 15.04 9.04364 16.48C9.44364 16.88 9.92364 17.2 10.4836 17.44L10.0036 19.04C9.20364 18.72 8.48364 18.24 7.84364 17.6Z" fill="black"/>
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

    //Title Header
    const projectPageHeader = document.createElement('div')
    projectPageHeader.classList.add('project-page-header')

    // Title element
    const projectTitleElement = document.createElement('h2');
    projectTitleElement.setAttribute('data', `${project.id}`);
    projectTitleElement.setAttribute('title', `${project.name}`)
    projectTitleElement.textContent = `${truncateString(project.name, 25)}`;
    projectPageHeader.append(projectTitleElement);

    const buttonContainer = document.createElement('div')
    // Delete button
    const deleteButton = generateIcon('delete')
    deleteButton.addEventListener('click', () => {
        deleteProjectDialog(project)
    });

    // Edit button
    const editButton = generateIcon('edit');
    editButton.addEventListener('click', () => {
        editProjectDialog(project)
    });

    const filterContainer = document.createElement('div');
    filterContainer.classList.add('filters');

    const filters = document.createElement('div');
    const toDoButton = document.createElement('button');
    toDoButton.classList.add('active')
    toDoButton.textContent = 'To do'
    toDoButton.addEventListener('click', () => {
        const completedButton = document.querySelector('.filters > div button:nth-of-type(2)')
        renderTodos(project)
        completedButton.classList.contains('active') ? completedButton.classList.remove('active') : completedButton.classList
        !toDoButton.classList.contains('active') ? toDoButton.classList.add('active') : toDoButton.classList.remove('active')
    })

    const completedTodosInfo = document.createElement('div')
    completedTodosInfo.classList.add('completedTodosNumber')
    const completedTodosText = document.createElement('p')
    completedTodosText.setAttribute('completed-todos', '')
    completedTodosInfo.append(completedTodosText)

    const completedButton = document.createElement('button')
    completedButton.addEventListener('click', () => {
        !completedButton.classList.contains('active') ? completedButton.classList.add('active') : completedButton.classList.remove('active')
        toDoButton.classList.contains('active') ? toDoButton.classList.remove('active') : toDoButton.classList
        renderCompletedTodos(project)
    })
    completedButton.textContent = 'Completed'
    completedButton.append(completedTodosInfo)

    const addToDoButtonContainer = document.createElement('div')
    const addToDoButton = generateIcon('add')
    addToDoButton.addEventListener('click', () => {
        createAddToDoDialog()
    })
    addToDoButtonContainer.append(addToDoButton)

    filters.append(toDoButton, completedButton, addToDoButtonContainer)
    filterContainer.append(filters)

    const toDoContainer = document.createElement('div')
    toDoContainer.classList.add('to-dos')



    buttonContainer.append(editButton, deleteButton);
    projectPageHeader.append(buttonContainer);
    projectPageContainer.append(projectPageHeader, filterContainer, toDoContainer);
    slideDownContainers(projectPageHeader, filterContainer, gsap)

}

export function renderProjectsIcons(projects) {
    const projectdisplay = document.querySelector('[data-projectdisplay]')
    projectdisplay.innerHTML = ''

    const header = document.createElement('div')
    header.classList.add('projectsDisplayHeader')
    const title = document.createElement('p')
    title.innerText = 'Projects'
    const closeIcon = generateIcon('close')

    closeIcon.addEventListener('click', ()=> {
        const projectsContainer = document.querySelector('[data-projectdisplay]')
        projectsContainer.classList.remove('active')
    })
    
    header.append(title, closeIcon)
    projectdisplay.append(header)
    for (let project of Object.values(projects)) {
        const icon = renderProjectIcon(project) 
        projectdisplay.append(icon)
    }
}

// Function to remove a project icon and animate icons below it
export function removeProjectIcon(projectId) {
    const projectdisplay = document.querySelector('[data-projectdisplay]');
    
    if (!projectdisplay) return;

    const iconToRemove = projectdisplay.querySelector(`[data="${projectId}"]`);

    if (iconToRemove) {
       iconToRemove.remove()
    }
}




export function renderProjectIcon(project) {
    const projectDisplay = document.querySelector('[data-projectdisplay]')

    const projectIconElement = document.createElement('div')
    const projectIcon = createProjectIcon(project.icon)
    const projectTitleText = document.createElement('span')
    projectIconElement.setAttribute('data', `${project.id}`)
    projectTitleText.textContent = `${truncateString(project.name, 18)}`
    projectIconElement.setAttribute('title', `${project.name}`)
    projectIconElement.classList.add('project-element')
    projectIconElement.append(projectIcon, projectTitleText)
    //Generate Project Page with its to-dos
    projectIconElement.addEventListener('click', () => {
        projectDisplay.classList.remove('active')
        generateProjectPage(project)
        if (project.done.length > 0) { setCompletedDisplayOn(project) }
        renderTodos(project)
        slideTodosToRight(gsap)
    })
    return projectIconElement
}

export function renderTodos(project) {
    // Assuming projects is an array or object of project instances
    const container = document.querySelector('.to-dos'); // Ensure this container exists in your HTML
    container.innerHTML = ''; // Clear previous contents


    // Loop through each ToDo in the project
    project.todos.forEach((todo, index) => {

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.setAttribute('data', `${index}`);
        todoDiv.classList.add(`${todo.priority}`);
        todoDiv.setAttribute('data', `${todo.id}`)
        const todoHeader = document.createElement('div');

        const checkboxWrapper = document.createElement('div')
        checkboxWrapper.classList.add('checkbox-wrapper-13')
        //Create to do checkbox for setting the todo complete
        const checkbox = document.createElement('input')
        checkbox.id = todo.id
        const label = document.createElement('label')
        label.setAttribute('for', `${todo.id}`)
        todo.completed === true ? checkbox.checked = true : checkbox.checked = false;
        checkbox.setAttribute('type', 'checkbox')
        checkbox.addEventListener('change', () => {
            setTodoCompleted(project.id, todo.id)
            saveData()
            slideRight(todoDiv, gsap, ()=> {
                renderTodos(project)
                setCompletedDisplayOn(project)
            })
        })

        // Create and append title element
        const titleElement = document.createElement('h4');
        titleElement.textContent = `${todo.title}`;
        todoHeader.appendChild(titleElement);


        //Create the edit icon
        const editIcon = generateIcon('edit')
        editIcon.addEventListener('click', ()=> {
            editToDoDialog(project, todo)
        })
        checkboxWrapper.append(checkbox, label)
        todoHeader.append(checkboxWrapper, titleElement, editIcon)
        const additionalInfoContainer = document.createElement('div');

        const priorityInfoContainer = document.createElement('div');
        priorityInfoContainer.classList.add('priority-info');

        const priorityIcon = generateIcon('priority');
        priorityIcon.setAttribute('data-priority', `${todo.priority}`);
        const priorityText = document.createElement('span');
        priorityText.textContent = todo.priority;

        priorityInfoContainer.append(priorityIcon, priorityText)

        const dueTimeInfoContainer = document.createElement('div');
        const dueIcon = generateIcon('date');
        const dueText = formatDistance(startOfToday(), toDate(new Date(`${todo.dueDate}`)));
        dueTimeInfoContainer.classList.add('deadline-info');

        const descriptionExpandIcon = generateIcon('expand');

        dueTimeInfoContainer.append(dueIcon, dueText);
        additionalInfoContainer.append(priorityInfoContainer, dueTimeInfoContainer, descriptionExpandIcon);

        // Create and append description element
        const descriptionElement = document.createElement('div')
        const descEl = document.createElement('p');
        descEl.textContent = `${todo.description}`;
        descriptionExpandIcon.addEventListener('click', () => {
            descriptionElement.classList.toggle('expanded')
            descriptionExpandIcon.classList.toggle('expanded')
        })
        todoDiv.append(todoHeader);
        todoDiv.append(additionalInfoContainer);
        descriptionElement.append(descEl)
        todoDiv.appendChild(descriptionElement);
        container.append(todoDiv);
    });

}

export function renderCompletedTodos(project) {

    // Assuming projects is an array or object of project instances
    const container = document.querySelector('.to-dos'); // Ensure this container exists in your HTML
    container.innerHTML = ''; // Clear previous contents

    // // Loop through completed todos 
    project.done.forEach((todo, index) => {
        // Create a div for each completed todo item
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('completed-todo');


        const checkboxWrapper = document.createElement('div')
        checkboxWrapper.classList.add('checkbox-wrapper-13')

        // Create a checkbox and mark it as checked
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.id = todo.id
        const label = document.createElement('label')
        checkboxWrapper.append(checkbox, label)
        checkbox.addEventListener('click', ()=> {
           slideLeft(todoDiv, gsap, ()=> {
                setTodoUncompleted(project.id, todo.id)
                renderCompletedTodos(project)
                if(project.done.length == 0) {
                    setCompletedDisplayOff(project)
                    saveData()
                    return
                }
                setCompletedDisplayOn(project)
                saveData()
            })
           saveData()
        })
        todoDiv.appendChild(checkboxWrapper);

        // Create a title element with strikethrough style
        const title = document.createElement('span');
        title.textContent = `${todo.title}`;
        todoDiv.appendChild(title);



        // Create a delete button
        const deleteButton = generateIcon('delete')
        deleteButton.addEventListener('click', () => {
            // Remove the todo from the done array
            project.done.splice(index, 1);
            saveData()
            hideAnimation(todoDiv, gsap, ()=> {
                renderProjectsIcons(projects)
                if (project.done.length <= 0) {
                    saveData()
                    setCompletedDisplayOff(project)
                    renderCompletedTodos(project)
                    slideTodosToRight(gsap)
                    return
                }
                renderCompletedTodos(project)
                setCompletedDisplayOn(project)
            })
        });
        todoDiv.appendChild(deleteButton);

        // Append the completed todo item to the container
        container.appendChild(todoDiv);
    });

}

export function createProjectDialog() {
    const appendingContainer = document.querySelector('[data-dialog]')
    appendingContainer.classList.add('active')
    const dialog = document.createElement('dialog')
    const wrapper = document.createElement('div')
    slideDown(wrapper, gsap)
    const modalHeader = document.createElement('div')
    modalHeader.classList.add('modal-header')
    const modalTitle = document.createElement('span')
    modalTitle.textContent = 'Create a new project'

    const closeButton = generateIcon('close')
    closeButton.addEventListener('click', () => {
        slideUp(wrapper, gsap, () => {
            appendingContainer.classList.remove('active')
            dialog.remove()
        })
    })

    modalHeader.append(modalTitle, closeButton)

    const inputContainer = document.createElement('div')
    inputContainer.classList.add('input-container')

    const iconSelectionContainer = document.createElement('div')
    iconSelectionContainer.classList.add('icon-selection')


    const selectedIcon = document.createElement('div')
    selectedIcon.classList.add('selectedIcon')

    // Add selection menu logic
    iconSelectionContainer.addEventListener('click', (event) => {
        if (iconSelectionMenu.classList.contains('menu-active')) { return }
        event.stopPropagation(); // Prevent click from triggering the outside click handler
        iconSelectionMenu.classList.toggle('menu-active');
        expandFromTopLeft(iconSelectionMenu, gsap);
        // Click outside to remove 'menu-active' class
        document.addEventListener('click', (event) => {
            // Check if the click was outside the menu
            if (iconSelectionContainer.contains(event.target) && iconSelectionMenu.classList.contains('menu-active')) {
                return;  // Do nothing if click is inside iconSelectionContainer
            }
            if (!iconSelectionMenu.contains(event.target)) {
                iconSelectionMenu.classList.remove('menu-active');
            }
        });
    });


    let defaultIcon = generateIcon('default')
    const iconSelectionMenu = document.createElement('div')
    iconSelectionMenu.classList.add('icon-selection-menu')
    // Add more icons
    const icons = [
        generateIcon('default'), generateIcon('star'), generateIcon('gym'), generateIcon('learn'),
        generateIcon('shop'), generateIcon('pen'), generateIcon('flower'), generateIcon('travel'),
        generateIcon('idea'), generateIcon('file'), generateIcon('movie'), generateIcon('code'),
    ]
    icons.forEach(icon => {
        iconSelectionMenu.append(icon)
        icon.addEventListener('click', () => {
            collapseToTopLeft(iconSelectionMenu, gsap, () => {
                iconSelectionMenu.classList.remove('menu-active')
                const selectedIcon = document.querySelector('.selectedIcon')
                const newIcon = generateIcon(icon.attributes[1].nodeValue)
                selectedIcon.innerHTML = ''
                selectedIcon.append(newIcon)
                const iconSVG = newIcon.querySelector('svg')
                revealIcon(icon, gsap)
            })

        })
    })
    selectedIcon.append(defaultIcon)
    iconSelectionContainer.append(selectedIcon, iconSelectionMenu)

    const projectTitleInputContainer = document.createElement('div')
    const titleInput = document.createElement('input')
    titleInput.setAttribute('type', 'text')
    titleInput.setAttribute('maxlength', '20')
    titleInput.placeholder = 'Project Title'

    const label = document.createElement('label')
    projectTitleInputContainer.append(titleInput)


    inputContainer.append(iconSelectionContainer, projectTitleInputContainer)

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('button-container')

    const createButton = document.createElement('button')
    createButton.textContent = 'Create'
    createButton.addEventListener('click', () => {
        let title = titleInput.value
        const icon = iconSelectionContainer.querySelector('[data-icon]').attributes[1].nodeValue
        title === '' ? title = 'No title set' : title = titleInput.value
        const project = createProject(title, icon)
        saveData()
        renderProjectsIcons(projects)
        appendingContainer.classList.remove('active')
        const dashboardElement = document.querySelector('.dashboard')
        if(dashboardElement !== null) { 
            const metricContainer = document.querySelector('.dashboard-info')
            rerenderMetrics(projects, metricContainer)
        }

        dialog.remove()
    })

    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Cancel'
    cancelButton.addEventListener('click', () => {
        slideUp(wrapper, gsap, () => {
            appendingContainer.classList.remove('active')
            dialog.remove()
        })
    })

    buttonContainer.append(cancelButton, createButton)


    wrapper.append(modalHeader, inputContainer, buttonContainer)

    dialog.append(wrapper)
    dialog.setAttribute('open', '')
    appendingContainer.append(dialog)
    return dialog
}


export function createAddToDoDialog(project) {
    const appendingContainer = document.querySelector('[data-dialog]')
    appendingContainer.classList.add('active')
    const dialog = document.createElement('dialog')
    dialog.classList.add('to-do-dialog')

    const modalHeader = document.createElement('div')
    modalHeader.classList.add('modal-header')
    const modalTitle = document.createElement('span')
    modalTitle.textContent = 'Create a task'

    const closeButton = generateIcon('close')
    closeButton.addEventListener('click', () => {
        slideUp(wrapper, gsap, ()=> {
            dialog.remove()
            appendingContainer.classList.remove('active')
        })
    })

    modalHeader.append(modalTitle, closeButton)

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container')
    const taskTitle = document.createElement('input');
    taskTitle.placeholder = 'What do you have to do?';
    taskTitle.maxLength = 35

    const taskDescription = document.createElement('textarea');
    taskDescription.placeholder = 'Describe the task'
    taskDescription.maxLength = 150

    const infoContainer = document.createElement('div');

    const taskPriorityContainer = document.createElement('div');
    taskPriorityContainer.classList.add('task-priority-container')

    const defaultPriorityContainer = document.createElement('div');

    const priorityIcon = generateIcon('priority');
    priorityIcon.setAttribute('data-priority', 'none');

    const priorityText = document.createElement('span')
    priorityText.textContent = 'None'

    const priorityMenu = document.createElement('div')
    defaultPriorityContainer.addEventListener('click', (e) => {
        priorityMenu.classList.add('menu-active')
        defaultPriorityContainer.classList.add('outlined')
    })

    document.addEventListener('click', (e) => {
        // Check if the click was outside the menu and container
        if (!priorityMenu.contains(e.target) && !defaultPriorityContainer.contains(e.target)) {
            priorityMenu.classList.remove('menu-active');
            defaultPriorityContainer.classList.remove('outlined');
        }
    });

    priorityMenu.classList.add('priority-menu')
    defaultPriorityContainer.append(priorityIcon, priorityText)
    defaultPriorityContainer.classList.add('priority-container')
    taskPriorityContainer.append(defaultPriorityContainer, priorityMenu)

    const priorities = ['None', 'Low', 'Medium', 'High']

    function generatePriorityIcons(priorities) {
        priorities.forEach(priority => {
            const priorityContainer = document.createElement('div')

            const priorityIcon = generateIcon('priority')
            const priorityText = document.createElement('span')
            priorityText.textContent = priority

            priorityIcon.setAttribute('data-priority', `${priority}`);

            priorityContainer.append(priorityIcon, priorityText)

            priorityContainer.addEventListener('click', () => {
                defaultPriorityContainer.innerHTML = '';
                const icon = generateIcon('priority');
                icon.setAttribute('data-priority', `${priority}`);
                const text = document.createElement('span');
                text.textContent = priority;
                defaultPriorityContainer.append(icon, text);
                priorityMenu.classList.remove('menu-active');
                defaultPriorityContainer.classList.remove('outlined')
            })
            priorityMenu.append(priorityContainer)
        })
    }

    generatePriorityIcons(priorities)

    const taskDueContainer = document.createElement('div');
    taskDueContainer.classList.add('due')

    const dateInput = document.createElement('input')
    dateInput.type = 'date'
    dateInput.setAttribute('value', `${format(new Date(), "yyyy-MM-dd")}`)

    const dateInputText = document.createElement('span')
    dateInputText.classList.add('date-text')
    dateInputText.textContent = dateInput.value

    taskDueContainer.addEventListener('click', () => {
        dateInput.showPicker ? dateInput.focus() : dateInput.blur();
        dateInput.showPicker()
    });

    taskDueContainer.addEventListener('input', () => {
        dateInputText.textContent = dateInput.value
        dateInput.blur()
    });

    const dateIcon = generateIcon('date')

    taskDueContainer.append(dateIcon, dateInput, dateInputText)

    infoContainer.append(taskDueContainer, taskPriorityContainer);
    inputContainer.append(taskTitle, taskDescription, infoContainer);

    const buttonsContainer = document.createElement('div')

    const createToDoButton = document.createElement('button')
    createToDoButton.textContent = 'Create To Do'

    createToDoButton.addEventListener('click', () => {
        const projectId = document.querySelector('.project-page-header h2').attributes[0].value
        const project = projects[projectId]
        let title = document.querySelector('.input-container > input').value
        let description = document.querySelector('.input-container > textarea').value
        const due = document.querySelector('input[type="date"]').value
        const priority = document.querySelector('.priority-container span').innerText

        title === '' ? title = 'Nothing specified' : title = document.querySelector('.input-container > input').value
        description === '' ? description = 'No description set' : description = document.querySelector('.input-container > textarea').value

        // Add to do 
        addTodoToProject(projectId, title, description, due, priority);
        saveData()
        renderTodos(project)
        appendingContainer.classList.remove('active')
        dialog.remove()
    })

    buttonsContainer.append(createToDoButton)

    const wrapper = document.createElement('div')
    wrapper.append(modalHeader, inputContainer, buttonsContainer)
    dialog.append(wrapper)
    slideDown(wrapper, gsap)
    appendingContainer.append(dialog)
}


export function setCompletedDisplayOn(project) {
    const display = document.querySelector('.completedTodosNumber')
    display.classList.add('active')

    const text = document.querySelector('[completed-todos]')
    text.textContent = project.done.length
}

export function setCompletedDisplayOff(project) {
    const completedToDosDisplay = document.querySelector('.completedTodosNumber.active')
    completedToDosDisplay.classList.remove('active')
}

export function truncateString(str, maxLen) {
    if (str.length > maxLen) {
      return str.slice(0, maxLen) + '...';
    }
    return str.toString();
  }

export function deleteProjectDialog(project) {
    const appendingContainer = document.querySelector('[data-dialog]')
    appendingContainer.classList.add('active')
    const dialog = document.createElement('dialog')
    dialog.classList.add('delete-project')

    const wrapper = document.createElement('div')

    const modalHeader = document.createElement('div')
    modalHeader.classList.add('modal-header')
    const modalTitle = document.createElement('span')
    modalTitle.textContent = 'Delete a project'

    const closeButton = generateIcon('close')
    closeButton.addEventListener('click', () => {
        slideUp(wrapper, gsap, ()=> {
            dialog.remove()
            appendingContainer.classList.remove('active')
        })
    })

    const firstTextContainer = document.createElement('div')
    const textOne = document.createElement('span')
    textOne.innerHTML = `Are you sure you want to delete`
    firstTextContainer.append(textOne)
    firstTextContainer.classList.add('text-container')

    const iconContainer = document.createElement('div')
    iconContainer.classList.add('delete-project-icon-container')
    const icon = generateIcon(`${project.icon}`)
    iconContainer.append(icon)

    const textContainer = document.createElement('div')
    const text = document.createElement('span')
    text.innerHTML = `<b>${project.name}</b> project?`
    textContainer.append(text)
    textContainer.classList.add('text-container')

    const buttonsContainer = document.createElement('div')
    const secondaryCancelButton = document.createElement('button')
    secondaryCancelButton.textContent = 'Cancel'
    secondaryCancelButton.addEventListener('click', ()=> {
        slideUp(wrapper, gsap, ()=> {
            dialog.remove()
            appendingContainer.classList.remove('active')
        })
    })
    const confirmButton = document.createElement('button')
    confirmButton.textContent = 'Confirm'
    confirmButton.addEventListener('click', ()=> {
        const items = document.querySelectorAll('[data-project-page] > div')
        const projectPageContainer = document.querySelector('[data-project-page]')
        slideUp(items, gsap, ()=> {
            projectPageContainer.innerHTML = ''; // Clear the project page
            deleteProject(project.id);
            removeProjectIcon(project.id);
            saveData()
            slideUp(wrapper, gsap, ()=> {
                dialog.remove()
                appendingContainer.classList.remove('active')
            })
        })
    })

    buttonsContainer.append(secondaryCancelButton, confirmButton)
    buttonsContainer.classList.add('buttons-container')

    modalHeader.append(modalTitle, closeButton);
    wrapper.append(modalHeader, firstTextContainer ,iconContainer, textContainer, buttonsContainer);
    dialog.append(wrapper);
    appendingContainer.append(dialog);
}

export function editProjectDialog(project) {
    const appendingContainer = document.querySelector('[data-dialog]');
    appendingContainer.classList.add('active');
    const dialog = document.createElement('dialog');
    const wrapper = document.createElement('div');
    slideDown(wrapper, gsap);

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    const modalTitle = document.createElement('span');
    modalTitle.textContent = 'Edit Project';

    const closeButton = generateIcon('close');
    closeButton.addEventListener('click', () => {
        slideUp(wrapper, gsap, () => {
            appendingContainer.classList.remove('active');
            dialog.remove();
        });
    });

    modalHeader.append(modalTitle, closeButton);

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');

    const iconSelectionContainer = document.createElement('div');
    iconSelectionContainer.classList.add('icon-selection');

    const selectedIcon = document.createElement('div');
    selectedIcon.classList.add('selectedIcon');

    // Add selection menu logic
    iconSelectionContainer.addEventListener('click', (event) => {
        if (iconSelectionMenu.classList.contains('menu-active')) { return }
        event.stopPropagation();
        iconSelectionMenu.classList.toggle('menu-active');
        expandFromTopLeft(iconSelectionMenu, gsap);
        
        document.addEventListener('click', (event) => {
            if (!iconSelectionMenu.contains(event.target) && !iconSelectionContainer.contains(event.target)) {
                iconSelectionMenu.classList.remove('menu-active');
            }
        });
    });

    let defaultIcon = generateIcon(project.icon || 'default'); // Set the current project icon
    const iconSelectionMenu = document.createElement('div');
    iconSelectionMenu.classList.add('icon-selection-menu');
    
    const icons = [
        generateIcon('default'), generateIcon('star'), generateIcon('gym'), generateIcon('learn'),
        generateIcon('shop'), generateIcon('pen'), generateIcon('flower'), generateIcon('travel'),
        generateIcon('idea'), generateIcon('file'), generateIcon('movie'), generateIcon('code'),
    ];
    icons.forEach(icon => {
        iconSelectionMenu.append(icon);
        icon.addEventListener('click', () => {
            collapseToTopLeft(iconSelectionMenu, gsap, () => {
                iconSelectionMenu.classList.remove('menu-active');
                selectedIcon.innerHTML = '';
                const newIcon = generateIcon(icon.attributes[1].nodeValue);
                selectedIcon.append(newIcon);
                revealIcon(icon, gsap);
            });
        });
    });
    selectedIcon.append(defaultIcon);
    iconSelectionContainer.append(selectedIcon, iconSelectionMenu);

    const projectTitleInputContainer = document.createElement('div');
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('maxlength', '32')
    titleInput.placeholder = 'Project Title';
    titleInput.value = project.name || ''; // Set the current project title
    projectTitleInputContainer.append(titleInput);

    inputContainer.append(iconSelectionContainer, projectTitleInputContainer);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
        let title = titleInput.value || 'No title set';
        const icon = selectedIcon.querySelector('[data-icon]').attributes[1].nodeValue;
        project.name = title;
        project.icon = icon;

        saveData();
        renderProjectsIcons(projects);
        generateProjectPage(project)
        dialog.remove();
        appendingContainer.classList.remove('active');
    });

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        slideUp(wrapper, gsap, () => {
            appendingContainer.classList.remove('active');
            dialog.remove();
        });
    });

    buttonContainer.append(cancelButton, saveButton);

    wrapper.append(modalHeader, inputContainer, buttonContainer);

    dialog.append(wrapper);
    dialog.setAttribute('open', '');
    appendingContainer.append(dialog);
    return dialog;
}

export function editToDoDialog(project, todo) {
    const appendingContainer = document.querySelector('[data-dialog]');
    appendingContainer.classList.add('active');
    const dialog = document.createElement('dialog');
    dialog.classList.add('to-do-dialog');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    const modalTitle = document.createElement('span');
    modalTitle.textContent = 'Edit Task';

    const closeButton = generateIcon('close');
    closeButton.addEventListener('click', () => {
        slideUp(wrapper, gsap, () => {
            dialog.remove();
            appendingContainer.classList.remove('active');
        });
    });

    modalHeader.append(modalTitle, closeButton);

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');

    const taskTitle = document.createElement('input');
    taskTitle.placeholder = 'What do you have to do?';
    taskTitle.maxLength = 35;
    taskTitle.value = todo.title || ''; // Prefill with existing title

    const taskDescription = document.createElement('textarea');
    taskDescription.placeholder = 'Describe the task';
    taskDescription.maxLength = 150;
    taskDescription.value = todo.description || ''; // Prefill with existing description

    const infoContainer = document.createElement('div');

    const taskPriorityContainer = document.createElement('div');
    taskPriorityContainer.classList.add('task-priority-container');

    const defaultPriorityContainer = document.createElement('div');
    const priorityIcon = generateIcon('priority');
    priorityIcon.setAttribute('data-priority', todo.priority || 'none'); // Prefill with existing priority
    const priorityText = document.createElement('span');
    priorityText.textContent = todo.priority || 'None';

    const priorityMenu = document.createElement('div');
    defaultPriorityContainer.addEventListener('click', (e) => {
        priorityMenu.classList.add('menu-active');
        defaultPriorityContainer.classList.add('outlined');
    });

    document.addEventListener('click', (e) => {
        if (!priorityMenu.contains(e.target) && !defaultPriorityContainer.contains(e.target)) {
            priorityMenu.classList.remove('menu-active');
            defaultPriorityContainer.classList.remove('outlined');
        }
    });

    priorityMenu.classList.add('priority-menu');
    defaultPriorityContainer.append(priorityIcon, priorityText);
    defaultPriorityContainer.classList.add('priority-container');
    taskPriorityContainer.append(defaultPriorityContainer, priorityMenu);

    const priorities = ['None', 'Low', 'Medium', 'High'];

    function generatePriorityIcons(priorities) {
        priorities.forEach(priority => {
            const priorityContainer = document.createElement('div');

            const priorityIcon = generateIcon('priority');
            const priorityText = document.createElement('span');
            priorityText.textContent = priority;

            priorityIcon.setAttribute('data-priority', `${priority}`);

            priorityContainer.append(priorityIcon, priorityText);

            priorityContainer.addEventListener('click', () => {
                defaultPriorityContainer.innerHTML = '';
                const icon = generateIcon('priority');
                icon.setAttribute('data-priority', `${priority}`);
                const text = document.createElement('span');
                text.textContent = priority;
                defaultPriorityContainer.append(icon, text);
                priorityMenu.classList.remove('menu-active');
                defaultPriorityContainer.classList.remove('outlined');
            });
            priorityMenu.append(priorityContainer);
        });
    }

    generatePriorityIcons(priorities);

    const taskDueContainer = document.createElement('div');
    taskDueContainer.classList.add('due');

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.setAttribute('value', todo.due || format(new Date(), "yyyy-MM-dd")); // Prefill with existing due date

    const dateInputText = document.createElement('span');
    dateInputText.classList.add('date-text');
    dateInputText.textContent = dateInput.value;

    taskDueContainer.addEventListener('click', () => {
        dateInput.showPicker ? dateInput.focus() : dateInput.blur();
        dateInput.showPicker();
    });

    taskDueContainer.addEventListener('input', () => {
        dateInputText.textContent = dateInput.value;
        dateInput.blur();
    });

    const dateIcon = generateIcon('date');

    taskDueContainer.append(dateIcon, dateInput, dateInputText);

    infoContainer.append(taskDueContainer, taskPriorityContainer);
    inputContainer.append(taskTitle, taskDescription, infoContainer);

    const buttonsContainer = document.createElement('div');

    const saveToDoButton = document.createElement('button');
    saveToDoButton.textContent = 'Save Changes';

    saveToDoButton.addEventListener('click', () => {
        const title = taskTitle.value || 'Nothing specified';
        const description = taskDescription.value || 'No description set';
        const due = dateInput.value;
        const priority = defaultPriorityContainer.querySelector('span').innerText;

        // Update the existing to-do item
        todo.title = title;
        todo.description = description
        todo.dueDate = due;
        todo.priority = priority;

        saveData();
        renderTodos(project);
        appendingContainer.classList.remove('active');
        dialog.remove();
    });

    buttonsContainer.append(saveToDoButton);

    const wrapper = document.createElement('div');
    wrapper.append(modalHeader, inputContainer, buttonsContainer);
    dialog.append(wrapper);
    slideDown(wrapper, gsap);
    appendingContainer.append(dialog);
}

export function generateSettingsSection(appendingContainer) {
   
  
    const themeIcon = generateIcon('theme')

    themeIcon.addEventListener('click', ()=> {
        themeSelectionDialog()
    })

    const dashboardIcon = generateIcon('dashboard')
    dashboardIcon.addEventListener('click', ()=> {
        generateDashboardPage(projects)
    })
    const timerIcon = generateIcon('timer')
    timerIcon.addEventListener('click', ()=> {
        createPomodoroTimer() 
    })

    appendingContainer.append( dashboardIcon, themeIcon, timerIcon)
  }
  

  export const theme = 'default'

  export function themeSelectionDialog() {
    const appendingContainer = document.querySelector('[data-dialog]');
    appendingContainer.classList.add('active');
    const dialog = document.createElement('dialog');
    dialog.classList.add('theme-dialog');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    const modalTitle = document.createElement('span');
    modalTitle.textContent = 'Select a theme';

    const closeButton = generateIcon('close');
    closeButton.addEventListener('click', () => {
        slideUp(wrapper, gsap, () => {
            dialog.remove();
            appendingContainer.classList.remove('active');
        });
    });

    modalHeader.append(modalTitle, closeButton);

    const themeContainer = document.createElement('div');
    themeContainer.classList.add('theme-container');

    const themes = {
        default: 'Default',
        light: 'Light',
        red: 'Solar Red',
        orange: 'Mandarin',
        yellow: 'Bumble Bee',
        green: 'Mint',
        blue: 'Light Blue',
        purple: 'Liliac'
    }

    for(let theme in themes) {
        const themeButton = document.createElement('div')

        const themeIcon = generateIcon('theme')
        const themeName= document.createElement('span')

        themeName.textContent = `${themes[theme]}`
        const root = document.querySelector('html')
        themeButton.append(themeIcon, themeName)
        themeButton.classList.add(`${theme}`)
        themeButton.addEventListener('click', ()=> {
         theme = `${theme}`
          root.classList.value = (`${theme}`)
            saveThemeToLocalStorage(theme)
        })
        themeContainer.append(themeButton)
    }

 

    const wrapper = document.createElement('div');
    wrapper.append(modalHeader, themeContainer);
    dialog.append(wrapper);
    slideDown(wrapper, gsap);
    appendingContainer.append(dialog);
}



export function generateDashboardPage(projects) {
    const appendingContainer = document.querySelector('[data-project-page]');
    appendingContainer.innerHTML = '';

    if (Object.keys(projects).length === 0) {
        const defaultPage = generateDefaultDashboardPage();
        appendingContainer.append(defaultPage);

        gsap.from(defaultPage, {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
        });

        return;
    }

    const dashboardElement = document.createElement('div');
    dashboardElement.classList.add('dashboard');

    const header = createHeader('Dashboard');
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('dashboard-info');

    // Initial render of metrics
    rerenderMetrics(projects, infoContainer);

    dashboardElement.append(header, infoContainer);
    appendingContainer.append(dashboardElement);

    // Animations
    gsap.from(header, {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: "power2.out",
    });

    gsap.fromTo(
        infoContainer.children,
        { opacity: 0, y: 20 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
        }
    );

    const recentProjectsContainer = document.createElement('div')
    recentProjectsContainer.classList.add('recent-projects')
    const recentProjectsHeader = createHeader('Recent Projects')
    recentProjectsContainer.append(recentProjectsHeader)
    for(let project in projects) {
        const projectContainer = document.createElement('div')
        const projectIcon = generateIcon(projects[project].icon)
        const projectTitle = document.createElement('h4')
        projectTitle.textContent = `${projects[project].name}`
        projectContainer.append(projectIcon, projectTitle)
        recentProjectsContainer.append(projectContainer)
        projectContainer.addEventListener('click', ()=> {
            generateProjectPage(projects[project])
            renderTodos(projects[project])
            gsap.fromTo(
                '.todo',
                { opacity: 0, y: -10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power3.out",
                }
            );
        })
    }
    
    gsap.fromTo(
        recentProjectsContainer.children,
        { opacity: 0, y: 20 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
        }
    );
    dashboardElement.append(recentProjectsContainer)
}

export function rerenderMetrics(projects, infoContainer) {
    infoContainer.innerHTML = ''; // Clear existing metrics

    const metrics = [
        {
            className: 'projects-metric',
            iconType: 'projects',
            label: 'Total Projects',
            value: () => Object.keys(projects).length,
        },
        {
            className: 'high-priority-metric',
            iconType: 'highPriorityTodos',
            label: 'High Priority Tasks',
            value: () => calculateTodos(projects, (todo) => todo.priority === 'High'),
        },
        {
            className: 'active-todos-metric',
            iconType: 'uncompletedTodos',
            label: 'Active Tasks',
            value: () => calculateTodos(projects, (todo) => !todo.completed),
        },
        {
            className: 'completed-todos-metric',
            iconType: 'completedTodos',
            label: 'Completed Tasks',
            value: () => calculateCompletedTodos(projects, (todo) => todo.completed),
        },
    ];

    metrics.forEach(({ className, iconType, label, value }) => {
        const metricContainer = createMetricContainer(className, iconType, label, value());
        infoContainer.append(metricContainer);
    });

    // Reapply animations for updated metrics
    gsap.fromTo(
        infoContainer.children,
        { opacity: 0, y: 20 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
        }
    );
}

function createHeader(title) {
    const header = document.createElement('div');
    const headerText = document.createElement('h2');
    headerText.textContent = title;
    header.append(headerText);
    return header;
}

function createMetricContainer(className, iconType, label, value) {
    const container = document.createElement('div');
    container.classList.add(className);

    const icon = generateIcon(iconType);

    const valueText = document.createElement('span');
    valueText.textContent = value;
    valueText.classList.add('metric-value');

    const labelText = document.createElement('p');
    labelText.textContent = label;
    labelText.classList.add('metric-label');

    container.append(icon, valueText, labelText);

    gsap.fromTo(
        icon,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    return container;
}

function calculateTodos(projects, condition) {
    let count = 0;
    for (let projectKey in projects) {
        const project = projects[projectKey];
        project.todos.forEach((todo) => {
            if (condition(todo)) {
                count++;
            }
        });
    }
    return count;
}

function calculateCompletedTodos(projects, condition) {
    let count = 0;
    for (let projectKey in projects) {
        const project = projects[projectKey];
        project.done.forEach((todo) => {
            if (condition(todo)) {
                count++;
            }
        });
    }
    return count;
}


function generateDefaultDashboardPage() {
    const container = document.createElement('div');
    container.classList.add('default-page');

    const heading = document.createElement('h5');
    typewriterAnimation(heading, `Welcome to Memorizo`, 0.1);

    const text = document.createElement('p');
    text.textContent = `There is currently no active project. You can create a new project by pressing the "+" button`;

    gsap.delayedCall(3, () => {
        gsap.fromTo(
            text,
            { opacity: 0, y: -10 },
            { opacity: 1, ease: "power1.inOut", duration: 1, y: 0 }
        );
    });

    container.append(heading, text);
    return container;
}

let timerInterval; // Global variable for timer interval
let remainingTime = 0; // Tracks remaining time when paused

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function startTimer(duration, display, label, onTimerEnd) {
    remainingTime = duration; // Set remaining time

    clearInterval(timerInterval); // Clear any existing timer
    timerInterval = setInterval(() => {
        display.textContent = formatTime(remainingTime); // Update the timer display

        if (--remainingTime < 0) {
            clearInterval(timerInterval); // Stop the timer
            onTimerEnd(); // Call the callback when the timer ends
        }
    }, 1000);
}

import timerSound from '../assets/sfx/timer.mp3';
import finishSound from '../assets/sfx/finish.mp3';


function createTimerDisplay(timerLabel, initialTime, onTimerEnd) {
    const projectPageContainer = document.querySelector('#app');

    // Remove existing timer display if it exists
    const existingTimer = projectPageContainer.querySelector('[data-time-remaining]');
    if (existingTimer) existingTimer.remove();

    const timeRemainingContainer = document.createElement('div');
    timeRemainingContainer.setAttribute('data-time-remaining', '');
    timeRemainingContainer.classList.add('time-remaining-container');

    const timerLabelDisplay = document.createElement('span');
    timerLabelDisplay.classList.add('timer-label');
    timerLabelDisplay.textContent = timerLabel; // Display "Work" or "Pause"

    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timer-display');
    timerDisplay.textContent = formatTime(initialTime); // Initialize display with formatted time

    const controlsContainer = document.createElement('div')

    // Pause button
    const pauseButton = generateIcon('hold');
    pauseButton.classList.add('pause-icon');
    pauseButton.addEventListener('click', () => {
        clearInterval(timerInterval); // Pause the timer
    });

    // Play button (Resume the timer)
    const playButton = generateIcon('play');
    playButton.classList.add('play-icon');
    playButton.addEventListener('click', () => {
        if (remainingTime > 0) {
            startTimer(remainingTime, timerDisplay, timerLabel, onTimerEnd); // Resume the timer
        }
    });

    // Close button
    const closeButton = generateIcon('close');
    closeButton.classList.add('close-icon');
    closeButton.addEventListener('click', () => {
        clearInterval(timerInterval); // Stop the timer
        timeRemainingContainer.remove(); // Remove display
        remainingTime = 0; // Reset the remaining time
    });

    controlsContainer.append(playButton, pauseButton, closeButton)
    timeRemainingContainer.append(timerLabelDisplay, timerDisplay, controlsContainer);
    projectPageContainer.appendChild(timeRemainingContainer);

    return timerDisplay; // Return the display element for updates
}

function createPomodoroTimer(defaultWorkTime = 40, defaultPauseTime = 20) {
    const appendingContainer = document.querySelector('[data-dialog]');
    appendingContainer.classList.add('active');

    const sound = new Audio(timerSound)
    const finish = new Audio(finishSound)

    const dialog = document.createElement('dialog');
    dialog.classList.add('pomodoro-dialog');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    const modalTitle = document.createElement('span');
    modalTitle.textContent = 'Pomodoro Timer';

    const closeButton = generateIcon('close');
    closeButton.addEventListener('click', () => {
        dialog.remove();
        appendingContainer.classList.remove('active');
    });

    modalHeader.append(modalTitle, closeButton);

    const pomodoroTimerContainer = document.createElement('div');

    const wrapper1 = document.createElement('div');
    const workLabel = document.createElement('span');
    workLabel.textContent = 'Work';
    const workInput = document.createElement('input');
    workInput.min = 5;
    workInput.max = 50;
    workInput.value = defaultWorkTime;
    workInput.setAttribute('type', 'number');
    wrapper1.append(workLabel, workInput);

    const wrapper2 = document.createElement('div');
    const pauseInput = document.createElement('input');
    pauseInput.setAttribute('type', 'number');
    pauseInput.min = 10;
    pauseInput.max = 55;
    pauseInput.value = defaultPauseTime;
    const pauseLabel = document.createElement('span');
    pauseLabel.textContent = 'Pause';
    wrapper2.append(pauseLabel, pauseInput);

    pomodoroTimerContainer.append(wrapper1, wrapper2);

    const controlsContainer = document.createElement('div');

    function startWorkTimer() {
        const workDuration = +workInput.value * 60;
        const timerDisplay = createTimerDisplay('Work', workDuration, startPauseTimer);
        startTimer(workDuration, timerDisplay, 'Work', startPauseTimer);
       sound.play()
    }

    function startPauseTimer() {
        finish.play()
        const pauseDuration = +pauseInput.value * 60;
        const timerDisplay = createTimerDisplay('Pause', pauseDuration, resetTimer);
        startTimer(pauseDuration, timerDisplay, 'Pause', resetTimer);
    }

    function resetTimer() {
        clearInterval(timerInterval); // Stop timer
        const timeDisplay = document.querySelector('[data-time-remaining]');
        if (timeDisplay) timeDisplay.remove(); // Remove display
        remainingTime = 0; // Reset the remaining time
    }

    const startButton = generateIcon('play');
    startButton.addEventListener('click', () => {
        resetTimer(); // Clear any existing timer
        dialog.remove();
        appendingContainer.classList.remove('active');
        startWorkTimer(); // Start the work timer
    });

    controlsContainer.append(startButton);
    const wrapper = document.createElement('div');
    wrapper.append(modalHeader, pomodoroTimerContainer, controlsContainer);
    dialog.append(wrapper);
    appendingContainer.append(dialog);
}
