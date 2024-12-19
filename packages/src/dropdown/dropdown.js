// Dropdown Component
import { loadPopperJs } from '../utils/loadPopper'; // Centralized loader

const initializedDropdowns = new WeakSet(); // Prevent duplicate initialization
let activeDropdowns = []; // Track active dropdowns for cleanup

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

    // Add event listeners
    this.button.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });

    document.addEventListener("click", (e) => {
      if (!this.dropdown.contains(e.target)) {
        this.closeDropdown();
      }
    });

    // Track active dropdown for cleanup
    activeDropdowns.push({ dropdown: this.dropdown, popperInstance: this.popperInstance });
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

// Cleanup function to destroy all active dropdowns
export function cleanupDropdowns() {
  activeDropdowns.forEach(({ dropdown, popperInstance }) => {
    if (popperInstance) popperInstance.destroy();
    if (dropdown) initializedDropdowns.delete(dropdown);
  });
  activeDropdowns = [];
}

// Combined initialization function
export async function loadAndInitDropdowns() {
  await loadPopperJs();
  initDropdowns();
}

// Auto-initialize Dropdowns in the Browser Environment
if (typeof window !== "undefined" && typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    loadAndInitDropdowns();

    // Observe the DOM for dynamically added dropdowns
    const observer = new MutationObserver(() => {
      initDropdowns();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
}
