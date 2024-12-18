// Dropdown component
export class Dropdown {
  constructor(dropdownElement) {
    this.dropdown = dropdownElement;
    this.button = this.dropdown.querySelector('[data-dui-toggle="dropdown"]');
    this.menu = this.dropdown.querySelector('[data-dui-role="menu"]');
    this.popperInstance = null;

    // Get placement dynamically or default to 'bottom-start'
    this.placement = this.dropdown.getAttribute("data-dui-placement") || "bottom-start";

    this.init();
  }

  init() {
    // Initialize Popper.js
    this.popperInstance = Popper.createPopper(this.button, this.menu, {
      placement: this.placement,
      modifiers: [{ name: "offset", options: { offset: [0, 5] } }],
    });

    // Check for open attribute
    if (this.dropdown.hasAttribute("data-dui-open")) {
      this.openDropdown();
    }

    // Toggle dropdown on button click
    this.button.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });

    // Close dropdown on outside click
    document.addEventListener("click", (e) => {
      if (!this.dropdown.contains(e.target)) {
        this.closeDropdown();
      }
    });
  }

  toggleDropdown() {
    const isExpanded = this.button.getAttribute("aria-expanded") === "true";
    isExpanded ? this.closeDropdown() : this.openDropdown();
  }

  openDropdown() {
    this.button.setAttribute("aria-expanded", "true");
    this.menu.hidden = false;
    this.menu.classList.remove("hidden");
    this.popperInstance.update();
    this.closeSiblings();
  }

  closeDropdown() {
    this.button.setAttribute("aria-expanded", "false");
    this.menu.hidden = true;
    this.menu.classList.add("hidden");
  }

  closeSiblings() {
    const siblingMenus = this.dropdown.parentElement.querySelectorAll(
      '[data-dui-role="menu"]:not(.hidden)'
    );
    siblingMenus.forEach((siblingMenu) => {
      if (siblingMenu !== this.menu) {
        siblingMenu.classList.add("hidden");
        siblingMenu.parentElement
          .querySelector('[data-dui-toggle="dropdown"]')
          .setAttribute("aria-expanded", "false");
      }
    });
  }
}

export function initDropdowns() {
  document.querySelectorAll(".dropdown").forEach((dropdownElement) => {
    new Dropdown(dropdownElement);
  });
}