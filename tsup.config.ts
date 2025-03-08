import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    index: 'src/index.ts'
  },
  format: ['cjs', 'esm'],
  minify: true,
  sourcemap: true,
  splitting: false
});
