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
    this.length = 3;

    var snake = [];
    var foodPos = [];

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

    this.start = function() {
        this.createSnake();
        this.newFood();
        this.redrawGfx();
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
