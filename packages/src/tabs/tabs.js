const initializedTabs = new WeakSet(); // Track initialized tabs for preventing duplication

export function initTabs() {
  document.querySelectorAll(".tab-group").forEach((tabGroup) => {
    if (initializedTabs.has(tabGroup)) return; // Avoid re-initializing the same tab group

    const tabList = tabGroup.querySelector("[role='tablist']");
    const tabLinks = tabList.querySelectorAll(".tab-link");
    const tabContents = tabGroup.querySelectorAll(".tab-content");
    const indicator = tabList.querySelector(".tab-indicator");
    const isVertical = tabGroup.getAttribute("data-dui-orientation") === "vertical";

    // Function to update the indicator's position dynamically
    function updateIndicator(link) {
      const rect = link.getBoundingClientRect();
      const parentRect = tabList.getBoundingClientRect();

      requestAnimationFrame(() => {
        if (isVertical) {
          indicator.style.transform = `translateY(${rect.top - parentRect.top}px)`;
          indicator.style.height = `${rect.height}px`;
        } else {
          indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
          indicator.style.width = `${rect.width}px`;
        }

        // Make the indicator visible
        indicator.classList.remove("hidden");
        indicator.style.opacity = "1";
        indicator.style.scale = "1";
      });
    }

    // Function to activate the selected tab
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

    // Initialize the tab group
    function initializeTabGroup() {
      const activeLink = tabList.querySelector(".tab-link.active");
      if (activeLink) {
        activateTab(activeLink); // Set indicator for the initially active tab
      } else if (tabLinks.length > 0) {
        activateTab(tabLinks[0]); // Fallback to the first tab if no active tab is defined
      }

      // Attach click listeners to each tab link
      tabLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
          event.preventDefault(); // Prevent default browser behavior
          activateTab(link); // Activate the clicked tab and update the indicator
        });
      });
    }

    initializeTabGroup();
    initializedTabs.add(tabGroup); // Mark the tab group as initialized
  });
}

// Cleanup function for tabs
export function cleanupTabs() {
  initializedTabs.forEach((tabGroup) => {
    const tabList = tabGroup.querySelector("[role='tablist']");
    const tabLinks = tabList.querySelectorAll(".tab-link");

    // Remove event listeners from tab links
    tabLinks.forEach((link) => {
      const clone = link.cloneNode(true);
      link.parentNode.replaceChild(clone, link);
    });
  });

  initializedTabs.delete(); // Clear the WeakSet
}

// Auto-initialize tabs in the browser
if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    initTabs();

    // Observe DOM changes to reinitialize tabs dynamically
    const observer = new MutationObserver(() => {
      initTabs();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
}
