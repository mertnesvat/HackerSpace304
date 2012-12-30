function JBCountDown(settings) {
    var glob = settings;

    function deg(deg) {
        return (Math.PI/180)*deg - (Math.PI/180)*90
    }

	glob.seconds = (glob.endDate - glob.now) % 60;
	glob.minutes = Math.floor((glob.endDate - glob.now) / 60) % 60;
	glob.hours = Math.floor((glob.endDate - glob.now) / 3600) % 24;
	glob.days = Math.floor((glob.endDate - glob.now) / 86400);

	glob.total = Math.floor((glob.endDate - glob.startDate) / 86400);


    if (glob.now >= glob.endDate) {
        glob.timesUp();

        return;
    }

	function deneme(canvas_id, color, shadow_color, percent) {
		var canvas = $("#"+canvas_id).get(0);

		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.strokeStyle = color;

		ctx.shadowBlur    = 10;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowColor = shadow_color;

		ctx.arc(94,94,85, deg(0), deg(360*(1-percent)));
		ctx.lineWidth = 17;
		ctx.stroke();

	}

	function update(u) {
		deneme("canvas_seconds", glob.secondsColor, glob.secondsGlow, glob.seconds/60);
		$(".clock_seconds .val").text(glob.seconds);

		if (u & 0x1) {
			deneme("canvas_minutes", glob.minutesColor, glob.minutesGlow, glob.minutes/60);
			$(".clock_minutes .val").text(glob.minutes);
		}
		if (u & 0x2) {
			deneme("canvas_hours", glob.hoursColor, glob.hoursGlow, glob.hours/24);
			$(".clock_hours .val").text(glob.hours);
		}
		if (u & 0x4) {
			deneme("canvas_days", glob.daysColor, glob.daysGlow, glob.days/glob.total);
			$(".clock_days .val").text(glob.days);
		}
	}

    function start() {
		var countDown = setInterval(function() {
			var u = 0;

			glob.seconds--;
			if (glob.seconds < 0) {
				glob.minutes--;
				glob.seconds = 60;
				u |= 0x1;
			}
			if (glob.minutes < 0) {
				glob.hours--;
				glob.minutes = 60;
				u |= 0x2;
			}
			if (glob.hours < 0) {
				glob.days--;
				glob.hours = 24;
				u |= 0x4;
			}
		
			
			if(glob.days < 0)
			{
				clearInterval(countDown);
				glob.timesUp();
				
			}
			
			update(u);

		}, 1000);
	}

	update(0x7);
	start();

}