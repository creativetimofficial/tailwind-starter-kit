function closeAlert(event) {
  const button = event.currentTarget;
  const alert = button.closest('[role="alert"]'); // Find the closest parent with role="alert"
  if (alert) {
    alert.parentNode.removeChild(alert); // Remove the alert element from the DOM
  }
}

function initAlert() {
  const dismissButtons = document.querySelectorAll("[data-dui-dismiss='alert']");
  dismissButtons.forEach(button => {
    button.addEventListener("click", closeAlert);
  });
}

(function () {
  initAlert();
}());