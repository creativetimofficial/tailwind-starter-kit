// Alert component
const initializedElements = new WeakSet();

export function closeAlert(event) {
  const button = event.currentTarget;
  const alert = button.closest('[role="alert"]');
  if (alert) {
    alert.remove(); // Remove the alert
  }
}

export function initAlert() {
  document.querySelectorAll("[data-dui-dismiss='alert']").forEach((button) => {
    if (!initializedElements.has(button)) {
      button.addEventListener("click", closeAlert);
      initializedElements.add(button);
    }
  });
}

// Auto-initialize on DOMContentLoaded and observe dynamically added elements
if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    initAlert(); // Initialize alerts after DOM is loaded

    // Observe the DOM for dynamically added alerts
    const observer = new MutationObserver(() => {
      initAlert(); // Re-initialize alerts when new elements are added
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
}