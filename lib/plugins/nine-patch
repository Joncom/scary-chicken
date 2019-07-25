ig.module( 'plugins.nine-patch' )
.requires( 'impact.image' )
.defines(function(){

    ig.NinePatch = ig.Class.extend({

        width: 0,
        height: 0,
        image: null,

        left: 0,
        top: 0,
        right: 0,
        bottom: 0,

        init: function( path, settings ) {
            if(settings.width) {
                this.width = settings.width;
            }
            if(settings.height) {
                this.height = settings.height;
            }
            this.left = settings.left;
            this.top = settings.top;
            this.right = settings.right;
            this.bottom = settings.bottom;
            if(path) {
                this.image = new ig.Image( path );
            }
        },

        draw: function( x, y ) {
            if( !this.image || !this.image.loaded ) { return; }

            var targetX, targetY, sourceX, sourceY, width, height;

            // top-left
            if( this.left > 0 && this.top > 0 ) {
                targetX = x;
                targetY = y;
                sourceX = 0;
                sourceY = 0;
                width = this.left;
                height = this.top;
                this.image.draw( targetX, targetY, sourceX, sourceY, width, height );
            }

            // top-middle
            if( this.top > 0 ) {
                var fillWidth = this.width - this.left - this.right;
                var filled = 0;
                while( filled < fillWidth ) {
                    targetX = x + this.left + filled;
                    targetY = y;
                    sourceX = this.left;
                    sourceY = 0;
                    width = Math.min( this.image.width - this.left - this.right, fillWidth - filled );
                    height = this.top;
                    this.image.draw( targetX, targetY, sourceX, sourceY, width, height );
                    filled += width;
                }
            }

            // top-right
            if( this.right > 0 && this.top > 0 ) {
                targetX = x + this.width - this.right;
                targetY = y;
                sourceX = this.image.width - this.right;
                sourceY = 0;
                width = this.right;
                height = this.top;
                this.image.draw( targetX, targetY, sourceX, sourceY, width, height );
            }

            // bottom-left
            if( this.left > 0 && this.bottom > 0 ) {
                targetX = x;
                targetY = y + this.height - this.bottom;
                sourceX = 0;
                sourceY = this.image.height - this.bottom;
                width = this.left;
                height = this.bottom;
                this.image.draw( targetX, targetY, sourceX, sourceY, width, height );
            }

            // bottom-middle
            if( this.bottom > 0 ) {
                var fillWidth = this.width - this.left - this.right;
                var filled = 0;
                while( filled < fillWidth ) {
                    targetX = x + this.left + filled;
                    targetY = y + this.height - this.bottom;
                    sourceX = this.left;
                    sourceY = this.image.height - this.bottom;
                    width = Math.min( this.image.width - this.left - this.right, fillWidth - filled );
                    height = this.bottom;
                    this.image.draw( targetX, targetY, sourceX, sourceY, width, height );
                    filled += width;
                }
            }

            // bottom-right
            if( this.right > 0 && this.bottom > 0 ) {
                targetX = x + this.width - this.right;
                targetY = y + this.height - this.bottom;
                sourceX = this.image.width - this.right;
                sourceY = this.image.height - this.bottom;
                width = this.bottom;
                height = this.right;
                this.image.draw( targetX, targetY, sourceX, sourceY, width, height );
            }

            // left-middle
            if( this.left > 0 ) {
                var fillHeight = this.height - this.top - this.bottom;
                var filled = 0;
                while( filled < fillHeight ) {
                    targetX = x;
                    targetY = y + this.top + filled;
                    sourceX = 0;
                    sourceY = this.top;
                    width = this.left;
                    height = Math.min( this.image.height - this.top - this.bottom, fillHeight - filled );
                    this.image.draw( targetX, targetY, sourceX, sourceY, width, height );
                    filled += height;
                }
            }

            // right-middle
            if( this.right > 0 ) {
                var fillHeight = this.height - this.top - this.bottom;
                var filled = 0;
                while( filled < fillHeight ) {
                    targetX = x + this.width - this.right;
                    targetY = y + this.top + filled;
                    sourceX = this.image.width - this.right;
                    sourceY = this.top;
                    width = this.left;
                    height = Math.min( this.image.height - this.top - this.bottom, fillHeight - filled );
                    this.image.draw( targetX, targetY, sourceX, sourceY, width, height );
                    filled += height;
                }
            }

            // center
            if( true ) {
                var fillWidth = this.width - this.left - this.right;
                var fillHeight = this.height - this.top - this.bottom;
                sourceX = this.left;
                sourceY = this.top;
                // FIXME: Convert this into a single draw (stretched) instead of looping
                for( var filledHeight = 0; filledHeight < fillHeight; ) {
                    height = Math.min( this.image.height - this.top - this.bottom, fillHeight - filledHeight );
                    for( var filledWidth = 0; filledWidth < fillWidth; ) {
                        width = Math.min( this.image.width - this.left - this.right, fillWidth - filledWidth );
                        targetX = x + this.left + filledWidth;
                        targetY = y + this.top + filledHeight;
                        this.image.draw( targetX, targetY, sourceX, sourceY, width, height );
                        filledWidth += width;
                    }
                    filledHeight += height;
                }
            }
        }
    });

});
