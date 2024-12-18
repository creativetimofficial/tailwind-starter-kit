// Tooltip component
export function initTooltips() {
  const tooltipTriggers = document.querySelectorAll("[data-dui-toggle='tooltip']");

  tooltipTriggers.forEach((trigger) => {
    const title = trigger.getAttribute("data-dui-title"); // Plain text content
    const placement = trigger.getAttribute("data-dui-placement") || "top";
    const tooltipClasses = trigger.getAttribute("data-dui-tooltip-class") || "tooltip-default";

    let tooltipInstance = null;
    let tooltipElement = null;
    let customContentElement = null;

    // Check for sibling content with custom HTML
    if (trigger.nextElementSibling?.matches("[data-dui-tooltip-content]")) {
      customContentElement = trigger.nextElementSibling;
    }

    // Show the tooltip
    function showTooltip() {
      if (tooltipElement) return; // Avoid duplicate tooltips

      tooltipElement = document.createElement("div");
      tooltipElement.className = tooltipClasses;

      // Use custom HTML content or plain text
      if (customContentElement) {
        const contentClone = customContentElement.cloneNode(true);
        contentClone.classList.remove("hidden");
        tooltipElement.appendChild(contentClone);
      } else if (title) {
        tooltipElement.textContent = title;
      } else {
        console.warn("No tooltip content provided for:", trigger);
        return;
      }

      document.body.appendChild(tooltipElement);

      // Create Popper.js instance
      tooltipInstance = Popper.createPopper(trigger, tooltipElement, {
        placement: placement,
        modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
      });
    }

    // Hide the tooltip
    function hideTooltip() {
      if (tooltipElement && !trigger.classList.contains("static-tooltip")) {
        tooltipInstance.destroy();
        tooltipInstance = null;
        tooltipElement.remove();
        tooltipElement = null;
      }
    }

    // Event Listeners
    trigger.addEventListener("mouseenter", showTooltip);
    trigger.addEventListener("mouseleave", hideTooltip);

    // Toggle static tooltips on click
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
