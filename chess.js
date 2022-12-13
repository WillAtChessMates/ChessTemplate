class Game {
    constructor(board) {
        this.board = board;
        this.turn = 'w';
    }

    move(start, end, piece) {
        if (!this.validateMove(start, end, piece)) {
            return false;
        }

        // switch players turn
        if (this.turn == 'w') {
            this.turn = 'b';
        } else {
            this.turn = 'w';
        }

        return true;
    }

    validateMove(start, end, piece) {
        let pieceInfo = piece.split('');
        let startSplit = start.split('');

        // w or b
        let color = pieceInfo[0];
        // P, R, N, B, Q, K
        let type = pieceInfo[1];

        let startFile = startSplit[0];
        let startRank = parseInt(startSplit[1]);

        // check if the piece is the right color for the turn
        if (color != this.turn) {
            return false;
        }

        // check if the piece taking same color piece
        if (this.board.position[end] != undefined && this.board.position[end].includes(color) == true) {
            return false;
        }

        // check if the piece is moving to a square it can move to
        switch (type) {
            case 'P':
                return this.getPawnMoves(startFile, startRank, color).includes(end);

            case 'R':
                return this.getRookMoves(startFile, startRank, color).includes(end);

            case 'N':
                return this.getKnightMoves(startFile, startRank, color).includes(end);

            case 'B':
                return this.getBishopMoves(startFile, startRank, color).includes(end);

            case 'Q':
                return this.getQueenMoves(startFile, startRank, color).includes(end);

            case 'K':
                return this.getKingMoves(startFile, startRank, color).includes(end);

        }

        return true;
    }

    isInCheck(color) {
        return false;
    }

    getPawnMoves(startFile, startRank, color) {
        let moves = [];

        let direction;
        let pawnStartingRank;
        if (color == 'w') {
            direction = 1;
            pawnStartingRank = 2;
        } else {
            direction = -1;
            pawnStartingRank = 7;
        }

        let rankInfront = startRank + direction;

        // check if there is a piece infront of the pawn
        if (this.board.isSquareEmpty(startFile, rankInfront) == true) {
            let joinedSquare = addMove(startFile, rankInfront);
            moves.push(joinedSquare);

            let rankTwoInfront = rankInfront + direction;

            // can pawn move twice?
            if (this.board.isSquareEmpty(startFile, rankTwoInfront) && startRank == pawnStartingRank) {
                joinedSquare = addMove(startFile, rankTwoInfront);
                moves.push(joinedSquare);
            }
        }

        // diagonal moves

        // convert file to column (a -> 1, b -> 2, etc.)
        let columnStart = fileToColumn(startFile);
        let leftColumn = columnStart - 1;
        let rightColumn = columnStart + 1;

        // get the new squares
        let leftSquare = coordToSquare(leftColumn, rankInfront);
        let rightSquare = coordToSquare(rightColumn, rankInfront);

        // get the pieces on those squares
        let leftPiece = this.board.position[leftSquare];
        let rightPiece = this.board.position[rightSquare];

        // check if there is a piece on the square and its the opposite color
        if (leftPiece != undefined && leftPiece.includes(color) == false) {
            moves.push(leftSquare);
        }

        if (rightPiece != undefined && rightPiece.includes(color) == false) {
            moves.push(rightSquare);
        }

        // TODO: en passant

        // TODO: promotion

        return moves;
    }

    getRookMoves(startFile, startRank, color) {
        let moves = [];



        return moves;
    }

    getKingMoves(startFile, startRank, color) {
        let moves = [];

        return moves;
    }

    getBishopMoves(startFile, startRank, color) {
        let moves = [];

        return moves;
    }

    getKnightMoves(startFile, startRank, color) {
        let moves = [];

        // this is one way to implement a knight move, this is an array of arrays (also called a 2d array). Each array is a move the knight can make, relative to it's starting square
        let offsets = [
            [1, 2],
            [2, 1],
            [2, -1],
            [1, -2],
            [-1, -2],
            [-2, -1],
            [-2, 1],
            [-1, 2]
        ];

        // loop over each offset
        for (let i = 0; i < offsets.length; i++) {

            //get the offset
            let fileOffset = offsets[i][0];
            let rankOffset = offsets[i][1];

            // get the new square
            let file = fileToColumn(startFile) + fileOffset;
            let rank = startRank + rankOffset;

            // combine the file and rank to get the square coord
            let square = coordToSquare(file, rank);

            // check if the square is empty or has an enemy piece
            if (this.board.isSquareEmpty(file, rank) || this.board.position[square].includes(color) == false) {
                moves.push(square);
            }
        }

        return moves;
    }

    getQueenMoves(startFile, startRank, color) {
        let moves = [];

        // up
        for (let i = startRank + 1; i <= 8; i++) {
            let square = addMove(startFile, i);
            if (this.board.isSquareEmpty(startFile, i)) {
                moves.push(square);
            } else {
                if (this.board.position[square].includes(color) == false) {
                    moves.push(square);
                }
                break;
            }
        }

        // down
        for (let i = startRank - 1; i >= 1; i--) {
            let square = addMove(startFile, i);
            if (this.board.isSquareEmpty(startFile, i)) {
                moves.push(square);
            } else {
                if (this.board.position[square].includes(color) == false) {
                    moves.push(square);
                }
                break;
            }
        }

        // left

        // right

        // up left

        // up right

        // down left

        // down right


        return moves;
    }
}

function validateFen(fen) {
    // both kings?
    // adds to 64 squares?
    return true;
}

function PGNToFen() {
    return "";
}

function addMove(file, rank) {
    return `${file}${rank}`;
}

function coordToSquare(file, rank) {
    return `${String.fromCharCode(file + 96)}${rank}`;
}

function fileToColumn(file) {
    return file.charCodeAt(0) - 96;
}