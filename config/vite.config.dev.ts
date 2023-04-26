import { mergeConfig } from 'vite';
import baseConig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      fs: {
        strict: true,
      },
    },
    // plugins: [
    //   eslint({
    //     cache: false,
    //     include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
    //     exclude: ['node_modules'],
    //   }),
    // ],
  },
  baseConig
);
