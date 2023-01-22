import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import postcssNesting from 'postcss-nesting';
import postcssCustomMedia from 'postcss-custom-media';

// https://vitejs.dev/config/
// https://vitejs.dev/guide/build.html#public-base-path
// https://www.youtube.com/watch?v=Sgcfiow4fVQ
// https://sambitsahoo.com/blog/vite-code-splitting-that-works.html

export default (args) => {
  const isProduction = args.mode === 'production';
  const generateScopedName = isProduction
    ? '[hash:base64:3]'
    : '[local]_[hash:base64:3]';

  console.log(args, `\nRunning ${args.mode} mode ...\n`);

  const config = {
    base: './',
    build: {
      target: 'esnext',
    },
    plugins: [react()],
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName,
      },
      postcss: {
        plugins: [postcssCustomMedia(), postcssNesting()],
      },
    },
  };

  if (isProduction) {
    config.build = {
      ...config.build,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: [
              'node_modules/react/index.js',
              'node_modules/react-dom/index.js',
            ],
          },
        },
      },
    };
  }

  return defineConfig(config);
};
