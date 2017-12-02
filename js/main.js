var scene, camera, renderer, controls;

//objects
var car, table;

var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

var startTime	= Date.now();
	init();
	animate();
    
function init()
{
    scene = new THREE.Scene();
 
    console.log(WIDTH);
    console.log(HEIGHT);
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
    var light = new THREE.PointLight(0xffffff,1,5000);
	light.position.set(5, 2, 0);
	scene.add(light);    

    table = createTable();
    car = createCar();
    addObject(car);
    addObject(table);

}

function addObject(obj){
    obj.addToScene(scene);
}

/********************desenhar o carro**************************/


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


