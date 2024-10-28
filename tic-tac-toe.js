"use strict";
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

index.addEventListener('click', () => {
    const squares = index.querySelectorAll('#board div');
    const newGameButton = document.querySelector('.btn');
    const statusDisplay = document.querySelector('status');

    squares.forEach((square, index) => {
        square.classList.add('square');
        square.setAttribute('data-index', index);

        square.addEventListener('click', handleSquareClick);
    })

    newGameButton.addEventListener('click', resetGame);

    function handleSquareClick(event) {
        const square = event.target;
        const squareIndex = square.getAttribute('data-index');

        if (gameActive && gameBoard[squareIndex] === '') {
            gameBoard[squareIndex] = currentPlayer;
            square.classList.add(currentPlayer);
            square.textContent = currentPlayer;   

            if (checkWin()) {
                statusDisplay.classList.add('you-won');
                statusDisplay.textContent = '🎉 Player ${currentPlayer} wins 🎉';
                gameActive = false;
            } else if (gameBoard.every(square => square !== '')) {
                statusDisplay.textContent = 'It\'s a tie!';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                statusDisplay.textContent = 'Player ${currentPlayer}\'s turn';
            }
        } 
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => gameBoard[index] ===currentPlayer);
        });
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';

        squares.forEach(square => {
            square.textContent = '';
            square.classList.remove('X');
        });

        statusDisplay.classList.remove('you-won');
        statusDisplay.textContent = 'Move your mouse over a square and click to play an X or an O.';
    }
});

//index.querySelector("div").className = "square";
//document.getElementById("my-id").onclick = myFunction(); 

//board.forEach(function(elem, index) {
    //elem.addEventListener('mouseover', function(e) {
        //e.target.classList.add('active');
    //})

    //elem.addEventListener('mouseout', function(e) {
        //e.targetclassList.remove('active');
   // })
//})



