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
    { y: 0, x:0, opacity: 1, rotate: 310, duration: 2.8, ease: "power4.out", delay: 1 }
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
  gsap.registerPlugin(ScrollTrigger);
  
  const animatedEls = document.querySelectorAll("h3, .hero-text, .cta-button, .hero-slider-buttons");
  animatedEls.forEach(el => {
    el.style.willChange = "transform, opacity";
  });
  
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".slider-dots > div");
  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoLoop;

  const updateDots = () => {
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add("active");
    }
  };

  const animateSlideIn = (slide) => {
    const tl = gsap.timeline();
    tl.fromTo(slide.querySelector(".hero-bg"), { scale: 1 }, { scale: 1.15, ease: "power3.out", duration: 4, force3D: true, transformOrigin: "center center" }, 0);
    tl.fromTo(slide.querySelector("h3"), { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0.5);
    tl.fromTo(slide.querySelector(".hero-text"), { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 1);
    tl.fromTo(slide.querySelector(".cta-button"), { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 1.5);
    return tl;
  };

  const animateSlideOut = (slide) => {
    const tl = gsap.timeline();
    tl.to(slide.querySelector(".cta-button"), { y: -90, opacity: 0, duration: 0.5, ease: "power2.in" });
    tl.to(slide.querySelector(".hero-text"), { y: 90, opacity: 0, duration: 0.5, ease: "power2.in" }, 0);
    tl.to(slide.querySelector("h3"), { y: -90, opacity: 0, duration: 0.5, ease: "power2.in" }, 0);
    tl.to(slide.querySelector(".hero-bg"), { scale: 1, duration: 0.5, ease: "power2.in" }, 0);
    return tl;
  };

  const animateSlideOutPromise = (slide) => {
    return new Promise((resolve) => {
      const tl = animateSlideOut(slide);
      tl.eventCallback("onComplete", resolve);
    });
  };

  const showSlide = (newIndex) => {
    if (newIndex === currentIndex) return;
    
    animateSlideOutPromise(slides[currentIndex]).then(() => {
      slides[currentIndex].classList.remove("active");
      currentIndex = newIndex;
      slides[currentIndex].classList.add("active");
      animateSlideIn(slides[currentIndex]);
      updateDots();
    });
  };

  document.querySelector(".hero-slider-button.next").addEventListener("click", () => {
    const nextIndex = (currentIndex + 1) % totalSlides;
    showSlide(nextIndex);
    resetAutoLoop();
  });

  document.querySelector(".hero-slider-button.prev").addEventListener("click", () => {
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
    resetAutoLoop();
  });

  const startAutoLoop = () => {
    autoLoop = setInterval(() => {
      const nextIndex = (currentIndex + 1) % totalSlides;
      showSlide(nextIndex);
    }, 4000);
  };

  const resetAutoLoop = () => {
    clearInterval(autoLoop);
    startAutoLoop();
  };

  startAutoLoop();
  animateSlideIn(slides[currentIndex]);
  updateDots();
});





//Animating sticky header
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: ".navbar-container",
    start: "bottom top",
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


//Animating floating shape
document.addEventListener("DOMContentLoaded", () => {
  gsap.to(".floating-shape", {
    x: -100,
    duration: 3,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
  });
});




