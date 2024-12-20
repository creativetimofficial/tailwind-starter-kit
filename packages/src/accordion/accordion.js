// Accordion Component
const initializedAccordionElements = new WeakSet();

// Helper function to handle icons
const handleIcons = (button, isExpanded, isRotating = false) => {
  const openIcon = button.querySelector("[data-dui-accordion-icon-open]");
  const closeIcon = button.querySelector("[data-dui-accordion-icon-close]");
  const rotatingIcon = button.querySelector("[data-dui-accordion-icon]");

  if (openIcon && closeIcon) {
    openIcon.style.display = isExpanded ? "block" : "none";
    closeIcon.style.display = isExpanded ? "none" : "block";
  }
  if (rotatingIcon) {
    rotatingIcon.classList.toggle("rotate-180", isRotating ? isExpanded : !isExpanded);
  }
};

// Helper function to toggle accordion state
const toggleAccordionState = (targetElement, button, isExpanded) => {
  targetElement.style.maxHeight = isExpanded ? targetElement.scrollHeight + "px" : "0";
  button.setAttribute("aria-expanded", isExpanded);
  handleIcons(button, isExpanded);
};

// Function to toggle accordion items
export function toggleAccordion(event) {
  if (event.currentTarget.getAttribute("aria-disabled") === "true") return;

  const targetID = event.currentTarget.getAttribute("data-dui-accordion-target");
  const parentElement = event.currentTarget.closest("[data-dui-accordion-container]");
  const mode = parentElement?.getAttribute("data-dui-accordion-mode");

  if (targetID?.startsWith("#")) {
    const targetElement = document.querySelector(targetID);
    const isExpanded = event.currentTarget.getAttribute("aria-expanded") === "true";

    if (mode === "exclusive" && parentElement) {
      parentElement.querySelectorAll("[data-dui-accordion-toggle]").forEach(button => {
        const otherTargetID = button.getAttribute("data-dui-accordion-target");
        if (otherTargetID !== targetID) {
          const otherElement = document.querySelector(otherTargetID);
          if (otherElement) {
            toggleAccordionState(otherElement, button, false);
          }
        }
      });
    }

    if (targetElement) {
      toggleAccordionState(targetElement, event.currentTarget, !isExpanded);
    }
  }
}

// Function to manually toggle accordion item by ID
export function toggleAccordionById(targetId) {
  targetId = targetId.startsWith('#') ? targetId : '#' + targetId;
  
  const targetElement = document.querySelector(targetId);
  const toggleButton = document.querySelector(`[data-dui-accordion-target="${targetId}"]`);
  
  if (toggleButton?.getAttribute("aria-disabled") === "true" || !targetElement || !toggleButton) return;
  
  const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
  const parentElement = toggleButton.closest("[data-dui-accordion-container]");
  const mode = parentElement?.getAttribute("data-dui-accordion-mode");

  if (mode === "exclusive" && parentElement) {
    parentElement.querySelectorAll("[data-dui-accordion-toggle]").forEach(button => {
      const otherTargetID = button.getAttribute("data-dui-accordion-target");
      if (otherTargetID !== targetId) {
        const otherElement = document.querySelector(otherTargetID);
        if (otherElement) {
          toggleAccordionState(otherElement, button, false);
        }
      }
    });
  }

  toggleAccordionState(targetElement, toggleButton, !isExpanded);
}

// Function to initialize accordion functionality
export function initAccordion() {
  document.querySelectorAll("[data-dui-accordion-toggle]").forEach(button => {
    if (!initializedAccordionElements.has(button)) {
      button.addEventListener("click", toggleAccordion);
      initializedAccordionElements.add(button);

      const targetElement = document.querySelector(button.getAttribute("data-dui-accordion-target"));
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      
      if (targetElement) {
        toggleAccordionState(targetElement, button, isExpanded);
      }
    }
  });

  document.querySelectorAll("[data-dui-accordion-container]").forEach(container => {
    const mode = container.getAttribute("data-dui-accordion-mode");
    const buttons = container.querySelectorAll("[data-dui-accordion-toggle]");

    if (mode === "exclusive") {
      const expandedButtons = Array.from(buttons).filter(btn => 
        btn.getAttribute("aria-expanded") === "true"
      );
      
      expandedButtons.slice(1).forEach(button => {
        const targetElement = document.querySelector(button.getAttribute("data-dui-accordion-target"));
        if (targetElement) {
          toggleAccordionState(targetElement, button, false);
        }
      });
    } else if (mode === "all-open") {
      buttons.forEach(button => {
        const targetElement = document.querySelector(button.getAttribute("data-dui-accordion-target"));
        if (targetElement) {
          toggleAccordionState(targetElement, button, true);
        }
      });
    }
  });
}

// Make toggleAccordionById available globally
if (typeof window !== "undefined") {
  window.toggleAccordionById = toggleAccordionById;
  
  document.addEventListener("DOMContentLoaded", () => {
    initAccordion();
    new MutationObserver(initAccordion).observe(document.body, { 
      childList: true, 
      subtree: true 
    });
  });
}
