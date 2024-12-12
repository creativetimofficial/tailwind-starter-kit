// Modal component
function toggleModal(event) {
  const modalID = event.currentTarget.getAttribute("data-dui-target");
  const modal = document.querySelector(modalID);
  if (modal) {
    const isHidden = modal.classList.contains("pointer-events-none");
    modal.classList.toggle("opacity-0", !isHidden);
    if (isHidden) {
      modal.classList.remove("pointer-events-none");
    } else {
      setTimeout(() => modal.classList.add("pointer-events-none"), 300);
    }
    modal.classList.toggle("opacity-100", isHidden);
    const modalContent = modal.querySelector(isHidden ? ".scale-95" : ".scale-100");
    modalContent.classList.toggle("scale-95", !isHidden);
    modalContent.classList.toggle("scale-100", isHidden);
    modal.setAttribute("aria-hidden", !isHidden);
  }
}
function closeModal(event) {
  const modal = event.currentTarget.closest(".fixed");
  if (modal) {
    modal.classList.add("opacity-0");
    modal.classList.remove("opacity-100");
    const modalContent = modal.querySelector(".scale-100");
    modalContent.classList.add("scale-95");
    modalContent.classList.remove("scale-100");
    setTimeout(() => {
      modal.classList.add("pointer-events-none");
      modal.setAttribute("aria-hidden", "true");
    }, 300);
  }
}
function initModal() {
  document.querySelectorAll("[data-dui-toggle='modal']").forEach(trigger => {
    trigger.addEventListener("click", toggleModal);
  });
  document.querySelectorAll("[data-dui-dismiss='modal']").forEach(button => {
    button.addEventListener("click", closeModal);
  });
}

// Initialize all components at the start
(function () {
  initModal();
}());