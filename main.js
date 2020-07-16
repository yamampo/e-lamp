var PubNub = require('pubnub')


var five = require("johnny-five");
var board = new five.Board({port: "COM3"});

board.on("ready", function() {
 
    // RGB LED を初期化
 led = new five.Led.RGB({
    pins: { 
    // pin 番号
      red: 6,
      green: 5,
      blue: 3
    }
  });

	    pubnub = new PubNub({
        publishKey : 'pub-c-756ff5ef-8a21-474b-ad11-ce812a9ea63b',
        subscribeKey : 'sub-c-85e7f614-ba7c-11ea-a44f-6e05387a1df4',
        uuid: "myUniqueUUID"
    })
    pubnub.addListener({
        message: function(msg) {
            console.log(msg);
            if(msg === 'on'){led.color({red: 0, blue: 255, green: 0});}
            else if (msg === 'off'){led.color({red: 255, blue: 0, green: 0});}
            else {led.color({red: 170, blue: 210, green: 140});}
            led.on();
        }
    })
    
      pubnub.subscribe({
        channels: ['led-onoff'] 
    });
    

});