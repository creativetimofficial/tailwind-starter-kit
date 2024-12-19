// Tabs Component
export function initTabs() {
  document.querySelectorAll(".tab-group").forEach((tabGroup) => {
    const tabList = tabGroup.querySelector("[role='tablist']");
    const tabLinks = tabList.querySelectorAll(".tab-link");
    const tabContents = tabGroup.querySelectorAll(".tab-content");
    const indicator = tabList.querySelector(".tab-indicator");
    const isVertical = tabGroup.getAttribute("data-dui-orientation") === "vertical";

    function updateIndicator(link) {
      const rect = link.getBoundingClientRect();
      const parentRect = tabList.getBoundingClientRect();

      requestAnimationFrame(() => {
        if (isVertical) {
          const offsetY = rect.top - parentRect.top;
          const height = rect.height;

          // Apply styles dynamically for vertical orientation
          indicator.style.transform = `translateY(${offsetY}px)`;
          indicator.style.height = `${height}px`;
        } else {
          const offsetX = rect.left - parentRect.left;
          const width = rect.width;

          // Apply styles dynamically for horizontal orientation
          indicator.style.transform = `translateX(${offsetX}px)`;
          indicator.style.width = `${width}px`;
        }

        // Make the indicator visible
        indicator.classList.remove("hidden");
        indicator.style.opacity = "1";
        indicator.style.scale = "1";
      });
    }

    function activateTab(link) {
      // Deactivate all tabs and hide their content
      tabLinks.forEach((item) => item.classList.remove("active"));
      tabContents.forEach((content) => {
        content.classList.add("hidden");
        content.classList.remove("block");
      });

      // Activate the clicked tab
      link.classList.add("active");
      const targetContent = document.getElementById(link.getAttribute("data-dui-tab-target"));
      if (targetContent) {
        targetContent.classList.add("block");
        targetContent.classList.remove("hidden");
      }

      // Update the indicator position
      updateIndicator(link);
    }

    // Check for the tab with the `active` class and set the indicator initially
    setTimeout(() => {
      const activeLink = tabList.querySelector(".tab-link.active");
      if (activeLink) {
        activateTab(activeLink);
      }
    }, 100);

    // Initialize click event listeners for each tab
    tabLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default browser behavior
        activateTab(link); // Activate the clicked tab and update the indicator
      });
    });
  });
}

// Auto-initialize tabs in the browser
if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    initTabs();
  });
}








