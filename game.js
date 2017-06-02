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

    // Map object
    var map = [];

    this.initMap = function() {
        // Clear map array
        map = [];

        // Fill with 0
        for (var i = 0; i < height; i++) {
            map[i] = [];

            for (var j = 0; j < width; j++)
                map[i][j] = 0;
        }
    }

    // Place snake
    this.createSnake = function() {
        map[Math.floor(height/2)][Math.floor(width/2)] = 2;
        map[Math.floor(height/2)][Math.floor(width/2 + 1)] = 1;
        map[Math.floor(height/2)][Math.floor(width/2 + 2)] = 1;
    }

    this.updatePoints = function() {
        $('#gamepoints').html('Points: ' + this.points);
    }

    this.redrawGfx = function() {
        // Iterate over whole map
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                if (map[y][x] == 1) {
                    // Draw snake segment
                    ctx.fillStyle = '#6ab558';
                    ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                } else if (map[y][x] == 2) {
                    // Draw snake head
                    ctx.fillStyle = '#b1d5a8';
                    ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                } else if (map[y][x] == 3) {
                    // Draw food
                    ctx.fillStyle = '#d74626';
                    ctx.arc(x * this.tileSize + this.tileSize / 2, y * this.tileSize + this.tileSize / 2, this.tileSize / 4, 0, 2 * Math.PI, false);
                    ctx.fill();
                }
            }
        }
    }

    this.newFood = function() {
        // If snake covers whole map, don't try to find empty space
        if (this.points >= width * height)
            return false;

        // Repeat until find free space
        while (true) {
            var px = Math.floor(Math.random() * width);
            var py = Math.floor(Math.random() * height);

            if (map[py][px] == 0) {
                map[py][px] = 3;
                return [px, py];
            }
        }
    }

    this.start = function() {
        this.initMap();
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
