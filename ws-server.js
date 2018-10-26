const WebSocket = require('ws');




var is_pause = false;

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

const wss = new WebSocket.Server({ port: 8080 });

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
		d=Math.floor(Math.random() * 100) + 1;
		var timestamp = + new Date();
		var data = '{"ts":'+timestamp.toString()+',"value":'+d.toString()+'}';
		console.log(data);
		/*wss.broadcast = function broadcast(data) {
		  wss.clients.forEach(function each(client) {		
			//if (client.readyState === WebSocket.OPEN) {
			  client.send(data);
			  console.log('sent');
			//}
		  });
		};*/
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
  //ws.send('{ts:0,value:0}');
});

function sendData(ws){
	d=d+1;
	var timestamp = + new Date();
	var data = '{ts:'+timestamp.toString()+',value:'+d.toString()+'}';
    console.log(data);
	/*wss.broadcast = function broadcast(data) {
	  wss.clients.forEach(function each(client) {		
		//if (client.readyState === WebSocket.OPEN) {
		  client.send(data);
		  console.log('sent');
		//}
	  });
	};*/
	ws.send(data);
}
