document.addEventListener('DOMContentLoaded', () => {
    // Game state
    const board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    const statusDisplay = document.getElementById('status');
    const winningMessage = () => `Player ${currentPlayer} wins!`;
    const drawMessage = () => `Game ended in a draw!`;
    const currentPlayerTurn = () => `Player ${currentPlayer}'s Turn`;

    // Winning conditions
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];


    // DOM Elements
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');

    // Initialize the game
    function initGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winner');
            cell.style.pointerEvents = 'auto';
        });
        board.fill('');
        currentPlayer = 'X';
        gameActive = true;
        statusDisplay.textContent = currentPlayerTurn();
    }

    // Handle cell click
    function handleCellClick(e) {
        const cell = e.target;
        const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

        // If cell is already filled or game is not active, do nothing
        if (board[cellIndex] !== '' || !gameActive) return;

        // Update the board and UI
        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());

        // Check for win or draw
        if (checkWin()) {
            handleWin();
            return;
        }
        
        if (checkDraw()) {
            handleDraw();
            return;
        }


        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = currentPlayerTurn();
    }


    // Check for a win
    function checkWin() {
        return winConditions.some(condition => {
            const [a, b, c] = condition;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }


    // Check for a draw
    function checkDraw() {
        return board.every(cell => cell !== '');
    }


    // Handle win
    function handleWin() {
        gameActive = false;
        statusDisplay.textContent = winningMessage();
        
        // Highlight winning cells
        winConditions.forEach(condition => {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                cells[a].classList.add('winner');
                cells[b].classList.add('winner');
                cells[c].classList.add('winner');
            }
        });
    }


    // Handle draw
    function handleDraw() {
        gameActive = false;
        statusDisplay.textContent = drawMessage();
    }


    // Event Listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', initGame);

    // Initialize the game
    initGame();
});
