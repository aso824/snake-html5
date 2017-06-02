function Game(ctx, width = 20, height = 15) {
    // Get context
    this.ctx = ctx;

    // Game statistics
    this.points = 0;

    // Game variables
    this.speed = 800;
    this.direction = 'right';

    // Init map
    var map = [];
    for (var i = 0; i < height; i++) {
        map[i] = [];

        for (var j = 0; j < width; j++)
            map[i][j] = 0;
    }

    this.updatePoints = function() {
        $('#gamepoints').html('Points: ' + this.points);
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

});
