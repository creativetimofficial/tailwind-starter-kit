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

// Initialize all components at the start
(function () {
  initCollapse();
}());