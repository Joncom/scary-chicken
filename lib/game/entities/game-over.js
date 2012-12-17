ig.module('game.entities.game-over')

.requires('impact.entity')

.defines(function() {

    EntityGameOver = ig.Entity.extend({

        status: 'win', // or lose

        youLoseImg: new ig.Image('media/you-lose.png'),

        youWinImg: new ig.Image('media/you-win.png'),

        // Load a font
        font: new ig.Font( 'media/04b03.font.black.png' ),

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            this.drawImg = ( this.status === 'win' ? this.youWinImg : this.youLoseImg );

            this.drawX = ( ig.system.width / 2 ) - ( this.drawImg.width / 2 );

            this.drawY = ( ig.system.height / 2 ) - ( this.drawImg.height / 2 );

        },

        update: function() {

            if( ig.input.pressed('space') ) {

                ig.game.loadLevel( ig.game.firstLevel );

            }

        },

        draw: function() {

            this.drawImg.draw( this.drawX, this.drawY );

            this.font.draw(

                'Press SPACE to play again.',

                ig.system.width / 2,

                ( ig.system.height / 2 ) + this.drawImg.height,

                ig.Font.ALIGN.CENTER

            );

        }

    });

});