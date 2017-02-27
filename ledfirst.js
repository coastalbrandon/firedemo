var wpi = require('wiring-pi');

// GPIO address of the led ie. for GPIO0 configPin = 0
var blinkTimeout = 1000;
var configPin = 0;
wpi.setup('wpi');
wpi.pinMode(configPin, wpi.OUTPUT);
var isLedOn = 0;

// Test the LED
setInterval(function() 
{	
  isLedOn = +!isLedOn;	
  //isLedOn = !isLedOn;	
  wpi.digitalWrite(configPin, isLedOn );
  console.log("led status" + isLedOn) ;
}, blinkTimeout);

// Blinking interval in usec

var alertFreq = 5000;
var imageFreq = 240000;
var temperature = 0;
var warmThreshold = 25;
var hotThreshold = 30;
var extremeThreshold = 35;

//Configure all the different states
var state = "CALM";

//Determine which state we're in
switch(state) {
    case "CALM":
        setInterval(function() 
          {	
            console.log(temperature);
          },alertFreq);
        
        if(temperature > warmThreshold){
          state = "WARM";
          console.log("Alert the townspeople... A fire has sparked");
          blinkTimeout = 500;
        }
        break;
    case "WARM":
        setInterval(function() 
          {	
            console.log(temperature);
          },alertFreq);
        if(temperature > hotThreshold){
          state = "HOT";
          console.log("Fire is growing... Evacuate women and children");
          blinkTimeout = 250;
        }
        if(temperature < warmThreshold){
          console.log("Congratulate the soldiers... The fire has withdrawn");
          state = "CALM";
        }
        break;
    case "HOT":
        if(temperature > extremeThreshold){
          console.log("ALERT THE KING! THE TOWN IS BURNING!");
          state = "EXTREME";
          blinkTimeout = 10;
         }
        if(temperature < hotThreshold){
          console.log("The fire is subsiding");
          state = "WARM";
        }
        break;
    case "EXTREME":
        if(temperature < extremeThreshold){
          console.log("Alert the King, the fire has retreated");
          state = "HOT";
        }
        break;
    default:
        //Do nothing
}




