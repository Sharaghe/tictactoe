
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
        currentTurnField.textContent = gameController.getCurrentPlayer().getName();
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

    const endGame = () => Array.from(allTiles).forEach(tile => {
        tile.node.removeEventListener("click", tileClicked);
        tile.node.classList.add("notClickable");
    });

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

        if(checkRows()){
            console.log(currentPlayer.getName() + " wins");
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
                return true;
            }     
            
        }
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


