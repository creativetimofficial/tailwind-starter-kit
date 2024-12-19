import { loadPopperJs } from '../utils/loadPopper';

const initializedTooltips = new WeakSet(); // Track initialized tooltips
let activeTooltips = []; // Track active tooltips for cleanup

export function initTooltips() {
  document.querySelectorAll("[data-dui-toggle='tooltip']").forEach((trigger) => {
    if (initializedTooltips.has(trigger)) return; // Skip already initialized tooltips

    const title = trigger.getAttribute("data-dui-title"); // Tooltip text content
    const placement = trigger.getAttribute("data-dui-placement") || "top";
    const tooltipClasses = trigger.getAttribute("data-dui-tooltip-class") || "tooltip-default";
    let tooltipInstance = null;
    let tooltipElement = null;
    let customContentElement = null;

    // Check for custom HTML content in sibling
    if (trigger.nextElementSibling?.matches("[data-dui-tooltip-content]")) {
      customContentElement = trigger.nextElementSibling;
    }

    // Function to show the tooltip
    async function showTooltip() {
      if (tooltipElement) return; // Avoid creating multiple tooltips
      await loadPopperJs(); // Ensure Popper.js is loaded

      tooltipElement = document.createElement("div");
      tooltipElement.className = tooltipClasses;

      // Add custom HTML or plain text to tooltip
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

      // Track active tooltip for cleanup
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

    // Event listeners for showing and hiding tooltips
    trigger.addEventListener("mouseenter", showTooltip);
    trigger.addEventListener("mouseleave", hideTooltip);

    // Mark the trigger as initialized
    initializedTooltips.add(trigger);
  });
}

// Cleanup function to remove all active tooltips
export function cleanupTooltips() {
  activeTooltips.forEach(({ tooltipElement, tooltipInstance }) => {
    if (tooltipInstance) tooltipInstance.destroy();
    if (tooltipElement) tooltipElement.remove();
  });
  activeTooltips = [];
}

// Combined initialization and loading function
export async function loadAndInitTooltips() {
  await loadPopperJs();
  initTooltips();
}

// Auto-initialize Tooltips in the browser
if (typeof window !== "undefined" && typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    loadAndInitTooltips();

    // Observe DOM for dynamically added tooltips
    const observer = new MutationObserver(() => {
      initTooltips();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
}
