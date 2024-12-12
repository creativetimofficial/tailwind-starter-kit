// Dynamically load Popper.js for Dropdowns, Popovers, and Tooltips
function loadPopperJs(callback) {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/@popperjs/core@2";
  script.defer = true;
  script.onload = callback; // Callback function after script is loaded
  document.head.appendChild(script);
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

// Initialize components that depend on Popper.js after it is loaded
loadPopperJs(() => {
  initPopovers();
});