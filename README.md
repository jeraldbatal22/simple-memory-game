# 🧠 Memory Game

A beautiful and engaging memory card game built with React and Vite. Test your memory skills by matching pairs of Halloween-themed cards across different difficulty levels!

![Memory Game](https://img.shields.io/badge/React-19.1.1-blue) ![Vite](https://img.shields.io/badge/Vite-7.1.3-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.13-cyan)

## 🎮 Features

### 🎯 Core Gameplay
- **Memory Matching**: Flip cards to find matching pairs
- **Multiple Difficulty Levels**:
  - **Easy**: 3×4 grid (6 pairs)
  - **Medium**: 4×4 grid (8 pairs) 
  - **Hard**: 6×6 grid (18 pairs)
- **Real-time Statistics**: Track your time and number of moves
- **Progress Tracking**: Visual progress bar showing completion percentage
- **Best Score System**: Local storage saves your best time and moves for each difficulty

### 🎨 Visual & Audio
- **Halloween Theme**: 16 spooky icons including pumpkins, vampires, tombstones, and more
- **Beautiful UI**: Pastel color scheme with smooth animations and hover effects
- **Confetti Celebration**: Animated confetti when you win!
- **Sound Effects**: Optional audio feedback for card flips, matches, and victory
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### ⚙️ Settings & Customization
- **Sound Toggle**: Enable/disable audio effects
- **Theme Toggle**: Switch between light and dark modes
- **Persistent Settings**: Your preferences are saved locally
- **Game Controls**: Restart game, change difficulty, and play again

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd memory-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to play the game!

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🎯 How to Play

1. **Choose Difficulty**: Select Easy, Medium, or Hard from the dropdown
2. **Start Playing**: Click on cards to flip them and reveal the icons
3. **Find Matches**: Try to remember where you saw each icon and match pairs
4. **Complete the Game**: Match all pairs to win!
5. **Beat Your Best**: Try to improve your time and move count

### Tips for Better Performance
- Take your time to memorize card positions
- Plan your moves strategically
- Use the progress bar to track your completion
- Try different difficulty levels to challenge yourself

## 🛠️ Technical Details

### Built With
- **React 19.1.1** - Modern React with hooks
- **Vite 7.1.3** - Fast build tool and dev server
- **TailwindCSS 4.1.13** - Utility-first CSS framework
- **Web Audio API** - For sound effects

### Project Structure
```
src/
├── components/
│   ├── SettingsModal.jsx    # Settings configuration modal
│   └── VictoryModal.jsx     # Victory celebration modal
├── hooks/
│   └── useTimeCount.js      # Custom timer hook
├── App.jsx                  # Main game component
├── index.css               # Global styles
└── main.jsx                # App entry point
```

### Key Features Implementation
- **Custom Timer Hook**: `useTimeCount` manages game timing
- **Local Storage**: Saves best scores and user settings
- **Responsive Grid**: Dynamic grid layout based on difficulty
- **Sound System**: Web Audio API for game sound effects
- **State Management**: React hooks for game state and settings

## 🎨 Customization

### Adding New Icons
1. Add your icon files to `public/assets/`
2. Import them in `App.jsx`
3. Add them to the `icons` array

### Modifying Difficulty Levels
Edit the `DIFFICULTY_LEVELS` object in `App.jsx`:
```javascript
const DIFFICULTY_LEVELS = {
  easy: { name: 'Easy', grid: '3x4', rows: 3, cols: 4, pairs: 6 },
  // Add your custom difficulty here
};
```

### Styling
The game uses TailwindCSS classes. Modify colors and styles in the component files or update the color palette in the `colors` array.

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Halloween icons from various sources
- React and Vite communities for excellent documentation
- TailwindCSS for the beautiful styling framework

---

**Happy Memory Gaming! 🎃👻**
