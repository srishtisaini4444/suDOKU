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
    checkRows();
    checkColumns();
    checkBoxes();

}

function checkRows(){
    for(let row = 0; row < 9; row++)
    {
    let values = [];
    for(let col = 0; col < 9; col++)
    {
        let value = boardArray[row][col];
        if(value == "")
            {
            continue;
        }

        if(values.includes(value))
        {
              console.log("Duplicate Found");
        }
        else
        {
             values.push(value);
        }
    }
    }

}

function checkColumns()
{
    for(let col = 0; col < 9; col++)
    {
        let values = [];

        for(let row = 0; row < 9; row++)
        {
            let value = boardArray[row][col];

            if(value == "")
            {
                continue;
            }

            if(values.includes(value))
            {
                console.log("Duplicate Found");
            }
            else
            {
                values.push(value);
            }
        }
    }
}

function checkBoxes()
{
    for(let startRow = 0; startRow < 9; startRow += 3)
    {
        for(let startCol = 0; startCol < 9; startCol += 3)
        {
            let values = [];

            for(let row = startRow; row < startRow + 3; row++)
            {
                for(let col = startCol; col < startCol + 3; col++)
                {
                    let value = boardArray[row][col];

                    if(value == "")
                    {
                        continue;
                    }

                    if(values.includes(value))
                    {
                        console.log("Duplicate Found");
                    }
                    else
                    {
                        values.push(value);
                    }
                }
            }
        }
    }
}