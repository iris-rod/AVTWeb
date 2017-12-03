var scene, camera, renderer, controls;

//objects
var car, table;

//lights
var numCandles = 6;
var candles = new Array(numCandles);

var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

var startTime	= Date.now();
	init();
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

    drawCandles();
    drawAmbientLight();
    table = createTable(100,100);
    car = createCar();
    
    addObject(car);
    addObject(table);
    
    

}

function addObject(obj){
    obj.addToScene(scene);
}

/********************desenhar as point lights**************************/
function drawCandles(){
    for(var i = 0; i < numCandles; i++){
        candles[i] = createPointLight(0xffffff,1,10);
        candles[i].setPosition(Math.random()*50,1,Math.random()*50);
        scene.add(candles[i]);
    }
}

/********************desenhar a directional light ******************************/
function drawAmbientLight(){
    var directional = createDirectionalLight(0xffffff,0.6);
    scene.add(directional);
}

function animate(){

    requestAnimationFrame(animate);
    controls.update();
    checkMovements();
    renderer.render(scene, camera);  
    
    
}

function checkMovements(){
    if(move_front) car.move(DIRECTIONS.FRONT);
    else if(move_back) car.move(DIRECTIONS.BACK);
    if(rot_left) car.rotate(DIRECTIONS.LEFT);
    else if(rot_right) car.rotate(DIRECTIONS.RIGHT);
}


