var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera ( 75, aspect, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
// scene.background = THREE.Color();
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh( geometry, material );

var clock = new THREE.Clock();
// scene.add( cube );
camera.position.y = 5;
camera.rotation.x = -90;

var mixer;

var render = function() {
  requestAnimationFrame( render );
  mixer.update( clock.getDelta() );
  //cube.rotation.x += 0.1;
  //cube.rotation.y += 0.1;
  // cube.position.x = Math.cos(time);

  renderer.render( scene, camera );
}

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

var loader = new THREE.GLTFLoader();

loader.load(
  'models/koi-fish-black.gltf',
  function ( gltf ) {
    var koiFish = gltf.scene;
    koiFish.scale.x = 0.5;
    koiFish.scale.y = 0.5;
    koiFish.scale.z = 0.5;
    koiFish.position.y = 0;
    koiFish.position.z = 2;


    scene.add( gltf.scene );
    gltf.animations;
    gltf.scene;
    gltf.scenes;
    gltf.cameras;
    gltf.asset;
    mixer = new THREE.AnimationMixer( gltf.scene );
    mixer.clipAction( gltf.animations[0] ).play();

    render();
  },
  function ( xhr ) {
    console.log( 'Loading' );
  },
  function ( error ) {
    console.log( 'Err: ' + error );
  }
);

// var objectLoader = new THREE.ObjectLoader();
// var mixer;
// objectLoader.load("models/koi-fish-black.json", function( model ){
//   model.scale.x = 0.5;
//   model.scale.y = 0.5;
//   model.scale.z = 0.5;// = new THREE.Vector3(0.001, 0.001, 0.001);
//   model.position.y = 0;
//   model.position.z = 2;
//   scene.add( model );
//   mixer = new THREE.AnimationMixer( model );
//   //mixer.clipAction( model.animations[0] ).play();
//
//   render();
// });
//
// new THREE.MTLLoader()
//   .load(  'models/koi-fish-black.mtl' , function( materials ) {
//     materials.preload();
//     var loader = new THREE.OBJLoader();
//     loader.setMaterials( materials );
//     loader.load("models/koi-fish-black.obj",
//       function ( object ) {
//         object.scale.x = 0.5;
//         object.scale.y = 0.5;
//         object.scale.z = 0.5;// = new THREE.Vector3(0.001, 0.001, 0.001);
//         object.position.y = 0;
//         object.position.z = 2;
//         scene.add( object );
//       },
//       function ( xhr ) {
//         console.log ( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//       },
//       function ( error ) {
//         console.log("ERROR");
//       }
//     );
//   });
