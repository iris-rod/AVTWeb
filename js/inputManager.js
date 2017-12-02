//register events for keydown
document.addEventListener('keydown',checkKeyboardInput, true);

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
    //**whatever**
    }
}