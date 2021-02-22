# RaspberrypiWebTvservice

This node.js service can turn the connected HDMI screen on/off via a web call

## Blog
https://timdows.com/projects/raspberry-pi-web-tvservice/

## To install:
```
git clone https://github.com/timdows/RaspberrypiWebTvservice
cd RaspberrypiWebTvservice
npm install
node server.js
```

## Usage
Simply call 
- ip:3000/display-on
- ip:3000/display-off 
- ip:3000/display-on-timer
- ip:3000/countdown.json
