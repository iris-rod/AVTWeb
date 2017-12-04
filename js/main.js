var scene, camera, renderer, controls;
var car, light;
var stereoOn = false;
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
        light = new THREE.PointLight(0xffffff);
		light.position.set(0, 0, 0);
		scene.add(light);    
        //var floor = createQuad(10,10);
        //scene.add(floor);
        var car = createCar();
        addObject(car);
  
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
  //controls.update();
    updateHUD();
    
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


