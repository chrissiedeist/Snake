Array.prototype.contains = function(obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function Board() {
	this.rows = this.createBlankBoard();

}

Board.prototype.createBlankBoard = function() {
	rows = new Array(8);
	rows.forEach( function(el, i) {
		rows[i] = new Array(8);
	});

	return this.setInitialPieces(rows);
}

Board.prototype.setInitialPieces = function(rows) {
	rows[3][3] = new Piece("b")
	rows[4][4] = new Piece("b")
	rows[4][3] = new Piece("w")
	rows[3][4] = new Piece("w")
	return rows;
}

Board.prototype.inRange = function(rowIdx, colIdx) {
	return !(rowIdx > 7 || rowIdx < 0 || colIdx > 7 || colIdx < 0);
}

Board.prototype.openSpace = function(rowIdx, colIdx) {
	return !!this.rows[rowIdx][colIdx];
}

Board.prototype.wonPieces = function(rowIdx, colIdx, opponentPlayer) {
	var matrix = [[0,1],[1,1],[1,0],[1,-1],[-1,0],[-1,-1],[-1,0],[-1,1]];

	var wonPieces = [];
	for (var i = 0; i < matrix.length; i++) {
		var currentWonPieces = [];
		var foundSameColor = false;

		var newPieceR = rowIdx + matrix[i][0]
		var newPieceC = colIdx + matrix[i][1]];

		while (!foundSameColor) {
			if (this.rows[newPieceR][newPieceC].color === opponentPlayer) {
				currentWonPieces.push([newPieceR, newPieceC]);
				newPieceR = rowIdx + matrix[i][0]
				newPieceC = colIdx + matrix[i][1]];
			} else if (this.inRange(newPieceR, newPieceC) && !this.openSpace) {
				foundSameColor = true;
				wonPieces += currentWonPieces;
			} else {
				break;
			}
		}
	}

	return wonPieces
}

Board.prototype.validMove = function(rowIdx, colIdx, opponentPlayer) {
	return this.inRange(rowIdx, colIdx) &&
				 this.openSpace(rowIdx, colIdx) &&
				 this.wonPieces(rowIdx, colIdx, opponentPlayer).length;
}

function Game(board) {
	this.board = board;
	this.currentPlayer = "w"
}

Game.prototype.placePiece = function(rowIdx, colIdx) {
	if (this.board.validMove(rowIdx, colIdx, this.opponentPlayer)) {
		this.board.rows[rowIdx][colIdx] = new Piece(this.currentPlayer);
		this.changeTurn;
	} else {
		console.log("Invalid Move!");
	}
}

Game.prototype.opponentPlayer = function() {
	return (this.currentPlayer === "w") ? "b" : "w";
}

Game.prototype.changeTurn = function() {
	this.currentPlayer = this.opponentPlayer;
}

function Piece(color) {
	this.color = color;
}



