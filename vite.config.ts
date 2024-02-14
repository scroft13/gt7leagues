import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

const config: UserConfig = {
  plugins: [
    sveltekit(),
    Icons({
      compiler: 'svelte',
    }),
  ],
  build: {
    target: 'ES2022',
  },
};

export default config;
