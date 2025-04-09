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
  const hamburgerIcons = document.querySelectorAll('.hamburger'); // both navs
  const mobileNav = document.querySelector('.mobile-nav');
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
        mobileNav.classList.remove('active'); // Close nav on click (mobile + tablet)

        observer.unobserve(section);
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => observer.observe(section), 1000);
      } else if (sectionId === "contact") {
        window.location.href = "contact-us.html";
      }
    });
  });

  // Handles clicks on all hamburger icons (mobile and tablet)
  hamburgerIcons.forEach(hamburger => {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('active');
    });
  });

  closeButton.addEventListener('click', () => {
    mobileNav.classList.remove('active');
  });

  // Swipe to close (left swipe)
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

  // Click outside to close
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
      mobileNav.classList.remove('active');
    }
  });

  // Section observer logic for highlighting nav links
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

  // Close the nav on window resize if screen gets too big
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      mobileNav.classList.remove('active');
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