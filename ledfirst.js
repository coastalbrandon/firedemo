var wpi = require('wiring-pi');

// GPIO address of the led ie. for GPIO0 configPin = 0
var configPin = 0;

// Blinking interval in usec
var configTimeout = 1000;

wpi.setup('wpi');
wpi.pinMode(configPin, wpi.OUTPUT);

var isLedOn = 0;

setInterval(function() 
{	
  isLedOn = +!isLedOn;	
  //isLedOn = !isLedOn;	
  wpi.digitalWrite(configPin, isLedOn );
  console.log("led status" + isLedOn) ;
}, configTimeout);
