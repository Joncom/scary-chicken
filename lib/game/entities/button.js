ig.module('game.entities.button')
.requires(
    'impact.entity',
    'plugins.multitouch'
)
.defines(function(){

    EntityButton = ig.Entity.extend({

        gravityFactor: 0,
        size: { x: 16, y: 16 },

        defaultScale: 1,
        hoverScale: 2,
        targetScale: 1,
        currentScale: 1,
        active: false, // TODO: rename to hoverActive or something

        update: function() {

            // hover detection
            this.active = this.state();

            // handle click
            if( this.released() ) {
                this.onClick();
            }

            // tween scale when hovered over
            this.currentScale += (this.targetScale - this.currentScale) * 0.6;
            if(this.active) {
                this.targetScale = this.currentScale = this.hoverScale;
            } else {
                this.targetScale = this.defaultScale;
            }
            if(this.currentAnim) {
                this.currentAnim.scale.x = this.currentAnim.scale.y = this.currentScale;
            }

            this.parent();
        },

        overlapsTouchPoint: function(touchPoint) {
            var minX = this.pos.x - ig.game.screen.x;
            var maxX = minX + this.size.x;
            var minY = this.pos.y - ig.game.screen.y;
            var maxY = minY + this.size.y;
            return (
                touchPoint.x >= minX &&
                touchPoint.x < maxX &&
                touchPoint.y >= minY &&
                touchPoint.y < maxY
            );
        },

        onClick: function() {},

        state: function() {
            for ( var t in ig.input.touches ) {
                var touchPoint = ig.input.touches[t];
                if( this.overlapsTouchPoint( touchPoint ) ) {
                    if( touchPoint.state === 'down' ) {
                        return true;
                    }
                }
            }
            return false;
        },

        released: function() {
            for ( var t in ig.input.touches ) {
                var touchPoint = ig.input.touches[t];
                if( this.overlapsTouchPoint( touchPoint ) ) {
                    if( touchPoint.state === 'up' ) {
                        return true;
                    }
                }
            }
            return false;
        }
    });

});