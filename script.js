
const Player = (name, symbol, color) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    const getColor = () => color;

    return {getName, getSymbol, getColor};
}

const gameBoard = (() => {

    const tiles = document.querySelectorAll(".tile");
    let allTiles = [];
    const currentTurnField = document.querySelector("#currentTurn");
    
    const setUpPlayersTurn = () => {
        currentTurnField.textContent = gameController.getCurrentPlayer().getName() + "'s turn";
        currentTurnField.style.color = gameController.getCurrentPlayer().getColor();
    }

    let index = 0;
    const setupTiles = () => Array.from(tiles).forEach(tile => {
        tile.addEventListener("click", tileClicked);
        tile.setAttribute("data-id", index);
        let position = tile.getAttribute("data-pos");
        allTiles.push(new Tile(tile, index, position));
        index++;
    });

    const endGame = () => {
        Array.from(allTiles).forEach(tile => {
        tile.node.removeEventListener("click", tileClicked);
        tile.node.classList.add("notClickable");
    });
    console.log(gameController.getCurrentPlayer().getName() +  " wins!");
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

    return { setupTiles, setUpPlayersTurn, getSingleTile, endGame };

})();

const gameController = (() => {

    const ROUNDSTOPLAY = 9;
    const player1 = Player("Player 1", "x", "#d4a4d7");
    const player2 = Player("Player 2", "o", "#5d86b4");

    let currentPlayer = player1;

    const turnFinished = (id, symbol) => {
        setCurrentPlayer((getCurrentPlayer() == player1) ? player2 : player1);
    }

    const getCurrentPlayer = () => {
        return currentPlayer;
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

    return { turnFinished, getCurrentPlayer, checkForWinner };
})();

function Tile(node, id, position){
    this.node = node;
    this.id = id;
    this.position = position;
    this.isOccupied = false;
    this.setOccupied = (value) =>{
        this.isOccupied = value;
    }
    this.getIsOccupied = function(){
        return this.isOccupied;
    }
}

gameBoard.setupTiles();
gameBoard.setUpPlayersTurn();


