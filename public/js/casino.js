// Slot Machine Game Logic
class SlotMachine {
    constructor(initialBalance) {
        this.currentBalance = initialBalance;
        this.isSpinning = false;
        this.init();
    }

    init() {
        // Get DOM elements
        this.spinBtn = document.getElementById('spinBtn');
        this.betInput = document.getElementById('bet');
        this.balanceDisplay = document.getElementById('balance');
        this.resultDisplay = document.getElementById('result');
        this.statusDisplay = document.getElementById('status');
        this.loadingDisplay = document.getElementById('loading');
        this.reels = [
            document.getElementById('reel1'),
            document.getElementById('reel2'),
            document.getElementById('reel3')
        ];

        // Bind event listeners
        this.bindEvents();

        // Create quick bet buttons
        this.createQuickBetButtons();
    }

    bindEvents() {
        // Spin button click
        this.spinBtn.addEventListener('click', () => this.handleSpin());

        // Bet input validation
        this.betInput.addEventListener('input', () => this.validateBetInput());
    }

    // Update balance display
    updateBalance(newBalance) {
        this.currentBalance = newBalance;
        this.balanceDisplay.textContent = newBalance;
        this.betInput.max = newBalance;
    }

    // Show status message
    showStatus(message, isError = false) {
        this.statusDisplay.textContent = message;
        this.statusDisplay.className = isError ? 'status error' : 'status';
        setTimeout(() => {
            this.statusDisplay.textContent = '';
            this.statusDisplay.className = 'status';
        }, 3000);
    }

    // Animate reels spinning
    animateReels() {
        this.reels.forEach((reel, index) => {
            reel.classList.add('spinning');

            // Show random symbols during spinning
            const interval = setInterval(() => {
                const randomSymbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];
                reel.textContent = randomSymbols[Math.floor(Math.random() * randomSymbols.length)];
            }, 100);

            // Stop spinning after delay
            setTimeout(() => {
                clearInterval(interval);
                reel.classList.remove('spinning');
            }, 1500 + (index * 200));
        });
    }

    // Validate bet input
    validateBetInput() {
        const bet = parseInt(this.betInput.value);
        if (bet > this.currentBalance) {
            this.betInput.value = this.currentBalance;
        }
    }

    // Handle spin button click
    async handleSpin() {
        if (this.isSpinning) return;

        const bet = parseInt(this.betInput.value);

        if (bet <= 0 || bet > this.currentBalance) {
            this.showStatus('Invalid bet amount!', true);
            return;
        }

        this.isSpinning = true;
        this.spinBtn.disabled = true;
        this.loadingDisplay.style.display = 'block';
        this.resultDisplay.textContent = '';

        // Animate reels
        this.animateReels();

        try {
            const response = await fetch('/spin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bet: bet,
                    balance: this.currentBalance
                })
            });

            const data = await response.json();

            if (data.error) {
                this.showStatus(data.error, true);
                this.updateBalance(data.balance);
            } else {
                // Show results after animation
                setTimeout(() => {
                    this.showResults(data);
                }, 2000);
            }
        } catch (error) {
            console.error('Error:', error);
            this.showStatus('An error occurred. Please try again.', true);
        } finally {
            setTimeout(() => {
                this.isSpinning = false;
                this.spinBtn.disabled = false;
                this.loadingDisplay.style.display = 'none';
            }, 2000);
        }
    }

    // Show spin results
    showResults(data) {
        this.reels.forEach((reel, index) => {
            reel.textContent = data.reels[index];
        });

        this.updateBalance(data.balance);

        if (data.isWin) {
            this.resultDisplay.innerHTML = `🎉 YOU WIN $${data.winnings}! 🎉`;
            this.resultDisplay.className = 'result win';
        } else {
            this.resultDisplay.innerHTML = `Better luck next time!`;
            this.resultDisplay.className = 'result lose';
        }

        if (data.balance <= 0) {
            this.showStatus('Game Over! No more balance.', true);
        }
    }

    // Create quick bet buttons
    createQuickBetButtons() {
        const quickBets = [1, 5, 10, 25, 50, 75, 100];
        const betControls = document.querySelector('.bet-buttons');

        quickBets.forEach(amount => {
            const btn = document.createElement('button');
            btn.textContent = `$${amount}`;
            btn.className = 'btn quick-bet-btn';
            btn.style.cssText = `
                background: linear-gradient(145deg, #3498db, #2980b9);
                color: white;
                margin: 5px;
                padding: 8px 15px;
                font-size: 0.9em;
                border-radius: 5px;
                transition: all 0.3s ease;
            `;

            // Add hover effect
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = '0 5px 15px rgba(52, 152, 219, 0.3)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = 'none';
            });

            btn.onclick = () => {
                if (amount <= this.currentBalance) {
                    this.betInput.value = amount;
                }
            };

            betControls.appendChild(btn);
        });
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get initial balance from the page
    const initialBalance = parseInt(document.getElementById('balance').textContent);

    // Create new slot machine instance
    window.slotMachine = new SlotMachine(initialBalance);
});
