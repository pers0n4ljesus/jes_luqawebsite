function animateElements() {
  // Black element - First to slide in
  gsap.fromTo(".black-bg-element",
    { y: "-100vh", opacity: 0, rotate: 310 },
    { y: 0, opacity: 1, rotate: 310, duration: 2, ease: "power4.out" }
  );

  // Pink element - Delayed after Black element
  gsap.fromTo(".pink-bg-element",
    { y: "-100vh", opacity: 0, rotate: 310 },
    { y: 0, opacity: 1, rotate: 310, duration: 2, ease: "power4.out", delay: 1 }
  );

  // Pink 2 element - Delayed after Pink element
  gsap.fromTo(".pink-bg-element2",
    { y: "-100vh", x: "120vh", opacity: 0, rotate: 310 },
    { y: 0, x:0, opacity: 1, rotate: 310, duration: 2.8, ease: "power4.out", delay: 1.5 }
  );
}

// Run animation on page load
document.addEventListener("DOMContentLoaded", animateElements);

// Run animation when user scrolls back to the top
let lastScrollTop = window.scrollY;
window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY;
  if (scrollTop < 50 && lastScrollTop >= 50) { 
    animateElements(); // Re-trigger when user scrolls back up
  }
  lastScrollTop = scrollTop;
});

// Repeat animation every 5 seconds
setInterval(() => {
  animateElements();
}, 4000);





//Animating hero section
document.addEventListener("DOMContentLoaded", () => {
  // Create a timeline that repeats indefinitely
  const tl = gsap.timeline({
    repeat: -1, // Loop forever
    defaults: { duration: 4, ease: "power4.out" }
  });

  // Animate the background: zoom in smoothly from scale 1 to 1.1 and then reset at the start of the loop.
  tl.fromTo(".hero-bg", { scale: 1 }, { scale: 1.1 }, 0);

  // Animate h3 sliding in from above
  tl.fromTo("h3", { y: -50, opacity: 0 }, { y: 0, opacity: 1 }, 0);

  // Animate hero-text (h1) from below into place
  tl.fromTo(".hero-text", { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, 0);

  // Animate the CTA button coming from above
  tl.fromTo(".cta-button", { y: -50, opacity: 0 }, { y: 0, opacity: 1 }, 0);

  // Animate the slider buttons fading in
  tl.fromTo(".hero-slider-buttons", { opacity: 0 }, { opacity: 1 }, 0);
});