////// nav bar //////

const menubtn = document.getElementById("menubtn")

const dropdown = document.getElementById("dropdown");
const hamburger = document.getElementById("hamburger");
const xbox = document.getElementById("xbox");

const menuToggle = function () {
    console.log("menu toggle")
    dropdown.classList.toggle('dropdown-open');
    hamburger.classList.toggle('hidden');
    xbox.classList.toggle('hidden');
}

menubtn.addEventListener('click', menuToggle)


////// truths //////

const truths = document.querySelectorAll('.truths')

//For future use to display graph
const truthOne = document.getElementById("truthOne");
const truthTwo = document.getElementById("truthTwo");
const truthThree = document.getElementById("truthThree");

const answer = document.getElementById('answer');

const truthToggle = function () {
    console.log("truth toggle")
    answer.classList.add('answer-open');
}

for (truth of truths) {
    truth.addEventListener('click', truthToggle)
}

////// parallax //////