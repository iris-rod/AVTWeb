var lights;

function createCube(size_x,size_y,size_z){
    var cube = new THREE.Mesh(new THREE.CubeGeometry(size_x,size_y,size_z), new THREE.MeshPhongMaterial({color: 0x0000FF, side: THREE.DoubleSide}));
    
    cube.position.y = 0.5;
    cube.position.x = 0.5;
    cube.position.z = -5;
    
    cube.setPosition = function(x,y,z){
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        
    }
    cube.setRotation = function(x,y,z){
        this.rotation.x = x;
        this.rotation.y = y;
        this.rotation.z = z;
    }
    cube.getPosition = function(){
        console.log(this.position.x);
        return [this.position.x, this.position.y, this.position.z];
    }
    cube.setScale = function(x,y,z){
        this.scale.x = x;
        this.scale.y = y;
        this.scale.z = z;
    }
    cube.setTexture = function(path){
        var tex = new THREE.TextureLoader().load(path);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1,1);
        
        var newMat = new THREE.MeshPhongMaterial({color:0xffffff, map: tex});
        
        this.material = newMat;
    }
    cube.setTransparent = function(opacity){
        this.material.transparent = true;
        this.opacity = opacity;
    }
    return cube;
}

function createQuad(size_x,size_y){
    var tex = new THREE.TextureLoader().load("textures/stone.jpg");
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1,1);
    var geom = new THREE.PlaneGeometry(size_x,size_y);
    var mat = new THREE.MeshPhongMaterial({ color: 0xffffFF, side: THREE.DoubleSide, map: tex }); 
    
    /*    
    var materials = [];
    var tex = new THREE.TextureLoader().load("textures/stone.jpg");
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1,1);
    
    var tex1 = new THREE.TextureLoader().load("textures/water.jpg");
    tex1.wrapS = THREE.RepeatWrapping;
    tex1.wrapT = THREE.RepeatWrapping;
    tex1.repeat.set(1,1);
    
    materials.push(new THREE.MeshPhongMaterial({color:0xffffff, map: tex1}));
    materials.push(new THREE.MeshPhongMaterial({color:0xffffff, map: tex}));

    var material = new THREE.MeshFaceMaterial(materials);
    */
    
    uniforms =//{ 
        THREE.UniformsUtils.merge(
            [THREE.UniformsLib['lights'],
            {
            texture1: { type: 't', value: null},
            texture2: { type: 't', value: null},
            lightIntensiy: {type: 'f', value: 10.0}
        /*
        spotOn: { value: true},
        pointOn: { value: true},
        directionalLightOn: { value: true},
        Light: { value:
                [
                    lights[0],
                    lights[1],
                    lights[2],
                    lights[3],
                    lights[4],
                    lights[5],
                    lights[6],
                    lights[7],
                    lights[8]
                ]
            //{
            //l_pos: l_posS,
            //l_spotDir: l_spotDirS,
            //l_cutoff: l_cutoffS,
            //type: types
            //}            
        },
        Materials:{ value:{
                diffuse: { type:"4f", value:new THREE.Vector4(1,1,1,1)},
                ambient: { type:"4f", value:new THREE.Vector4(1,1,1,1)},
                specular: { type:"4f", value:new THREE.Vector4(1,1,1,1)},
                emissive:{ type:"4f", value:new THREE.Vector4(1,1,1,1)},
                shininess:{ type: "1f", value:10.0},
                texCount: 2
            }
        }
        */
    }]);
    //}
    
    uniforms =THREE.UniformsUtils.merge( [{
            texture1: { type: 't', value: null},
            texture2: { type: 't', value: null},
            dirLightPos: {value: directional.getPositionInVector()},
            dirLightIntensity:{type: '1f', value:directional.intensity},
            pointLightIntensity: {type: '1f', value: candles[0].intensity}
            },
            THREE.UniformsLib[ "lights" ]
                                         ]);
    
    
    var vertexShader = document.getElementById('vertexShader').innerHTML;
    var fragmentShader = document.getElementById('fragmentShader').innerHTML;
    
    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        lights: true
    });
    
    material.uniforms.texture1.value =new THREE.ImageUtils.loadTexture("textures/stone.jpg");
    material.uniforms.texture2.value =new THREE.ImageUtils.loadTexture("textures/water.jpg");

    
    var plane = new THREE.Mesh(geom, material);
    
    plane.setPosition = function(x,y,z){
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;        
    }
    plane.setRotation = function(x,y,z){
        this.rotation.x = x;
        this.rotation.y = y;
        this.rotation.z = z;
    }
    plane.setScale = function(x,y,z){
        this.scale.x = x;
        this.scale.y = y;
        this.scale.z = z;
    }
    plane.setTexture = function(path){
        var tex = new THREE.TextureLoader().load(path);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1,1);
        
        var newMat = new THREE.MeshPhongMaterial({color:0xffffff, map: tex});
        
        this.material = newMat;
    }
    

    plane.setTransparent = function(opacity){
        this.material.transparent = true;
        this.opacity = opacity;
    }
    
    plane.setMaterial
    
    plane.rotateX( - Math.PI/2);
    return plane;
}


function createTorus(radius, diameter){
    var geom = new THREE.TorusGeometry(radius,diameter,16,100);
    var mat = new THREE.MeshPhongMaterial({ color: 0xffff00});
    var torus = new THREE.Mesh(geom,mat);

    torus.setPosition = function(x,y,z){
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;        
    }
    torus.setRotation = function(x,y,z){
        this.rotation.x = x;
        this.rotation.y = y;
        this.rotation.z = z;
    }
    torus.setScale = function(x,y,z){
        this.scale.x = x;
        this.scale.y = y;
        this.scale.z = z;
    }
    torus.setTexture = function(path){
        var tex = new THREE.TextureLoader().load(path);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1,1);
        
        var newMat = new THREE.MeshPhongMaterial({color:0xffffff, map: tex});
        
        this.material = newMat;
    }
    
    torus.getRotation = function(){
        return [this.rotation.x,this.rotation.y,this.rotation.z];
    }
    
    torus.setTransparent = function(opacity){
        this.material.transparent = true;
        this.opacity = opacity;
    }
    
    torus.rotateX(-Math.PI);
    torus.position.x = 0;
    torus.position.y = 0;
    torus.position.z = 0;
    
    return torus;
}

function createSphere(radius, wSeg, hSeg){
    var geom = new THREE.SphereGeometry(radius,wSeg,hSeg);
    var mat  = new THREE.MeshPhongMaterial({color: 0x575a3f});
    var sphere = new THREE.Mesh(geom,mat);
 
    sphere.setPosition = function(x,y,z){
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;        
    }
    sphere.setRotation = function(x,y,z){
        this.rotation.x = x;
        this.rotation.y = y;
        this.rotation.z = z;
    }
    sphere.setScale = function(x,y,z){
        this.scale.x = x;
        this.scale.y = y;
        this.scale.z = z;
    }
    sphere.setTexture = function(path){
        var tex = new THREE.TextureLoader().load(path);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1,1);
        
        var newMat = new THREE.MeshPhongMaterial({color:0xffffff, map: tex});
        
        this.material = newMat;
    }
    
    sphere.setTransparent = function(opacity){
        this.material.transparent = true;
        this.material.opacity = opacity;
        this.material.depthWrite = false;
    }
    
    return sphere;
    
}

function setLightValuesForMaterial(){
    l_posS = new Array();
    l_spotDirS = new Array();
    l_cutoffS = new Array();
    types = new Array();
    lights = new Array();
    for(var i = 0; i < candles.length; i++){
        l_posS.push(candles[i].getPositionInVector());
        l_spotDirS.push(new THREE.Vector4());
        l_cutoffS.push(0);
        types.push(0);
    }
    for(var i = 0; i < 2; i++){
        l_posS.push(car.headlights[i].getPositionInVector());
        l_spotDirS.push(car.headlights[i].target);
        l_cutoffS.push(THREE.Math.radToDeg(car.headlights[i].angle));
        types.push(1);
    }
    
    l_posS.push(directional.getPositionInVector());
    l_spotDirS.push(new THREE.Vector4());
    l_cutoffS.push(0);
    types.push(2);
    
    for(var i =0; i < numTotalLights ; i++){
        lights.push({l_pos: l_posS[i],l_spotDir: l_spotDirS[i],l_cutoff: l_cutoffS[i], type: types[i]});
    }
    
}