var incX = 0;
var incY = 0;
var incZ = 20;

function initCameraType(cameraToInit)
{
    switch(cameraToInit){
            case(cameraType.FIX_ORTHO):
                initFixedOrtho();
                break;
            case(cameraType.FIX_PERSP):
                initFixedPerspective();
                break;
            case(cameraType.MOV_PERSP):
                initMovingPerspective();
                break;
            case(cameraType.STEREO):
                initStereo();
                break;
    }
  if(cameraToInit == cameraType.STEREO)
    StereoCameraEnabled();
  else 
    StereoCameraDisabled();
}

function initFixedOrtho()
{
    camera = new THREE.OrthographicCamera(-10,10,-10,10,-200,200);
    camera.position.set(0,0,100);
    scene.add(camera);
    updateController();
}

function initFixedPerspective()
{
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(0,0,100);
    scene.add(camera);
    updateController();
}

function initMovingPerspective()
{
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(car.getCarX() + incX, car.getCarY() + incY,car.getCarZ() - incZ);
    camera.lookAt( car.getCarX() + incX, car.getCarY() + incY, car.getCarZ() + incZ);
    scene.add(camera); 
    updateController();
}

function initStereo()
{
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 20000 );
    camera.position.set(0,0,100);
  
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor("rgb(30, 30, 30)", 1);
    document.body.appendChild( renderer.domElement );

    effect = new THREE.StereoEffect( renderer );
    effect.setSize( window.innerWidth, window.innerHeight ); 
  
    updateController();
}
//update the camera being used in the controller
function updateController()
{
    controls = new THREE.OrbitControls(camera);
    controls.update();
}

function StereoCameraEnabled() { stereoOn = true; }
function StereoCameraDisabled() { stereoOn = false; }