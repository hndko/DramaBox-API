/**
 * Performance Utilities
 * Helper functions to optimize rendering and prevent forced reflows
 */

/**
 * Debounce function - delays execution until after wait milliseconds
 * @param {Function} fn - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} - Debounced function
 */
export function debounce(fn, wait = 100) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
}

/**
 * Throttle function - limits execution to once per wait milliseconds
 * @param {Function} fn - Function to throttle
 * @param {number} wait - Minimum milliseconds between calls
 * @returns {Function} - Throttled function
 */
export function throttle(fn, wait = 100) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

/**
 * Request animation frame wrapper for smooth animations
 * @param {Function} fn - Function to execute in animation frame
 * @returns {Function} - RAF-wrapped function
 */
export function rafThrottle(fn) {
  let scheduled = false;
  return function (...args) {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(() => {
        fn.apply(this, args);
        scheduled = false;
      });
    }
  };
}

/**
 * Batch DOM reads and writes to prevent layout thrashing
 * @param {Function} readFn - Function that reads from DOM
 * @param {Function} writeFn - Function that writes to DOM
 */
export function batchDOMUpdates(readFn, writeFn) {
  requestAnimationFrame(() => {
    const readResult = readFn();
    requestAnimationFrame(() => {
      writeFn(readResult);
    });
  });
}

/**
 * Check if element is in viewport using IntersectionObserver
 * @param {HTMLElement} element - Element to observe
 * @param {Function} callback - Callback when visibility changes
 * @param {Object} options - IntersectionObserver options
 * @returns {IntersectionObserver} - Observer instance
 */
export function observeVisibility(element, callback, options = {}) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        callback(entry.isIntersecting, entry);
      });
    },
    {
      root: options.root || null,
      rootMargin: options.rootMargin || "50px",
      threshold: options.threshold || 0.1,
    }
  );

  observer.observe(element);
  return observer;
}

/**
 * Lazy load images using IntersectionObserver
 * @param {string} selector - CSS selector for images
 * @param {string} dataAttr - Data attribute containing real src
 */
export function lazyLoadImages(
  selector = "img[data-src]",
  dataAttr = "data-src"
) {
  const images = document.querySelectorAll(selector);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute(dataAttr);
          img.removeAttribute(dataAttr);
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: "100px",
    }
  );

  images.forEach((img) => observer.observe(img));
}

/**
 * Use CSS containment for better performance
 * @param {HTMLElement} element - Element to apply containment
 */
export function applyContainment(element) {
  element.style.contain = "layout style paint";
}

export default {
  debounce,
  throttle,
  rafThrottle,
  batchDOMUpdates,
  observeVisibility,
  lazyLoadImages,
  applyContainment,
};
