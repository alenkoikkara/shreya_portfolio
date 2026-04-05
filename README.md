# Shreya Portfolio

A high-fidelity, interactive 3D portfolio website built with **React 19**, **Three.js**, and **GSAP**. This project features a sophisticated 3D Ferris-wheel carousel, scroll-synchronized animations, and a premium glassmorphism design aesthetic, now fully optimized for both desktop and mobile experiences.

![Shreya Portfolio Mockup](https://via.placeholder.com/1200x600/D0DDF3/1A1A1A?text=Shreya+Portfolio+3D+Experience)

## ✨ Features

- **3D Ferris-Wheel Carousel (Desktop)**: A unique, scroll-driven drum wheel experience for showcasing core design principles using custom 3D models and GSAP timelines.
- **Responsive Mobile Layout**: A dedicated `MobileCarousel` component providing a vertical, text-based interactive experience for screens smaller than 768px.
- **Scroll-Synchronized Animations**: Powered by `@gsap/react` and `ScrollTrigger` for fluid, physics-based transitions across a 2000vh scroll depth.
- **Advanced 3D Materials**: Utilizes `MeshTransmissionMaterial` for high-end glass and refractive effects on 3D assets.
- **Glassmorphism UI**: Premium frosted-glass effects on the navigation bar, skill cards, and interactive overlays.
- **Dynamic Bokeh Background**: A custom-shaded 3D background with randomized paths that respond to scroll depth.
- **Interactive Branding**: Hover-sensitive "Design.Shreya" logo with dynamic font-weight shifting.

## 🛠️ Technology Stack

- **Framework**: [React 19](https://reactjs.org/)
- **3D Engine**: [Three.js](https://threejs.org/) with [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- **Animation**: [GSAP](https://greensock.com/gsap/) with [@gsap/react](https://www.npmjs.com/package/@gsap/react)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) & Vanilla CSS
- **Bundler**: [Vite 8](https://vitejs.dev/)
- **Components**: [@react-three/drei](https://github.com/pmndrs/drei)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alenkoikkara/shreya_portfolio.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `src/components/Carousel3D.jsx`: The core 3D Ferris-wheel carousel logic and GSAP timeline for desktop.
- `src/components/MobileCarousel.jsx`: Specialized mobile-responsive layout for smaller screens.
- `src/components/Experience.jsx`: The main R3F scene setup and lighting.
- `src/components/Overlay.jsx`: HTML content synchronized with the 3D scroll experience.
- `src/components/Navbar.jsx`: Premium navigation with mobile menu and glassmorphism.
- `src/models/`: A library of 13 custom-configured 3D models (Faces, Brain, Bulb, etc.) with optimized materials.

## 📧 Contact

**Alen Koikkara**  
Email: [alendennis44@gmail.com](mailto:alendennis44@gmail.com)  
LinkedIn: [Alen Koikkara](https://www.linkedin.com/in/alenkoikkara/)

---

Designed and developed with ❤️ by Alen Koikkara.

