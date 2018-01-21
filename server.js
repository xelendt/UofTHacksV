var http = require("http");
var spawn = require("child_process").spawn;

var data = "";
var line = 0;
var newM = ""

// var proc = spawn('ssh', ['pi@raspberrypi.local', '"while [ 1 ]; do cat ~/mypose; done"'])
// var proc = spawn('ssh', ['-tt', 'pi@raspberrypi.local'])
var proc = spawn('ssh', ['-tt', 'pi@raspberrypi.local', '-n', 'LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:/usr/local/lib /home/pi/uofthacks18/custom_tracking/tracker'])
proc.stdout.on("data", d => {
	if (d.toString().trim().length == 0) {
		return;
	}
	try {
		var str = d.toString().trim().replace(/\]\[/g,",");
		var parts = JSON.parse(str);
	} catch e {
		return;
	}
	if (parts.length === 12) {
		data = str;
	}
	console.log(data);
	console.log("- - -");
	// var lines = data.split("\n");
	// if (lines.length >= 3) {
	// 	newM = lines.splice(0,3).join("\n")
	// 		console.log(newM);

	// 	data = lines.join("\n")
	// }
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