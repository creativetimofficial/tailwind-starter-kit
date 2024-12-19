// Collapse component
const initializedElements = new WeakSet();

export function toggleCollapse(event) {
  const collapseID = event.currentTarget.getAttribute("data-dui-target");

  if (collapseID && collapseID.startsWith("#")) {
    const collapseElement = document.querySelector(collapseID);
    const isExpanded =
      event.currentTarget.getAttribute("aria-expanded") === "true";

    if (collapseElement) {
      // Toggle max-height for collapsible content
      collapseElement.style.maxHeight = isExpanded
        ? "0"
        : collapseElement.scrollHeight + "px";

      // Update aria-expanded attribute
      event.currentTarget.setAttribute("aria-expanded", !isExpanded);

      // Toggle rotate-180 class on the icon
      const icon = event.currentTarget.querySelector("[data-dui-icon]");
      if (icon) {
        icon.classList.toggle("rotate-180", !isExpanded);
      }
    }
  }
}

export function initCollapse() {
  document
    .querySelectorAll("[data-dui-toggle='collapse']")
    .forEach((button) => {
      if (!initializedElements.has(button)) {
        button.addEventListener("click", toggleCollapse);
        initializedElements.add(button); // Mark as initialized
      }
    });
}

// Auto-initialize on DOMContentLoaded and observe dynamically added elements
if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    initCollapse(); // Initialize collapsibles after DOM is loaded

    // Observe the DOM for dynamically added collapsible elements
    const observer = new MutationObserver(() => {
      initCollapse(); // Re-initialize collapsibles when new elements are added
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
}
