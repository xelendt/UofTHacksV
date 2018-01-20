var http = require("http");
var spawn = require("child_process").spawn;

var data = "";
var line = 0;
var newM = ""

// var proc = spawn('ssh', ['pi@raspberrypi.local', '"while [ 1 ]; do cat ~/mypose; done"'])
// var proc = spawn('ssh', ['-tt', 'pi@raspberrypi.local'])
var proc = spawn('ssh', ['-tt', 'pi@raspberrypi.local', '-n', 'LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:/usr/local/lib /home/pi/uofthacks18/custom_tracking/tracker'])
proc.stdout.on("data", d => {
	var lines = d.toString().split("\n");
	lines.forEach(l => {
		newM += l;
		line++;
		if (line === 3) {
			data = newM;
			newM = "";
		}
	})
});
proc.stderr.on("data",data => {
	console.log(data.toString())
})
proc.on("exit",console.log)

var port = process.env.PORT || 8081

http.createServer((req,res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.end(data);
}).listen(port,() => {
	console.log("Server running at http://localhost:" + port)
})