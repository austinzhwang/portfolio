const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navLinksAll = document.querySelectorAll('.nav-link'); 


    burger.addEventListener('click', ()=> { //toggles the burger menu
        nav.classList.toggle('nav-active');
        
        // burger animation
        burger.classList.toggle('toggle'); 
        
        // animate burger links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 1s ease forwards ${index / 7}s`;
            }
        });
    });
     
    for (let i = 0; i < navLinksAll.length; i++) { 
        navLinksAll[i].addEventListener('click', ()=> { //hides the burger menu after a link is clicked
            nav.classList.remove('nav-active');   
            burger.classList.remove('toggle');  

            let burgerLinksMq = window.matchMedia("(max-width: 1024px)");
            if (burgerLinksMq.matches) { 
                 // animate burger links
                navLinks.forEach((link, index) => {
                    if (link.style.animation) {
                        link.style.animation = '';
                    } else {
                        link.style.animation = `navLinkFade 1s ease forwards ${index / 7}s`;
                    }
                });
              }    
        }); 
    } 

} 

navSlide();

// Grab all the scroll class anchor elements
const scrollElems = document.querySelectorAll('.scroll');

// Add an event listeners to those element
for (let i = 0; i < scrollElems.length; i++) {
    const elem = scrollElems[i];
    
    elem.addEventListener('click',function(e) {
    e.preventDefault();
       
        // 1. Get the element id to which you want to scroll
        const scrollElemId = e.target.href.split('#')[1];
        
        // 2. find that node from the document
        const scrollEndElem = document.getElementById(scrollElemId);
        
        // 3. animate to that node.. 
        const anim = requestAnimationFrame((timestamp) => {
            const stamp = timestamp || new Date().getTime();
            const duration = 1200;
            const start = stamp;
        
            const startScrollOffset = window.pageYOffset - (window.innerHeight * .1);
            const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top;
        
            scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
        });
     });
} 

/* Smooth scroll for projects button to portfolio section */
const btnElem = document.querySelector('.portfolio-scroll');
btnElem.addEventListener('click', ()=> {
    const scrollEndElem = document.getElementById('portfolio');

    const anim = requestAnimationFrame((timestamp) => {
        const stamp = timestamp || new Date().getTime();
        const duration = 1200;
        const start = stamp;
    
        const startScrollOffset = window.pageYOffset - (window.innerHeight * .1);
        const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top;

        scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
    });
});

const easeOutQuad = function (t) { 
    return t * (2-t);
}
 
const scrollToElem = (startTime, currentTime, duration, scrollEndElemTop, startScrollOffset) => {
    const runtime = currentTime - startTime;
    let progress = runtime / duration;
   
    progress = Math.min(progress, 1);
   
    const ease = easeOutQuad(progress); 
   
    window.scroll(0, startScrollOffset + (scrollEndElemTop * ease));
    if(runtime < duration) {
        requestAnimationFrame((timestamp) => {
            const currentTime = timestamp || new Date().getTime();
            scrollToElem(startTime, currentTime, duration, scrollEndElemTop, startScrollOffset);
        });
    } 
 }