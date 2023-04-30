const cells = document.querySelectorAll('.cell');
const status_text = document.querySelector('#status');
const restart_btn = document.querySelector('#restart');

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let CurrentPlayer = "X";
let running = false;

IntializeGame();

function IntializeGame() {
    running = true;
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restart_btn.addEventListener("click", RestartGame);
    status_text.textContent = `${CurrentPlayer}'s turn`;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) {
        return;
    }

    UpdateCell(this, cellIndex);
    Winner();
}

function UpdateCell(cell, index) {
    options[index] = CurrentPlayer;
    cell.textContent = CurrentPlayer;
}

function ChangePlayer() {
    CurrentPlayer = (CurrentPlayer == "X") ? "O" : "X";
    status_text.textContent = `${CurrentPlayer}'s turn`;

}

function Winner() {
    let round = false;
    for (let i = 0; i < winConditions.length; i++) {
        const conditions = winConditions[i];
        const cellA = options[conditions[0]];
        const cellB = options[conditions[1]];
        const cellC = options[conditions[2]];


        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }

        if (cellA == cellB && cellB == cellC) {
            round = true;
            break;
        }
    }

    if (round) {
        status_text.textContent = `${CurrentPlayer} Wins!!!`;
        running = false;
    } else if (!options.includes("")) {
        status_text.textContent = "Draw!!!";
        running = false;
    } else {
        ChangePlayer();
    }
}

function RestartGame() {
    CurrentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    running = true;
}