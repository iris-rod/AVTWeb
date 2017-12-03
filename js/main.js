var scene, camera, renderer, controls;
var car;
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
        var light = new THREE.PointLight(0xffffff);
		light.position.set(0, 0, 0);
		scene.add(light);    
        //var floor = createQuad(10,10);
        //scene.add(floor);
        var car = createCar();
        addObject(car);
  
      initHUD();
}

function addObject(obj){
    obj.addToScene(scene);
}

/********************desenhar o carro**************************/


function animate(){

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera); 
    updateHUD();
    
}

function initHUD()
{
  document.getElementById("numberOfLives").innerHTML = initialNumberOfLives;
  document.getElementById("numberOfPoints").innerHTML = initialNumberOfPoints;
  
  LivesLeft = initialNumberOfLives;
  currentPoints = initialNumberOfPoints;
  
}

//talvez user listener
function updateHUD()
{
  //document.addEventListener()
}


