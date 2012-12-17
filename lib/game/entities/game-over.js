ig.module('game.entities.game-over')

.requires('impact.entity')

.defines(function() {

    EntityGameOver = ig.Entity.extend({

        status: 'win', // or lose

        youLoseImg: new ig.Image('media/you-lose.png'),

        youWinImg: new ig.Image('media/you-win.png'),

        draw: function() {

            if( this.status === 'win' ) this.youWinImg.draw( 25, 25 );

            else this.youLoseImg.draw( 25, 25 );

        }

    });

});