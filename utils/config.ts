import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  base,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: '3 Wheeler Bike CLub',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    base,
  ],
  ssr: true,
});
