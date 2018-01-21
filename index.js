var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x020202, 1 );
document.body.appendChild( renderer.domElement );
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
cube.matrixAutoUpdate  = false;
cube.updateMatrix();

camera.position.z = 5;

var pointLight = new THREE.SpotLight( 0xffffff, 0.5 );
pointLight.position.y = 10;


var loader = new THREE.OBJLoader();

loader.load(
	// resource URL
	'wii_small.obj',
	// called when resource is loaded
	function ( object ) {

		cube = object;
		scene.add(object);
		object.material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );

		object.traverse( function( child ) {
			if( child instanceof THREE.Mesh ) {
				child.material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );
			}
		});
		// object.position.z = ;
		// console.log(scene);
		// animate();

		renderer.render( scene, camera );
	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

// renderer.render( scene, camera );

// var t = 0;

getPosFromPi();
function getPosFromPi(){
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if (this.responseText) {
				console.log("Checking format:");
				console.log(this.responseText);
				var parts = JSON.parse(this.responseText.replace(/\]\[/g,","));
				var m = new THREE.Matrix4();

				parts[3] /= 10;
				parts[7] /= 10;
				parts[11] /= 10;
				// m.set( ...parts, 1, 1, 1, 1 );
				cube.matrix.elements = [...parts, 0,0,0,1];
				cube.matrix = cube.matrix.transpose();
				// console.log(...parts, 1,1,1,1);
				console.log(cube.matrix);
				// cube.position.x = parts[3];
				// cube.matrix.multiply(m);
				// cube.matrix = m;
				// cube.updateMatrix();
				renderer.render(scene, camera);
			}
			getPosFromPi();
		}
	};
	xhttp.open("GET", "http://localhost:8081", true);
	xhttp.send();
}


function animate() {
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.1;
	cube.rotation.y += 0.1;
	// cube.updateMatrix();
	renderer.render( scene, camera );

	// console.log(scene);
}
// animate();