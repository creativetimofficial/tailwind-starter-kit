// Tooltip Component
import { loadPopperJs } from '../utils/loadPopper';

const initializedTooltips = new WeakSet(); // Prevent duplicate initialization
let activeTooltips = []; // Track active tooltips for cleanup

export function initTooltips() {
  document.querySelectorAll("[data-dui-toggle='tooltip']").forEach((trigger) => {
    if (initializedTooltips.has(trigger)) return; // Avoid re-initializing

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

    // Function to show the tooltip
    function showTooltip() {
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

      tooltipInstance = Popper.createPopper(trigger, tooltipElement, {
        placement: placement,
        modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
      });

      // Track active tooltips for cleanup
      activeTooltips.push({ trigger, tooltipElement, tooltipInstance });
    }

    // Function to hide the tooltip
    function hideTooltip() {
      if (tooltipInstance) {
        tooltipInstance.destroy();
        tooltipInstance = null;
      }

      if (tooltipElement) {
        tooltipElement.remove();
        tooltipElement = null;
      }

      // Remove from active tooltips
      activeTooltips = activeTooltips.filter((t) => t.trigger !== trigger);
    }

    // Add event listeners for showing and hiding tooltips
    trigger.addEventListener("mouseenter", showTooltip);
    trigger.addEventListener("mouseleave", hideTooltip);

    // Mark as initialized
    initializedTooltips.add(trigger);
  });
}

// Cleanup function to destroy all active tooltips
export function cleanupTooltips() {
  activeTooltips.forEach(({ tooltipElement, tooltipInstance }) => {
    if (tooltipInstance) tooltipInstance.destroy();
    if (tooltipElement) tooltipElement.remove();
  });
  activeTooltips = [];
}

// Combined initialization function
export async function loadAndInitTooltips() {
  await loadPopperJs();
  initTooltips();
}

// Auto-initialize Tooltips in the Browser Environment
if (typeof window !== "undefined" && typeof document !== "undefined") {
  loadAndInitTooltips();
}
