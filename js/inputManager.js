//register events for keydown
document.addEventListener('keydown',checkKeyboardInput, true);
document.addEventListener('keyup',checkKeyboardOutput, true);


//variables to move car
var move_front = false;
var move_back = false;
var rot_left = false;
var rot_right = false;

//redirects the input key pressed to call the appropriate function
function checkKeyboardInput(keyPressed)
{
    console.log(keyPressed.code);
    switch(keyPressed.code){
    //cameras    
        case("Digit1"):     //fixed ortho camera
            initCameraType(cameraType.FIX_ORTHO);
            break;
        case("Digit2"):     //fixed perspective camera
            initCameraType(cameraType.FIX_PERSP);
            break;
        case("Digit3"):     //moving perspective camera
            initCameraType(cameraType.MOV_PERSP);
            break;
    //car
        case("KeyQ"):
            move_front = true;
            move_back = false;
            break;
        case("KeyA"):
            move_front = false;
            move_back = true;
            break;
        case("KeyP"):
            rot_left = false;
            rot_right = true;
            break;
        case("KeyO"):
            rot_left = true;
            rot_right = false;
            break;
    }
}



function checkKeyboardOutput(keyUp)
{
    console.log(keyUp.code);
    switch(keyUp.code){
    //car
        case("KeyQ"):
            move_front = false;
            move_back = false;
            //car.move(DIRECTIONS.FRONT);
            break;
        case("KeyA"):
            move_front = false;
            move_back = false;
            //car.move(DIRECTIONS.BACK);
            break;
        case("KeyP"):
            rot_left = false;
            rot_right = false;
            //car.rotate(DIRECTIONS.RIGHT);
            break;
        case("KeyO"):
            rot_left = false;
            rot_right = false;
            //car.rotate(DIRECTIONS.LEFT);
            break;
    }
}