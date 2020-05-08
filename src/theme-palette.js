import { modularScale } from 'polished';

export default {
  bg: 'rgba(21, 26, 35, 1)',
  uiDark: 'rgba(57, 62, 70, 1)',
  uiDarker: 'rgba(35, 41, 49, 1)',
  accentMint: 'rgba(120, 255, 214, 1)',
  accentMintDark: 'rgba(90, 246, 184, 1)',
  accentGreen: 'rgba(78, 204, 163, 1)',
  uiLight: 'rgba(230, 240, 255, 1)',
  accentPaleBlue: 'rgba(209, 232, 255, 1)',
  transparent: 'rgba(0, 0, 0, 0)',
  success: 'rgba(168, 255, 120, 1)',
  successDark: 'rgba(119, 255, 107, 1)',
  warning: 'rgba(255, 217, 122, 1)',
  warningDark: 'rgba(255, 200, 112, 1)',
  error: 'rgba(255, 125, 122, 1)',
  errorDark: 'rgba(255, 112, 131, 1)',
  cardShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  font: "'Baloo Bhaina 2', cursive",
  // media query for mobile to be used across the site where needed
  mobile: '@media (max-width: 800px)',
  scale: step => modularScale(step),
};
