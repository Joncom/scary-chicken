ig.module('game.entities.clock')

.requires('impact.entity')

.defines(function() {

    EntityClock = ig.Entity.extend({

        // Load a font
        font: new ig.Font( 'media/04b03.font.black.png' ),

        timer: new ig.Timer(),

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            this.timer.pause();

            this.timer.set(0);

        },

        update: function() {

            this.parent();

            // Calculate clock.

            var totalSeconds = this.timer.delta();

            var hours = Math.floor(totalSeconds / 60 / 60);

            totalSeconds -= (hours * 60 * 60);

            var minutes = Math.floor(totalSeconds / 60);

            totalSeconds -= (minutes * 60);

            var seconds = Math.floor(totalSeconds);

            var decimal = totalSeconds - seconds;

            this.timeString = hours + ':' + minutes + ':' + seconds + ':' + decimal;

        },

        draw: function() {

            this.font.draw(this.timeString, ig.system.width - 3, 3, ig.Font.ALIGN.RIGHT);

        }

    });

});