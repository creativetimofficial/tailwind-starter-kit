var popperLoaded = false; // Singleton flag to track loading state
var popperReady = null;   // Promise to handle loading Popper.js once

export function loadPopperJs() {
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
