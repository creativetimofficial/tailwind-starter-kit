import { loadPopperJs } from './utils/loadPopper.js';

// Import components
import { initDropdowns, cleanupDropdowns } from './dropdown/dropdown.js';
import { initPopovers, cleanupPopovers } from './popover/popover.js';
import { initTooltips, cleanupTooltips } from './tooltip/tooltip.js';
import { initAlert } from './alert/alert.js';
import { initCollapse } from './collapse/collapse.js';
import { initTabs, cleanupTabs } from './tabs/tabs.js';
import { initModal, cleanupModals } from './modal/modal.js';

// Export individual components for named imports
export {
  initAlert,
  initCollapse,
  initDropdowns,
  cleanupDropdowns,
  initPopovers,
  cleanupPopovers,
  initTooltips,
  cleanupTooltips,
  initTabs,
  cleanupTabs,
  initModal,
  cleanupModals,
};

// Combine all features into a global object for default export
const DavidAI = {
  initAlert,
  initCollapse,
  initDropdowns,
  cleanupDropdowns,
  initPopovers,
  cleanupPopovers,
  initTooltips,
  cleanupTooltips,
  initTabs,
  cleanupTabs,
  initModal,
  cleanupModals,
};

// Auto-initialize components in the browser
if (typeof window !== "undefined" && typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
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

    // Observe DOM for dynamically added elements and auto-initialize
    // const observer = new MutationObserver(() => {
    //   initAlert();
    //   initCollapse();
    //   initTabs();
    //   initModal();
    //   initDropdowns();
    //   initPopovers();
    //   initTooltips();
    // });

    // observer.observe(document.body, { childList: true, subtree: true });

    // Expose DavidAI globally for UMD
    window.DavidAI = DavidAI;
  });
}

export default DavidAI;
