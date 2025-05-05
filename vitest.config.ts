import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.test.ts', '**/*.spec.ts'],
    includeSource: ['src/**/*.{js, ts}'],
    globals: true,
    environment: 'node'
  },
  define: { 
    'import.meta.vitest': 'undefined', 
  }, 
})
