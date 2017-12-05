

function createPointLight(color,intensity,dist){
    var light = new THREE.PointLight(color,intensity,dist);
    light.position.set(0, 0, 0);
    light.castShadow = true;
    light.setPosition = function(x,y,z){
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }
    
    light.getPosition = function(){
        return [this.position.x,this.position.y,this.position.z];
    }
    
    light.getPositionInVector = function(){
        return new THREE.Vector4(this.position.x,this.position.y,this.position.z,1.0);
    }
    
    light.rotate = function(axis,radians){
        this.setRotationFromAxisAngle(axis,radians);
    }
    
    light.setAngles = function(angle){
        this.angle = angle;
    }
    
    return light;    
}

function createSpotLight(color,intensity,dist){
    var light = new THREE.SpotLight(color,intensity,dist);
    light.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    
    
    light.shadow.camera.near = 500;
    light.shadow.camera.far = 4000;
    light.shadow.camera.fov = 30;

    light.setPosition = function(x,y,z){
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }
    
    light.getPositionInVector = function(){
        return new THREE.Vector4(this.position.x,this.position.y,this.position.z,1.0);
    }
    
    light.getPosition = function(){
        return [this.position.x,this.position.y,this.position.z];
    }
    
    light.rotate = function(axis,radians){
        this.setRotationFromAxisAngle(axis,radians);
    }
    
    light.setAngles = function(angle){
        this.angle = angle;
    }
    
    return light;  
}

function createDirectionalLight(color,intensity){
    var light = new THREE.DirectionalLight(color,intensity);
    light.position.set(0,2,0);
    light.setPosition = function(x,y,z){
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }
    
    light.getPosition = function(){
        return [this.position.x,this.position.y,this.position.z];
    }
    
    light.getPositionInVector = function(){
        return new THREE.Vector4(this.position.x,this.position.y,this.position.z,1.0);
    }
    
    light.rotate = function(axis,radians){
        this.setRotationFromAxisAngle(axis,radians);
    }
    
    light.setAngles = function(angle){
        this.angle = angle;
    }
    return light;
}