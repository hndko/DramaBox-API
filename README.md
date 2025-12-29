# 🎬 DramaBox Clone

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, responsive drama streaming platform clone built with Vue 3 + Vite + TailwindCSS**

[Demo](#demo) • [Features](#features) • [Installation](#installation) • [API Endpoints](#api-endpoints) • [Screenshots](#screenshots)

</div>

---

## 📝 Short Description

> DramaBox Clone adalah aplikasi streaming drama modern yang dibangun dengan Vue 3, menampilkan UI seperti TikTok untuk video feed, player dengan quality selector, dan integrasi API lengkap untuk browsing, searching, dan menonton drama favorit Anda.

---

## ✨ Features

### 🎥 Video Streaming

- 🎬 **Video Player** - Fullscreen player dengan controls
- 📊 **Quality Selector** - SD (540p) / HD (720p) / FHD (1080p)
- ⏮️ **Episode Navigation** - Prev/Next dengan auto-play
- 📋 **Episode Drawer** - Slide-out episode list

### 📱 TikTok-Style Video Feed

- 📜 **Vertical Swipe** - Swipe untuk video berikutnya
- 🔇 **Mute Toggle** - One-tap mute/unmute
- ▶️ **Tap to Pause** - Tap anywhere untuk pause
- ⌨️ **Keyboard Controls** - Arrow keys + Space

### 🔍 Discovery

- 🏠 **Home Page** - Hero slider, trending, latest, recommendations
- 🔎 **Search** - Real-time search dengan hasil instan
- 🇮🇩 **Dub Indo** - Section khusus drama dubbing Indonesia
- 📄 **Drama Detail** - Info lengkap, cast, episodes

### ⚡ Performance Optimized

- 🚀 **CSS Containment** - Isolated rendering
- 🎮 **GPU Acceleration** - Smooth animations
- 📦 **Lazy Loading** - Pages & images
- 🔧 **Zero Layout Shift** - No forced reflows

---

## 🛠️ Tech Stack

| Category       | Technology               |
| -------------- | ------------------------ |
| ⚛️ Framework   | Vue 3 (Composition API)  |
| ⚡ Build Tool  | Vite 5                   |
| 🎨 Styling     | TailwindCSS 3            |
| 🧭 Routing     | Vue Router 4             |
| 🔗 HTTP Client | Native Fetch             |
| 📱 UI Pattern  | Mobile-first, Responsive |

---

## 🚀 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/dramabox-clone.git
cd dramabox-clone

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Run development server
npm run dev
```

### Environment Variables

```env
VITE_API_URL=https://your-api-url.com
```

---

## 📡 API Endpoints

| Endpoint              | Description                  | Method |
| --------------------- | ---------------------------- | ------ |
| `/vip`                | VIP dramas list              | GET    |
| `/dubindo`            | Indonesian dubbed dramas     | GET    |
| `/randomdrama`        | Random video for feed        | GET    |
| `/foryou`             | Personalized recommendations | GET    |
| `/latest`             | Latest released dramas       | GET    |
| `/trending`           | Trending dramas              | GET    |
| `/populersearch`      | Popular search terms         | GET    |
| `/search?query=`      | Search dramas                | GET    |
| `/detail?bookId=`     | Drama details                | GET    |
| `/allepisode?bookId=` | All episodes with streams    | GET    |

---

## 📁 Project Structure

```
src/
├── 📂 assets/          # Static assets, CSS
├── 📂 components/      # Reusable Vue components
│   ├── DramaCard.vue
│   ├── DramaSection.vue
│   ├── HeroSlider.vue
│   ├── Navbar.vue
│   └── LoadingSkeleton.vue
├── 📂 composables/     # Vue composables (hooks)
│   ├── useVideoFeed.js
│   ├── useDramaDetail.js
│   ├── useAllEpisodes.js
│   └── useSearch.js
├── 📂 pages/           # Page components
│   ├── HomePage.vue
│   ├── DetailPage.vue
│   ├── WatchPage.vue
│   ├── SearchPage.vue
│   ├── ForYouPage.vue
│   └── DubIndoPage.vue
├── 📂 router/          # Vue Router config
├── 📂 services/        # API services
│   └── dramabox.js
└── 📂 utils/           # Utility functions
    └── performance.js
```

---

## 🎮 Usage

### Keyboard Shortcuts (For You Page)

| Key     | Action         |
| ------- | -------------- |
| `↑`     | Previous video |
| `↓`     | Next video     |
| `Space` | Pause/Play     |
| `M`     | Mute/Unmute    |

### Watch Page Quality

```javascript
// Available qualities
const qualities = {
  sd: "540p", // Standard Definition
  hd: "720p", // High Definition (default)
  fhd: "1080p", // Full HD
};
```

---

## 📸 Screenshots

<div align="center">

| Home Page          | Detail Page   | Watch Page      |
| ------------------ | ------------- | --------------- |
| 🏠 Hero + Sections | 📄 Drama Info | 🎬 Video Player |

| For You         | Search       | Dub Indo      |
| --------------- | ------------ | ------------- |
| 📱 TikTok-style | 🔍 Real-time | 🇮🇩 Indonesian |

</div>

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This project is for **educational purposes only**. It is not affiliated with or endorsed by DramaBox. All content displayed is fetched from third-party APIs and the developers take no responsibility for the content provided.

---

<div align="center">

**Made with ❤️ using Vue 3 + Vite + TailwindCSS**

⭐ Star this repo if you find it useful!

</div>
