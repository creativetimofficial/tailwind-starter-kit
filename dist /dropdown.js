// Dynamically load Popper.js for Dropdowns, Popovers, and Tooltips
function loadPopperJs(callback) {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/@popperjs/core@2";
  script.defer = true;
  script.onload = callback; // Callback function after script is loaded
  document.head.appendChild(script);
}

// Dropdown component
class Dropdown {
  constructor(dropdownElement) {
    this.dropdown = dropdownElement;
    this.button = this.dropdown.querySelector('[data-dui-toggle="dropdown"]');
    this.menu = this.dropdown.querySelector('[data-dui-role="menu"]');
    this.popperInstance = null;

    // Get placement dynamically from the attribute or default to 'bottom-start'
    this.placement = this.dropdown.getAttribute('data-dui-placement') || 'bottom-start';

    this.init();
  }

  init() {
    // Initialize Popper.js with dynamic placement
    this.popperInstance = Popper.createPopper(this.button, this.menu, {
      placement: this.placement,
      modifiers: [{ name: 'offset', options: { offset: [0, 5] } }],
    });

    // Check if the dropdown should be open by default
    if (this.dropdown.hasAttribute('data-dui-open')) {
      this.openDropdown(); // Open the dropdown
    }

    // Add event listeners for toggle and close behavior
    this.button.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent event bubbling to parent dropdowns
      this.toggleDropdown();
    });

    document.addEventListener('click', (e) => {
      if (!this.dropdown.contains(e.target)) {
        this.closeDropdown();
      }
    });
  }

  toggleDropdown() {
    const isExpanded = this.button.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown() {
    this.button.setAttribute('aria-expanded', true);
    this.menu.hidden = false;
    this.menu.classList.remove('hidden');
    this.popperInstance.update();

    // Close other sibling dropdowns if applicable
    this.closeSiblings();
  }

  closeDropdown() {
    this.button.setAttribute('aria-expanded', false);
    this.menu.hidden = true;
    this.menu.classList.add('hidden');
  }

  closeSiblings() {
    const siblingMenus = this.dropdown.parentElement.querySelectorAll(
      '[data-dui-role="menu"]:not(.hidden)'
    );

    siblingMenus.forEach((siblingMenu) => {
      if (siblingMenu !== this.menu) {
        siblingMenu.classList.add('hidden');
        siblingMenu.parentElement
          .querySelector('[data-dui-toggle="dropdown"]')
          .setAttribute('aria-expanded', false);
      }
    });
  }
}

// Initialize all dropdowns dynamically
function initDropdowns() {
  const dropdownElements = document.querySelectorAll('.dropdown');
  dropdownElements.forEach((dropdownElement) => {
    new Dropdown(dropdownElement);
  });
}

// Initialize components that depend on Popper.js after it is loaded
loadPopperJs(() => {
  initDropdowns();
});
