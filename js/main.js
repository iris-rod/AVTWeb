var scene, camera, renderer, controls;
var car, light;
var collidableMeshList = [];
var stereoOn = false;
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;
var xmov= 0;

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
        light = new THREE.PointLight(0xffffff);
		light.position.set(0, 0, 0);
		scene.add(light);    
        var floor = createQuad(20,20);
        floor.position.set(0, 0, -5);
        //floor.setPosition(-10, 10, 10);
        scene.add(floor);
        collidableMeshList.push(floor);
        car = createCar();
        addObject(car);
  
        /*StereoCameraEnabled(); 
        initStereo();
  */
        initHUD();
        setFog();
       
}

function addObject(obj){
    obj.addToScene(scene);
}

/********************desenhar o carro**************************/

function setFog()
{
   scene.fog = new THREE.Fog(0xffffff, 0, 500);
   scene.fog.color.setHSL( 0.4, 0.4, 0.4 ); //fogColor
}

function animate(){

    requestAnimationFrame(animate);
    if(stereoOn)
      renderForStereo();  
    else
      renderForNonStereo();
    controls.update();
    updateHUD();
    checkCollisions();
  //updateCarStereo();
    
}

function checkCollisions()
{
	var originPoint = car.body.position
	
	for (var vertexIndex = 0; vertexIndex < car.body.geometry.vertices.length; vertexIndex++)
	{		
		var localVertex = car.body.geometry.vertices[vertexIndex].clone();
		var globalVertex = localVertex.applyMatrix4( car.body.matrix );
		var directionVector = globalVertex.sub( car.body.position ); 
		
		var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
		var collisionResults = ray.intersectObjects( collidableMeshList );
		if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
			console.log("hit");
	}
}

function updateCarStereo()
{
  xmov += 0.01;
  car.move(DIRECTIONS.FRONT);
  car.setRotation(0, xmov, xmov);
}

function renderForStereo()
{
  camera.lookAt( light.position);//car.globalPos );
  effect.render( scene, camera );
}

function renderForNonStereo()
{
  renderer.render(scene, camera); 
}
/********************HUD display**************************/
function initHUD()
{
  document.getElementById("numberOfLives").innerHTML = initialNumberOfLives;
  document.getElementById("numberOfPoints").innerHTML = initialNumberOfPoints;
  
  LivesLeft = initialNumberOfLives;
  currentPoints = initialNumberOfPoints;
  
}

//talvez usar listener
function updateHUD()
{
  //document.addEventListener()
}


