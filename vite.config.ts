import { sveltekit } from '@sveltejs/kit/vite';
// import type { UserConfig } from 'vite';
// import Icons from 'unplugin-icons/vite';

const config = {
  plugins: [sveltekit()],
  build: {
    target: 'ES2022',
  },
};

export default config;
