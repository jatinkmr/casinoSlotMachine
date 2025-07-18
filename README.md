# Casino Slot Machine - Express.js App

A fully functional casino slot machine game built with Express.js and EJS templates. Features realistic spinning animations, betting mechanics, and a complete payout system.

## Features

- 🎰 **Realistic Slot Machine**: 3-reel slot machine with spinning animations
- 💰 **Betting System**: Customizable bet amounts with balance tracking
- 🎯 **Payout System**: Different symbols with varying payout rates
- 🎨 **Beautiful UI**: Modern casino-style design with gradients and animations
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Real-time Updates**: AJAX-powered spins without page refresh

## Game Mechanics

### Symbols & Payouts (3 of a kind)
- 🍒 Cherries: 2x payout
- 🍋 Lemons: 3x payout
- 🍊 Oranges: 4x payout
- 🍇 Grapes: 5x payout
- 🔔 Bells: 10x payout
- 💎 Diamonds: 50x payout

### Winning Conditions
- **3 of a kind**: Full payout multiplier
- **2 of a kind**: 30% of the 3 of a kind payout
- **No match**: No payout

## Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
casino-slot-machine/
├── app.js              # Main Express application
├── package.json        # Project dependencies
├── views/
│   └── index.ejs      # Main game template
├── public/
│   └── js/
│       └── slot-machine.js  # Game logic JavaScript
└── README.md          # This file
```

## How to Play

1. **Set your bet**: Use the bet input field or quick bet buttons
2. **Click SPIN**: Watch the reels spin with realistic animations
3. **Check results**: See if you won and your updated balance
4. **Keep playing**: Continue until you run out of credits

## Technical Details

### Backend (Express.js)
- **Weighted Random System**: Symbols have different probabilities
- **Secure Betting**: Server-side validation of bets and balance
- **RESTful API**: Clean endpoint for spin operations

### Frontend (EJS + JavaScript)
- **Smooth Animations**: CSS keyframes for spinning reels
- **Real-time Updates**: Fetch API for seamless gameplay
- **Responsive Design**: Mobile-friendly interface
- **Visual Feedback**: Win/lose animations and status messages

### Symbol Weights
- 🍒 Cherries: 30% chance
- 🍋 Lemons: 25% chance
- 🍊 Oranges: 20% chance
- 🍇 Grapes: 15% chance
- 🔔 Bells: 8% chance
- 💎 Diamonds: 2% chance

## Customization

You can easily customize the game by modifying:

1. **Symbols and payouts** in `app.js`:
   ```javascript
   const symbols = [
       { symbol: '🍒', weight: 30, payout: 2 },
       // Add more symbols...
   ];
   ```

2. **Starting balance** in the route handler:
   ```javascript
   res.render('index', { balance: 1000 });
   ```

3. **Styling** in the EJS template CSS section

## API Endpoints

### GET /
- Returns the main game page
- Provides initial balance and symbol information

### POST /spin
- Processes a spin request
- **Body**: `{ bet: number, balance: number }`
- **Response**: `{ reels: array, winnings: number, balance: number, isWin: boolean }`

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## License

MIT License - feel free to use and modify for your own projects!

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Security Note

This is a demo application for educational purposes. In a production environment, you would need to implement:
- User authentication
- Secure session management
- Database persistence
- Rate limiting
- Input sanitization
- CSRF protection

---

Enjoy playing the Casino Slot Machine! 🎰✨
