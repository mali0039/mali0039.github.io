const container = document.querySelector("#container");
let newSquare;
//initial grid 16x16
for (let i =0; i<256;i++) {
    newSquare = document.createElement('div');
    newSquare.classList.add("squares");
    container.appendChild(newSquare);
}
addListeners();
function addListeners() {
    squares =document.querySelectorAll(".squares");
    squares.forEach(item => {
        item.addEventListener('mouseover', makeBlack);
    })
}
function makeBlack() {
   this.style.backgroundColor = "black";
 }


let resetButton = document.querySelector("#reset");
resetButton.addEventListener('click', function() {
    squares.forEach(item => {
        item.style.backgroundColor = "white";
    })
});


let gridSizeDisplay = document.querySelector("#gridSize");
let changeGridSize = document.querySelector("#size");
changeGridSize.addEventListener('click', function() {
    let newSize = prompt("Enter new size: ");
    gridSizeDisplay.textContent = newSize + "x" + newSize;
    container.innerHTML = "";
    for (let i =0; i<newSize*newSize;i++) {
        newSquare = document.createElement('div');
        newSquare.classList.add("squares");
        container.appendChild(newSquare);
        let squareSize = 560 / newSize;
        container.style.gridTemplateColumns = ("repeat(" + newSize + "," + squareSize +"px");
        container.style.gridAutoRows = "minmax(" + squareSize+"px" + "," + squareSize+"px";
    }
    addListeners();
});



let randomColors = document.querySelector("#randomColors");
randomColors.addEventListener('click', function() {
    randomColors.classList.add("clicked");
    transitionColors.classList.remove('clicked');
    black.classList.remove('clicked');
    squares =document.querySelectorAll(".squares");
    squares.forEach(item => {
        item.addEventListener('mouseover', randColor);
    })
    });
function randColor() {
    this.style.backgroundColor = getRandomColor();
    this.removeEventListener('mouseover', helpTransitionColors);
    this.removeEventListener('mouseover', makeBlack);
}
function getRandomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from 0 - 255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from 0 - 255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";

}


let transitionColors = document.querySelector("#transition");
transitionColors.addEventListener('click', function() {
    randomColors.classList.remove("clicked");
    transitionColors.classList.add('clicked');
    black.classList.remove('clicked');
    squares =document.querySelectorAll(".squares");
    squares.forEach(item => {
        item.removeEventListener('mouseover', randColor);
        item.removeEventListener('mouseover', makeBlack);
        item.addEventListener('mouseover', helpTransitionColors);
    });
});
function helpTransitionColors() {
    let currentColor = window.getComputedStyle(this,null).getPropertyValue("background-color");
    console.log(currentColor);
    let matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
    let match = matchColors.exec(currentColor);
    console.log(match);
    match[1] -= 25.5;
    match[2] -= 25.5;
    match[3] -= 25.5;
    this.style.backgroundColor = "rgb(" + match[1] + ", " + match[2] + ", " + match[3] + ")";
  
}


let black = document.querySelector("#black");
black.addEventListener('click', function() {
    black.classList.add('clicked');
    transitionColors.classList.remove('clicked');
    randomColors.classList.remove('clicked');
    squares =document.querySelectorAll(".squares");
    squares.forEach(item => {
        item.removeEventListener('mouseover', randColor);
        item.removeEventListener('mouseover', helpTransitionColors);
        item.addEventListener('mouseover', makeBlack);
    });
});



