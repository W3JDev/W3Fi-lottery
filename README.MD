# W3JFi-Lottery 🎰✨

> A Premium Lottery Experience with Festive Themed Animations

Transform your annual events with W3JFi-Lottery - a luxurious, 3D animated lottery application featuring elegant design, festive themes, and seamless user experience.

![W3JFi-Lottery](https://img.shields.io/badge/W3JFi-Lottery-gold?style=for-the-badge)
![Version](https://img.shields.io/badge/version-2.0.0-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

## ✨ Features

### 🎨 Premium Design
- **Glass Morphism UI** - Modern, elegant interface with blur effects
- **Premium Typography** - Inter and Playfair Display fonts
- **Smooth Animations** - 60fps animations with GPU acceleration
- **Responsive Design** - Works on all devices and screen sizes

### 🎄 Festive Themes
Choose from four stunning themes:

| Theme | Description |
|-------|-------------|
| ✨ **Default** | Elegant purple and gold with star particles |
| 🎄 **Christmas** | Falling snow, ornaments, and holiday decorations |
| 🎆 **New Year** | Spectacular fireworks and colorful confetti |
| ⭐ **Gala Night** | Golden stars and sophisticated ambient effects |

### 🎲 Lottery Features
- **3D Sphere Animation** - Eye-catching Three.js powered lottery ball
- **Real-time Results** - Instant winner display with dramatic reveals
- **Excel Export** - Download results in spreadsheet format
- **Persistent Storage** - Results saved automatically
- **Multi-prize Support** - Configure unlimited prize tiers
- **Redraw Option** - Re-draw for absent winners

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/W3JDev/W3Fi-lottery.git

# Navigate to project directory
cd W3Fi-lottery

# Install server dependencies
cd server
npm install

# Install frontend dependencies
cd ../product
npm install

# Build frontend
npm run build

# Start the application
npm run serve
```

The application will open automatically at `http://localhost:8888`

### Development Mode

```bash
cd product
npm run dev
```

## 📁 Project Structure

```
W3JFi-Lottery/
├── product/                 # Frontend application
│   ├── src/
│   │   ├── lottery/        # Main lottery components
│   │   │   ├── index.js    # Main application logic
│   │   │   ├── index.css   # Premium styles & themes
│   │   │   ├── themes.js   # Festive theme system
│   │   │   ├── prizeList.js # Prize display component
│   │   │   ├── canvas.js   # Background animation
│   │   │   └── config.js   # Number matrix config
│   │   ├── css/            # Additional styles
│   │   ├── lib/            # Third-party libraries
│   │   ├── img/            # Prize images
│   │   └── data/           # Audio files
│   ├── webpack.config.js   # Production build config
│   └── package.json
├── server/                  # Backend server
│   ├── config.js           # Prize configuration
│   ├── server.js           # Express server
│   ├── help.js             # Utility functions
│   ├── data/               # User data (Excel)
│   └── package.json
├── vercel.json             # Vercel deployment config
└── README.MD               # This file
```

## ⚙️ Configuration

### Prize Setup
Edit `server/config.js` to customize prizes:

```javascript
const prizes = [
  {
    type: 0,
    count: 1000,
    title: "",
    text: "Special Prize"    // Reserved for bonus draws
  },
  {
    type: 1,
    count: 2,
    text: "Grand Prize",
    title: "Mystery Gift",
    img: "../img/secrit.jpg"
  },
  // Add more prizes...
];

// Number of winners per draw
const EACH_COUNT = [1, 1, 5, 6, 7, 8, 9, 10];

// Company name on cards
const COMPANY = "W3JFi";
```

### Participant Setup
Add participants in `server/data/users.xlsx` with columns:
- Column A: Employee ID
- Column B: Name
- Column C: Department

## 🐳 Docker Deployment

```bash
# Build Docker image
./build.sh [TAG]

# Run locally
./dev.sh [TAG]

# Push to registry
./tagpush.sh [TAG]
```

### Docker Compose

```yaml
version: '3.8'

volumes:
  lottery_log:

services:
  lottery:
    container_name: w3jfi-lottery
    ports:
      - "8888:8888"
    volumes:
      - "lottery_log:/var/log"
    image: "your-registry/w3jfi-lottery:latest"
    restart: always
```

## 🌐 Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `cd product && npm install && npm run build`
   - Output Directory: `product/dist`
3. Deploy!

## 🎨 Theme Customization

Themes are defined in `product/src/lottery/index.css` using CSS variables:

```css
[data-theme="christmas"] {
  --primary-gradient: linear-gradient(135deg, #c41e3a 0%, #2d5a27 100%);
  --accent-color: #ffd700;
  /* ... more custom properties */
}
```

## 🛡️ Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 📱 Mobile Support

W3JFi-Lottery is fully responsive and works on:
- Tablets (iPad, Android tablets)
- Large screen phones
- Desktop monitors

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Three.js for 3D graphics
- TWEEN.js for smooth animations
- Original lottery concept

---

<p align="center">
  Made with ❤️ by W3JFi Team
</p>

<p align="center">
  <a href="#top">Back to top</a>
</p>
