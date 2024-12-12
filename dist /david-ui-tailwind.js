// Dynamically load Popper.js for Dropdowns, Popovers, and Tooltips
function loadPopperJs(callback) {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/@popperjs/core@2";
  script.defer = true;
  script.onload = callback; // Callback function after script is loaded
  document.head.appendChild(script);
}

// Initialize components that don't depend on Popper.js immediately
(function () {
  initAlert();
  initCollapse();
  initModal();
  initTabs();
}());

// Initialize components that depend on Popper.js after it is loaded
loadPopperJs(() => {
  initDropdowns();
  initPopovers();
  initTooltips();
});


// Alert component
function closeAlert(event) {
  const button = event.currentTarget;
  const alert = button.closest('[role="alert"]');
  if (alert) alert.parentNode.removeChild(alert);
}
function initAlert() {
  document.querySelectorAll("[data-dui-dismiss='alert']").forEach(button => {
    button.addEventListener("click", closeAlert);
  });
}

// Dropdown component
class Dropdown {
  constructor(dropdownElement) {
    this.dropdown = dropdownElement;
    this.button = this.dropdown.querySelector('[data-dui-toggle="dropdown"]');
    this.menu = this.dropdown.querySelector('ul');
    this.popperInstance = null;
    this.init();
  }
  init() {
    this.popperInstance = Popper.createPopper(this.button, this.menu, {
      placement: 'bottom-start',
      modifiers: [{ name: 'offset', options: { offset: [0, 5] } }]
    });
    this.button.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });
    document.addEventListener('click', () => this.closeDropdown());
  }
  toggleDropdown() {
    const isExpanded = this.button.getAttribute('aria-expanded') === 'true';
    this.button.setAttribute('aria-expanded', !isExpanded);
    this.menu.hidden = isExpanded;
    this.menu.classList.toggle('hidden', isExpanded);
    this.popperInstance.update();
  }
  closeDropdown() {
    this.button.setAttribute('aria-expanded', false);
    this.menu.hidden = true;
    this.menu.classList.add('hidden');
  }
}
function initDropdowns() {
  const dropdownElement = document.querySelector('.dropdown');
  if (dropdownElement) new Dropdown(dropdownElement);
}

// Collapse component
function toggleCollapse(event) {
  const collapseID = event.currentTarget.getAttribute("data-dui-target") || event.currentTarget.getAttribute("href");
  if (collapseID.startsWith("#")) {
    const collapseElement = document.querySelector(collapseID);
    const isExpanded = event.currentTarget.getAttribute("aria-expanded") === "true";
    collapseElement.style.maxHeight = isExpanded ? "0" : collapseElement.scrollHeight + "px";
    event.currentTarget.setAttribute("aria-expanded", !isExpanded);
  }
}
function initCollapse() {
  document.querySelectorAll("[data-dui-toggle='collapse']").forEach(button => {
    button.addEventListener("click", toggleCollapse);
  });
}

// Modal component
function toggleModal(event) {
  const modalID = event.currentTarget.getAttribute("data-dui-target");
  const modal = document.querySelector(modalID);
  if (modal) {
    const isHidden = modal.classList.contains("pointer-events-none");
    modal.classList.toggle("opacity-0", !isHidden);
    modal.classList.toggle("pointer-events-none", isHidden);
    modal.classList.toggle("opacity-100", isHidden);
    const modalContent = modal.querySelector(isHidden ? ".scale-95" : ".scale-100");
    modalContent.classList.toggle("scale-95", !isHidden);
    modalContent.classList.toggle("scale-100", isHidden);
    modal.setAttribute("aria-hidden", !isHidden);
    if (!isHidden) setTimeout(() => modal.classList.add("pointer-events-none"), 300);
  }
}
function closeModal(event) {
  const modal = event.currentTarget.closest(".fixed");
  if (modal) {
    modal.classList.add("opacity-0");
    modal.classList.remove("opacity-100");
    const modalContent = modal.querySelector(".scale-100");
    modalContent.classList.add("scale-95");
    modalContent.classList.remove("scale-100");
    setTimeout(() => {
      modal.classList.add("pointer-events-none");
      modal.setAttribute("aria-hidden", "true");
    }, 300);
  }
}
function initModal() {
  document.querySelectorAll("[data-dui-toggle='modal']").forEach(trigger => {
    trigger.addEventListener("click", toggleModal);
  });
  document.querySelectorAll("[data-dui-dismiss='modal']").forEach(button => {
    button.addEventListener("click", closeModal);
  });
}

// Popover component
function initPopovers() {
    const popoverTriggers = document.querySelectorAll("[data-dui-toggle='popover']");

    popoverTriggers.forEach(trigger => {
      const content = trigger.getAttribute("data-dui-content");
      const placement = trigger.getAttribute("data-dui-placement");
      const popoverClasses = trigger.getAttribute("data-dui-popover-class"); // Read popover classes from HTML

      let popoverInstance = null;
      let popoverElement = null;

      trigger.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent click from propagating

        // If popover is already open, close it
        if (popoverInstance) {
          popoverInstance.destroy();
          popoverInstance = null;
          popoverElement.remove();
          popoverElement = null;
          return;
        }

        // Create popover element and apply the dynamic class from HTML
        popoverElement = document.createElement("div");
        popoverElement.className = popoverClasses; // Apply classes dynamically from HTML
        popoverElement.textContent = content;
        document.body.appendChild(popoverElement);

        // Create Popper.js instance
        popoverInstance = Popper.createPopper(trigger, popoverElement, {
          placement: placement,
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 8],
              },
            },
          ],
        });

        // Store references for later use
        trigger._popoverInstance = popoverInstance;
        trigger._popoverElement = popoverElement;
      });
    });
  }

// Tooltip component
function initTooltips() {
      const tooltipTriggers = document.querySelectorAll("[data-dui-toggle='tooltip']");

      tooltipTriggers.forEach(trigger => {
        const title = trigger.getAttribute("data-dui-title");
        const placement = trigger.getAttribute("data-dui-placement");
        const tooltipClasses = trigger.getAttribute("data-dui-tooltip-class");

        let tooltipInstance = null;
        let tooltipElement = null;

        function showTooltip() {
          // If tooltip is already visible, do nothing
          if (tooltipElement) return;

          // Create tooltip element
          tooltipElement = document.createElement("div");
          tooltipElement.className = tooltipClasses;
          tooltipElement.textContent = title;
          document.body.appendChild(tooltipElement);

          // Create Popper.js instance
          tooltipInstance = Popper.createPopper(trigger, tooltipElement, {
            placement: placement,
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 8],
                },
              },
            ],
          });
        }

        function hideTooltip() {
          if (tooltipElement && !trigger.classList.contains('static-tooltip')) {
            tooltipInstance.destroy();
            tooltipInstance = null;
            tooltipElement.remove();
            tooltipElement = null;
          }
        }

        trigger.addEventListener("mouseenter", showTooltip);
        trigger.addEventListener("mouseleave", hideTooltip);

        trigger.addEventListener("click", () => {
          if (trigger.classList.contains("static-tooltip")) {
            trigger.classList.remove("static-tooltip");
            hideTooltip();
          } else {
            trigger.classList.add("static-tooltip");
            showTooltip();
          }
        });
      });
    }

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
