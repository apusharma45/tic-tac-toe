let boxes = document.querySelectorAll(".boxes");
let resetButton = document.getElementById("resetButton");
let msg = document.getElementById("msg");
let additionalButton = document.getElementById("additionalButton");
let closeButton = document.getElementById("closeButton");
let popupCloseButton = document.getElementById("popupCloseButton");
let turnX = true;
let count = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const announcement = (w) => {
    msg.innerText = `Player ${w} has won`;
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    boxes.forEach((box)=>{
        box.disabled=true;
    })

}
const Draw = () => {
    msg.innerText = `Draw!`;
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}
const checkWinner = ()=>{
    ++count;
    for(let pattern of winPatterns) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if (val1 != "" && val2 != "" && val3 != "") {
            if(val1 === val2 && val2 === val3) {
                announcement(val1);
            }
        }
    }
    if(count==9) {
        Draw();
    }
    
}

const playSound = (soundFile) => {
    var audio = new Audio(soundFile);
    audio.play();
}

boxes.forEach((box)=>{
    box.addEventListener("click", ()=> {
        playSound('button_press.mp3'); 
        if(turnX) {
            box.innerText = "X";
            box.disabled = true;
            turnX = false;
        }
        else {
            box.innerText = "O";
            box.disabled = true;
            turnX = true;
        }
        checkWinner();
    })
})

const reseter = ()=> {
    boxes.forEach((box)=>{
        box.innerText = "";
        box.disabled = false;
    })
    turnX = true;
    count = 0;
}

const closePopup = () => {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

resetButton.addEventListener("click", reseter)
closeButton.addEventListener("click", closePopup)
popupCloseButton.addEventListener("click", closePopup)
additionalButton.addEventListener("click", () => {
    closePopup();
    reseter();
})



function additionalButtonClick() {
    alert("Additional button clicked!");
}