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

            var hours = Math.floor(totalSeconds / 60 / 60).toString();

            if( hours.length === 1 ) hours = '0' + hours;

            totalSeconds -= (hours * 60 * 60);

            var minutes = Math.floor(totalSeconds / 60).toString();

            if( minutes.length === 1 ) minutes = '0' + minutes;

            totalSeconds -= (minutes * 60);

            var seconds = Math.floor(totalSeconds).toString();

            if( seconds.length === 1 ) seconds = '0' + seconds;

            var decimal = (totalSeconds - seconds).toString();

            // Take the 2 digits after the period.
            decimal = decimal[2] + decimal[3];

            this.timeString = hours + ':' + minutes + ':' + seconds + ':' + decimal;

        },

        draw: function() {

            this.font.draw(this.timeString, ig.system.width - 50, 3, ig.Font.ALIGN.RIGHT);

        }

    });

});