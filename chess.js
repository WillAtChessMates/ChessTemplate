class Game {
    constructor(board) {
        this.board = board;
    }

    move(start, end, piece) {
        if (!this.validateMove(start, end, piece)) {
            return false;
        }

        // switch players turn


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


        // check if the piece taking same color piece



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

        return moves;
    }

    getQueenMoves(startFile, startRank, color) {
        let moves = [];

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
    return String.fromCharCode(file + 96);
}