let board = document.getElementById("board");

let boardArray = [];

for(let row = 0; row < 9; row++)
{
    boardArray[row] = [];

    for(let col = 0; col < 9; col++)
{
    let cell = document.createElement("input");
    cell.type = "text";
    cell.maxLength = 1;
    cell.className = "cell";
    cell.setAttribute("data-row", row);
    cell.setAttribute("data-col", col);

    cell.addEventListener("input", updateBoard);

    board.appendChild(cell);
}

}



function updateBoard(event)
{
    let cell = event.target;
    let row = cell.dataset.row;
    let col = cell.dataset.col;

    boardArray[row][col] = cell.value;
    console.log(boardArray);

}