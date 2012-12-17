ig.module('game.entities.game-over')

.requires('impact.entity')

.defines(function() {

    EntityGameOver = ig.Entity.extend({

        status: 'win', // or lose

        youLoseImg: new ig.Image('media/you-lose.png'),

        youWinImg: new ig.Image('media/you-win.png'),

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            this.drawImg = ( this.status === 'win' ? this.youWinImg : this.youLoseImg );

            this.drawX = ( ig.system.width / 2 ) - ( this.drawImg.width / 2 );

            this.drawY = ( ig.system.height / 2 ) - ( this.drawImg.height / 2 );

        },

        draw: function() {

            this.drawImg.draw( this.drawX, this.drawY );

        }

    });

});