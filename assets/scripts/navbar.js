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



document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar-links li");
  const sections = document.querySelectorAll(".page-section");
  let currentActiveSection = null;

  function setActiveLink(sectionId) {
    navLinks.forEach(link => {
      link.classList.toggle("active", link.dataset.section === sectionId);
    });
  }

  // Click event for smooth scrolling
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionId = this.dataset.section;
      const section = document.getElementById(sectionId);
      if (section) {
        // Temporarily disable observer during click
        observer.unobserve(section);
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => observer.observe(section), 1000);
      }
    });
  });

  // Intersection Observer configuration
  const observerOptions = {
    root: null,
    rootMargin: "-50px 0px -50% 0px", // Adjust this to fine-tune detection
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const sectionId = entry.target.id;
      
      if (entry.isIntersecting) {
        currentActiveSection = sectionId;
      } else if (currentActiveSection === sectionId) {
        currentActiveSection = null;
      }
    });

    // Find the section that's most centered in the viewport
    const visibleSections = Array.from(sections).filter(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
    });

    if (visibleSections.length > 0) {
      const mostVisible = visibleSections.reduce((closest, section) => {
        const rect = section.getBoundingClientRect();
        const centerOffset = Math.abs(rect.top + rect.height/2 - window.innerHeight/2);
        return centerOffset < closest.offset ? 
          { section: section, offset: centerOffset } : closest;
      }, { section: visibleSections[0], offset: Infinity });

      setActiveLink(mostVisible.section.id);
    } else if (currentActiveSection) {
      // Fallback to last known active section
      setActiveLink(currentActiveSection);
    } else {
      navLinks.forEach(link => link.classList.remove("active"));
    }
  }, observerOptions);

  // Observe all sections
  sections.forEach(section => observer.observe(section));

  // Handle scroll events for edge cases
  let isScrolling = false;
  window.addEventListener("scroll", () => {
    isScrolling = true;
  });

  // Check every 100ms if scrolling has stopped
  setInterval(() => {
    if (isScrolling) {
      isScrolling = false;
      // Force update when scrolling stops
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          setActiveLink(section.id);
        }
      });
    }
  }, 100);
});




