let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
];

const resetgame = () => {
    turnO = true;
    enableboxes();
    msgcontainer.classList.add("hide");
};

// Event listener for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkwinner();
    });
});

// Disable all boxes
const disableboxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Enable all boxes and reset them
const enableboxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Show winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
};

// Check for a winner or draw
const checkwinner = () => {
    let isDraw = true;

    // Check if there's a winning pattern
    for (let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            console.log("winner", pos1val);
            showWinner(pos1val);
            return; // Exit if there is a winner
        }
    }

    // Check if all boxes are filled
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    // If no winner and all boxes are filled, it's a draw
    if (isDraw) {
        msg.innerText = "It's a draw!";
        msgcontainer.classList.remove("hide");
        disableboxes();
    }
};

// Event listeners for reset and new game buttons
newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);