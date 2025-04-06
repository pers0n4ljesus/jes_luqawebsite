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

  // Click event for smooth scrolling (only for internal sections)
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const sectionId = this.dataset.section;
      const section = document.getElementById(sectionId);

      if (section) {
        // Only prevent default if it's an internal section
        e.preventDefault();

        // Temporarily disable observer during click
        observer.unobserve(section);
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => observer.observe(section), 1000);
      } else if (sectionId === "contact") {
        // Allow normal navigation for "Contact Us"
        window.location.href = "contact-us.html";
      }
    });
  });

  // Intersection Observer configuration (same as before)
  const observerOptions = {
    root: null,
    rootMargin: "-50px 0px -50% 0px",
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

    // Find the most centered section
    const visibleSections = Array.from(sections).filter(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
    });

    if (visibleSections.length > 0) {
      const mostVisible = visibleSections.reduce((closest, section) => {
        const rect = section.getBoundingClientRect();
        const centerOffset = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
        return centerOffset < closest.offset ? 
          { section: section, offset: centerOffset } : closest;
      }, { section: visibleSections[0], offset: Infinity });

      setActiveLink(mostVisible.section.id);
    } else if (currentActiveSection) {
      setActiveLink(currentActiveSection);
    } else {
      navLinks.forEach(link => link.classList.remove("active"));
    }
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});







document.addEventListener("DOMContentLoaded", function () {
  // Previous mobile nav code
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeButton = mobileNav.querySelector('button[nav]');
  let touchStartX = 0;
  const swipeThreshold = 50;

  // Scroll functionality variables
  const navLinks = document.querySelectorAll(".navbar-links li, .mobile-nav ul li");
  const sections = document.querySelectorAll(".page-section");
  let currentActiveSection = null;

  // Combined scroll functionality
  function setActiveLink(sectionId) {
    navLinks.forEach(link => {
      link.classList.toggle("active", link.dataset.section === sectionId);
    });
  }

  // Click handler for both desktop and mobile nav
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const sectionId = this.dataset.section;
      const section = document.getElementById(sectionId);

      if (section) {
        e.preventDefault();
        
        // Close mobile nav after click
        if (window.innerWidth <= 768) {
          mobileNav.classList.remove('active');
        }

        // Scroll logic
        observer.unobserve(section);
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => observer.observe(section), 1000);
      } else if (sectionId === "contact") {
        window.location.href = "contact-us.html";
      }
    });
  });

  // Mobile nav specific handlers
  hamburger.addEventListener('click', () => {
    mobileNav.classList.add('active');
  });

  closeButton.addEventListener('click', () => {
    mobileNav.classList.remove('active');
  });

  mobileNav.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  mobileNav.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (deltaX < -swipeThreshold) {
      mobileNav.classList.remove('active');
    }
  });

  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
      mobileNav.classList.remove('active');
    }
  });

  // Shared Intersection Observer logic
  const observerOptions = {
    root: null,
    rootMargin: "-50px 0px -50% 0px",
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

    const visibleSections = Array.from(sections).filter(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
    });

    if (visibleSections.length > 0) {
      const mostVisible = visibleSections.reduce((closest, section) => {
        const rect = section.getBoundingClientRect();
        const centerOffset = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
        return centerOffset < closest.offset ? 
          { section: section, offset: centerOffset } : closest;
      }, { section: visibleSections[0], offset: Infinity });

      setActiveLink(mostVisible.section.id);
    } else if (currentActiveSection) {
      setActiveLink(currentActiveSection);
    } else {
      navLinks.forEach(link => link.classList.remove("active"));
    }
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Window resize handler
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      mobileNav.classList.remove('active');
    }
  });
});




