function Game(ctx, width = 20, height = 15) {
    // Get context
    this.ctx = ctx;

    // Calculate graphics
    this.screenW = ctx.canvas.width;
    this.screenH = ctx.canvas.height;
    this.tileW = this.screenW / width;
    this.tileH = this.screenH / height;

    if (this.tileW != this.tileH) {
        console.error('Tile is not square!');
    } else {
        this.tileSize = this.tileW;
    }

    // Game statistics
    this.points = 0;

    // Game variables
    this.speed = 800;
    this.direction = 'left';
    this.newDirection = this.direction;
    this.length = 3;

    var snake = [];
    var foodPos = [];
    var timer;

    this.createSnake = function() {
        // Reset existing segments
        snake = [];

        // Center of the screen
        var w = Math.floor(width/2);
        var h = Math.floor(height/2);

        // Add 3 segments
        snake.push(
            [w, h],
            [w + 1, h],
            [w + 2, h]
        );
    }

    this.updatePoints = function() {
        $('#gamepoints').html('Points: ' + this.points);
    }

    this.drawFood = function() {
        ctx.fillStyle = '#d74626';

        var x = foodPos[0];
        var y = foodPos[1];

        ctx.arc(x * this.tileSize + this.tileSize / 2, y * this.tileSize + this.tileSize / 2, this.tileSize / 4, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    this.redrawGfx = function() {
        // Clear screen
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, this.screenW, this.screenH);

        // Iterate over snake segments
        for (var i in snake) {
            if (i == 0)
                ctx.fillStyle = '#b1d5a8';
            else
                ctx.fillStyle = '#6ab558';

            var x = snake[i][0];
            var y = snake[i][1];
            ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
        }

        // Draw food
        this.drawFood();
    }

    this.newFood = function() {
        // If snake covers whole map, don't try to find empty space
        if (this.points >= width * height)
            return false;

        // Repeat until find free space
        var px;
        var py;
        var loop;

        do {
            loop = false;

            px = Math.floor(Math.random() * width);
            py = Math.floor(Math.random() * height);

            for (var i in snake) {
                if (snake[i][0] == px && snake[i][1] == py) {
                    loop = true;
                    break;
                }
            }

        } while(loop);

        foodPos = [px, py];
        return foodPos;
    }

    this.makeMove = function() {
        // Calculate new head position
        var pos = [ snake[0][0] , snake[0][1] ];

        this.direction = this.newDirection;
        switch (this.direction) {
            case 'up': pos[1] -= 1; break;
            case 'down': pos[1] += 1; break;
            case 'left': pos[0] -= 1; break;
            case 'right': pos[0] += 1; break;
            default: break;
        }

        // Add new element on front
        snake.unshift(pos);

        // Remove last snake element
        snake.pop();

        // Redraw
        this.redrawGfx();

        // Recall
        timer = setTimeout(function() { this.makeMove() }.bind(this), this.speed);
    }

    this.startMoving = function() {
        timer = setTimeout(function() { this.makeMove(); }.bind(this), this.speed);
    }

    this.keypressed = function(e) {
        if (e.keyCode == 38 && this.direction != 'down')
            this.newDirection = 'up';
        else if (e.keyCode == 39 && this.direction != 'left')
            this.newDirection = 'right';
        else if (e.keyCode == 40 && this.direction != 'up')
            this.newDirection = 'down';
        else if (e.keyCode == 37 && this.direction != 'right')
            this.newDirection = 'left';
    }

    this.start = function() {
        // Create snake
        this.createSnake();

        // Create new food in random place
        this.newFood();

        // Initial draw
        this.redrawGfx();

        // Register keyboard hook
        document.addEventListener('keydown', function(e) { this.keypressed(e); }.bind(this));

        // Start ticking
        this.startMoving();
    }
}

$(document).ready(function() {
    // Grab required objects
    var c = $('#snake');
    var ctx = c[0].getContext('2d');

    // Set canvas dimensions
    ctx.canvas.width = c.width();
    ctx.canvas.height = c.height();

    // Game object
    var g = new Game(ctx);

    // Start game
    g.start();
});
