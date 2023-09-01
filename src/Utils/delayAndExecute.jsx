import { lazy } from "react";

// Utility function to introduce a delay before executing a callback function
const delayAndExecute = (callback, delayMs) => {
  setTimeout(callback, delayMs);
};

// Define a custom lazy loading function with a delay
const lazyWithDelay = (importFunction, delay) => {
  return lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(importFunction());
      }, delay);
    });
  });
};

export { delayAndExecute, lazyWithDelay };
