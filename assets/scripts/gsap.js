function animateElements() {
  // Black element - First to slide in
  gsap.fromTo(".black-bg-element",
    { y: "-100vh", opacity: 0, rotate: 310 },
    { y: 0, opacity: 1, rotate: 310, duration: 1.2, ease: "power2.out" }
  );

  // Pink element - Delayed after Black element
  gsap.fromTo(".pink-bg-element",
    { y: "-100vh", opacity: 0, rotate: 310 },
    { y: 0, opacity: 1, rotate: 310, duration: 1.2, ease: "power2.out", delay: 0.5 }
  );

  // Pink 2 element - Delayed after Pink element
  gsap.fromTo(".pink-bg-element2",
    { y: "-100vh", opacity: 0, rotate: 310 },
    { y: 0, opacity: 1, rotate: 310, duration: 1.2, ease: "power2.out", delay: 1 }
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
}, 5000);