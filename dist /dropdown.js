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
    this.menu = this.dropdown.querySelector('ul');
    this.popperInstance = null;
    this.init();
  }
  init() {
    this.popperInstance = Popper.createPopper(this.button, this.menu, {
      placement: 'bottom-start',
      modifiers: [{ name: 'offset', options: { offset: [0, 5] } }]
    });
    this.button.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });
    document.addEventListener('click', () => this.closeDropdown());
  }
  toggleDropdown() {
    const isExpanded = this.button.getAttribute('aria-expanded') === 'true';
    this.button.setAttribute('aria-expanded', !isExpanded);
    this.menu.hidden = isExpanded;
    this.menu.classList.toggle('hidden', isExpanded);
    this.popperInstance.update();
  }
  closeDropdown() {
    this.button.setAttribute('aria-expanded', false);
    this.menu.hidden = true;
    this.menu.classList.add('hidden');
  }
}
function initDropdowns() {
  const dropdownElement = document.querySelector('.dropdown');
  if (dropdownElement) new Dropdown(dropdownElement);
}

// Initialize components that depend on Popper.js after it is loaded
loadPopperJs(() => {
  initDropdowns();
});

