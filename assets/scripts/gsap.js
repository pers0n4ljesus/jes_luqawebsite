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
  // Add will-change for smoother hardware acceleration
  const animatedEls = document.querySelectorAll(".hero-bg, h3, .hero-text, .cta-button, .hero-slider-buttons");
  animatedEls.forEach(el => {
    el.style.willChange = "transform, opacity";
  });

  // Create a timeline that refreshes on repeat to prevent stutter
  const tl = gsap.timeline({
    repeat: -1,
    repeatRefresh: true, // Recalculate values on each repeat cycle
    defaults: { duration: 2, ease: "power2.out" }
  });

  // Background animation: subtle zoom with linear easing
  tl.fromTo(".hero-bg", { scale: 1 }, { scale: 1.15, ease: "power3.out", duration: 4 }, 0);

  // Staggered element animations:
  tl.fromTo("h3", { y: -90, opacity: 0 }, { y: 0, opacity: 1 }, 0.5);
  tl.fromTo(".hero-text", { y: 90, opacity: 0 }, { y: 0, opacity: 1 }, 1);
  tl.fromTo(".cta-button", { y: -90, opacity: 0 }, { y: 0, opacity: 1 }, 1.5);
  tl.fromTo(".hero-slider-buttons", { opacity: 0 }, { opacity: 1 }, 2);
  
  // If you prefer a reverse (yoyo) effect to avoid an abrupt restart, uncomment the following line:
  // tl.yoyo(true);
});



//Animating sticky header
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Ensure the sticky header is hidden off-screen at page load
  gsap.set(".sticky-header", { y: "-100%" });

  ScrollTrigger.create({
    trigger: ".navbar-container", // Use the original header as the trigger
    start: "bottom top", // When the bottom of .navbar-container hits the top of the viewport
    // Uncomment markers for debugging:
    // markers: true,
    onEnter: () => {
      gsap.to(".sticky-header", {
        y: "0%", 
        duration: 0.5,
        ease: "power2.out"
      });
    },
    onLeaveBack: () => {
      gsap.to(".sticky-header", {
        y: "-100%",
        duration: 0.5,
        ease: "power2.out"
      });
    }
  });
});




