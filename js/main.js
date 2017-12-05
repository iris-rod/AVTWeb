var scene, camera, renderer, controls;

//shaders
var uniforms;

//objects
var car, table;

//lights
var numCandles = 6;
var numTotalLights = 9;
var candles = new Array(numCandles);
var directional = null;
var headlightsOn = true, directionalOn = true, candlesOn = true;
var l_posS, l_spotDirS, l_cutoffS, types;

var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

	init();
var startTime	= Date.now();
	animate();
    
function init()
{
    scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(WIDTH, HEIGHT);
	document.body.appendChild(renderer.domElement);
    
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
	camera.position.set(0,0,100);
	scene.add(camera);
    
    controls = new THREE.OrbitControls(camera);
    controls.update();
		
	window.addEventListener('resize', function(){
		var WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight;
		renderer.setSize(WIDTH, HEIGHT);
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
	});
        
    renderer.setClearColor("rgb(120, 0, 200)", 1);

    initCandles();
    initDirectionalLight();
    car = createCar();
    setLightValuesForMaterial();
    table = createTable(100,100);
    
    drawCandles();
    drawDirectionalLight();
    drawObject(car);
    drawObject(table);
    
    

}

function drawObject(obj){
    obj.addToScene(scene);
}

/********************point lights**************************/
function initCandles(){
    for(var i = 0; i < numCandles; i++){
        candles[i] = createPointLight(0xffffff,1,10);
        candles[i].setPosition(Math.random()*50,1,Math.random()*50);
        candles[i].name = "candles";
    }
}

function drawCandles(){
    for(var i = 0; i < numCandles; i++){
        scene.add(candles[i]);
    }
}

/********************desenhar a directional light ******************************/
function initDirectionalLight(){
    directional = createDirectionalLight(0xffffff,0.6);
    directional.name = "directional";
}

function drawDirectionalLight(){
    scene.add(directional);
}

function animate(){

    requestAnimationFrame(animate);
    controls.update();
    checkMovements();
    checkLights();
    renderer.render(scene, camera);  
    
    
}

function remove(name){
    if(name != "headlights")
    scene.remove(scene.getObjectByName(name));
    else car.checkHeadlights(false);
}

function add(name){
    switch(name){
        case "headlights":
            car.checkHeadlights(true);
            break;
        case "directional":
            drawDirectionalLight();
            break;
        case "candles":
            drawCandles();
            break;
    }
}

function checkLights(){
    if(!headlightsOn) remove("headlights");
    else add("headlights");
    if(!directionalOn) remove("directional");
    else add("directional");
    if(!candlesOn) remove("candles");
    else add("candles");
}

function checkMovements(){
    if(move_front) car.move(DIRECTIONS.FRONT);
    else if(move_back) car.move(DIRECTIONS.BACK);
    if(rot_left) car.rotate(DIRECTIONS.LEFT);
    else if(rot_right) car.rotate(DIRECTIONS.RIGHT);
}


