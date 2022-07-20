var second = 0;
    function pad ( value ) { return value > 9 ? value : "0" + value; }
    setInterval( function(){
        document.getElementById("seconds").innerHTML=pad(++second%60);
        document.getElementById("minutes").innerHTML=pad(parseInt(second/60,10));
    }, 1000);


var rows = 4;
var columns = 4;

var currTile;
var otherTile; //blank tile

var turns = 0;

//var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9","10","11","12","13","14","15","16",];

//change to be randomly shuffled at start of each game
var imgOrder = shuffle(["1", "2", "3", "4", "5", "6", "7", "8", "9","10","11","12","13","14","15","16",]);

var hold = Math.floor(Math.random() * 4+1);

function fun1(){
    for (let r=0; r < rows; r++) {
                for (let c=0; c < columns; c++) {
                    
                    //<img id="0-0" src="1.jpg">
                    let tile = document.createElement("img");
                    tile.id = r.toString() + "-" + c.toString();
                    tile.src = "img/"+ hold + imgOrder.shift() + ".jpg";
        
                    //DRAG FUNCTIONALITY
                    tile.addEventListener("dragstart", dragStart);  //click an image to drag
                    tile.addEventListener("dragover", dragOver);    //moving image around while clicked
                    tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
                    tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
                    tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
                    tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles
        
                    document.getElementById("board").append(tile);
                }
            }
}

function fun2(){
    document.getElementById("my_audio").play();
}


var addFunctionOnWindowLoad = function(callback){
      if(window.addEventListener){
          window.addEventListener('load',callback,false);
      }else{
          window.attachEvent('onload',callback);
      }
}

addFunctionOnWindowLoad(fun1);
addFunctionOnWindowLoad(fun2);

function dragStart() {
    currTile = this; //this refers to the img tile being dragged
}
function dragOver(e) {
    e.preventDefault();
}
function dragEnter(e) {
    e.preventDefault();
}
function dragLeave() {
}
function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
}
function dragEnd() {
    if (!otherTile.src.includes("16.jpg")) {
        return;
    }

    let currCoords = currTile.id.split("-"); 
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {

        //swap imgs
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
}

function shuffle(array) {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}