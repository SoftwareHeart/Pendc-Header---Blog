const carousel = document.querySelector(".carousel"),
arrowBtns = document.querySelectorAll(".slide-wrapper i")
let isDragging = false, startX, startScrollLeft;
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth) ;

carouselChildrens.slice(0,-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0,cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});


const dragStart = (e) =>{
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft= carousel.scrollLeft;
}

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        console.log(btn.id);
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
})

const dragging = (e)=> {
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX-startX);
}

const dragStop = () =>{
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if(Math.ceil(carousel.scrollLeft) === 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
      carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
  }
  
}


//sticky
window.addEventListener('scroll', function() {
    var header = document.querySelector('.header');
    
    if (window.scrollY > 0) {
      header.classList.add('header-sticky');
    } else {
      header.classList.remove('header-sticky');
    }
  });

  

carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("mousemove",dragging);
document.addEventListener("mouseup",dragStop);
carousel.addEventListener("scroll", infiniteScroll);

var menuButton = document.querySelector('.menu-button');
var menu = document.querySelector('.menu');
var closeButton = document.querySelector('.close-button');

menuButton.addEventListener('click', function() {
  menu.classList.toggle('menu-open');
});

closeButton.addEventListener('click', function() {
  menu.classList.remove('menu-open');
});
