var http = require("http");
var spawn = require("child_process").spawn;


var data = "";
var proc = spawn('ssh', ['pi@raspberrypi.local', 'ls -R;', 'exit'])
proc.stdout.on("data", d => {
	data += d;
});


var port = process.env.PORT || 8081

http.createServer((req,res) => {
	res.end(data)
}).listen(port,() => {
	console.log("Server running at http://localhost:" + port)
})