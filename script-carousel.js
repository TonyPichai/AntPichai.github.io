// After initial page load, set count
const count = document.getElementById('count');
count.innerHTML = 1;
const portfolioPages = [];

function hidePages(currSlide) {
    for(let i = 0; i< portfolioPages.length; i++) {
        if(i + 1 == currSlide) { // if not the current slide
            portfolioPages[i].style.display = 'flex';
        } else {
            portfolioPages[i].style.display = 'none';
        }
    }
}
// function to update the URL params without reloading the page
function updateParams(currSlide) {
    const newSlide = `index-carousel.html?index=${currSlide}`;
    history.pushState(null, '', newSlide);
}
// Function to update the slide counter
function pageCount(currSlide) {
    count.innerHTML = '';
    count.innerHTML = currSlide;
}


function carousel() {

    const urlParams = new URLSearchParams(window.location.search);
    let currSlide = parseInt(urlParams.get('index')) || 1;

    // If currSlide is undefined or 0, set it to 1

    const backwards = document.getElementById('backwards');
    const forwards = document.getElementById('forwards');
    const count = document.getElementById('count');
    const content = document.getElementById('content')


    let prevSlide, nextSlide;

    console.log('the current slide is: ', currSlide);

    backwards.addEventListener('click', () => {
        const overlay = document.querySelector('.loader-overlay');
        overlay.style.display = 'flex';


        hidePages(currSlide);
        setTimeout(() => {
            hidePages(currSlide);

        prevSlide = currSlide;

        if (currSlide > 1) {
            currSlide--;
        } else {
            currSlide = 10; // Go to the last slide
        }

        updateParams(currSlide);
        console.log('backwards clicked:', currSlide);


        location.reload();
        }, 100); // Adjust the time as needed

        pageCount(currSlide);
        // Page count
        // count.innerHTML = '';
        // count.innerHTML = currSlide;
    });

    forwards.addEventListener('click', () => {
        let pausePgNum = currSlide;
        console.log('page to pause:', pausePgNum);
        const pausePage = document.getElementById('pg-' + pausePgNum);

        console.log("pausePage =", pausePage );

        const iFrameElements = pausePage.querySelectorAll('iframe'); // Embedded Videos

        // removing Vimeo iframe elements to stop continual playing
        function removeIFrames() {
            iFrameElements.forEach(iframe => {
              iframe.parentNode.removeChild(iframe);
            });
          }
        removeIFrames();
        
        nextSlide = currSlide;

        if (currSlide < 10) {
            currSlide++;
        } else {
            currSlide = 1; // Go back to the first slide
        }

        updateParams(currSlide);
        console.log('forwards clicked:', currSlide);

        // count.innerHTML = '';
        // count.innerHTML = currSlide;
        pageCount(currSlide);

        hidePages(currSlide);
    });


    for(i = 1; i <= 10; i++) {
        const portfolioPage = document.getElementById(`pg-${i}`);
        portfolioPages.push(portfolioPage);
    }

}

window.onload = function() {

    const currentURL = window.location.href;
    const overlay = document.querySelector('.loader-overlay')

    // checking if url contains index-carousel.
    if (!currentURL.includes("index-carousel.html")) {
        const slideNumInit = 1;
        updateParams(slideNumInit);

        const slide = `index-carousel.html?index=${slideNumInit}`;
        history.pushState(null, '', slide);
        // window.location.href = slide;
        updateContent(slideNumInit);

    }  else {  
        const urlParams = new URLSearchParams(window.location.search);
        const currSlide = parseInt(urlParams.get('index')) || 1;

        updateContent(currSlide)
    }

    // Once initial processes are complete, hide overlay
    overlay.style.visibility = 'hidden';

    async function updateContent(currSlide) {
        const showOverlay = () => {
            overlay.style.visibility = 'visible';
        };
        showOverlay();

        carousel(currSlide);
        hidePages(currSlide);
        count.innerHTML = currSlide;
    }
};