ig.module('game.entities.game-over')
.requires('impact.entity')
.defines(function() {

    EntityGameOver = ig.Entity.extend({

        status: 'win', // or lose
        youLoseImg: new ig.Image('media/you-lose.png'),
        youWinImg: new ig.Image('media/you-win.png'),
        font: new ig.Font( 'media/04b03.font.png' ),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.drawImg = ( this.status === 'win' ? this.youWinImg : this.youLoseImg );
            this.drawX = ( ig.system.width / 2 ) - ( this.drawImg.width / 2 );
            this.drawY = ( ig.system.height / 2 ) - ( this.drawImg.height / 2 );
        },

        update: function() {
            var releasedKey = (
                ig.input.released('up') ||
                ig.input.released('left') ||
                ig.input.released('right') ||
                (ig.game.upTouchArea && ig.game.upTouchArea.released()) ||
                (ig.game.leftTouchArea && ig.game.leftTouchArea.released()) ||
                (ig.game.rightTouchArea && ig.game.rightTouchArea.released())
            );
            if( releasedKey && ig.game.tryAgainTimer.delta() >= 0 ) {

                ig.game.loadLevel( ig.game.firstLevel );

            }
        },

        draw: function() {
            this.drawImg.draw( this.drawX, this.drawY );

            this.font.draw(
                'TRY AGAIN?',
                ig.system.width / 2,
                ig.system.height - this.font.height - 3,
                ig.Font.ALIGN.CENTER
            );
        }
    });
});
