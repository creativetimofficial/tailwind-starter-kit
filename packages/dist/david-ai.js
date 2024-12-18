(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DavidAI = factory());
})(this, (function () { 'use strict';

  var popperLoaded = false; // Singleton flag to track loading state
  var popperReady = null; // Promise to handle loading Popper.js once

  function loadPopperJs() {
    if (popperLoaded) {
      return popperReady; // Return the existing Promise if already loading or loaded
    }
    popperLoaded = true; // Mark Popper.js as being loaded

    popperReady = new Promise(function (resolve, reject) {
      if (window.Popper) {
        resolve(window.Popper); // If already loaded globally, resolve immediately
        return;
      }
      var script = document.createElement("script");
      script.src = "https://unpkg.com/@popperjs/core@2";
      script.defer = true;
      script.onload = function () {
        window.Popper = window.Popper || window.Popper; // Expose Popper globally
        resolve(window.Popper); // Resolve once Popper.js is loaded
      };
      script.onerror = function () {
        reject(new Error("Failed to load Popper.js"));
      };
      document.head.appendChild(script);
    });
    return popperReady;
  }

  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  // Dropdown component
  var Dropdown = /*#__PURE__*/function () {
    function Dropdown(dropdownElement) {
      _classCallCheck(this, Dropdown);
      this.dropdown = dropdownElement;
      this.button = this.dropdown.querySelector('[data-dui-toggle="dropdown"]');
      this.menu = this.dropdown.querySelector('[data-dui-role="menu"]');
      this.popperInstance = null;

      // Get placement dynamically or default to 'bottom-start'
      this.placement = this.dropdown.getAttribute("data-dui-placement") || "bottom-start";
      this.init();
    }
    return _createClass(Dropdown, [{
      key: "init",
      value: function init() {
        var _this = this;
        // Initialize Popper.js
        this.popperInstance = Popper.createPopper(this.button, this.menu, {
          placement: this.placement,
          modifiers: [{
            name: "offset",
            options: {
              offset: [0, 5]
            }
          }]
        });

        // Check for open attribute
        if (this.dropdown.hasAttribute("data-dui-open")) {
          this.openDropdown();
        }

        // Toggle dropdown on button click
        this.button.addEventListener("click", function (e) {
          e.stopPropagation();
          _this.toggleDropdown();
        });

        // Close dropdown on outside click
        document.addEventListener("click", function (e) {
          if (!_this.dropdown.contains(e.target)) {
            _this.closeDropdown();
          }
        });
      }
    }, {
      key: "toggleDropdown",
      value: function toggleDropdown() {
        var isExpanded = this.button.getAttribute("aria-expanded") === "true";
        isExpanded ? this.closeDropdown() : this.openDropdown();
      }
    }, {
      key: "openDropdown",
      value: function openDropdown() {
        this.button.setAttribute("aria-expanded", "true");
        this.menu.hidden = false;
        this.menu.classList.remove("hidden");
        this.popperInstance.update();
        this.closeSiblings();
      }
    }, {
      key: "closeDropdown",
      value: function closeDropdown() {
        this.button.setAttribute("aria-expanded", "false");
        this.menu.hidden = true;
        this.menu.classList.add("hidden");
      }
    }, {
      key: "closeSiblings",
      value: function closeSiblings() {
        var _this2 = this;
        var siblingMenus = this.dropdown.parentElement.querySelectorAll('[data-dui-role="menu"]:not(.hidden)');
        siblingMenus.forEach(function (siblingMenu) {
          if (siblingMenu !== _this2.menu) {
            siblingMenu.classList.add("hidden");
            siblingMenu.parentElement.querySelector('[data-dui-toggle="dropdown"]').setAttribute("aria-expanded", "false");
          }
        });
      }
    }]);
  }();
  function initDropdowns() {
    document.querySelectorAll(".dropdown").forEach(function (dropdownElement) {
      new Dropdown(dropdownElement);
    });
  }

  // Popover component
  function initPopovers() {
    var popoverTriggers = document.querySelectorAll("[data-dui-toggle='popover']");
    popoverTriggers.forEach(function (trigger) {
      var _trigger$nextElementS;
      var placement = trigger.getAttribute("data-dui-placement") || "top";
      var popoverClasses = trigger.getAttribute("data-dui-popover-class") || "popover-default";
      var plainContent = trigger.getAttribute("data-dui-content");
      var isOpenByDefault = trigger.hasAttribute("data-dui-open");
      var popoverInstance = null;
      var popoverElement = null;
      var originalContentElement = null;

      // Find content element next to the trigger
      var contentElement = (_trigger$nextElementS = trigger.nextElementSibling) !== null && _trigger$nextElementS !== void 0 && _trigger$nextElementS.matches("[data-dui-popover-content]") ? trigger.nextElementSibling : null;

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
          modifiers: [{
            name: "offset",
            options: {
              offset: [0, 8]
            }
          }]
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
      trigger.addEventListener("click", function (event) {
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

  // Tooltip component
  function initTooltips() {
    var tooltipTriggers = document.querySelectorAll("[data-dui-toggle='tooltip']");
    tooltipTriggers.forEach(function (trigger) {
      var _trigger$nextElementS;
      var title = trigger.getAttribute("data-dui-title"); // Plain text content
      var placement = trigger.getAttribute("data-dui-placement") || "top";
      var tooltipClasses = trigger.getAttribute("data-dui-tooltip-class") || "tooltip-default";
      var tooltipInstance = null;
      var tooltipElement = null;
      var customContentElement = null;

      // Check for sibling content with custom HTML
      if ((_trigger$nextElementS = trigger.nextElementSibling) !== null && _trigger$nextElementS !== void 0 && _trigger$nextElementS.matches("[data-dui-tooltip-content]")) {
        customContentElement = trigger.nextElementSibling;
      }

      // Show the tooltip
      function showTooltip() {
        if (tooltipElement) return; // Avoid duplicate tooltips

        tooltipElement = document.createElement("div");
        tooltipElement.className = tooltipClasses;

        // Use custom HTML content or plain text
        if (customContentElement) {
          var contentClone = customContentElement.cloneNode(true);
          contentClone.classList.remove("hidden");
          tooltipElement.appendChild(contentClone);
        } else if (title) {
          tooltipElement.textContent = title;
        } else {
          console.warn("No tooltip content provided for:", trigger);
          return;
        }
        document.body.appendChild(tooltipElement);

        // Create Popper.js instance
        tooltipInstance = Popper.createPopper(trigger, tooltipElement, {
          placement: placement,
          modifiers: [{
            name: "offset",
            options: {
              offset: [0, 8]
            }
          }]
        });
      }

      // Hide the tooltip
      function hideTooltip() {
        if (tooltipElement && !trigger.classList.contains("static-tooltip")) {
          tooltipInstance.destroy();
          tooltipInstance = null;
          tooltipElement.remove();
          tooltipElement = null;
        }
      }

      // Event Listeners
      trigger.addEventListener("mouseenter", showTooltip);
      trigger.addEventListener("mouseleave", hideTooltip);

      // Toggle static tooltips on click
      trigger.addEventListener("click", function () {
        if (trigger.classList.contains("static-tooltip")) {
          trigger.classList.remove("static-tooltip");
          hideTooltip();
        } else {
          trigger.classList.add("static-tooltip");
          showTooltip();
        }
      });
    });
  }

  // src/alert/alert.js

  function closeAlert(event) {
    var button = event.currentTarget;
    var alert = button.closest('[role="alert"]');
    if (alert) {
      alert.parentNode.removeChild(alert);
    }
  }
  function initAlert() {
    var dismissButtons = document.querySelectorAll("[data-dui-dismiss='alert']");
    dismissButtons.forEach(function (button) {
      button.addEventListener("click", closeAlert);
    });
  }

  // Auto-initialize if running in a browser environment
  if (typeof window !== 'undefined') {
    initAlert();
  }

  // Collapse component
  function toggleCollapse(event) {
    var collapseID = event.currentTarget.getAttribute("data-dui-target");
    if (collapseID && collapseID.startsWith("#")) {
      var collapseElement = document.querySelector(collapseID);
      var isExpanded = event.currentTarget.getAttribute("aria-expanded") === "true";
      if (collapseElement) {
        // Toggle max-height for collapsible content
        collapseElement.style.maxHeight = isExpanded ? "0" : collapseElement.scrollHeight + "px";

        // Update aria-expanded attribute
        event.currentTarget.setAttribute("aria-expanded", !isExpanded);

        // Toggle rotate-180 class on the icon
        var icon = event.currentTarget.querySelector("[data-dui-icon]");
        if (icon) {
          icon.classList.toggle("rotate-180", !isExpanded);
        }
      }
    }
  }
  function initCollapse() {
    document.querySelectorAll("[data-dui-toggle='collapse']").forEach(function (button) {
      button.addEventListener("click", toggleCollapse);
    });
  }

  // Auto-initialize collapsible components in the browser
  if (typeof window !== 'undefined') {
    initCollapse();
  }

  // Tabs Component
  function initTabs() {
    document.querySelectorAll(".tab-group").forEach(function (tabGroup) {
      var tabList = tabGroup.querySelector("[role='tablist']");
      var tabLinks = tabList.querySelectorAll(".tab-link");
      var tabContents = tabGroup.querySelectorAll(".tab-content");
      var indicator = tabList.querySelector(".tab-indicator");
      var isVertical = tabGroup.getAttribute("data-dui-orientation") === "vertical";

      // Function to update the indicator position dynamically
      function updateIndicator(link) {
        var rect = link.getBoundingClientRect();
        var parentRect = tabList.getBoundingClientRect();
        if (isVertical) {
          // For vertical tabs
          indicator.style.height = "".concat(rect.height, "px");
          indicator.style.transform = "translateY(".concat(rect.top - parentRect.top, "px)");
        } else {
          // For horizontal tabs
          indicator.style.width = "".concat(rect.width, "px");
          indicator.style.transform = "translateX(".concat(rect.left - parentRect.left, "px)");
        }
      }

      // Function to handle tab activation
      function activateTab(link) {
        // Deactivate all tabs and hide contents
        tabLinks.forEach(function (item) {
          return item.classList.remove("active");
        });
        tabContents.forEach(function (content) {
          content.classList.add("hidden");
          content.classList.remove("block");
        });

        // Activate the clicked tab
        link.classList.add("active");
        var targetContent = document.getElementById(link.getAttribute("data-dui-tab-target"));
        if (targetContent) {
          targetContent.classList.add("block");
          targetContent.classList.remove("hidden");
        }

        // Update the indicator position
        updateIndicator(link);
      }

      // Initialize the tabs
      tabLinks.forEach(function (link) {
        // If a tab is already active, update the indicator
        if (link.classList.contains("active")) {
          activateTab(link);
        }

        // Add click event listener to each tab link
        link.addEventListener("click", function (event) {
          event.preventDefault();
          activateTab(link);
        });
      });
    });
  }

  // Auto-initialize tabs in the browser
  if (typeof window !== "undefined") {
    initTabs();
  }

  // Modal Component

  function toggleModal(event) {
    var modalID = event.currentTarget.getAttribute("data-dui-target");
    var modal = document.querySelector(modalID);
    if (modal) {
      var isHidden = modal.classList.contains("pointer-events-none");
      modal.classList.toggle("opacity-0", !isHidden);
      if (isHidden) {
        modal.classList.remove("pointer-events-none");
      } else {
        setTimeout(function () {
          return modal.classList.add("pointer-events-none");
        }, 300);
      }
      modal.classList.toggle("opacity-100", isHidden);
      var modalContent = modal.querySelector(isHidden ? ".scale-95" : ".scale-100");
      modalContent.classList.toggle("scale-95", !isHidden);
      modalContent.classList.toggle("scale-100", isHidden);
      modal.setAttribute("aria-hidden", !isHidden);

      // Add or remove event listener for clicks outside modal content
      if (isHidden) {
        modal.addEventListener("click", closeOnOutsideClick);
      } else {
        modal.removeEventListener("click", closeOnOutsideClick);
      }
    }
  }
  function closeModal(event) {
    var modal = event.currentTarget.closest(".fixed");
    if (modal) {
      modal.classList.add("opacity-0");
      modal.classList.remove("opacity-100");
      var modalContent = modal.querySelector(".scale-100");
      modalContent.classList.add("scale-95");
      modalContent.classList.remove("scale-100");
      setTimeout(function () {
        modal.classList.add("pointer-events-none");
        modal.setAttribute("aria-hidden", "true");
      }, 300);
      modal.removeEventListener("click", closeOnOutsideClick);
    }
  }
  function closeOnOutsideClick(event) {
    var modalContent = event.currentTarget.querySelector(".scale-100, .scale-95");
    if (!modalContent.contains(event.target)) {
      closeModal({
        currentTarget: event.currentTarget
      });
    }
  }
  function initModal() {
    document.querySelectorAll("[data-dui-toggle='modal']").forEach(function (trigger) {
      trigger.addEventListener("click", toggleModal);
    });
    document.querySelectorAll("[data-dui-dismiss='modal']").forEach(function (button) {
      button.addEventListener("click", closeModal);
    });
  }

  // Auto-initialize Modals in the Browser Environment
  if (typeof window !== "undefined") {
    initModal();
  }

  // Combine all features into a global object
  var DavidAI = {
    initAlert: initAlert,
    initCollapse: initCollapse,
    initDropdowns: initDropdowns,
    initPopovers: initPopovers,
    initTooltips: initTooltips,
    initTabs: initTabs,
    initModal: initModal
  };

  // Auto-initialize components in the browser
  if (typeof window !== "undefined") {
    // Initialize Popper-independent components
    initAlert();
    initCollapse();
    initTabs();
    initModal();
    // Load Popper.js once, then initialize dependent components
    loadPopperJs().then(function () {
      initDropdowns();
      initPopovers();
      initTooltips();
    })["catch"](function (error) {
      console.error("Failed to load Popper.js:", error);
    });

    // Expose DavidAI globally for UMD
    window.DavidAI = DavidAI;
  }

  return DavidAI;

}));
//# sourceMappingURL=david-ai.js.map
