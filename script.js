
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
        allTiles.push(new Tile(tile, index));
        index++;
    });

    const tileClicked = (e) =>{
        let clickedID = e.target.getAttribute("data-id");
        targetTile = gameBoard.getSingleTile(clickedID);
        if(markTile(targetTile)){
            gameController.turnFinished();
            setUpPlayersTurn();
        }
    }

    const markTile = (targetTile) =>{
        if(!targetTile.getIsOccupied()){
            targetTile.node.textContent = gameController.getCurrentPlayer().getSymbol();
            targetTile.node.style.color = gameController.getCurrentPlayer().getColor();
            targetTile.setOccupied(true);
            return true;
        }
        return false;
    }
    
    const isEmpty = (tileContent) =>{
        return tileContent != "x" && tileContent != "o";
    }

    const getSingleTile = (id) => {
        return allTiles.find((element) => element.id == id);
    }

    return { setupTiles, setUpPlayersTurn, getSingleTile, isEmpty };

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

    }

    return { turnFinished, getCurrentPlayer, checkForWinner };
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

gameBoard.setupTiles();
gameBoard.setUpPlayersTurn();
