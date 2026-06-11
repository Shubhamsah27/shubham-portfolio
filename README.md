# Shubham Sah — Systems Engineer & Researcher

A premium, interactive 3D portfolio showcasing systems engineering, browser automation, and cryptography expertise.

**🔗 Live Demo:** [https://main.d1nbjah6vfuqak.amplifyapp.com/](https://main.d1nbjah6vfuqak.amplifyapp.com/)

---

## 🌌 Core Features & Architecture

- **Solar System Parallax Background**: A full 3D viewport canvas rendered using `@react-three/fiber` and `@react-three/drei`. Camera position and asteroid belt orbits are dynamically driven by user scroll progress.
- **Twinkling Starfield & Constellations**: High-performance custom WebGL shaders animating starry background coordinates. Star nodes connect dynamically based on proximity, propagating cascading energy ripples when projects are slid.
- **Achievements Section**: Highlights a Codeforces Expert rank (Peak Rating: **1863**) in a custom-designed CRT monitor frame with scanlines and glow filters.
- **Interactive Terminal Console**: Embedded command CLI simulation showcasing booting sequence analytics for personal finance manager API services.

## 🛠️ Tech Stack

- **Frontend Core**: React 19, TypeScript, Vite
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei, React Three Postprocessing (Bloom, Noise)
- **Animations**: Framer Motion
- **State Management**: Zustand (Global scroll tracking, render mode, and slide state)
- **Styling**: Tailwind CSS (Harmonious amber-violet color palette, custom glassmorphism)

---

## 🚀 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shubhamsah27/shubham-portfolio.git
   cd shubham-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run in development mode**:
   ```bash
   npm run dev
   ```

4. **Compile production build**:
   ```bash
   npm run build
   ```

---

## 📡 Deployment

This project is configured for continuous deployment on **AWS Amplify Hosting**. Any commits pushed to the `main` branch automatically trigger a managed CI/CD build pipeline and update the live distribution.
