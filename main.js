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