ig.module('game.entities.clock')
.requires('impact.entity')
.defines(function() {

    EntityClock = ig.Entity.extend({

        // Load a font
        font: new ig.Font( 'media/04b03.font.black.clock.png' ),
        timer: new ig.Timer(),
        started: false,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
        },

        start: function() {
            this.started = true;
            this.timer.set(0);
        },

        update: function() {
            if( !this.started ) {
                this.drawText = '00:00:00';
            } else {

                // Calculate clock.
                var totalSeconds = this.timer.delta();

                var minutes = Math.floor(totalSeconds / 60).toString();
                if( minutes.length === 1 ) minutes = '0' + minutes;
                totalSeconds -= (minutes * 60);

                var seconds = Math.floor(totalSeconds).toString();
                if( seconds.length === 1 ) seconds = '0' + seconds;

                var decimal = (totalSeconds - seconds).toString();

                // Take the 2 digits after the period.
                decimal = decimal[2] + decimal[3];
                this.timeString = minutes + ':' + seconds + ':' + decimal;
                this.drawText = this.timeString;
            }

            // Display highscore also if one is known.
            if( ig.game.highscore ) this.drawText = "Highscore: " + ig.game.highscore + "\n" + this.drawText;
        },

        draw: function() {
            this.font.draw(this.drawText, ig.system.width - 10, 10, ig.Font.ALIGN.RIGHT);
        }
    });
});
