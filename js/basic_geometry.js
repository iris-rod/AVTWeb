var lights;

function createCube(size_x,size_y,size_z){
    
  var geometry = new THREE.CubeGeometry(size_x,size_y,size_z);
  var mate = new THREE.MeshPhongMaterial({ color: 0x00ffff});
  mate.fog = true;
  var cube = new THREE.Mesh(geometry, mate);
    
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
    
    cube.setNormalMap = function(pathNormal, pathTex){
        var bumpTex = new THREE.ImageUtils.loadTexture(pathNormal);
        var tex = new THREE.ImageUtils.loadTexture(pathTex);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1,1);
        //calculate tangents
        var tan1 = new Array(this.geometry.vertices.length * 2);
        var tan2 = new Array(this.geometry.vertices.length * 2);
        var normals = new Array(this.geometry.vertices.length*2);
        var tangents = new Array(this.geometry.vertices.length);
        for(var i = 0; i<this.geometry.faces.length; i++){
            var face = this.geometry.faces[i];
            var ind1 = face.a;
            var ind2 = face.b;
            var ind3 = face.c;
            
            var v1 = this.geometry.vertices[ind1];
            var v2 = this.geometry.vertices[ind2];
            var v3 = this.geometry.vertices[ind3];
            
            var uv1 = this.geometry.faceVertexUvs[0][i][0];
            var uv2 = this.geometry.faceVertexUvs[0][i][1];
            var uv3 = this.geometry.faceVertexUvs[0][i][2];
            
            var x1 = v2.x - v1.x;
            var x2 = v3.x - v1.x;
            var y1 = v2.y - v1.y;
            var y2 = v3.y - v1.y;
            var z1 = v2.z - v1.z;
            var z2 = v3.z - v1.z;
            
            var s1 = uv2.x - uv1.x;
            var s2 = uv3.x - uv1.x;
            var t1 = uv2.y - uv1.y;
            var t2 = uv3.y - uv1.y;
            
            var r = 1.0/(s1*t2 - s2*t1);
            
            var sdir = new THREE.Vector3((t2*x1 - t1*x2)*r,
                                         (t2*y1 - t1*y2)*r,
                                         (t2*z1 - t1*z2)*r);
            var tdir = new THREE.Vector3((s1*x2 - s2*x1)*r,
                                         (s1*y2 - s2*y1)*r,
                                         (s1*z2 - s2*z1)*r);
            if(tan1[ind1] == null) tan1[ind1] = sdir;
            else tan1[ind1].add(sdir);
            if(tan1[ind2] == null) tan1[ind2] = sdir;
            else tan1[ind2].add(sdir);
            if(tan1[ind3] == null) tan1[ind3] = sdir;
            else tan1[ind3].add(sdir);
            
            if(tan2[ind1] == null) tan2[ind1] = tdir;
            else tan2[ind1].add(sdir);
            if(tan2[ind2] == null) tan2[ind2] = tdir;
            else tan2[ind2].add(sdir);
            if(tan2[ind3] == null) tan2[ind3] = tdir;
            else tan2[ind3].add(sdir);
            
            //calculate normals
            var faceNormal = this.geometry.faces[i].normal;
            
            if(normals[ind1] == null) normals[ind1] = faceNormal;
            else normals[ind1].add(faceNormal);
            if(normals[ind2] == null) normals[ind2] = faceNormal;
            else normals[ind2].add(faceNormal);
            if(normals[ind3] == null) normals[ind3] = faceNormal;
            else normals[ind3].add(faceNormal);
        }
        
        for(var i = 0; i < this.geometry.vertices.length; i++){
            var n = normals[i];
            var t = tan1[i];
            
            //gram-shmidt orthogalize
            var v = (t.sub(n).multiplyScalar(n.dot(t))).normalize();
            
            //handedness
            v.w = (n.cross(t).dot(tan2[i]) < 0.0) ? -1.0 : 1.0;
            
            tangents[i] = v;
        }
        
        
        var uniforms = THREE.UniformsUtils.merge([{
            texture1: {type: 't', value: null},
            textureBump: {type: 't', value: null},
            dirLightPos: {value: directional.getPositionInVector()},
            dirLightIntensity:{type: '1f', value:directional.intensity},
            pointLightIntensity: {type: '1f', value: candles[0].intensity},
            spotOn: {type: '1i', value:1},
            directionalLightOn: {type: '1i', value:1},
            pointLightOn: {type: '1i', value:1},
            spotTarget: {value: car.getHeadlightsTarget()},
            angle: {value: car.headlights[0].angle},
            spotLightIntensity:{type: '1f',value: 6.},
            texMode: {type: '1i', value:2},
            tangent: {value: tangents[0]}
            },                                   
            
            THREE.UniformsLib[ "lights" ]
            
        ]);
        
        var vertexShader = document.getElementById('vertexShader').innerHTML;
        var fragmentShader = document.getElementById('fragmentShader').innerHTML;
        
        this.material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            lights: true
        });
        
        this.material.uniforms.texture1.value =new THREE.ImageUtils.loadTexture(pathTex);
        this.material.uniforms.textureBump.value =new THREE.ImageUtils.loadTexture(pathNormal);
        
    }

    cube.setTransparent = function(opacity){
        this.material.transparent = true;
        this.opacity = opacity;
    }
    return cube;
}

function createQuad(size_x,size_y,simple){
    this.tex = new THREE.TextureLoader().load("textures/stone.jpg");
    this.tex.wrapS = THREE.RepeatWrapping;
    this.tex.wrapT = THREE.RepeatWrapping;
    this.tex.repeat.set(1,1);
    this.geom = new THREE.PlaneGeometry(size_x,size_y);
    this.mat = new THREE.MeshBasicMaterial( { color: 0x0000ff, colorWrite: false,
        castShadow: true,
        receiveShadow: true} );
    
    this.uniforms =THREE.UniformsUtils.merge( [{
            texture1: { type: 't', value: null},
            texture2: { type: 't', value: null},
            dirLightPos: {value: directional.getPositionInVector()},
            dirLightIntensity:{type: '1f', value:directional.intensity},
            pointLightIntensity: {type: '1f', value: candles[0].intensity},
            spotOn: {type: '1i', value:1},
            directionalLightOn: {type: '1i', value:1},
            pointLightOn: {type: '1i', value:1},
            spotTarget: {value: car.getHeadlightsTarget()},
            angle: {value: car.headlights[0].angle},
            spotLightIntensity:{type: '1f',value: 6.},
            texMode: {type: '1i', value:1}
            },                                   
            
            THREE.UniformsLib[ "lights" ]
                                         ]);
    
    
    this.vertexShader = document.getElementById('vertexShader').innerHTML;
    this.fragmentShader = document.getElementById('fragmentShader').innerHTML;
    
    this.material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: this.vertexShader,
        fragmentShader: this.fragmentShader,
        lights: true,
        transparent: true,
        castShadow: true,
        receiveShadow: true
    });
    
    this.material.uniforms.texture1.value =new THREE.ImageUtils.loadTexture("textures/stone.jpg");
    this.material.uniforms.texture2.value =new THREE.ImageUtils.loadTexture("textures/water.jpg");
    
    this.plane = null;
    if(simple) this.plane = new THREE.Mesh(geom, mat);
    else this.plane = new THREE.Mesh(geom,material);
    
    this.setPosition = function(x,y,z){
        this.plane.position.x = x;
        this.plane.position.y = y;
        this.plane.position.z = z;        
    }
    this.setRotation = function(x,y,z){
        this.plane.rotation.x = x;
        this.plane.rotation.y = y;
        this.plane.rotation.z = z;
    }
    this.setScale = function(x,y,z){
        this.plane.scale.x = x;
        this.plane.scale.y = y;
        this.plane.scale.z = z;
    }
    this.setTexture = function(path){
        var tex = new THREE.TextureLoader().load(path);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1,1);
        
        var newMat = new THREE.MeshPhongMaterial({color:0xffffff, map: tex});
        
        this.plane.material = newMat;
    }
    

    this.setTransparent = function(opacity){
        this.plane.material.transparent = true;
        this.plane.opacity = opacity;
    }
    
    this.plane.rotateX( - Math.PI/2);
    return this;
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
        
        var newMat = new THREE.MeshPhongMaterial({color:0xffffff, map: tex,
        castShadow: true,
        receiveShadow: true});
        
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
    
    var mat  = new THREE.MeshPhongMaterial({color: 0xffffff,
        castShadow: true,
        receiveShadow: true});
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
