const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Slot machine symbols and their weights
const symbols = [
    { symbol: '🍒', weight: 30, payout: 2 },
    { symbol: '🍋', weight: 25, payout: 3 },
    { symbol: '🍊', weight: 20, payout: 4 },
    { symbol: '🍇', weight: 15, payout: 5 },
    { symbol: '🔔', weight: 8, payout: 10 },
    { symbol: '💎', weight: 2, payout: 50 }
];

// Create weighted symbol array
const weightedSymbols = [];
symbols.forEach(item => {
    for (let i = 0; i < item.weight; i++) {
        weightedSymbols.push(item.symbol);
    }
});

// Helper function to get random symbol
function getRandomSymbol() {
    return weightedSymbols[Math.floor(Math.random() * weightedSymbols.length)];
}

// Helper function to calculate winnings
function calculateWinnings(reels, bet) {
    const [reel1, reel2, reel3] = reels;

    // Check for three of a kind
    if (reel1 === reel2 && reel2 === reel3) {
        const symbol = symbols.find(s => s.symbol === reel1);
        return bet * symbol.payout;
    }

    // Check for two of a kind
    if (reel1 === reel2 || reel2 === reel3 || reel1 === reel3) {
        const matchingSymbol = reel1 === reel2 ? reel1 : (reel2 === reel3 ? reel2 : reel1);
        const symbol = symbols.find(s => s.symbol === matchingSymbol);
        return Math.floor(bet * symbol.payout * 0.3);
    }

    return 0;
}

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Casino Slot Machine',
        symbols: symbols,
        balance: 1000
    });
});

app.post('/spin', (req, res) => {
    const { bet, balance } = req.body;
    const betAmount = parseInt(bet);
    const currentBalance = parseInt(balance);

    // Validate bet
    if (betAmount <= 0 || betAmount > currentBalance) {
        return res.json({
            error: 'Invalid bet amount',
            balance: currentBalance
        });
    }

    // Generate random reels
    const reels = [
        getRandomSymbol(),
        getRandomSymbol(),
        getRandomSymbol()
    ];

    // Calculate winnings
    const winnings = calculateWinnings(reels, betAmount);
    const newBalance = currentBalance - betAmount + winnings;

    res.json({
        reels,
        winnings,
        balance: newBalance,
        isWin: winnings > 0
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Casino Slot Machine running on port ${PORT}`);
});
