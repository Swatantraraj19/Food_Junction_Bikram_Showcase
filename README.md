# Food Junction Bikram - Premium PWA Showcase

![Food Junction Banner](/public/pwa-desktop.png)

## 🍱 Overview
This repository contains a **Premium Restaurant PWA (Progressive Web App)** developed for **Food Junction Bikram**. This version is a **high-performance showcase port** designed to demonstrate technical expertise in modern web development, UI/UX design, and offline-capable applications.

The original application is a real-world restaurant ordering system. For privacy and security, this showcase version uses **dummy contact information** and **mocked backend functionality**.

---

## 🚀 Key Features

### 💎 Premium UI/UX
- **Cinematic Experience**: Implemented using `Framer Motion` for smooth, staggering entrance animations and gesture-based interactions.
- **Micro-interactions**: Glassmorphism, interactive SVG icons (Lucide React), and optimized feedback toasts.
- **Responsive-First**: Pixel-perfect layouts for mobile, tablet, and desktop viewports.

### 📱 Advanced PWA Capabilities
- **Installable Desktop/Mobile App**: Uses `vite-plugin-pwa` to enable full "Add to Home Screen" functionality.
- **Offline Support**: Reliable caching strategies via service workers ensure the app loads instantly even with slow or no connectivity.
- **Native-Like Navigation**: Includes mobile back-button interception to handle modals and sidebars naturally.

### ⚡ Performance Optimized
- **Lazy Loading**: Code splitting and dynamic imports for heavy components (Cart, Gallery, Full Menu) to minimize initial bundle size.
- **Optimized Assets**: High-speed `.webp` image formatting and pre-loaded critical fonts.
- **State Management**: Robust local persistence using **React Context API** and LocalStorage for the shopping cart system.

---

## 🛠️ Tech Stack
- **Frontend**: React, Vite 7
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **PWA**: Workbox / Vite-PWA

---

## 📂 Showcase Mode Adjustments
In this public repository version:
- **WhatsApp Integration**: The real-world WhatsApp ordering bridge is disabled.
- **Checkout Logic**: The "Confirm Order" button triggers a **Demo/Showcase Toast** rather than initiating a real transaction.
- **Contact Info**: Real phone numbers, social media handles, and addresses have been replaced with placeholders.
- **Cart Logic**: The interactive cart state remains functional (items can be added/removed) to demonstrate state management patterns.

---

## ⚙️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Food_Junction_Bikram_Showcase.git
   cd Food_Junction_Bikram_Showcase
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 👨‍💻 Developer Notes
This project was built to show how modern web technologies can provide a fast, offline-first experience for local businesses. It focuses on **clean code architecture**, **performance scores**, and **immersive user delight**.

**Live Link:** https://foodjunctionbikram.in

---
*Created with ❤️ by Swatantraraj Singh*
