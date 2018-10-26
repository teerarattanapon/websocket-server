const WebSocket = require('ws');


var is_pause = false;

//keyboard key press
const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    if(key.name==='p')
	{
		is_pause = true;
	}
	if(key.name==='s')
	{
		is_pause = false;
	}
  }
});
//keyboard key press

//start websocket server
const wss = new WebSocket.Server({ port: 8080 });

//timer
var t1on = false;
var t1;
var d=0;

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  
  if(!t1on)
  {
	  t1 = setInterval(function(){
		t1on = true;
		//d=Math.floor(Math.random() * 100) + 1;
		d=d+1;
		if(d>100)
			d=0;
		
		var timestamp = + new Date();
		var data = '{"ts":'+timestamp.toString()+',"value":'+d.toString()+'}';
		console.log(data);

		console.log('Press \'p\' for pause, \'s\' for continue/start');
		if (ws.readyState === WebSocket.OPEN) {
			if(!is_pause)
			{
			  ws.send(data);	  	 
			  console.log('sent');
			}
		}	
	  },1000);
  }
});
//start websocket server

