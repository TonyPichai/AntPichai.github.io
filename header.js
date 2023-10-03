import { createProjectList } from './modules/project-list-maker.js';
import { populateGalleryContainer } from './modules/gallery-maker.js';

// 1. GETTING data form content.json
// 2. Handle json data as a variable
// 3. Pass variable to other functions as needed 
async function generatePageContent() {
    // Network request, get your json data
    try {
        // Get data as string and convert to usable json

        // Local file path
        // const response = await fetch('modules/content.json');
        // Github file path!!!
        const response = await fetch('/modules/content.json');

        const jsonData = await response.json(); // Convert string to json

        await scriptSelector(jsonData);

    }
    catch (error) {
        console.error('unable to access content:', error);

        setTimeout(() => {
        window.location.reload();
        }, 1000); 
        // window.location.href = 'index.html';
    }
}


// %%% Which script file to execute? %%%
//  Using determineCurrentPage()
//  Identify the page from the url/filepath

async function scriptSelector(jsonData, galleryGrid) {

    // Get the result of the arrow function.
    // ONLY THEN can the value be used in the comparison operator
    const currentPageResult = currentPage(); 

    if (currentPageResult === 'projects') {
      await createProjectList(jsonData);
      console.log('projects page');

    } else if (currentPageResult === 'index') {
        await populateGalleryContainer(jsonData, galleryGrid);
      console.log('index page');

    } else if (currentPageResult === 'about') {
      console.log('about page');
    }
}


function currentPage() {
    const pathname = window.location.pathname;
    if (pathname.includes('/projects.html')) {
        return 'projects';
    } else if (pathname.includes('/index.html')) {
        return 'index';
    } else if (pathname.includes('/about.html')) {
        return 'about';
    }
        return 'unknown';
}; 
generatePageContent();

function closeModal() {
    // document.addEventListener('DOMContentLoaded', () => {
        const modal = document.getElementById("modalID");
        const modalCheckbox = document.getElementById("burger-button");

        document.addEventListener('click', (event) => {
            if(modalCheckbox.checked && !modal.contains(event.target)) {
                const onMouseUp = () => {
                    modalCheckbox.checked = false;
                    // modalCheckbox.checked = !modalCheckbox.checked;
                    console.log('Clicked off modal')
                };

                document.addEventListener('mouseup', onMouseUp);
            }
        });
    // });
}
closeModal();

function nameNav() {
    const name = document.getElementById("nameID")

    name.addEventListener('click', (event) => {           
        window.location.href = 'index.html';
    })
}
nameNav();


