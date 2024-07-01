const gameBoard = (function () {
    const board = [];
    
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i][j] = '';
        };
    };

    const getBoard = () => board;

    const placeMark = function (row, column, playerMark) {
        board[row][column] = playerMark;
    };

    return {getBoard, placeMark};
})();

function createPlayer (name, mark) {
    return {name, mark};
};

const gameController = (function (
    playerOne = createPlayer("Player One", "X"),
    playerTwo = createPlayer("Player Two", "O")
) {
    let activePlayer = playerOne;

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

    printNewRound();

    return {playRound, getActivePlayer};
})();

function screenController () {
    const boardDiv = document.querySelector('.board');
    const board = gameBoard.getBoard();
    
    const updateScreen = (e) => {
        const row = e.target.dataset.row;
        const column = e.target.dataset.column;
        
        gameController.playRound(row, column);
        e.target.textContent = board[row][column];
    };

    const playerTurnMessage = () => {
        const playerTurnDiv = document.querySelector('.turn');
        const activePlayer = gameController.getActivePlayer();
        
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`
    };

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

    playerTurnMessage();
};

screenController()