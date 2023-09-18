////// nav bar //////

const menubtn = document.getElementById("menubtn")
const dropdown = document.getElementById("dropdown");
const hamburger = document.getElementById("hamburger");
const xbox = document.getElementById("xbox");
const dropdownOptions = dropdown.querySelectorAll(".dropdown_list-item")

const menuToggle = function () {
    console.log("menu toggle")
    dropdown.classList.toggle("dropdown-open");
    hamburger.classList.toggle("hidden");
    xbox.classList.toggle("hidden");
}

menubtn.addEventListener("click", menuToggle)

for (option of dropdownOptions) {
    option.addEventListener("click", menuToggle)
}



////// truths //////

const truths = document.querySelectorAll(".truths")

//For future use to display graph
const truthOne = document.getElementById("truthOne");
const truthTwo = document.getElementById("truthTwo");
const truthThree = document.getElementById("truthThree");

const answer = document.getElementById("answer");

const truthToggle = function () {
    console.log("truth toggle")
    answer.classList.add("answer-open");
}

for (truth of truths) {
    truth.addEventListener("click", truthToggle)
}


////// carousel //////

// define variables
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const carouselNav = document.querySelector(".carousel__nav")
const navDots = Array.from(carouselNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;


// arrange slides horizontally
// this is where I need to add smooth scrolling
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + "px";
}
slides.forEach(setSlidePosition)


// define carousel functions
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    track.style.transition = "all 1s";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
}


const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");  
}


function autoScrollSlide() {
    const currentSlide = track.querySelector(".current-slide");
    const targetSlide = currentSlide.nextElementSibling;
    const currentDot = carouselNav.querySelector(".current-slide");
    const targetDot = currentDot.nextElementSibling;
    
    if (targetSlide) {
        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    } else {
        moveToSlide(track, currentSlide, slides[0]);
        updateDots(currentDot, navDots[0]);
    }

    setTimeout("autoScrollSlide()", 8000);
}

// window.onload = autoScrollSlide();


// event listeners
nextButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = carouselNav.querySelector(".current-slide");
    const nextDot = currentDot.nextElementSibling;
    
    if (nextSlide) {
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    } else {
        moveToSlide(track, currentSlide, slides[0]);
        updateDots(currentDot, navDots[0]);
    }
})


///click left, move left
prevButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = carouselNav.querySelector(".current-slide");
    const prevDot = currentDot.previousElementSibling;
        
    if (prevSlide) {
        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    } else {
        moveToSlide(track, currentSlide, slides[slides.length - 1]);
        updateDots(currentDot, navDots[navDots.length - 1]);
    }
})


//click dot, move to that slide
carouselNav.addEventListener("click", e => {
    // what indicator was clicked-on?
    const targetDot = e.target.closest("button");
    // console.log(`targetDot: ${targetDot}`);
    
    if (!targetDot) return;

    const currentSlide = track.querySelector(".current-slide");
    const currentDot = carouselNav.querySelector(".current-slide");
    const targetIndex = navDots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex]

    moveToSlide(track, currentSlide, targetSlide); 
    updateDots(currentDot, targetDot);
    // hideShowArrows(slides, prevButton, nextButton, targetIndex)
})


// THE FOLLOWING HIDES AND SHOWS PREV/NEXT ARROWS ON CAROUSEL

// const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
//     if (targetIndex === 0) {
//         prevButton.classList.add("hidden");
//         nextButton.classList.remove("hidden")
//     } else if (targetIndex === slides.length - 1) {
//         prevButton.classList.remove("hidden");
//         nextButton.classList.add("hidden")
//     } else {
//         prevButton.classList.remove("hidden");
//         nextButton.classList.remove("hidden")
//     }
// }


////// projects power on //////

// const projects = document.querySelectorAll(".off");
const projects = document.querySelectorAll(".card__img-layout");
const powerLights = document.querySelectorAll(".power");
const videos = document.querySelectorAll(".project-video");
// const videoPortfolio = document.querySelector("#video_portfolio");

// console.log(videoPortfolio)

const projectOptions = {
    root: null, // default to the viewport
    threshold: 1, // % of section that must be within viewport in order to trigger
    rootMargin: "-60px"
};

const lightsOn = function(entries, observer) {
    // console.log(projects)
    for (entry of entries) {
        // console.log(entry.target);
        entry.target.classList.toggle("on");
    }
}

const powerOnScroll = new IntersectionObserver(lightsOn, projectOptions)

for (light of powerLights) {
    powerOnScroll.observe(light);
}

const screenOn = function(entries, observer) {
    for (entry of entries) {
        // console.log(entry.target)
        entry.target.classList.toggle("on");
    };
}

const screenOnScroll = new IntersectionObserver(screenOn, projectOptions)

for (project of projects) {
    screenOnScroll.observe(project);
}

const videoOptions = {
    root: null, // default to the viewport
    threshold: .9, // % of section that must be within viewport in order to trigger
    rootMargin: "-60px"
};

const videoOn = function(entries, observer) {
    for (entry of entries) {
        console.log(entry.target)
        if (!entry.isIntersecting) {
            entry.target.pause();
        } else {
            entry.target.play();
        }
    }
}

const videoOnScroll = new IntersectionObserver(videoOn, videoOptions)

for (video of videos) {
    videoOnScroll.observe(video);
}



// const videoOn = function(entries, observer) {
//     console.log(entry)
//     for (entry of entries) {
//         if (videoPortfolio.intersectionRatio > 0) {
//             videoPortfolio.play();
//         } else {
//             videoPortfolio.pause();
//         }
//     }
// }




////// personality sections //////

// CURRENTLY UNUSED // CURRENTLY UNUSED // CURRENTLY UNUSED // CURRENTLY UNUSED


// const personalitySections = document.querySelectorAll(".personality");
// // console.log(personalitySections)

// const reveal = function(entries, observer) {
//     for (entry of entries) {
//         console.log(entry);
//         entry.target.classList.toggle("personality-open");
//     }
// }

// const showPersonality = new IntersectionObserver(reveal)

// for (sect of personalitySections) {
//     showPersonality.observe(sect);
// }



////// make my face slide onscreen //////

// CURRENTLY UNUSED // CURRENTLY UNUSED // CURRENTLY UNUSED // CURRENTLY UNUSED

// const miCon = document.querySelector("#miCon");
// const miCon_alt = document.querySelector("#miCon_alt");
// const mobileWidth = 640;

// const miCon_rect = miCon.getBoundingClientRect();
// const miCon_alt_rect = miCon_alt.getBoundingClientRect();
// console.log(miCon_rect.left);

// const visibleSwap = () => {
//     miCon.classList.add("invisible")
//     miCon_alt.classList.remove("invisible")
// }

// const descend = () => {
//     if (window.innerWidth <= mobileWidth) {
//         console.log("tiny")
//     } else {
//         console.log("HUGE")
//         miCon.style.left = `${mobileWidth*2}px`
//         miCon.style.top = `${miCon_alt_rect.top}px`
//         miCon.style.bottom = `${miCon_alt_rect.bottom}px`
//         miCon.style.right = `${miCon_alt_rect.right}px`
//         console.log(miCon.style.left)
//         miCon.style.transform = `translateX(-${mobileWidth}px)`;
//         miCon.style.transition = "all 3s";
//     }
//     setTimeout("visibleSwap()", 3000);
// }

// window.onload = descend();



////// parallax //////

