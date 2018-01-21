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

camera.position.z = 10;

var pointLight = new THREE.SpotLight( 0xffffff, 2.5 );
pointLight.position.y = 25;

pointLight.castShadow = true;
pointLight.angle = 0.8;
// pointLight.penumbra = 2;
// pointLight.decay = 2;
pointLight.distance = 100;
// pointLight.shadow.mapSize.width = 256;
// pointLight.shadow.mapSize.height = 256;

pointLight.castShadow = true;

var flashLight = new THREE.SpotLight( 0xffffff, 1.5 );
flashLight.position = cube.position;
flashLight.castShadow = true;
flashLight.distance = 100;
// pointLight.shadow.mapSize.width = 256;
// pointLight.shadow.mapSize.height = 256;
flashLight.rotation.x += Math.PI / 10;

scene.add( pointLight );

var geometry = new THREE.BoxGeometry( 40, 20, 20 );
var material = new THREE.MeshPhongMaterial( {color: 0x555555, side:THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
plane.receiveShadow = true;
plane.position.y = 8;
plane.rotation.x = Math.PI/2;

scene.add( plane );

var loader = new THREE.OBJLoader();

loader.load(
	// resource URL
	'wii_small.obj',
	// called when resource is loaded
	function ( object ) {

		cube = object;
		scene.add(object);
		object.material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
		object.castShadow = true;
		object.receiveShadow = true;

		object.traverse( function( child ) {
			if( child instanceof THREE.Mesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
				child.material = new THREE.MeshPhongMaterial( { color: 0xffffff } );

				// child.material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false } );
			}
		});

		object.add(flashLight);
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

renderer.render( scene, camera );

// var t = 0;

getPosFromPi();
function getPosFromPi(){
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if (this.responseText) {
				// console.log("Checking format:");
				// console.log(this.responseText);
				try {
					var parts = JSON.parse(this.responseText);
				} catch e {
					return getPosFromPi();
				}
				var m = new THREE.Matrix4();

				// parts[3] /= 10;
				// parts[7] /= 10;
				// parts[11] /= 10;
				// m.set( ...parts, 1, 1, 1, 1 );
				// m.elements = [...parts, 0,0,0,1];

				// cube.matrix.elements = [...parts, 0,0,0,1];
				// cube.matrix = cube.matrix.transpose();
				// cube.matrix.multiply(m);

				//cube.rotation.y += 0.1;
				cube.position.x = parts[3] / 100;
				cube.position.y = parts[7] / 100;
				cube.position.z = parts[11] / 100;

				cube.rotation.x = 0;
				cube.rotation.y = 0;

				cube.rotation.y -= Math.PI / 2;
				cube.rotation.x += Math.PI / 6;

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