import azugaLogo from '../assets/logo/azugalogo.png';
import optumLogo from '../assets/logo/optumlogo.png';
import tmlLogo from '../assets/logo/techmachinerylogo.png';
import isroLogo from '../assets/logo/isrologo.png';

import bridgeston from '../assets/icons/bridgestone.png';
import unitedhealthcare from '../assets/icons/uhc.png';

export const JOURNEY_DATA = [
  { 
    role: "AZUGA", 
    subtext: "BY BRIDGESTONE", 
    logo: azugaLogo, 
    subIcon: bridgeston, 
    position: [4.5, 0, 0], 
    logoScale: [3.26 * 1.2, 1.2], 
    subIconScale: [0.8, 0.8] 
  },
  { 
    role: "OPTUM", 
    subtext: "UNITED HEALTHCARE", 
    logo: optumLogo, 
    subIcon: unitedhealthcare, 
    position: [5.5, 0, 0], 
    logoScale: [3.43 * 1.2, 1.2], 
    subIconScale: [1.57 * 0.8, 0.8] 
  },
  { 
    role: "TML", 
    subtext: "TECH MACHINERY LABS", 
    logo: tmlLogo, 
    subIcon: '', 
    position: [0, 0, 0], 
    logoScale: [2.2, 2.2], 
    subIconScale: [0.8, 0.8] 
  },
  { 
    role: "ISRO", 
    subtext: "INDIAN SPACE RESEARCH ORGANISATION", 
    logo: isroLogo, 
    subIcon: '', 
    position: [0, 0, 0], 
    logoScale: [2.2, 2.2], 
    subIconScale: [0.8, 0.8] 
  },
];

export const RADIUS = 200;
export const THETA = Math.PI / 20;
export const PIN_DURATION = 0.01;
export const DRUM_SPEED = 1.5;
export const NUM_CARDS = 5;
