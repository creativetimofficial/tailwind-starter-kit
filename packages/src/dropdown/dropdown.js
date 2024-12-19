// Dropdown component
import { loadPopperJs } from '../utils/loadPopper'; // Centralized loader

const initializedDropdowns = new WeakSet();

export class Dropdown {
  constructor(dropdownElement) {
    this.dropdown = dropdownElement;
    this.button = this.dropdown.querySelector('[data-dui-toggle="dropdown"]');
    this.menu = this.dropdown.querySelector('[data-dui-role="menu"]');
    this.popperInstance = null;

    this.placement = this.dropdown.getAttribute("data-dui-placement") || "bottom-start";

    this.init();
  }

  async init() {
    // Ensure Popper.js is loaded
    await loadPopperJs();

    // Initialize Popper.js
    this.popperInstance = Popper.createPopper(this.button, this.menu, {
      placement: this.placement,
      modifiers: [{ name: "offset", options: { offset: [0, 5] } }],
    });

    // Event listeners
    this.button.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });

    document.addEventListener("click", (e) => {
      if (!this.dropdown.contains(e.target)) this.closeDropdown();
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
  }

  closeDropdown() {
    this.button.setAttribute("aria-expanded", "false");
    this.menu.hidden = true;
    this.menu.classList.add("hidden");
  }
}

export function initDropdowns() {
  document.querySelectorAll(".dropdown").forEach((dropdownElement) => {
    if (!initializedDropdowns.has(dropdownElement)) {
      new Dropdown(dropdownElement);
      initializedDropdowns.add(dropdownElement);
    }
  });
}
