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

  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const sectionId = this.dataset.section;
      const section = document.getElementById(sectionId);

      if (section) {
        e.preventDefault();

        observer.unobserve(section);
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => observer.observe(section), 1000);
      } else if (sectionId === "contact") {
        window.location.href = "contact-us.html";
      }
    });
  });

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
});







document.addEventListener("DOMContentLoaded", function () {
  const hamburgerIcons = document.querySelectorAll('.hamburger'); // For both mobile & tablet
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const closeButton = mobileNav.querySelector('button[nav]');
  let touchStartX = 0;
  const swipeThreshold = 50;

  const navLinks = document.querySelectorAll(".navbar-links li, .mobile-nav ul li");
  const sections = document.querySelectorAll(".page-section");
  let currentActiveSection = null;

  function setActiveLink(sectionId) {
    navLinks.forEach(link => {
      link.classList.toggle("active", link.dataset.section === sectionId);
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const sectionId = this.dataset.section;
      const section = document.getElementById(sectionId);

      if (section) {
        e.preventDefault();
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');

        observer.unobserve(section);
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => observer.observe(section), 1000);
      } else if (sectionId === "contact") {
        window.location.href = "contact-us.html";
      }
    });
  });

  // Open Nav
  hamburgerIcons.forEach(hamburger => {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('active');
      overlay.classList.add('active');
    });
  });

  // Close Nav via Close Button
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  // Close Nav via Overlay Click
  overlay.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Swipe-to-Close (Left Swipe)
  mobileNav.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  mobileNav.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (deltaX < -swipeThreshold) {
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
    }
  });

  // ESC Key to Close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
    }
  });

  // Section Observer Logic (Highlight Active Link)
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

  // Close nav on window resize for larger screens
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
    }
  });
});







// Floating button
const scrollBtn = document.getElementById('scrollToTopBtn');
    const heroSection = document.getElementById('hero-section');

    window.addEventListener('scroll', () => {
      const heroBottom = heroSection.getBoundingClientRect().bottom;

      if (heroBottom < 0) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show', 'clicked');
      }
    });

    scrollBtn.addEventListener('click', () => {
      scrollBtn.classList.add('clicked');

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Wait for scroll to top then hide
      setTimeout(() => {
        scrollBtn.classList.remove('show', 'clicked');
      }, 800);
    });


document.addEventListener("DOMContentLoaded", () => {
  // Select the two nav elements and the marker element.
  const mobileNav = document.querySelector(".mobile-nav");
  const tabletNav = document.querySelector(".tablet-nav-fixed");
  const marker = document.querySelector(".pink-bg-element2");
  
  // Verify that all required elements exist.
  if (!mobileNav || !tabletNav || !marker) {
    console.error("One or more required elements (navs or marker) not found.");
    return;
  }
  
  // Define the observer options.
  // Using root: null (viewport) and threshold: 0 to fire the callback as soon as any pixel of the marker enters or leaves.
  const observerOptions = {
    root: null,
    threshold: 0
  };
  
  // The Intersection Observer callback toggles the CSS class.
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Marker is in view (hero section is still in view), so show navs.
        mobileNav.classList.remove("hidden-nav");
        tabletNav.classList.remove("hidden-nav");
      } else {
        // Marker is out of view (hero section is scrolled past), hide navs.
        mobileNav.classList.add("hidden-nav");
        tabletNav.classList.add("hidden-nav");
      }
    });
  };
  
  // Create the Intersection Observer and observe the marker element.
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(marker);
});


document.addEventListener('DOMContentLoaded', () => {
  // Select the hero section and the fixed nav elements.
  const heroSection = document.querySelector('.hero-section');
  const mobileNav = document.querySelector('.mobile-nav-fixed');
  const tabletNav = document.querySelector('.tablet-nav-fixed');

  // Check that all required elements exist.
  if (!heroSection || !mobileNav || !tabletNav) {
    console.error('One or more required elements were not found.');
    return;
  }

  // Observer options: 
  // - root: null means the viewport.
  // - threshold: 0 fires as soon as even one pixel is visible.
  const options = {
    root: null,
    threshold: 0
  };

  // Callback to toggle the nav visibility:
  // When the hero section is entirely out of view (intersectionRatio === 0),
  // hide the navs by adding the 'hidden-nav' class.
  // Otherwise, remove the class to show the navs.
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio <= 0) {
        // Hero section is completely scrolled past, hide navs
        mobileNav.classList.add('hidden-nav');
        tabletNav.classList.add('hidden-nav');
      } else {
        // Any part of hero is visible, show navs
        mobileNav.classList.remove('hidden-nav');
        tabletNav.classList.remove('hidden-nav');
      }
    });
  };

  // Create the Intersection Observer and start observing the hero section.
  const observer = new IntersectionObserver(observerCallback, options);
  observer.observe(heroSection);
});
