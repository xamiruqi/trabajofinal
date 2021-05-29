

const slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider__section");
let sliderSectionLast = sliderSection[sliderSection.length -1];

const btnL = document.querySelector(".slider--btn-l");
const btnR = document.querySelector(".slider--btn-r");

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

function Next() {
    let indicators = Array.from(document.getElementsByClassName("indicator"));
    let activeIndicator = null;
    indicators.forEach((i) => {
        if (i.classList.contains("active")) {
            activeIndicator = parseInt(i.getAttribute("data-slide-to"));
            i.classList.remove("active");
        }
    })
    activeIndicator = activeIndicator == 4 ? 0 : activeIndicator+1;
    indicators[activeIndicator].classList.add("active");
let sliderSectionFirst =  document.querySelectorAll(".slider__section") [0];
 slider.style.marginLeft = "-200%";
 slider.style.transition = "all 0.5s";
 setTimeout(function(){
    slider.style.transition = "none"; 
    slider.insertAdjacentElement('beforeend', sliderSectionFirst);
    slider.style.marginLeft = "-100%";
 }, 500);
}

function Prev() {
    let indicators = Array.from(document.getElementsByClassName("indicator"));
    let activeIndicator = null;
    indicators.forEach((i) => {
        if (i.classList.contains("active")) {
            activeIndicator = parseInt(i.getAttribute("data-slide-to"));
            i.classList.remove("active");
        }
    })
    activeIndicator = activeIndicator == 0 ? 4 : activeIndicator+-1;
    indicators[activeIndicator].classList.add("active");
    let sliderSection = document.querySelectorAll(".slider__section");
let sliderSectionLast = sliderSection[sliderSection.length -1];
     slider.style.marginLeft = "0";
     slider.style.transition = "all 0.5s";
     setTimeout(function(){
        slider.style.transition = "none"; 
        slider.insertAdjacentElement('afterbegin', sliderSectionLast);
        slider.style.marginLeft = "-100%";
     }, 500);
    }
    

btnR.addEventListener('click', function(){Next();

})

btnL.addEventListener('click', function(){Prev();

})

const indicatorClick = (e) => {
    Next();
    Array.from(document.getElementsByClassName("indicator")).forEach(x => {
        if (x.classList.contains("active")) x.classList.remove("active");
    })
    e.target.classList.add("active");
}

Array.from(document.getElementsByClassName("indicator")).forEach(x=>x.addEventListener('click' , indicatorClick)) 

setInterval(function() {
    Next();
}, 3000);

