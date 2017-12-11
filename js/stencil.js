// originally from
// http://jsfiddle.net/g29k91qL/4/
// inspired by the hints in (webgl calls in threejs)
// https://github.com/mrdoob/three.js/issues/7785

var scene, sceneStencil, camera, renderer, clock;
var controls;
var box, plane;

init();
animate();

function init() {

  var planeGeometry, planeMaterial;
  var boxGeometry, boxMaterial;
  var index;

  scene = new THREE.Scene();
  sceneStencil = new THREE.Scene();

  clock = new THREE.Clock();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 10;

  planeGeometry = new THREE.PlaneGeometry(2, 5);

  // set colorWrite to "true" to see the area/shapes of the stencil test
  planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    colorWrite: true,  // works for r73 (not r70)
    depthWrite: false
  });

  for (index = 0; index < 5; index++) {
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.x = -10 + (5 * index);
    sceneStencil.add(plane);
  }

  boxGeometry = new THREE.BoxGeometry(2, 2, 2);
  boxMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
  });

  box = new THREE.Mesh(boxGeometry, boxMaterial);
  scene.add(box);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor (0x888888);

  renderer.autoClear = false;
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  document.body.appendChild(renderer.domElement);
	
  window.addEventListener('resize', onWindowResize, false);
}

function animate() {

  requestAnimationFrame(animate);
  controls.update();
  renderer.clear();
	
  // animate the box
  box.position.x = Math.cos(clock.getElapsedTime()) * 10;

  var gl = renderer.context;

  // enable stencil test
  gl.enable(gl.STENCIL_TEST);
  //renderer.state.setStencilTest( true );

  // config the stencil buffer to collect data for testing
  gl.stencilFunc(gl.ALWAYS, 1, 0xff);
  gl.stencilOp(gl.REPLACE, gl.REPLACE, gl.REPLACE);

	// render shape for stencil test
  renderer.render(sceneStencil, camera);
  
  // set stencil buffer for testing
  gl.stencilFunc(gl.EQUAL, 1, 0xff);
  gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);

  // render actual scene
  renderer.render(scene, camera);

  // disable stencil test
  gl.disable(gl.STENCIL_TEST);
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}