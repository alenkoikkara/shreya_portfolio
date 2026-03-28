# Shreya Portfolio

A high-fidelity, interactive 3D portfolio website built with **React**, **Three.js**, and **GSAP**. This project features a sophisticated 3D carousel, scroll-synchronized animations, and a premium glassmorphism design aesthetic.

![Shreya Portfolio Mockup](https://via.placeholder.com/1200x600/D0DDF3/1A1A1A?text=Shreya+Portfolio+3D+Experience)

## ✨ Features

- **3D Ferris-Wheel Carousel**: A unique, scroll-driven drum wheel experience for showcasing core design principles.
- **Scroll-Synchronized Animations**: Powered by GSAP ScrollTrigger for fluid, physics-based transitions.
- **Glassmorphism UI**: Premium frosted-glass effects on the navigation bar, skill cards, and interactive overlays.
- **Dynamic Bokeh Background**: A custom-shaded 3D background with randomized paths that respond to scroll depth.
- **Responsive 3D Scene**: Fully responsive canvas that maintains visual integrity across all desktop viewports.
- **Interactive Experience**: Shear-based hover effects on 3D text and skill cards for a high-end "draggy" feel.

## 🛠️ Technology Stack

- **Framework**: [React](https://reactjs.org/)
- **3D Engine**: [Three.js](https://threejs.org/) with [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- **Animation**: [GSAP](https://greensock.com/gsap/) (ScrollTrigger)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) & Vanilla CSS
- **Bundler**: [Vite](https://vitejs.dev/)
- **Components**: [@react-three/drei](https://github.com/pmndrs/drei)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
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

- `src/components/Carousel3D.jsx`: The core 3D Ferris-wheel carousel logic and GSAP timeline.
- `src/components/Experience.jsx`: The main R3F scene setup.
- `src/components/Overlay.jsx`: HTML/CSS overlays for content that doesn't live in the 3D space.
- `src/components/BokehBackground.jsx`: Shaders and logic for the dynamic background.
- `src/components/Navbar.jsx`: The glassmorphism navigation component.

## 📧 Contact

**Shreya**  
Email: [ar.shreya18@gmail.com](mailto:ar.shreya18@gmail.com)  
LinkedIn: [Shreya](https://www.linkedin.com/in/shreya-18/)

---

Designed and developed with ❤️ for a premium user experience.
