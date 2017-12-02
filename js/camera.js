var incX = 2;
var incY = 2;
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
    console.log("fixed ortho");
    camera = new THREE.OrthographicCamera(-10,10,-10,10,-200,200);
    camera.position.set(0,0,100);
    scene.add(camera);
}

function initFixedPerspective()
{
    console.log("fixed per");
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(0,0,100);
    scene.add(camera);
}

function initMovingPerspective()
{
    console.log("moving");
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(car.x + incX, car.y + incY, car.z + incZ);
    scene.add(camera); 
}