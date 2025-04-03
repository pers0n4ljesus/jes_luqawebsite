function animateElements() {
  gsap.fromTo(".black-bg-element",
    { y: "-100vh", opacity: 0, rotate: 310 },
    { y: 0, opacity: 1, rotate: 310, duration: 2, ease: "power4.out" }
  );

  gsap.fromTo(".pink-bg-element",
    { y: "-100vh", opacity: 0, rotate: 310 },
    { y: 0, opacity: 1, rotate: 310, duration: 2, ease: "power4.out", delay: 1 }
  );

  gsap.fromTo(".pink-bg-element2",
    { y: "-100vh", x: "120vh", opacity: 0, rotate: 310 },
    { y: 0, x:0, opacity: 1, rotate: 310, duration: 2, ease: "power4.out", delay: 1 }
  );
}

document.addEventListener("DOMContentLoaded", animateElements);

let lastScrollTop = window.scrollY;
window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY;
  if (scrollTop < 50 && lastScrollTop >= 50) { 
    animateElements();
  }
  lastScrollTop = scrollTop;
});

setInterval(() => {
  animateElements();
}, 4000);