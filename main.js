const gameBoard = (function () {
    const rows = 3;
    const columns = 3
    const board = [];
    
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = '';
        };
    };

    const getBoard = () => board;

    const placeMark = function (row, column, playerMark) {
        if (board[row][column] !== '') return;
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

})();