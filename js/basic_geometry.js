function createCube(size_x,size_y,size_z){
    
  var geometry = new THREE.CubeGeometry(size_x,size_y,size_z);
  var mate = new THREE.MeshBasicMaterial({ color: 0x00ffff});
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
        
        var newMat = new THREE.MeshBasicMaterial({color:0xffffff, map: tex});
        
        this.material = newMat;
    }
    return cube;
}

function createQuad(size_x,size_y){
    var geom = new THREE.PlaneGeometry(size_x,size_y);
    var mat = new THREE.MeshBasicMaterial({ color: 0x0000FF, side: THREE.DoubleSide }); 
    
    var plane = new THREE.Mesh(geom, mat);
    
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
        
        var newMat = new THREE.MeshBasicMaterial({color:0xffffff, map: tex});
        
        this.material = newMat;
    }
    
    plane.rotateX( - Math.PI /3);
    return plane;
}


function createTorus(radius, diameter){
    var geom = new THREE.TorusGeometry(radius,diameter,16,100);
    var mat = new THREE.MeshBasicMaterial({ color: 0xffff00});
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
        
        var newMat = new THREE.MeshBasicMaterial({color:0xffffff, map: tex});
        
        this.material = newMat;
    }
    torus.rotateX(-Math.PI);
    
    return torus;
}

function createSphere(radius, wSeg, hSeg){
    var geom = new THREE.SphereGeometry(radius,wSeg,hSeg);
    var mat  = new THREE.MeshBasicMaterial({color: 0x575a3f});
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
        
        var newMat = new THREE.MeshBasicMaterial({color:0xffffff, map: tex});
        
        this.material = newMat;
    }
    
}