var express = require('express');
var cors = require('cors');
var app = express();
var exec = require('child_process').exec;

app.use(cors());

var isDisplayOff = false;

function displayOn() {
	exec("vcgencmd display_power 1", function (error, stdout, stderr) {
		console.log("Executed vcgencmd display_power 1");
		isDisplayOff = false;
	});
}

function displayOff() {
	exec("vcgencmd display_power 0", function (error, stdout, stderr) {
		console.log("Executed vcgencmd display_power 0");
		isDisplayOff = true;
	});
}

function disableScreenBlanking() {
	exec ("export DISPLAY=:0 && xset s off && xset s noblank && xset -dpms && xset dpms 0 0 0", function (error, stdout, stderr) {
		console.log("Disabled screen blanking");
	});
}

app.get('/display-off', function (req, res) {
	displayOff();
	res.send("Executed display off");
});
app.get('/display-on', function (req, res) {
	displayOn();
	res.send("Executed display on");
});

// On for 15 minutes by default
var countdown = 900;
var interval = setInterval(() => {
	if (--countdown <= 0) {
		// Turn off it is on
		if (!isDisplayOff) {
			displayOff();
		}
	}
}, 1000);

app.get('/display-on-timer', function (req, res) {
	countdown = 300;
	// Only turn on when its off
	if (isDisplayOff) {
		displayOn();
	}
	res.send("Executed");
});

app.get('/countdown.json', function (req, res) {
	res.send({countdown});
});

app.listen(3000, function () {
	disableScreenBlanking();
	console.log('Node js server running on port 3000!')
});