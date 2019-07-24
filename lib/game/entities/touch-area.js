ig.module('game.entities.touch-area')
.requires(
    'game.entities.arrow',
    'game.entities.button',
    'plugins.animation-scaling'
)
.defines(function(){

    var validActions = ['left', 'right', 'up'];

    EntityTouchArea = EntityButton.extend({

        action: null,
        arrow: null,
        margin: 10,
        padding: 5,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            if( validActions.indexOf( this.action ) === -1 ) {
                throw 'EntityTouchArea must have a valid action: ' + validActions.join('/');
            }

            this.arrow = new EntityArrow(0, 0);
            this.arrow.currentAnim = this.arrow.anims['alt-' + this.action];
            this.arrow.currentAnim.alpha = 0.75;
        },

        update: function() {
            this.parent();

            var anim = this.arrow.currentAnim;
            anim.scale.x = anim.scale.y = this.currentScale;
        },

        updateArrowPosition: function() {
            if(this.action === 'left') {
                this.arrow.pos.x = this.pos.x + this.size.x - this.arrow.size.x - this.padding - 2;
                this.arrow.pos.y = this.pos.y + this.size.y - this.arrow.size.y - this.margin;
            } else if(this.action === 'right') {
                this.arrow.pos.x = this.pos.x + this.padding;
                this.arrow.pos.y = this.pos.y + this.size.y - this.arrow.size.y - this.margin;
            } else if(this.action === 'up') {
                this.arrow.pos.x = this.pos.x + this.size.x - this.arrow.size.x - this.margin;
                this.arrow.pos.y = this.pos.y + this.size.y - this.arrow.size.y - this.padding - 2;
            } else if(this.action === 'down') {
                this.arrow.pos.x = this.pos.x + this.size.x - this.arrow.size.x - this.margin;
                this.arrow.pos.y = this.pos.y + this.padding;
            }
        },

        draw: function() {
            this.parent();

            this.updateArrowPosition();
            this.arrow.draw();
        }
    });

});