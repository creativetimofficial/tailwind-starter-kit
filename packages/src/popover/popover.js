import { loadPopperJs } from '../utils/loadPopper';

const initializedPopovers = new WeakSet(); // Prevent duplicate initialization
let activePopovers = []; // Track active popovers for cleanup

export function initPopovers() {
  document.querySelectorAll("[data-dui-toggle='popover']").forEach((trigger) => {
    if (initializedPopovers.has(trigger)) return; // Avoid re-initializing

    const placement = trigger.getAttribute("data-dui-placement") || "top";
    const popoverClasses = trigger.getAttribute("data-dui-popover-class") || "popover-default";
    const plainContent = trigger.getAttribute("data-dui-popover-content");
    const isOpenByDefault = trigger.hasAttribute("data-dui-open");

    let popoverInstance = null;
    let popoverElement = null;
    let originalContentElement = null;

    // Find content element next to the trigger
    const contentElement = trigger.nextElementSibling?.matches("[data-dui-popover-content]")
      ? trigger.nextElementSibling
      : null;

    // Function to open the popover
    async function openPopover() {
      await loadPopperJs();

      // Create the popover element
      popoverElement = document.createElement("div");
      popoverElement.className = popoverClasses;

      // Use custom HTML content or plain text
      if (contentElement) {
        originalContentElement = contentElement.cloneNode(true);
        originalContentElement.classList.remove("hidden");
        popoverElement.appendChild(originalContentElement);
      } else if (plainContent) {
        popoverElement.textContent = plainContent;
      } else {
        console.error("No content provided for popover:", trigger);
        return;
      }

      // Append the popover element to the body
      document.body.appendChild(popoverElement);

      // Initialize Popper.js
      popoverInstance = Popper.createPopper(trigger, popoverElement, {
        placement: placement,
        modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
      });

      // Add a small delay to ensure Popper.js calculations are correct
      setTimeout(() => {
        popoverElement.style.opacity = "1"; // Make the popover visible
        popoverElement.style.transform = "scale(1)"; // Apply scaling animation
        popoverInstance.update(); // Ensure Popper.js recalculates position
      }, 0);

      // Track active popovers for cleanup
      activePopovers.push({ trigger, popoverElement, popoverInstance });
    }


    // Function to close the popover
    function closePopover() {
      if (popoverInstance) {
        popoverInstance.destroy();
        popoverInstance = null;

        if (originalContentElement) {
          originalContentElement.classList.add("hidden");
        }

        popoverElement.remove();
        popoverElement = null;
      }

      // Remove from active popovers
      activePopovers = activePopovers.filter((p) => p.trigger !== trigger);
    }

    // Toggle popover on click
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      if (popoverInstance) {
        closePopover();
      } else {
        openPopover();
      }
    });

    // Open popover by default if specified
    if (isOpenByDefault) {
      openPopover();
    }

    // Mark as initialized
    initializedPopovers.add(trigger);
  });
}

// Cleanup function to destroy all active popovers
export function cleanupPopovers() {
  activePopovers.forEach(({ popoverElement, popoverInstance }) => {
    if (popoverInstance) popoverInstance.destroy();
    if (popoverElement) popoverElement.remove();
  });
  activePopovers = [];
  initializedPopovers.delete(); // Clear initialized elements
}

// Combined initialization function
export async function loadAndInitPopovers() {
  await loadPopperJs();
  initPopovers();
}

// Auto-initialize Popovers in the Browser Environment
if (typeof window !== "undefined" && typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    loadAndInitPopovers();

    // Observe the DOM for dynamically added popovers
    const observer = new MutationObserver(() => {
      initPopovers(); // Reinitialize popovers when new elements are added
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
}
