// src/alert/alert.js

export function closeAlert(event) {
  const button = event.currentTarget;
  const alert = button.closest('[role="alert"]');
  if (alert) {
    alert.parentNode.removeChild(alert);
  }
}

export function initAlert() {
  const dismissButtons = document.querySelectorAll("[data-dui-dismiss='alert']");
  dismissButtons.forEach(button => {
    button.addEventListener("click", closeAlert);
  });
}

// Auto-initialize if running in a browser environment
if (typeof window !== 'undefined') {
  initAlert();
}
