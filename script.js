
const Player = (name, symbol, color) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    const getColor = () => color;

    return {getName, getSymbol, getColor};
}

const gameBoard = (() => {

    const playerScreen = document.querySelector(".credentials");
    const board = document.querySelector(".board");

    const tiles = document.querySelectorAll(".tile");
    let allTiles = [];
    const currentTurnField = document.querySelector("#currentTurn");
    const startGameForm = document.querySelector("#startGame");

    const inputs = {
        p1: document.querySelector("input#p1"),
        p2: document.querySelector("input#p2"),
        c1: document.querySelector("input#c1"),
        c2: document.querySelector("input#c2")
    };
    
    const setUpPlayersTurn = () => {
        currentTurnField.textContent = gameController.getCurrentPlayer().getName() + "'s turn";
        currentTurnField.style.color = gameController.getCurrentPlayer().getColor();
    }

    let index = 0;
    const setupTiles = () => Array.from(tiles).forEach(tile => {
        tile.addEventListener("click", tileClicked);
        tile.setAttribute("data-id", index);
        allTiles.push(new Tile(tile, index));
        index++;
    });

    const endGame = () => {
        Array.from(allTiles).forEach(tile => {
        tile.node.removeEventListener("click", tileClicked);
        tile.node.classList.add("notClickable");
    });
    declareWinner();
    }

    const declareWinner = () =>{
        currentTurnField.textContent = gameController.getCurrentPlayer().getName() + " wins!";
    }

    const tileClicked = (e) =>{
        let clickedID = e.target.getAttribute("data-id");
        targetTile = gameBoard.getSingleTile(clickedID);
        if(markTile(targetTile)){
            if(gameController.checkForWinner()){
                endGame();
            } else {
                gameController.turnFinished();
                setUpPlayersTurn();
            }
        }
    }

    const markTile = (targetTile) =>{
        if(!targetTile.getIsOccupied()){
            targetTile.node.textContent = gameController.getCurrentPlayer().getSymbol();
            targetTile.node.classList.add("notClickable");
            targetTile.node.style.color = gameController.getCurrentPlayer().getColor();
            targetTile.setOccupied(true);
            return true;
        }
        return false;
    }

    const getSingleTile = (id) => {
        return allTiles.find((element) => element.id == id);
    }

    const startGame = (e) => {
        e.preventDefault();
        gameController.createPlayer(inputs.p1.value, "x", inputs.c1.value);
        gameController.createPlayer(inputs.p2.value, "o", inputs.c2.value);
        gameController.startGame();
        makeBoardVisible();
    }

    const makeBoardVisible = () => {
        playerScreen.style.display = "none";
        board.style.display = "block";
    }

    startGameForm.addEventListener("submit", startGame);

    return { setupTiles, setUpPlayersTurn, getSingleTile, endGame };

})();

const gameController = (() => {

    const ROUNDSTOPLAY = 9;

    let currentPlayer;
    let players = [];

    const turnFinished = () => {
        setCurrentPlayer((getCurrentPlayer() == players[0]) ? players[1] : players[0]);
    }

    const startGame = () => {
        gameBoard.setupTiles();
        gameBoard.setUpPlayersTurn();   
    }

    const createPlayer = (username, symbol, color) => {
        players.push(Player(username, symbol, color))
    }

    const getCurrentPlayer = () => {
        return currentPlayer || players[0];
    }

    const setCurrentPlayer = (player) => {
        currentPlayer = player;
    }

    const checkForWinner = () => {

        if(checkRows() || checkColumns() || checkDiagonals()){
            return true;
        }

        return false;
    }

    const checkRows = () => {

        for (let j = 0; j < 7; j = j + 3) {

            let rows = [];
            for (let i = 0 + j; i < 3 + j; i++) {
                rows.push(gameBoard.getSingleTile(i));
            }

            if(rows.filter((element) => element.node.textContent == "o").length >2 
            || rows.filter((element) => element.node.textContent == "x").length >2){
                highlight(rows);
                return true;
            }     
            
        }
    }

    const checkColumns = () => {

        for (let j = 0; j < 3; j++) {

            let cols = [];
            for (let i = 0 + j; i < 9; i = i + 3) {
                cols.push(gameBoard.getSingleTile(i));
            }

            if(cols.filter((element) => element.node.textContent == "o").length >2 
            || cols.filter((element) => element.node.textContent == "x").length >2){
                highlight(cols);
                return true;
            }     
            
        }
    }

    const checkDiagonals = () => {

            let diagonals1 = [];
            for (let i = 0; i < 9; i = i + 4) {
                diagonals1.push(gameBoard.getSingleTile(i));
            }

            let diagonals2 = [];
            for (let i = 2; i < 7; i = i + 2) {
                diagonals2.push(gameBoard.getSingleTile(i));
            }

            if(diagonals1.filter((element) => element.node.textContent == "o").length >2 
            || diagonals1.filter((element) => element.node.textContent == "x").length >2
            ){
                highlight(diagonals1);
                return true;
            }   

            if(diagonals2.filter((element) => element.node.textContent == "o").length >2 
            || diagonals2.filter((element) => element.node.textContent == "x").length >2){
                highlight(diagonals2);
                return true;
            }     
    }

    const highlight = (lines) => {
        lines.forEach(element => {
            element.node.classList.add("highlight");
        });
    }

    return { turnFinished, getCurrentPlayer, checkForWinner, createPlayer, startGame };
})();

function Tile(node, id){
    this.node = node;
    this.id = id;
    this.isOccupied = false;
    this.setOccupied = (value) =>{
        this.isOccupied = value;
    }
    this.getIsOccupied = function(){
        return this.isOccupied;
    }
}




