let cells = document.querySelectorAll(".cell");
let statusText = document.querySelector("#statusText");
let restartBtn = document.querySelector("#restartBtn");

let winOptions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell=>cell.addEventListener("click",cellClicked));
    restartBtn.addEventListener("click",restartGame);
    statusText.textContent = `${currentPlayer}'s Turn`;
    running = true;
}

function cellClicked(){
    let cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != ""||!running){
        return;
    }

    updatecell(this,cellIndex);
    checkWinner();
}

function updatecell(cell,index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer === "X")? "O" : "X";
    statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner(){
    let roundwon = false;

    for(let i=0;i<winOptions.length;i++){
        let condition = winOptions[i];
        let cellA = options[condition[0]];
        let cellB = options[condition[1]];
        let cellC = options[condition[2]];

        if(cellA =="" || cellB =="" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundwon = true;
            break;
        }
    }

    if(roundwon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
