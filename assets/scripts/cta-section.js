document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".cta-tab-buttons");
  const contentContainer = document.querySelector(".cta-window-content");
  const leftContent = document.querySelector(".cta-window-content-left p");

  // Define content for each tab
  const tabData = {
    software: {
      content: `
        <div class="cta-window-content-card-container animate">
          <div class="tick-container">
            <img src="./assets/icons/tick.svg" alt="Success Icon"/>
          </div>
          <div class="cta-window-content-card border-bottom">
            <p class="h20 text-upper black">Custom Software Solutions</p>
            <p class="h18">We develop tailored software solutions that perfectly align with your business needs, from enterprise applications to mobile apps.</p>
          </div>
        </div>
        <div class="cta-window-content-card-container animate">
          <div class="tick-container">
            <img src="./assets/icons/tick.svg" alt="Success Icon"/>
          </div>
          <div class="cta-window-content-card border-bottom">
            <p class="h20 text-upper black">DevOps Excellence</p>
            <p class="h18">Our DevOps practices streamline development and operations, ensuring continuous delivery and optimal performance of your applications.</p>
          </div>
        </div>
      `,
      left: "We have over 2 years of experience",
    },
    cloud: {
      content: `
        <div class="cta-window-content-card-container animate">
          <div class="tick-container">
            <img src="./assets/icons/tick.svg" alt="Success Icon"/>
          </div>
          <div class="cta-window-content-card border-bottom">
            <p class="h20 text-upper black">Cloud Infrastructure</p>
            <p class="h18">We provide scalable cloud solutions, ensuring secure and efficient business operations.</p>
          </div>
        </div>
        <div class="cta-window-content-card-container animate">
          <div class="tick-container">
            <img src="./assets/icons/tick.svg" alt="Success Icon"/>
          </div>
          <div class="cta-window-content-card border-bottom">
            <p class="h20 text-upper black">Cloud Security</p>
            <p class="h18">Our robust security solutions protect your cloud-based applications and data from threats.</p>
          </div>
        </div>
      `,
      left: "Secure and scalable cloud solutions",
    },
    digital: {
      content: `
        <div class="cta-window-content-card-container animate">
          <div class="tick-container">
            <img src="./assets/icons/tick.svg" alt="Success Icon"/>
          </div>
          <div class="cta-window-content-card border-bottom">
            <p class="h20 text-upper black">AI-Powered Innovation</p>
            <p class="h18">We harness AI to create cutting-edge digital solutions that drive business growth.</p>
          </div>
        </div>
        <div class="cta-window-content-card-container animate">
          <div class="tick-container">
            <img src="./assets/icons/tick.svg" alt="Success Icon"/>
          </div>
          <div class="cta-window-content-card border-bottom">
            <p class="h20 text-upper black">Next-Gen UX/UI</p>
            <p class="h18">We design intuitive user experiences that enhance customer engagement and satisfaction.</p>
          </div>
        </div>
      `,
      left: "Leading digital transformation",
    },
  };

  // Function to switch content
  function switchTab(tabKey) {
    // Remove "active" class from all tabs
    tabs.forEach(tab => tab.classList.remove("active"));
    
    // Add "active" class to the selected tab
    document.querySelector(`[data-tab="${tabKey}"]`).classList.add("active");

    // Apply animation before updating content
    contentContainer.style.opacity = "0";
    leftContent.style.opacity = "0";
    contentContainer.style.transform = "translateY(20px)";
    leftContent.style.transform = "translateY(20px)";

    setTimeout(() => {
      contentContainer.innerHTML = tabData[tabKey].content;
      leftContent.textContent = tabData[tabKey].left;

      // Reapply animation
      contentContainer.style.opacity = "1";
      leftContent.style.opacity = "1";
      contentContainer.style.transform = "translateY(0)";
      leftContent.style.transform = "translateY(0)";
    }, 300);
  }

  // Attach event listeners
  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      const tabKey = this.getAttribute("data-tab");
      switchTab(tabKey);
    });
  });

  // Set default tab on page load
  switchTab("software");
});
