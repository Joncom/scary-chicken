ig.module('game.entities.arrow')
.requires(
    'impact.entity'
)
.defines(function(){

    EntityArrow = ig.Entity.extend({

        size: { x: 18, y: 18 },
        gravityFactor: 0,
        animSheet: new ig.AnimationSheet( 'media/arrows.png', 20, 20 ),
        offset: { x: 1, y: 1 },

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('left', 1, [0]);
            this.addAnim('right', 1, [1]);
            this.addAnim('down', 1, [2]);
            this.addAnim('up', 1, [3]);
            this.addAnim('alt-left', 1, [4]);
            this.addAnim('alt-right', 1, [5]);
            this.addAnim('alt-down', 1, [6]);
            this.addAnim('alt-up', 1, [7]);
        }
    });

});
