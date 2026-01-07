// Centralized Jest setup for test environment polyfills and global mocks
// Polyfill `crypto.randomUUID` used by components when running under jsdom
if (!(global as any).crypto) {
  (global as any).crypto = { randomUUID: () => 'test-uuid' };
} else if (!(global as any).crypto.randomUUID) {
  (global as any).crypto.randomUUID = () => 'test-uuid';
}

// Optionally add other global mocks here (localStorage is available in jsdom)
