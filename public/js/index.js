'use strict';
(function () {
    var socket = io();
    var player = 1;
    var lineColor = "#ddd";
    var block = 1;
    var canvas = document.getElementById('tic-tac-toe-board');
    var page_id = document.getElementById('page_id').value;
    var context = canvas.getContext('2d');
    var step = 50, steps = 50;
    var canvasSize = 500;
    var sectionSize = canvasSize / 3;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    context.translate(0.5, 0.5);
   socket.on('connect', function (data) {
       console.log('connect');
        socket.emit('storeClientInfo', page_id);
    });
    socket.on('redirect', function(destination) {
    window.location.href = destination;
});
    socket.on('drawing', addPlayingPiece);
    socket.on('player', function (data) {
        player = data;
        block = 1;
    });
    socket.on('restart', function (data) {
        board = getInitialBoard("");
        block = 1;
        context.clearRect(0, 0, canvasSize, canvasSize);
        drawLines(10, lineColor);
    });
    function getInitialBoard(defaultValue) {
        var board = [];

        for (var x = 0; x < 3; x++) {
            board.push([]);

            for (var y = 0; y < 3; y++) {
                board[x].push(defaultValue);
            }
        }

        return board;
    }

    document.getElementById("restart_game").onclick = function () {
        restart()
    };

    function restart() {
        board = getInitialBoard("");
        block = 1;
        player = 1;
        context.clearRect(0, 0, canvasSize, canvasSize);
        drawLines(10, lineColor);
        socket.emit('restart', 1);
        console.log(board);
    }

    var board = getInitialBoard("");
//console.log(board);
    function addPlayingPiece(mouse) {
        var xCordinate;
        var yCordinate;

        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                xCordinate = x * sectionSize;
                yCordinate = y * sectionSize;

                if (
                        mouse.x >= xCordinate && mouse.x <= xCordinate + sectionSize &&
                        mouse.y >= yCordinate && mouse.y <= yCordinate + sectionSize
                        ) {
                    if (board[x][y] == "") {
                        clearPlayingArea(xCordinate, yCordinate);
                        if (block) {


                            if (player === 1) {
                                board[x][y] = -1;
                                drawX(xCordinate, yCordinate);
                            } else {
                                board[x][y] = 1;
                                drawO(xCordinate, yCordinate);
                            }
                            winGame(board);
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        }
    }

    function winGame(board) {
        if (board[0][0] + board[1][1] + board[2][2] === 3) {
            block = 0;
            drawWinLine(10, lineColor, 0, 0, 500, 500);
            //alert("Circle WIN!");
            TextSmallToBig('Circle WIN!');
            socket.emit('o_win', 'o_score');
        } else if (board[0][0] + board[1][1] + board[2][2] === -3) {
            block = 0;
            drawWinLine(10, lineColor, 0, 0, 500, 500);
            //alert("Cross WIN!");
            TextSmallToBig('Cross WIN!');
            socket.emit('x_win', 'x_score');
        }
        if (board[2][0] + board[1][1] + board[0][2] === 3) {
            block = 0;
            drawWinLine(10, lineColor, 0, 500, 500, 0);
            //alert("Circle WIN!");
            TextSmallToBig('Circle WIN!');
            socket.emit('o_win', 'o_score');
        } else if (board[2][0] + board[1][1] + board[0][2] === -3) {
            block = 0;
            drawWinLine(10, lineColor, 0, 500, 500, 0);
            //alert("Cross WIN!");
            TextSmallToBig('Cross WIN!');
            socket.emit('x_win', 'x_score');
        }
        //---------------------------------------------------
        if (board[0][0] + board[1][0] + board[2][0] === 3) {
            block = 0;
            drawWinLine(10, lineColor, 0, 84, 500, 84);
            //alert("Circle WIN!");
            TextSmallToBig('Circle WIN!');
            socket.emit('o_win', 'o_score');
        } else if (board[0][0] + board[1][0] + board[2][0] === -3) {
            block = 0;
            drawWinLine(10, lineColor, 0, 84, 500, 84);
            //alert("Cross WIN!");
            TextSmallToBig('Cross WIN!');
            socket.emit('x_win', 'x_score');
        }
        if (board[0][1] + board[1][1] + board[2][1] === 3) {
            block = 0;
            drawWinLine(10, lineColor, 0, 250, 500, 250);
            //alert("Circle WIN!");
            TextSmallToBig('Circle WIN!');
            socket.emit('o_win', 'o_score');
        } else if (board[0][1] + board[1][1] + board[2][1] === -3) {
            block = 0;
            drawWinLine(10, lineColor, 0, 250, 500, 250);
            //alert("Cross WIN!");
            TextSmallToBig('Cross WIN!');
            socket.emit('x_win', 'x_score');
        }
        if (board[0][2] + board[1][2] + board[2][2] === 3) {
            block = 0;
            drawWinLine(10, lineColor, 0, 415, 500, 415);
            //alert("Circle WIN!");
            TextSmallToBig('Circle WIN!');
            socket.emit('o_win', 'o_score');
        } else if (board[0][2] + board[1][2] + board[2][2] === -3) {
            block = 0;
            drawWinLine(10, lineColor, 0, 415, 500, 415);
            //alert("Cross WIN!");  
            TextSmallToBig('Cross WIN!');
            socket.emit('x_win', 'x_score');
        }
//------------------------------------------------------
        if (board[0][0] + board[0][1] + board[0][2] === 3) {
            block = 0;
            drawWinLine(10, lineColor, 84, 0, 84, 500);
            //alert("Circle WIN!");
            TextSmallToBig('Circle WIN!');
            socket.emit('o_win', 'o_score');
        } else if (board[0][0] + board[0][1] + board[0][2] === -3) {
            block = 0;
            drawWinLine(10, lineColor, 84, 0, 84, 500);
            //alert("Cross WIN!"); 
            TextSmallToBig('Cross WIN!');
           socket.emit('x_win', 'x_score');
        }
        if (board[1][0] + board[1][1] + board[1][2] === 3) {
            block = 0;
            drawWinLine(10, lineColor, 250, 0, 250, 500);
            //alert("Circle WIN!");
            TextSmallToBig('Circle WIN!');
            socket.emit('o_win', 'o_score');
        } else if (board[1][0] + board[1][1] + board[1][2] === -3) {
            block = 0;
            drawWinLine(10, lineColor, 250, 0, 250, 500);
            //alert("Cross WIN!");   
            TextSmallToBig('Cross WIN!');
            socket.emit('x_win', 'x_score');
        }
        if (board[2][0] + board[2][1] + board[2][2] === 3) {
            block = 0;
            drawWinLine(10, lineColor, 415, 0, 415, 500);
            //alert("Circle WIN!");
            TextSmallToBig('Circle WIN!');
            socket.emit('o_win', 'o_score');
        } else if (board[2][0] + board[2][1] + board[2][2] === -3) {
            block = 0;
            drawWinLine(10, lineColor, 415, 0, 415, 500);
            //alert("Cross WIN!");   
            TextSmallToBig('Cross WIN!');
            socket.emit('x_win', 'x_score');
        }
        var result=1;
         for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                if(board[x][y]==""){
                    result=0;
                }
            }
        }
        if(result==1){
            TextSmallToBig('DRAW!');
            socket.emit('score', 'draw');
        }
        //---------------------------------------------------         
    }

    function TextSmallToBig(msg) {
        step++;
        context.fillStyle = "blue";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        context.font = step + "pt Helvetica";
        context.fillText(msg, 0, 0);
        context.restore();
        if (step < steps)
            var t = setTimeout(TextSmallToBig(msg), 20);
    }

    function clearPlayingArea(xCordinate, yCordinate) {
        context.fillStyle = "#fff";
        context.fillRect(
                xCordinate,
                yCordinate,
                sectionSize,
                sectionSize
                );
    }
    function drawO(xCordinate, yCordinate) {
        var halfSectionSize = (0.5 * sectionSize);
        var centerX = xCordinate + halfSectionSize;
        var centerY = yCordinate + halfSectionSize;
        var radius = (sectionSize - 100) / 2;
        var startAngle = 0 * Math.PI;
        var endAngle = 2 * Math.PI;

        context.lineWidth = 10;
        context.strokeStyle = "#01bBC2";
        context.beginPath();
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.stroke();
    }

    function drawX(xCordinate, yCordinate) {
        context.strokeStyle = "#f1be32";

        context.beginPath();

        var offset = 50;
        context.moveTo(xCordinate + offset, yCordinate + offset);
        context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);

        context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
        context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

        context.stroke();
    }

    function drawWinLine(lineWidth, strokeStyle, x1, x2, y1, y2) {
        context.lineWidth = lineWidth;
        context.lineCap = 'round';
        context.strokeStyle = lineColor;
        context.beginPath();
        context.moveTo(x1, x2);
        context.lineTo(y1, y2);
        context.stroke();
    }

    function drawLines(lineWidth, strokeStyle) {
        var lineStart = 4;
        var lineLenght = canvasSize - 5;
        context.lineWidth = lineWidth;
        context.lineCap = 'round';
        context.strokeStyle = strokeStyle;
        context.beginPath();

        /*
         * Horizontal lines 
         */
        for (var y = 1; y <= 2; y++) {
            context.moveTo(lineStart, y * sectionSize);
            context.lineTo(lineLenght, y * sectionSize);
        }

        /*
         * Vertical lines 
         */
        for (var x = 1; x <= 2; x++) {
            context.moveTo(x * sectionSize, lineStart);
            context.lineTo(x * sectionSize, lineLenght);
        }

        context.stroke();
    }

    drawLines(10, lineColor);

    function getCanvasMousePosition(event) {
        var rect = canvas.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }

    canvas.addEventListener('mouseup', function (event) {
        if (block) {
            if (player === 1) {
                player = 2;
            } else {
                player = 1;
            }
            socket.emit('player', player);
            var canvasMousePosition = getCanvasMousePosition(event);
            var res = addPlayingPiece(canvasMousePosition);
            socket.emit('drawing', canvasMousePosition);
            if (res) {
                block = 0;
            }
            drawLines(10, lineColor);
        }
    });

})();

