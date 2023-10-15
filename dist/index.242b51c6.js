const board = document.querySelector(".game-board");
const button = document.querySelector(".button");
const winMessage = document.querySelector(".winner");
let turn = "X";
// Add a click event listener to the game board
function listenBoard() {
    board.addEventListener("click", runGame);
}
// Main function to initialize the game
function main() {
    createBoard();
    listenBoard();
}
// Function to handle the game logic when a cell is clicked
function runGame(e) {
    const boxId = e.target.id;
    console.log(boxId);
    if (boxId === null) return;
    const box = document.querySelector(`#${boxId}`);
    if (box === null || box.textContent !== "") return;
    box.textContent = turn;
    const winner = checkWinner();
    if (!winner) switchPlayer();
    else endGame();
}
// Function to end the game
function endGame() {
    // Remove the click event listener to prevent further moves
    board.removeEventListener("click", runGame);
    // Re-add the click event listener for a new game
    button.addEventListener("click", resetGame);
    if (winMessage == null) return;
    winMessage.textContent = `Winner is ${turn}`;
    winMessage.style.display = "block"; // Use style.display to control visibility
    button.style.visibility = "visible";
}
// Function to reset the game
function resetGame() {
    turn = "X";
    resetBoxes();
    button.style.visibility = "hidden";
    winMessage.textContent = "";
    board.addEventListener("click", runGame);
}
// Function to reset all game boxes to an empty state
function resetBoxes() {
    for(let i = 0; i <= 8; i++){
        const box = document.querySelector(`#box-${i}`);
        box.textContent = "";
        const boxClass = box.className;
        box.classList.remove(boxClass);
        box.offsetWidth;
        box.classList.add("box");
    }
}
// Function to check if a player has won
function checkWinner() {
    const boxes = getBoxes();
    const winningCombinations = [
        [
            0,
            1,
            2
        ],
        [
            3,
            4,
            5
        ],
        [
            6,
            7,
            8
        ],
        [
            0,
            3,
            6
        ],
        [
            1,
            4,
            7
        ],
        [
            2,
            5,
            8
        ],
        [
            0,
            4,
            8
        ],
        [
            2,
            4,
            6
        ] // Diagonals
    ];
    for (const combination of winningCombinations){
        const [a, b, c] = combination;
        if (boxes[a] !== "" && boxes[a] === boxes[b] && boxes[b] === boxes[c]) return true; // Found a winning combination
    }
    return false; // No winning combinations found
}
// Function to get the content of all game boxes
function getBoxes() {
    const boxesContent = [];
    for(let i = 0; i < 9; i++){
        const box = document.querySelector(`#box-${i}`);
        const boxContent = box.textContent;
        if (boxContent === null) boxesContent.push("");
        else boxesContent.push(boxContent);
    }
    return boxesContent;
}
// Function to switch the current player
function switchPlayer() {
    if (turn == "X") turn = "O";
    else turn = "X";
}
// Function to create the game board with 9 cells
function createBoard() {
    for(let i = 0; i < 9; i++)makeBox(i);
}
// Function to create a single cell in the game board
function makeBox(i) {
    const box = document.createElement("div");
    box.className = "box";
    box.id = `box-${i}`;
    box.textContent = "";
    board.append(box);
}
// Start the game by calling the main function
main();

//# sourceMappingURL=index.242b51c6.js.map
