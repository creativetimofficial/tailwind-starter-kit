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

function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
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
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
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

var initializedDropdowns = new WeakSet(); // Prevent duplicate initialization
var activeDropdowns = []; // Track active dropdowns for cleanup

var Dropdown = /*#__PURE__*/function () {
  function Dropdown(dropdownElement) {
    _classCallCheck(this, Dropdown);
    this.dropdown = dropdownElement;
    this.button = this.dropdown.querySelector('[data-dui-toggle="dropdown"]');
    this.menu = this.dropdown.querySelector('[data-dui-role="menu"]');
    this.popperInstance = null;
    this.placement = this.dropdown.getAttribute("data-dui-placement") || "bottom-start";
    this.init();
  }
  return _createClass(Dropdown, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return loadPopperJs();
            case 2:
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

              // Add event listeners
              this.button.addEventListener("click", function (e) {
                e.stopPropagation();
                _this.toggleDropdown();
              });
              document.addEventListener("click", function (e) {
                if (!_this.dropdown.contains(e.target)) {
                  _this.closeDropdown();
                }
              });

              // Track active dropdown for cleanup
              activeDropdowns.push({
                dropdown: this.dropdown,
                popperInstance: this.popperInstance
              });
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
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
    }
  }, {
    key: "closeDropdown",
    value: function closeDropdown() {
      this.button.setAttribute("aria-expanded", "false");
      this.menu.hidden = true;
      this.menu.classList.add("hidden");
    }
  }]);
}();
function initDropdowns() {
  document.querySelectorAll(".dropdown").forEach(function (dropdownElement) {
    if (!initializedDropdowns.has(dropdownElement)) {
      new Dropdown(dropdownElement);
      initializedDropdowns.add(dropdownElement);
    }
  });
}

// Cleanup function to destroy all active dropdowns
function cleanupDropdowns() {
  activeDropdowns.forEach(function (_ref) {
    var dropdown = _ref.dropdown,
      popperInstance = _ref.popperInstance;
    if (popperInstance) popperInstance.destroy();
    if (dropdown) initializedDropdowns["delete"](dropdown);
  });
  activeDropdowns = [];
}

// Combined initialization function
function loadAndInitDropdowns() {
  return _loadAndInitDropdowns.apply(this, arguments);
}

// Auto-initialize Dropdowns in the Browser Environment
function _loadAndInitDropdowns() {
  _loadAndInitDropdowns = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return loadPopperJs();
        case 2:
          initDropdowns();
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _loadAndInitDropdowns.apply(this, arguments);
}
if (typeof window !== "undefined" && typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    loadAndInitDropdowns();

    // Observe the DOM for dynamically added dropdowns
    var observer = new MutationObserver(function () {
      initDropdowns();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

var initializedPopovers = new WeakSet(); // Prevent duplicate initialization
var activePopovers = []; // Track active popovers for cleanup

function initPopovers() {
  document.querySelectorAll("[data-dui-toggle='popover']").forEach(function (trigger) {
    var _trigger$nextElementS;
    if (initializedPopovers.has(trigger)) return; // Avoid re-initializing

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
      return _openPopover.apply(this, arguments);
    } // Function to close the popover
    function _openPopover() {
      _openPopover = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return loadPopperJs();
            case 2:
              popoverElement = document.createElement("div");
              popoverElement.className = popoverClasses;

              // Use custom HTML content or plain text
              if (!contentElement) {
                _context.next = 10;
                break;
              }
              originalContentElement = contentElement.cloneNode(true);
              originalContentElement.classList.remove("hidden");
              popoverElement.appendChild(originalContentElement);
              _context.next = 16;
              break;
            case 10:
              if (!plainContent) {
                _context.next = 14;
                break;
              }
              popoverElement.textContent = plainContent;
              _context.next = 16;
              break;
            case 14:
              console.error("No content provided for popover:", trigger);
              return _context.abrupt("return");
            case 16:
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

              // Track active popovers for cleanup
              activePopovers.push({
                trigger: trigger,
                popoverElement: popoverElement,
                popoverInstance: popoverInstance
              });
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return _openPopover.apply(this, arguments);
    }
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

      // Remove from active popovers
      activePopovers = activePopovers.filter(function (p) {
        return p.trigger !== trigger;
      });
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

    // Mark as initialized
    initializedPopovers.add(trigger);
  });
}

// Cleanup function to destroy all active popovers
function cleanupPopovers() {
  activePopovers.forEach(function (_ref) {
    var popoverElement = _ref.popoverElement,
      popoverInstance = _ref.popoverInstance;
    if (popoverInstance) popoverInstance.destroy();
    if (popoverElement) popoverElement.remove();
  });
  activePopovers = [];
  initializedPopovers.clear(); // Clear initialized elements
}

// Combined initialization function
function loadAndInitPopovers() {
  return _loadAndInitPopovers.apply(this, arguments);
}

// Auto-initialize Popovers in the Browser Environment
function _loadAndInitPopovers() {
  _loadAndInitPopovers = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return loadPopperJs();
        case 2:
          initPopovers();
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _loadAndInitPopovers.apply(this, arguments);
}
if (typeof window !== "undefined" && typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    loadAndInitPopovers();

    // Observe the DOM for dynamically added popovers
    var observer = new MutationObserver(function () {
      initPopovers(); // Reinitialize popovers when new elements are added
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

var initializedTooltips = new WeakSet(); // Track initialized tooltips
var activeTooltips = []; // Track active tooltips for cleanup

function initTooltips() {
  document.querySelectorAll("[data-dui-toggle='tooltip']").forEach(function (trigger) {
    var _trigger$nextElementS;
    if (initializedTooltips.has(trigger)) return; // Skip already initialized tooltips

    var title = trigger.getAttribute("data-dui-title"); // Tooltip text content
    var placement = trigger.getAttribute("data-dui-placement") || "top";
    var tooltipClasses = trigger.getAttribute("data-dui-tooltip-class") || "tooltip-default";
    var tooltipInstance = null;
    var tooltipElement = null;
    var customContentElement = null;

    // Check for custom HTML content in sibling
    if ((_trigger$nextElementS = trigger.nextElementSibling) !== null && _trigger$nextElementS !== void 0 && _trigger$nextElementS.matches("[data-dui-tooltip-content]")) {
      customContentElement = trigger.nextElementSibling;
    }

    // Function to show the tooltip
    function showTooltip() {
      return _showTooltip.apply(this, arguments);
    } // Function to hide the tooltip
    function _showTooltip() {
      _showTooltip = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var contentClone;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!tooltipElement) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              _context.next = 4;
              return loadPopperJs();
            case 4:
              // Ensure Popper.js is loaded

              tooltipElement = document.createElement("div");
              tooltipElement.className = tooltipClasses;

              // Add custom HTML or plain text to tooltip
              if (!customContentElement) {
                _context.next = 12;
                break;
              }
              contentClone = customContentElement.cloneNode(true);
              contentClone.classList.remove("hidden");
              tooltipElement.appendChild(contentClone);
              _context.next = 18;
              break;
            case 12:
              if (!title) {
                _context.next = 16;
                break;
              }
              tooltipElement.textContent = title;
              _context.next = 18;
              break;
            case 16:
              console.warn("No tooltip content provided for:", trigger);
              return _context.abrupt("return");
            case 18:
              document.body.appendChild(tooltipElement);
              tooltipInstance = Popper.createPopper(trigger, tooltipElement, {
                placement: placement,
                modifiers: [{
                  name: "offset",
                  options: {
                    offset: [0, 8]
                  }
                }]
              });

              // Track active tooltip for cleanup
              activeTooltips.push({
                trigger: trigger,
                tooltipElement: tooltipElement,
                tooltipInstance: tooltipInstance
              });
            case 21:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return _showTooltip.apply(this, arguments);
    }
    function hideTooltip() {
      if (tooltipInstance) {
        tooltipInstance.destroy();
        tooltipInstance = null;
      }
      if (tooltipElement) {
        tooltipElement.remove();
        tooltipElement = null;
      }

      // Remove from active tooltips
      activeTooltips = activeTooltips.filter(function (t) {
        return t.trigger !== trigger;
      });
    }

    // Event listeners for showing and hiding tooltips
    trigger.addEventListener("mouseenter", showTooltip);
    trigger.addEventListener("mouseleave", hideTooltip);

    // Mark the trigger as initialized
    initializedTooltips.add(trigger);
  });
}

// Cleanup function to remove all active tooltips
function cleanupTooltips() {
  activeTooltips.forEach(function (_ref) {
    var tooltipElement = _ref.tooltipElement,
      tooltipInstance = _ref.tooltipInstance;
    if (tooltipInstance) tooltipInstance.destroy();
    if (tooltipElement) tooltipElement.remove();
  });
  activeTooltips = [];
}

// Combined initialization and loading function
function loadAndInitTooltips() {
  return _loadAndInitTooltips.apply(this, arguments);
}

// Auto-initialize Tooltips in the browser
function _loadAndInitTooltips() {
  _loadAndInitTooltips = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return loadPopperJs();
        case 2:
          initTooltips();
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _loadAndInitTooltips.apply(this, arguments);
}
if (typeof window !== "undefined" && typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    loadAndInitTooltips();

    // Observe DOM for dynamically added tooltips
    var observer = new MutationObserver(function () {
      initTooltips();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

// Alert component
var initializedElements$1 = new WeakSet();
function closeAlert(event) {
  var button = event.currentTarget;
  var alert = button.closest('[role="alert"]');
  if (alert) {
    alert.remove(); // Remove the alert
  }
}
function initAlert() {
  document.querySelectorAll("[data-dui-dismiss='alert']").forEach(function (button) {
    if (!initializedElements$1.has(button)) {
      button.addEventListener("click", closeAlert);
      initializedElements$1.add(button);
    }
  });
}

// Auto-initialize on DOMContentLoaded and observe dynamically added elements
if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    initAlert(); // Initialize alerts after DOM is loaded

    // Observe the DOM for dynamically added alerts
    var observer = new MutationObserver(function () {
      initAlert(); // Re-initialize alerts when new elements are added
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

// Collapse component
var initializedElements = new WeakSet();
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
    if (!initializedElements.has(button)) {
      button.addEventListener("click", toggleCollapse);
      initializedElements.add(button); // Mark as initialized
    }
  });
}

// Auto-initialize on DOMContentLoaded and observe dynamically added elements
if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    initCollapse(); // Initialize collapsibles after DOM is loaded

    // Observe the DOM for dynamically added collapsible elements
    var observer = new MutationObserver(function () {
      initCollapse(); // Re-initialize collapsibles when new elements are added
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

var initializedTabs = new WeakSet(); // Track initialized tabs for preventing duplication

function initTabs() {
  document.querySelectorAll(".tab-group").forEach(function (tabGroup) {
    if (initializedTabs.has(tabGroup)) return; // Avoid re-initializing the same tab group

    var tabList = tabGroup.querySelector("[role='tablist']");
    var tabLinks = tabList.querySelectorAll(".tab-link");
    var tabContents = tabGroup.querySelectorAll(".tab-content");
    var indicator = tabList.querySelector(".tab-indicator");
    var isVertical = tabGroup.getAttribute("data-dui-orientation") === "vertical";

    // Function to update the indicator's position dynamically
    function updateIndicator(link) {
      var rect = link.getBoundingClientRect();
      var parentRect = tabList.getBoundingClientRect();
      requestAnimationFrame(function () {
        if (isVertical) {
          indicator.style.transform = "translateY(".concat(rect.top - parentRect.top, "px)");
          indicator.style.height = "".concat(rect.height, "px");
        } else {
          indicator.style.transform = "translateX(".concat(rect.left - parentRect.left, "px)");
          indicator.style.width = "".concat(rect.width, "px");
        }

        // Make the indicator visible
        indicator.classList.remove("hidden");
        indicator.style.opacity = "1";
        indicator.style.scale = "1";
      });
    }

    // Function to activate the selected tab
    function activateTab(link) {
      // Deactivate all tabs and hide their content
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

    // Initialize the tab group
    function initializeTabGroup() {
      var activeLink = tabList.querySelector(".tab-link.active");
      if (activeLink) {
        activateTab(activeLink); // Set indicator for the initially active tab
      } else if (tabLinks.length > 0) {
        activateTab(tabLinks[0]); // Fallback to the first tab if no active tab is defined
      }

      // Attach click listeners to each tab link
      tabLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
          event.preventDefault(); // Prevent default browser behavior
          activateTab(link); // Activate the clicked tab and update the indicator
        });
      });
    }
    initializeTabGroup();
    initializedTabs.add(tabGroup); // Mark the tab group as initialized
  });
}

// Cleanup function for tabs
function cleanupTabs() {
  initializedTabs.forEach(function (tabGroup) {
    var tabList = tabGroup.querySelector("[role='tablist']");
    var tabLinks = tabList.querySelectorAll(".tab-link");

    // Remove event listeners from tab links
    tabLinks.forEach(function (link) {
      var clone = link.cloneNode(true);
      link.parentNode.replaceChild(clone, link);
    });
  });
  initializedTabs.clear(); // Clear the WeakSet
}

// Auto-initialize tabs in the browser
if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    initTabs();

    // Observe DOM changes to reinitialize tabs dynamically
    var observer = new MutationObserver(function () {
      initTabs();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

var initializedModals = new WeakSet();
var activeModals = []; // Track active modals for cleanup

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

    // Track active modal for cleanup
    if (isHidden) {
      activeModals.push(modal);
    } else {
      activeModals = activeModals.filter(function (m) {
        return m !== modal;
      });
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

    // Remove from active modals
    activeModals = activeModals.filter(function (m) {
      return m !== modal;
    });
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
    if (!initializedModals.has(trigger)) {
      trigger.addEventListener("click", toggleModal);
      initializedModals.add(trigger);
    }
  });
  document.querySelectorAll("[data-dui-dismiss='modal']").forEach(function (button) {
    if (!initializedModals.has(button)) {
      button.addEventListener("click", closeModal);
      initializedModals.add(button);
    }
  });
}

// Cleanup function to destroy active modals and event listeners
function cleanupModals() {
  activeModals.forEach(function (modal) {
    modal.removeEventListener("click", closeOnOutsideClick);
  });
  activeModals = [];
  initializedModals.clear(); // Clear initialized modals to allow reinitialization
}

// Auto-initialize Modals in the Browser Environment
if (typeof window !== "undefined" && typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    initModal();

    // Observe the DOM for dynamically added modals
    var observer = new MutationObserver(function () {
      initModal(); // Reinitialize modals when new elements are added
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

// Combine all features into a global object for default export
var DavidAI = {
  initAlert: initAlert,
  initCollapse: initCollapse,
  initDropdowns: initDropdowns,
  cleanupDropdowns: cleanupDropdowns,
  initPopovers: initPopovers,
  cleanupPopovers: cleanupPopovers,
  initTooltips: initTooltips,
  cleanupTooltips: cleanupTooltips,
  initTabs: initTabs,
  cleanupTabs: cleanupTabs,
  initModal: initModal,
  cleanupModals: cleanupModals
};

// Auto-initialize components in the browser
if (typeof window !== "undefined" && typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
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

export { cleanupDropdowns, cleanupModals, cleanupPopovers, cleanupTabs, cleanupTooltips, DavidAI as default, initAlert, initCollapse, initDropdowns, initModal, initPopovers, initTabs, initTooltips };
//# sourceMappingURL=david-ai.esm.js.map
