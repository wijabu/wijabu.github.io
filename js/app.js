////// nav bar //////

const menubtn = document.getElementById("menubtn")

const dropdown = document.getElementById("dropdown");
const hamburger = document.getElementById("hamburger");
const xbox = document.getElementById("xbox");

const menuToggle = function () {
    console.log("menu toggle")
    dropdown.classList.toggle("dropdown-open");
    hamburger.classList.toggle("hidden");
    xbox.classList.toggle("hidden");
}

menubtn.addEventListener("click", menuToggle)


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

window.onload = autoScrollSlide();


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


////// parallax //////

