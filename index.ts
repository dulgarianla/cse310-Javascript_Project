const board = document.querySelector('.game-board') as HTMLElement;
const button = document.querySelector('.button') as HTMLElement;
const winMessage = document.querySelector('.winner') as HTMLElement;

// Define a type for the current player ('X', 'O', or '')
type Turn = "X" | "O" | "";

let turn: Turn = "X";

// Add a click event listener to the game board
function listenBoard(): void {
    board.addEventListener('click', runGame);
}

// Main function to initialize the game
function main(): void {
    createBoard();
    listenBoard();
}

// Function to handle the game logic when a cell is clicked
function runGame(e: Event): void {
    const boxId: string | null = (<HTMLElement>e.target).id;
    console.log(boxId);
    if (boxId === null) return;
    const box: HTMLElement | null = document.querySelector(`#${boxId}`);
    if (box === null || box.textContent !== "") return;
    box.textContent = turn;
    const winner: boolean = checkWinner();
    if (!winner) 
    {
        switchPlayer();
    } 
    else 
    {
        endGame();
    }
}

// Function to end the game
function endGame(): void {
    // Remove the click event listener to prevent further moves
    board.removeEventListener("click", runGame);
    // Re-add the click event listener for a new game
    button.addEventListener("click", resetGame);
    if (winMessage == null) return;
    winMessage.textContent = `Winner is ${turn}`;
    winMessage.style.display = 'block'; // Use style.display to control visibility
    button.style.visibility = 'visible';
}

// Function to reset the game
function resetGame(): void {
    turn = "X";
    resetBoxes();
    button.style.visibility = 'hidden';
    winMessage.textContent = "";
    board.addEventListener('click', runGame);
}

// Function to reset all game boxes to an empty state
function resetBoxes(): void {
    for (let i = 0; i <= 8; i++) {
        const box = document.querySelector(`#box-${i}`) as HTMLElement;
        box.textContent = "";
        const boxClass: string = box.className;
        box.classList.remove(boxClass);
        void box.offsetWidth;
        box.classList.add("box");
    }
}

// Function to check if a player has won
function checkWinner(): boolean {
    const boxes: Array<string> = getBoxes();
    const winningCombinations: number[][] = 
    [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ];

    for (const combination of winningCombinations) 
    {
        const [a, b, c] = combination;
        if (boxes[a] !== "" && boxes[a] === boxes[b] && boxes[b] === boxes[c]) 
        {
            return true; // Found a winning combination
        }
    }
    return false; // No winning combinations found
}

// Function to get the content of all game boxes
function getBoxes(): Array<string> {
    const boxesContent: Array<string> = [];
    for (let i = 0; i < 9; i++) 
    {
        const box = document.querySelector(`#box-${i}`) as HTMLElement;
        const boxContent: string | null = box.textContent;
        if (boxContent === null) boxesContent.push("");
        else 
        {
            boxesContent.push(boxContent);
        }
    }
    return boxesContent;
}

// Function to switch the current player
function switchPlayer(): void {
    if (turn == "X") {
        turn = "O";
    } else {
        turn = "X";
    }
}

// Function to create the game board with 9 cells
function createBoard(): void {
    for (let i = 0; i < 9; i++) 
    {
        makeBox(i);
    }
}

// Function to create a single cell in the game board
function makeBox(i: number): void {
    const box: HTMLDivElement = document.createElement("div");
    box.className = "box";
    box.id = `box-${i}`;
    box.textContent = "";
    board.append(box);
}

// Start the game by calling the main function
main();

