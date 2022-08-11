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

    const getSingleTile = (id) => {
        return allTiles.find((element) => element.id == id);
    }

    return { setupTiles, getSingleTile };

})();

gameBoard.setupTiles();

function Tile(node, id){
    this.node = node;
    this.id = id;
    this.isOccupied = false;
    this.setOccupied = (value) => {
        this.isOccupied = value;
    }
    this.getOccupied = () => {
        return this.isOccupied;
    }
}

function tileClicked(e){
    let clickedID = e.target.getAttribute("data-id");
    targetTile = gameBoard.getSingleTile(clickedID);
    console.log(targetTile);
}