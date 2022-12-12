class Board {
    constructor(id, onMove = undefined) {
        this.position = {};
        this.boardId = id;
        this.selectedPiece = null;
        var board = this;
        var boardContainer = $(`#${id}`);
        this.dropTarget = null;
        this.onMove = onMove;
        this.agent = new Game(this);
        this.pieceImages = {
            "wP": "https://chessmates.com.au/wp-content/uploads/wP.png",
            "wN": "https://chessmates.com.au/wp-content/uploads/wN.png",
            "wB": "https://chessmates.com.au/wp-content/uploads/wB.png",
            "wR": "https://chessmates.com.au/wp-content/uploads/wR.png",
            "wQ": "https://chessmates.com.au/wp-content/uploads/wQ.png",
            "wK": "https://chessmates.com.au/wp-content/uploads/wK.png",
            "bP": "https://chessmates.com.au/wp-content/uploads/bP.png",
            "bN": "https://chessmates.com.au/wp-content/uploads/bN.png",
            "bB": "https://chessmates.com.au/wp-content/uploads/bB.png",
            "bR": "https://chessmates.com.au/wp-content/uploads/bR.png",
            "bQ": "https://chessmates.com.au/wp-content/uploads/bQ.png",
            "bK": "https://chessmates.com.au/wp-content/uploads/bK.png"
        };
        for (let i = 0; i < 8; i++) {
            let row = $("<div class='row'></div>");
            for (let j = 0; j < 8; j++) {
                let square = $(`<div class='square ${((i + j) % 2 == 0 ? "white-square" : "black-square")}' data-coord='${`${String.fromCharCode(i + 1 + 96)}${8 - j}`}'></div>`);

                square.on("dragover", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    board.dropTarget = this;
                });

                row.append(square);
            }
            boardContainer.append(row);

        }

        boardContainer.on("touchmove", function (e) {
            e.preventDefault();
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            var x = touch.pageX - boardContainer.offset().left;
            var y = touch.pageY - boardContainer.offset().top;
            $(".square").each(function (i, square) {
                if (square.offsetLeft <= x && square.offsetLeft + square.offsetWidth >= x && square.offsetTop <= y && square.offsetTop + square.offsetHeight >= y) {
                    board.dropTarget = square;
                }
            });
        });
    }

    // select piece when clicked
    selectPiece(piece) {
        this.selectedPiece = piece;
    }

    deselectPiece() {
        this.selectedPiece = null;
    }

    isSquareEmpty(square) {
        return this.position[square] == undefined || this.position[square] == null;
    }

    isSquareEmpty(file, rank) {
        console.log('this');
        return this.position[`${file}${rank}`] == undefined || this.position[`${file}${rank}`] == null;
    }

    getPieceOnSquare(square) {
        return this.position[square];
    }

    getPieceOnSquare(file, rank) {
        return this.position[`${file}${rank}`];
    }

    movePiece(square) {
        if (this.selectedPiece != null && this.selectedPiece != undefined) {
            if (this.onMove != undefined) {
                if (!this.onMove(this.selectedPiece.parentElement.dataset.coord, square)) {
                    return;
                }
            }
            if (!this.agent.move(this.getPieceCoord(this.selectedPiece), square.dataset.coord, this.position[this.getPieceCoord(this.selectedPiece)])) {
                return;
            }
            $(square).empty();
            this.position[square.dataset.coord] = this.position[this.getPieceCoord(this.selectedPiece)];
            delete this.position[this.getPieceCoord(this.selectedPiece)];
            square.appendChild(this.selectedPiece);
            console.table(this.position);
            this.deselectPiece();
        }
    }

    setPosition(fen, validateFen) {
        if (validateFen) {
            if (!this.validateFen(position)) {
                return;
            }
        }
        let rows = fen.split("/");
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i].split("");
            let j = 0;
            while (j < row.length) {
                let skips = parseInt(row[j]);
                if (isNaN(skips)) {
                    this.position[`${String.fromCharCode(j + 1 + 96)}${8 - i}`] = ((row[j].toUpperCase() == row[j]) ? "w" : "b") + row[j].toUpperCase();
                } else {
                    j += skips;
                }
                j++;
            }
        }
        this.updateBoard();
    }

    placePiece(pieceType, pieceColor, square) {
        this.position[square] = pieceColor + pieceType;
        this.updateBoard();
    }

    removePiece(square) {
        delete this.position[square];
        this.updateBoard();
    }

    getPieceCoord(piece) {
        return piece.parentElement.dataset.coord;
    }

    updateBoard() {
        var board = this;
        $(`#${this.boardId}`).children().each(function (i, row) {
            $(row).children().each(function (j, square) {
                if (square.dataset.coord in board.position) {
                    if ($(square).children().length == 0) {
                        let img = $(`<img id='draggable' src='${board.pieceImages[board.position[square.dataset.coord]]}'>`);
                        img.on("dragstart touchstart", function (e) {
                            board.selectPiece(this);
                        });

                        img.on("dragend touchend", function (e) {
                            if (board.dropTarget != null || board.dropTarget != undefined) {
                                board.movePiece(board.dropTarget);
                            }
                        });
                        $(square).append(img);
                    }
                } else {
                    $(square).empty();
                }
            });
        });
    }
}