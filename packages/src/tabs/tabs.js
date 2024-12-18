// Tabs Component
export function initTabs() {
  document.querySelectorAll(".tab-group").forEach((tabGroup) => {
    const tabList = tabGroup.querySelector("[role='tablist']");
    const tabLinks = tabList.querySelectorAll(".tab-link");
    const tabContents = tabGroup.querySelectorAll(".tab-content");
    const indicator = tabList.querySelector(".tab-indicator");

    const isVertical = tabGroup.getAttribute("data-dui-orientation") === "vertical";

    // Function to update the indicator position dynamically
    function updateIndicator(link) {
      const rect = link.getBoundingClientRect();
      const parentRect = tabList.getBoundingClientRect();

      if (isVertical) {
        // For vertical tabs
        indicator.style.height = `${rect.height}px`;
        indicator.style.transform = `translateY(${rect.top - parentRect.top}px)`;
      } else {
        // For horizontal tabs
        indicator.style.width = `${rect.width}px`;
        indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
      }
    }

    // Function to handle tab activation
    function activateTab(link) {
      // Deactivate all tabs and hide contents
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

    // Initialize the tabs
    tabLinks.forEach((link) => {
      // If a tab is already active, update the indicator
      if (link.classList.contains("active")) {
        activateTab(link);
      }

      // Add click event listener to each tab link
      link.addEventListener("click", (event) => {
        event.preventDefault();
        activateTab(link);
      });
    });
  });
}

// Auto-initialize tabs in the browser
if (typeof window !== "undefined") {
  initTabs();
}
