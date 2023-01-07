import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import postcssNesting from 'postcss-nesting';
import postcssCustomMedia from 'postcss-custom-media';

// https://vitejs.dev/config/
// https://vitejs.dev/guide/build.html#public-base-path
// https://www.youtube.com/watch?v=Sgcfiow4fVQ

export default (args) => {
  const isProduction = args.mode === 'production';
  const generateScopedName = isProduction
    ? '[hash:base64:3]'
    : '[local]_[hash:base64:3]';

  // console.log(`Running ${args.mode} mode ...\n`);
  // console.log(args);

  return defineConfig({
    base: './',
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
  });
};
