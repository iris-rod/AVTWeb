var scene, maskScene, reflectionsScene, camera, renderer, controls, gl;

//shaders
var uniforms;

//objects
var car, table, bilboards,car_copy, stone, oranges, butters,oranges_copy;
var table_size_x = 100;
var table_size_y = 100;
var fireworks = [], fireworks_copy = [];
var launch = false, canLaunch = true;

var stereoOn = false;

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
    maskScene = new THREE.Scene();
    reflectionsScene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
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
    renderer.autoClear = false;
    renderer.gammaInput = true;
	renderer.gammaOutput = true;
    
    initCandles();
    initDirectionalLight();
    car = new Car();
    setLightValuesForMaterial();
    table = new createTable(table_size_x,table_size_y,false);
    bilboards = new Bilboards(5,100,50);
    oranges = new Oranges(5,8);
    butters = new Butters(5,7,7,15);
  
    /*
    stone = createCube(10,10,10);
   stone.setPosition(0,10,0); stone.setNormalMap("textures/normal.tga","textures/stone.jpg");
    scene.add(stone);
    */
    gl = renderer.context;
    
    drawStencilMask();
    drawReflectionScene();
    drawCandles();
    drawDirectionalLight();
    drawObject(car);
    drawObject(table);
    drawLensFlare();
    drawObject(bilboards);
    drawObject(oranges);
    drawObject(butters);
  
        initHUD();
        setFog();
    
}

function drawLensFlare(){
    var flareLight = new THREE.PointLight( 0xffffff, 1.5, 2000 );
    flareLight.position.set(40,30,40);
    scene.add(flareLight);
    var textureLoader = new THREE.TextureLoader();

    var textureFlare  = textureLoader.load("textures/lensflare1.png");
    var textureFlare2 = textureLoader.load("textures/lensflare2.png");
    var textureFlare3 = textureLoader.load("textures/lensflare3.png");
    
    var flareColor = new THREE.Color( 0xffffff );
    flareColor.setHSL( 0.55, 0.9, 0.5 );

    var lensFlare = new THREE.LensFlare( textureFlare, 700, 0.0, THREE.AdditiveBlending, flareColor );
    lensFlare.add( textureFlare2, 512 , 0.0, THREE.AdditiveBlending);
    lensFlare.add( textureFlare3, 60  , 0.1, THREE.AdditiveBlending);
    lensFlare.add( textureFlare3, 70  , 0.15, THREE.AdditiveBlending);
	lensFlare.add( textureFlare3, 120 , 0.2, THREE.AdditiveBlending);
	lensFlare.add( textureFlare3, 70  , 0.25, THREE.AdditiveBlending);
    
    lensFlare.position.copy( flareLight.position );
    lensFlare.customUpdateCallback = lensFlareUpdateCallback;
    
    scene.add( lensFlare );        
}

function lensFlareUpdateCallback( object ) {
    var f, fl = object.lensFlares.length;
	var flare;
	var vecX = -object.positionScreen.x * 2;
	var vecY = -object.positionScreen.y * 2;
    
	for( f = 0; f < fl; f++ ) {
		flare = object.lensFlares[ f ];
		flare.x = object.positionScreen.x + vecX * flare.distance;
		flare.y = object.positionScreen.y + vecY * flare.distance;
		flare.rotation = 0;
	}
	object.lensFlares[ 2 ].y += 0.025;
	object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad( 45 );
}

function drawStencilMask(){
    var geom = new THREE.PlaneGeometry
    (table_size_x,table_size_y);
    var mat = new THREE.MeshBasicMaterial( { color: 0x0000ff, colorWrite: false, depthWrite: false } );
    
    var mask = new THREE.Mesh(geom,mat);
    mask.rotateX(-Math.PI/2);
    maskScene.add(mask);
}

function drawReflectionScene(){
    for(var i = 0; i < numCandles; i++){
        var copy = candles[i].clone();
        copy.scale.y = -1;
        reflectionsScene.add(copy);
    }
    var dir_copy = directional.clone();
    dir_copy.applyMatrix(new THREE.Matrix4().makeScale(1, -1, 1));
    reflectionsScene.add(dir_copy);
    
    car_copy = car.clone();
    car_copy.body.applyMatrix(new THREE.Matrix4().makeScale(1,-1,1));
    car_copy.setPosition(car_copy.body.x,-3.5,car_copy.body.z);
    car_copy.addToScene(reflectionsScene);

    var bilb_copy = bilboards.clone();
    bilb_copy.particles.scale.y = -1;
    bilb_copy.particles.material.map.flipY = false;
    bilb_copy.addToScene(reflectionsScene);
    
    oranges_copy = oranges.clone();
    for(var i = 0; i < oranges_copy.objects.length; i++){
        oranges_copy.objects[i].applyMatrix(new THREE.Matrix4().makeScale(1,-1,1));
        oranges_copy.objects[i].setPosition(oranges.objects[i].position.x,-5,oranges.objects[i].position.z);
    }
    oranges_copy.addToScene(reflectionsScene);
    
    var butters_copy = butters.clone();
    for(var i = 0; i < butters_copy.objects.length; i++){
        butters_copy.objects[i].applyMatrix(new THREE.Matrix4().makeScale(1,-1,1));
        butters_copy.objects[i].setPosition(butters.objects[i].position.x,-butters.size_y/2,butters.objects[i].position.z);
    }
    butters_copy.addToScene(reflectionsScene);
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
    controls.update();
    checkMovements();
    checkLights();
    updateReflections();
    updateFireworks();
    oranges.update();
    //bilboards.rescale();
    renderer.clear();
    gl.enable( gl.STENCIL_TEST );
    gl.stencilFunc( gl.ALWAYS, 0x1, 0x1 );
    gl.stencilOp( gl.REPLACE, gl.REPLACE, gl.REPLACE );
    renderer.render(maskScene, camera);  
    
    gl.stencilFunc( gl.EQUAL, 0x1, 0x1 );
    gl.stencilOp( gl.KEEP, gl.KEEP, gl.KEEP );
    
    renderer.render(reflectionsScene, camera);  
    
    gl.disable(gl.STENCIL_TEST);

    renderer.render(scene,camera);
    
}

function updateFireworks(){
    // update fireworks 
    if(launch){
        var pos = new THREE.Vector3(car.getPositionX(),0,car.getPositionZ());
        fireworks.push(new Fireworks(scene,pos));
        launch = false;
        for(var i = 0; i < fireworks.length; i++){
            fireworks_copy.push(fireworks[i].clone());
        }
    }
    for( var i = 0; i < fireworks.length; i++ ){
        if( fireworks[ i ].done ) {
            fireworks.splice( i, 1 ); 
            continue; 
        }
        fireworks[ i ].update();
    }    
}

function updateReflections(){
    for( var i = 0; i < fireworks_copy.length; i++ ){
        if( fireworks_copy[ i ].done ) {
            fireworks_copy.splice( i, 1 ); 
            continue; 
        }
        fireworks_copy[ i ].update();
    } 
    var y = car_copy.getPositionY();
    car_copy.setPosition(car.getPositionX(),y,car.getPositionZ());
    for(var i = 0; i < oranges_copy.objects.length; i++){
        oranges_copy.objects[i].setPosition(oranges.objects[i].position.x,-oranges_copy.r,oranges.objects[i].position.z);
    }
    var rot = car.getRotation();
    var copy_rot = car_copy.getRotation();
    var z = -Math.PI;
    if(rot.x < 0 || rot.x == Math.PI) z = 0;
    car_copy.setRotation(rot.x,rot.y,z);
}

function remove(name){
    switch(name){
        case "headlights":
            car.checkHeadlights(false);
            table.mesh.material.uniforms.spotOn.value = 0;
            table.mesh.material.uniforms.spotLightIntensity.value = 0;
            break;
        case "directional":
            //scene.remove(scene.getObjectByName(name));
            directional.intensity = 0;
            table.mesh.material.uniforms.directionalLightOn.value = 0;
            break;
        case "candles":
            //scene.remove(scene.getObjectByName(name));
            table.mesh.material.uniforms.pointLightOn.value = 0;
            for(var i = 0; i < candles.length; i++){
                candles[i].intensity = 0;
            }
            break;
    }
    
    
}

function add(name){
    switch(name){
        case "headlights":
            car.checkHeadlights(true);
            table.mesh.material.uniforms.spotOn.value = 1;           table.mesh.material.uniforms.spotLightIntensity.value = 6.;
            break;
        case "directional":
            directional.intensity = 0.6;
            table.mesh.material.uniforms.directionalLightOn.value = 1.;
            table.mesh.material.uniforms.dirLightIntensity.value = 0.6;
            break;
        case "candles":
            table.mesh.material.uniforms.pointLightIntensity.value = 5.;
            table.mesh.material.uniforms.pointLightOn.value = 1;
            for(var i = 0; i < candles.length; i++){
                candles[i].intensity = 5;
            }
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
    if(rot_left){ 
        car.rotate(DIRECTIONS.LEFT);
        if(canLaunch){
            canLaunch = false;
            launch = true;
        }
    }
    else if(rot_right){ 
        car.rotate(DIRECTIONS.RIGHT);
        if(canLaunch){
            canLaunch = false;
            launch = true;
        }
    }
    table.mesh.material.uniforms.spotTarget.value = car.getHeadlightsTarget();
    
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


