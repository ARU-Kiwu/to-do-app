
import { saveData } from "./storage";
import { addTodoToProject, createProject, deleteProject, deleteTodoFromProject, projects, setTodoCompleted, setTodoUncompleted } from "./todo"
import { format, compareAsc, formatDistance, toDate, startOfToday } from "date-fns";
import gsap, { wrap } from "gsap";
import { collapseToTopLeft, expandFromTopLeft, hideAnimation,slideLeft, slideRight ,revealIcon, slideDown, slideDownContainers, slideTodosToRight, slideUp } from "./animations";

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
        // Edit Project Logic
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

        //Create to do checkbox for setting the todo complete
        const checkbox = document.createElement('input')
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
        todoHeader.append(checkbox, titleElement, editIcon)
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
        console.log(todo.dueDate);
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

        // Create a checkbox and mark it as checked
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
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
        todoDiv.appendChild(checkbox);

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
    titleInput.placeholder = 'Project Title'
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
        dialog.remove()
        appendingContainer.classList.remove('active')
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
        console.log(projectId, title, description, due, priorities)

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
  






