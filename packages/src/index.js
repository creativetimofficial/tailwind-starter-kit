import { loadPopperJs } from './utils/loadPopper.js';

// Import components
import { initDropdowns } from './dropdown/dropdown.js';
import { initPopovers } from './popover/popover.js';
import { initTooltips } from './tooltip/tooltip.js';
import { initAlert } from './alert/alert.js';
import { initCollapse } from './collapse/collapse.js';
import { initTabs } from './tabs/tabs.js';
import { initModal } from './modal/modal.js';

// Export individual components for named imports
export {
  initAlert,
  initCollapse,
  initDropdowns,
  initPopovers,
  initTooltips,
  initTabs,
  initModal
};

// Combine all features into a global object for default export
const DavidAI = {
  initAlert,
  initCollapse,
  initDropdowns,
  initPopovers,
  initTooltips,
  initTabs,
  initModal
};

// Auto-initialize components in the browser
if (typeof window !== "undefined" && typeof document !== "undefined") {
  // Initialize Popper-independent components
  initAlert();
  initCollapse();
  initTabs();
  initModal();

  // Load Popper.js once, then initialize dependent components
  loadPopperJs()
    .then(() => {
      initDropdowns();
      initPopovers();
      initTooltips();
    })
    .catch((error) => {
      console.error("Failed to load Popper.js:", error);
    });

  // Expose DavidAI globally for UMD
  window.DavidAI = DavidAI;
}

export default DavidAI;
