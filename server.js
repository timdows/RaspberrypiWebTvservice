var express = require('express');
var app = express();
var exec = require('child_process').exec;

var isDisplayOff = false;

function displayOn() {
	exec("sudo tvservice -p", function (error, stdout, stderr) {
		isDisplayOff = false;
	});
}

function displayOff() {
	exec("sudo tvservice -o", function (error, stdout, stderr) {
		isDisplayOff = true;
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
	console.log('Node js server running on port 3000!')
});