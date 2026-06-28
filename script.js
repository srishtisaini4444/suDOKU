let board = document.getElementById("board");

let message = document.getElementById("message");

let clearBtn = document.getElementById("clearBtn");

let newGameBtn = document.getElementById("newGameBtn");

let checkBtn = document.getElementById("checkBtn");

let boardArray = Array.from({ length: 9 }, () => Array(9).fill(""));

let puzzles = [

[
["5","3","","","7","","","",""],
["6","","","1","9","5","","",""],
["","9","8","","","","","6",""],

["8","","","","6","","","","3"],
["4","","","8","","3","","","1"],
["7","","","","2","","","","6"],

["","6","","","","","2","8",""],
["","","","4","1","9","","","5"],
["","","","","8","","","7","9"]
],

[
["","","","2","6","","7","","1"],
["6","8","","","7","","","9",""],
["1","9","","","","4","5","",""],

["8","2","","1","","","","4",""],
["","","4","6","","2","9","",""],
["","5","","","","3","","2","8"],

["","","9","3","","","","7","4"],
["","","","","5","","","3","6"],
["7","","3","","1","8","","",""]
],

[
["","","4","","8","","","","2"],
["","","","5","","1","","",""],
["7","","","","","","4","",""],

["","5","","","6","","","","9"],
["","","2","","","","8","",""],
["1","","","","3","","","5",""],

["","7","","","","","","","6"],
["","","","9","","4","","",""],
["3","","","","1","","2","",""]
]

];

for(let row = 0; row < 9; row++)
{

    for(let col = 0; col < 9; col++)
{
    let cell = document.createElement("input");
    cell.type = "text";
    cell.maxLength = 1;
    cell.className = "cell";
    cell.setAttribute("data-row", row);
    cell.setAttribute("data-col", col);

    if((col + 1) % 3 == 0 && col != 8){
         cell.style.marginRight = "4px";
    }
    if((row + 1) % 3 == 0 && row != 8){
        cell.style.marginBottom = "4px";
    }

    cell.addEventListener("input", updateBoard);

    board.appendChild(cell);
}

}

clearBtn.addEventListener("click", clearBoard);

newGameBtn.addEventListener("click", newGame);

checkBtn.addEventListener("click", checkBoard);


function updateBoard(event)
{
    let cell = event.target;

    if(cell.value !== "" && !/^[1-9]$/.test(cell.value))
{
    cell.value = "";
    return;
}

    let row = cell.dataset.row;
    let col = cell.dataset.col;

    if(cell.value != "")
{
    if(cell.value < 1 || cell.value > 9)
    {
        cell.value = "";
        return;
    }
}

    boardArray[row][col] = cell.value;
    console.log(boardArray);
    checkBoard();

}

function checkBoard()
{
    let hasError =
        checkRows() ||
        checkColumns() ||
        checkBoxes();

    if (hasError)
    {
        message.innerText = "❌ Duplicate Found!";
    }
    else
    {
        message.innerText = "✅ No duplicates. Good job.";
    }
}

function checkRows()
{
    for (let row = 0; row < 9; row++)
    {
        let values = [];

        for (let col = 0; col < 9; col++)
        {
            let value = boardArray[row][col];

            if (value === "") continue;

            if (values.includes(value))
            {
                return true;
            }

            values.push(value);
        }
    }
    return false;
}

function checkColumns()
{
    for (let col = 0; col < 9; col++)
    {
        let values = [];

        for (let row = 0; row < 9; row++)
        {
            let value = boardArray[row][col];

            if (value === "") continue;

            if (values.includes(value))
            {
                return true;
            }

            values.push(value);
        }
    }
    return false;
}

function checkBoxes()
{
    for (let startRow = 0; startRow < 9; startRow += 3)
    {
        for (let startCol = 0; startCol < 9; startCol += 3)
        {
            let values = [];

            for (let row = startRow; row < startRow + 3; row++)
            {
                for (let col = startCol; col < startCol + 3; col++)
                {
                    let value = boardArray[row][col];

                    if (value === "") continue;

                    if (values.includes(value))
                    {
                        return true;
                    }

                    values.push(value);
                }
            }
        }
    }
    return false;
}

function clearBoard()
{
    let cells = document.querySelectorAll(".cell");

    cells.forEach((cell) =>
    {
        if (!cell.readOnly)
        {
            cell.value = "";
        }
    });

    for (let row = 0; row < 9; row++)
    {
        for (let col = 0; col < 9; col++)
        {
            let index = row * 9 + col;

            if (!cells[index].readOnly)
            {
                boardArray[row][col] = "";
            }
        }
    }

    message.innerText = "";
}

function newGame()
{

    let random = Math.floor(Math.random() * puzzles.length);
    let puzzle = puzzles[random];
    for(let row = 0; row < 9; row++)
{
    for(let col = 0; col < 9; col++)
    {
        let cells = document.querySelectorAll(".cell");
        let index = row * 9 + col;
        cells[index].value = puzzle[row][col];

        if(puzzle[row][col] != "")
            {
                cells[index].readOnly = true;
        }
        else
            {
                cells[index].readOnly = false;
        }

        boardArray[row][col] = puzzle[row][col];

    }
}

message.innerText = "";

}

newGame();