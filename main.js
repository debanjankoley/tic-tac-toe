const gameBoard = (function () {
    const board = [];
    
    const newBoard = () => {
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i][j] = '';
            };
        };    
    };

    newBoard();

    const getBoard = () => board;

    const placeMark = function (row, column, playerMark) {
        board[row][column] = playerMark;
    };

    return {getBoard, placeMark, newBoard};
})();

function createPlayer (name, mark) {
    return {name, mark};
};

const gameController = (function (
    playerOne = createPlayer("Player One", "X"),
    playerTwo = createPlayer("Player Two", "O")
) {
    let activePlayer = playerOne;

    const resetActivePLayer = () => activePlayer = playerOne;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        console.log(gameBoard.getBoard());
        console.log(`${getActivePlayer().name}'s turn -`);
    };

    const playRound = (row, column) => {
        if (roundResult() == "win" || roundResult() == "draw") {
            console.log(gameBoard.getBoard());
            return;
        };

        if (gameBoard.getBoard()[row][column] === '') {
            console.log(`Marking ${getActivePlayer().name}'s mark in row:${row} and column:${column}`);
            gameBoard.placeMark(row, column, getActivePlayer().mark);

            showResult();
            if (roundResult() === "win") return;
            switchPlayerTurn();
            printNewRound();
        };
    };

    const roundResult = () => {
        const board = gameBoard.getBoard()[0].concat(gameBoard.getBoard()[1], gameBoard.getBoard()[2]);
        const winningLines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        let result = 'Not defined';
        let exitLoop = false;

        winningLines.forEach((line) => {
            if (exitLoop) return;
            if (board[line[0]] === board[line[1]] && board[line[1]] === board[line[2]] && board[line[0]] !== '') {
                result = "win";
                exitLoop = true;
            };
        });
        if (exitLoop) return result;

        if ( !board.includes('') ) {
            result = "draw";
        };

        return result;
    };

    const showResult = (result = roundResult()) => {
        if (result === "win") {
            console.log(`${getActivePlayer().name} won!!`);
        } else if (result === "draw") {
            console.log("It's a draw!!");
        };
    };

    const changePlayerName = (newP1name, newP2name) => {
        playerOne.name = newP1name;
        playerTwo.name = newP2name;
    };

    printNewRound();

    return {playRound, getActivePlayer, roundResult, resetActivePLayer, changePlayerName};
})();

function screenController () {
    const board = gameBoard.getBoard();
    const boardDiv = document.querySelector('.board');
    const restartBtn = document.querySelector('.restartBtn');
    const newGameBtn = document.querySelector('.newGame');
    const dialog = document.querySelector('dialog');
    
    const updateScreen = (e) => {
        const row = e.target.dataset.row;
        const column = e.target.dataset.column;
        
        gameController.playRound(row, column);
        e.target.textContent = board[row][column];
    };

    const playerTurnMessage = () => {
        const playerTurnDiv = document.querySelector('.turn');
        const activePlayer = gameController.getActivePlayer();
        const result = gameController.roundResult();

        if (result === "win") {
            playerTurnDiv.textContent = `${activePlayer.name} Won !!`;
        } else if (result === "draw") {
            playerTurnDiv.textContent = "It's a Draw !!";
        } else {
            playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
        };
    };

    const renderSquares = () => {
        board.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                const cellBtn = document.createElement('button');
    
                cellBtn.classList.add('cell');
                cellBtn.dataset.row = rowIndex;
                cellBtn.dataset.column = columnIndex;
                cellBtn.addEventListener('click', (e) => {
                    updateScreen(e);
                    playerTurnMessage();
                });
                boardDiv.appendChild(cellBtn);
            });
        });
    };

    const startGame = () =>{
        boardDiv.textContent = "";
        gameBoard.newBoard();
        gameController.resetActivePLayer();
        renderSquares();
        playerTurnMessage();
    };

    restartBtn.addEventListener('click', startGame);

    newGameBtn.addEventListener('click', () => {
        dialog.showModal();
    });

    dialog.addEventListener('close', () => {
        const playerOneBox = document.getElementById('player-one');
        const playerTwoBox = document.getElementById('player-two');

        if (dialog.returnValue === 'start') {
            gameController.changePlayerName(playerOneBox.value, playerTwoBox.value);
        };
        startGame();
    });

    renderSquares();
    playerTurnMessage();
};

screenController();