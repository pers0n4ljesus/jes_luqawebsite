document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector(".footer-middle-section");

  const children = document.querySelectorAll(".footer-middle-section-container, .footer-bottom");

  gsap.set(children, { y: 20, opacity: 0 }); 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.to(children, { y: 0, opacity: 1, stagger: 0.2, duration: 1.8, ease: "power2.out" });
      } else {
        gsap.to(children, { y: 20, opacity: 0, stagger: 0.2, duration: 1.8, ease: "power2.out" });
      }
    });
  }, { threshold: 0.1 });

  observer.observe(footer);
});
