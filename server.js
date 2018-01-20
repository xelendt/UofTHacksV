var http = require("http");
var spawn = require("child_process").spawn;


var data = "";
// var proc = spawn('ssh', ['pi@raspberrypi.local', '"while [ 1 ]; do cat ~/mypose; done"'])
var proc = spawn('ssh', ['-tt', 'pi@raspberrypi.local'])
proc.stdout.on("data", d => {
	console.log(d.toString());
	if (d.indexOf("asdfsda") > -1){
		data = d.substring(d.indexOf("asdfsda"));
	} else {
		data += d;
	}
});
proc.stderr.on("data",data => {
	console.log(data.toString())
})
proc.on("exit",console.log)
setInterval(() => {
	proc.stdin.write("cat ~/mypose;\n");
},1000)

var port = process.env.PORT || 8081

http.createServer((req,res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.end(data.toString())
}).listen(port,() => {
	console.log("Server running at http://localhost:" + port)
})