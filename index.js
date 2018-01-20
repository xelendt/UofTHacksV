var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.matrixAutoUpdate  = false;
cube.updateMatrix();

camera.position.z = 5;

// var t = 0;

getPosFromPi();
function getPosFromPi(){
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if (this.responseText) {
				var parts = this.responseText.split("\n").reduce((acc,line) => {
					return acc.concat(JSON.parse(line))
				},[]);
				var m = new Matrix4();

				m.set( ...parts, 1, 1, 1, 1 );
				cube.matrix.multiply(m);
				cube.updateMatrix();
			}
			getPosFromPi();
		}
	};
	xhttp.open("GET", "http://localhost:8081", true);
	xhttp.send();
}


// function animate() {
// 	requestAnimationFrame( animate );

// 	cube.rotation.x += 0.1;
// 	cube.rotation.y += 0.1;
// 	renderer.render( scene, camera );
// }
// animate();