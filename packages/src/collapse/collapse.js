// Collapse component
export function toggleCollapse(event) {
  const collapseID =
    event.currentTarget.getAttribute("data-dui-target")

  if (collapseID && collapseID.startsWith("#")) {
    const collapseElement = document.querySelector(collapseID);
    const isExpanded = event.currentTarget.getAttribute("aria-expanded") === "true";

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
  document.querySelectorAll("[data-dui-toggle='collapse']").forEach(button => {
    button.addEventListener("click", toggleCollapse);
  });
}

// Auto-initialize collapsible components in the browser
if (typeof window !== 'undefined') {
  initCollapse();
}
