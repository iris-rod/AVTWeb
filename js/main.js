var scene, camera, renderer;
var car;
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
		
		window.addEventListener('resize', function(){
			var WIDTH = window.innerWidth,
				HEIGHT = window.innerHeight;
			renderer.setSize(WIDTH, HEIGHT);
			camera.aspect = WIDTH / HEIGHT;
			camera.updateProjectionMatrix();
		});
        
        renderer.setClearColor("rgb(120, 0, 200)", 1);
        var light = new THREE.PointLight(0xffffff);
		light.position.set(-100, 200, 100);
		scene.add(light);    
    

        var floor = createQuad(10,10);
        scene.add(floor);
}

/********************desenhar o carro**************************/
function drawCar(){
    var cube = createCube(10,10,10);
}


function animate(){

    requestAnimationFrame(animate);
	var dtime	= Date.now() - startTime;
    renderer.render(scene, camera);   
    
}

//*****************************CAMERA****************************/


