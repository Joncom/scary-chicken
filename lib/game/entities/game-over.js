ig.module('game.entities.game-over')

.requires('impact.entity')

.defines(function() {

    EntityGameOver = ig.Entity.extend({

        status: 'win', // or lose

        youLoseImg: new ig.Image('media/you-lose.png'),

        youWinImg: new ig.Image('media/you-win.png'),

        draw: function() {

            if( this.status === 'win' ) youWinImg.draw( 25, 25 );

            else youLoseImg.draw( 25, 25 );

        }

    });

});