import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/vue";
import * as matchers from "@testing-library/jest-dom/matchers";
import "vitest-canvas-mock";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

if (typeof window !== "undefined") {
  (window as any).CSS = { supports: () => false };
}

if (typeof window !== "undefined") {
  window.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
      return [];
    }
    unobserve() {}
  } as any;
}

if (typeof window !== "undefined") {
  window.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  } as any;
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
