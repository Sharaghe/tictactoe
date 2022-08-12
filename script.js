
const Player = (name, symbol, color) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    const getColor = () => color;

    return {getName, getSymbol, getColor};
}

const gameBoard = (() => {

    const tiles = document.querySelectorAll(".tile");
    let allTiles = [];

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
        markTile(targetTile);
        gameController.turnFinished();
    }

    const markTile = (targetTile) =>{
        if(!targetTile.isOccupied){
            targetTile.node.textContent = gameController.getCurrentPlayer().getSymbol();
        }
    }
    
    const isEmpty = (tileContent) =>{
        return tileContent != "x" && tileContent != "o";
    }

    const getSingleTile = (id) => {
        return allTiles.find((element) => element.id == id);
    }

    return { setupTiles, getSingleTile, isEmpty };

})();

const gameController = (() => {

    const ROUNDSTOPLAY = 9;
    const player1 = Player("Player 1", "x", "blue");
    const player2 = Player("Player 2", "o", "red");

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
    const setOccupied = (value) => {
        this.isOccupied = value;
    }
    const isOccupied = () => {
        return this.isOccupied;
    }


}

gameBoard.setupTiles();
