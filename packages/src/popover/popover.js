// Popover component
export function initPopovers() {
  const popoverTriggers = document.querySelectorAll("[data-dui-toggle='popover']");

  popoverTriggers.forEach(trigger => {
    const placement = trigger.getAttribute("data-dui-placement") || "top";
    const popoverClasses = trigger.getAttribute("data-dui-popover-class") || "popover-default";
    const plainContent = trigger.getAttribute("data-dui-content");
    const isOpenByDefault = trigger.hasAttribute("data-dui-open");

    let popoverInstance = null;
    let popoverElement = null;
    let originalContentElement = null;

    // Find content element next to the trigger
    const contentElement = trigger.nextElementSibling?.matches("[data-dui-popover-content]")
      ? trigger.nextElementSibling
      : null;

    // Function to open the popover
    function openPopover() {
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

      document.body.appendChild(popoverElement);

      popoverInstance = Popper.createPopper(trigger, popoverElement, {
        placement: placement,
        modifiers: [
          { name: "offset", options: { offset: [0, 8] } }
        ],
      });

      // Store references for cleanup
      trigger._popoverInstance = popoverInstance;
      trigger._popoverElement = popoverElement;
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
  });
}
