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




const ctaAnimation = () => {
  const pinkLeftTL = gsap.timeline({ repeat: -1, yoyo: true });
  const pinkRightTL = gsap.timeline({ repeat: -1, yoyo: true });
  const blueRightTL = gsap.timeline({ repeat: -1, yoyo: true });

  pinkLeftTL.to(".pink-left", {
    duration: 2,
    y: "+=20",
    x: "+=10",
    rotation: "+=2",
    ease: "power1.easeInOut",
  });

  pinkRightTL.to(".pink-right", {
    duration: 2.2,
    y: "-=15",
    x: "+=15",
    rotation: "-=1",
    ease: "power1.easeInOut",
    delay: 0.3
  });

  blueRightTL.to(".blue-right", {
    duration: 2.5,
    y: "+=25",
    x: "-=10",
    rotation: "+=1.5",
    ease: "power1.easeInOut",
    delay: 0.5
  });
};

document.addEventListener("DOMContentLoaded", ctaAnimation);



//Animating stats
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      } else {
        entry.target.classList.remove('animate-in');
      }
    });
  }, { threshold: 0.1 });

  // Observe stats container and individual stats
  const statsElements = document.querySelectorAll('.stats-container, .stats-container .stats');
  statsElements.forEach(el => observer.observe(el));
});



