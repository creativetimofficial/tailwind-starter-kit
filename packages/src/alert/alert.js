// src/alert/alert.js

const initializedElements = new WeakSet();

export function closeAlert(event) {
  const button = event.currentTarget;
  const alert = button.closest('[role="alert"]');
  if (alert) {
    alert.remove(); // Remove the alert
  }
}

export function initAlert() {
  // Attach event listeners only to buttons that haven't been initialized
  document.querySelectorAll("[data-dui-dismiss='alert']").forEach((button) => {
    if (!initializedElements.has(button)) {
      button.addEventListener("click", closeAlert);
      initializedElements.add(button); // Track this button as initialized
    }
  });
}

// Auto-initialize if running in a browser environment
if (typeof window !== 'undefined') {
  initAlert();
}
