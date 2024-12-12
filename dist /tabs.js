// Tabs component
function initTabs() {
  document.querySelectorAll(".tab-group").forEach(tabGroup => {
    const tabList = tabGroup.querySelector("[role='tablist']");
    const tabLinks = tabList.querySelectorAll(".tab-link");
    const tabContents = tabGroup.querySelectorAll(".tab-content");
    const indicator = tabList.querySelector(".tab-indicator");

    // Function to update the indicator position dynamically
    function updateIndicator(link) {
      const rect = link.getBoundingClientRect();
      const parentRect = tabList.getBoundingClientRect();

      // Adjust indicator position based on tab style
      indicator.style.width = `${rect.width}px`;
      indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
    }

    // Function to handle tab click and update active state
    tabLinks.forEach(link => {
      // If the tab is initially active, update the indicator position
      if (link.classList.contains("active")) {
        updateIndicator(link);
        const target = document.getElementById(link.getAttribute("data-dui-tab-target"));
        target.classList.add("block");
        target.classList.remove("hidden");
      }

      link.addEventListener("click", (event) => {
        event.preventDefault();

        // Hide all tab contents and reset the indicator
        tabContents.forEach(content => {
          content.classList.add("hidden");
          content.classList.remove("block");
        });

        // Set the clicked tab content as active
        const target = document.getElementById(link.getAttribute("data-dui-tab-target"));
        target.classList.add("block");
        target.classList.remove("hidden");

        // Update the indicator position based on the clicked tab
        updateIndicator(link);
      });
    });
  });
}

(function () {
  initTabs();
}());