var scene, camera, renderer;
var car;
var startTime	= Date.now();
	init();
	animate();
    
function init()
{
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
 
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
	cube.rotation.x += 0.02;
	cube.rotation.y += 0.0225;
	cube.rotation.z += 0.0175;
	

	var dtime	= Date.now() - startTime;
	cube.scale.x	= 1.0 + 0.3*Math.sin(dtime/300);
	cube.scale.y	= 1.0 + 0.3*Math.sin(dtime/300);
	cube.scale.z	= 1.0 + 0.3*Math.sin(dtime/300);
    renderer.render(scene, camera);   
    
}