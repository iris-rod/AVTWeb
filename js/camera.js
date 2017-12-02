var incX = 20;
var incY = 0;
var incZ = 2;

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
    }
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
    scene.add(camera); 
    updateController();
}

//update the camera being used in the controller
function updateController()
{
    controls = new THREE.OrbitControls(camera);
    controls.update();
}