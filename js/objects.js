var DIRECTIONS = {
    FRONT: 1,
    BACK: 2,
    LEFT: 3,
    RIGHT: 4
};

var car = 
    {
        body: null,
        wheels: new Array(4),
        headlights: new Array(2),
        globalPos: new Array(3)
    };


function Car(){
    this.body = null;
    this.wheels = new Array(4);
    this.headlights = new Array(2);
    this.globalPos = new Array(3);
    
    var target = null;
    var size = 5;
    var offset = size/2;
    var wOffsetX = [offset,offset,-offset,-offset];
    var wOffsetZ = [offset,-offset,offset,-offset];
    var lOffsetZ = [-1.5,1.5];
    
    this.body = createCube(size,size,size);
    this.body.name = "car-body";
    this.body.setPosition(0,size/2+1,0);
    var bodyPos = this.body.getPosition();
    this.globalPos = bodyPos;
    
    //create and add wheels
    for(var i = 0; i< 4; i++){
        this.wheels[i] = createTorus(1,0.2);
        this.wheels[i].setTexture("textures/stone.jpg");
        this.wheels[i].setPosition(bodyPos[0]+wOffsetX[i],bodyPos[1]-size-0.8,bodyPos[2]+wOffsetZ[i]);
        this.wheels[i].name = "car-wheel-"+i.toString();
        this.body.add(this.wheels[i]);
    }
    
    //create and add headlights
    for(var i = 0; i< 2; i++){
        target = createSphere(0,0,0);
        target.setPosition(20,0,0);
        target.setTransparent(0);
        this.headlights[i] = createSpotLight(0xffffff,1,6000);
        this.headlights[i].setPosition(0,2,lOffsetZ[i]);
        this.headlights[i].target = target;
        this.headlights[i].name = "headlights";
        this.body.add(this.headlights[i]);
        target.name = "target";
        this.body.add(target);
    }
    
    this.setPosition = function(x,y,z){
        this.body.setPosition(x,y,z);
        this.globalPos = this.body.getPosition();
    }
    
    this.getRotation = function(){
        return this.body.rotation;
    }
    
    this.setRotation = function(x,y,z){
        this.body.setRotation(x,y,z);   
    }
    
    this.move = function(direction){
        switch(direction){
            case DIRECTIONS.FRONT:
                this.updatePosition(.5);
                break;
            case DIRECTIONS.BACK:
                this.updatePosition(-.5);
                break;
        }
    }
    
    this.rotate = function(direction){
        switch(direction){
            case DIRECTIONS.RIGHT:
                this.updateRotation(-0.05);
                break;
            case DIRECTIONS.LEFT:
                this.updateRotation(0.05);
                break;
        }
    }
    
    this.updateRotation = function(radians){
        /*var matrix = new THREE.Matrix4();
        var yAxis = new THREE.Vector3(0,1,0);
        matrix.makeRotationAxis(yAxis,radians);
        this.body.matrix.multiply(matrix);
        this.body.rotation.setFromRotationMatrix(this.body.matrix);
        this.setRotation(this.body.rotation._x, this.body.rotation._y, this.body.rotation._z);*/
        var axis = new THREE.Vector3(0,1,0);
        this.body.rotateOnAxis(axis,radians);
        
    }
    
    this.updatePosition = function(dist){
        this.body.translateX(dist);
        for(var i = 0; i < this.wheels.length; i++){
            var rotZ = this.wheels[i].getRotation()[2];
            this.wheels[i].setRotation(0,0,rotZ+1);
        }
        this.globalPos = this.body.getPosition();
    }
    
    this.checkHeadlights = function(trigger){
        //this.body.remove(this.body.getObjectByName("headlights"));
        for(var i = 0; i < 2 ; i++){
                //this.body.add(this.headlights[i]);
            if(!trigger) {
                this.headlights[i].intensity = 0;
            }
            else{
                this.headlights[i].intensity = 1;
            }
        }
        
    }
    
    this.getHeadlightsTarget = function(){
        this.body.updateMatrixWorld();
        var vector  =  new THREE.Vector3();
        //return this.body.getObjectByName("target").position;
        return vector.setFromMatrixPosition(this.body.getObjectByName("target").matrixWorld);
    }
    
    this.addToScene = function(scene){
        scene.add(this.body);
    }
    
    this.getPositionX = function(){
        return this.globalPos[0];
    }
    this.getPositionY = function(){
        return this.globalPos[1];
    }
    this.getPositionZ = function(){
        return this.globalPos[2];
    }
    
    this.clone = function(){
        var cop = new Car();
        return cop;
    }
    
    return this;
}

function createTable(size_x,size_y,simple) {
    this.mesh = createQuad(size_x,size_y,simple);
    this.mesh.name = "table";
    this.mesh.setPosition(0,0,0);
    
    this.setPosition = function(x,y,z){
        this.mesh.setPosition(x,y,z);
    }
    
    this.setRotation = function(x,y,z){
        this.mesh.setRotation(x,y,z);   
    }
    
    this.addToScene = function(scene){
        scene.add(this.mesh.plane);
    }
    
    this.setTexture = function(path){
        this.mesh.plane.setTexture(path);
    }

    this.simpleClone = function(){
        var a = createTable(size_x,size_y,true);
        return a;
    }
    
    return this;
}

function Bilboards(num,size,r){
    this.num = num;
    this.size = size;
    this.r = r;
    this.geom = new THREE.Geometry();
    this.tex = new THREE.TGALoader().load('textures/tree.tga');
    this.vec = new THREE.Vector3();
    var scaleFactor = 2;
    var defaultDepth = 0;
    
    for(var i = 0; i < num; i++){
        this.vertex = new THREE.Vector3();
        this.vertex.x = Math.random() * r*2 - r;
        this.vertex.y = 5;
        this.vertex.z = Math.random() * r*2 - r;
        this.geom.vertices.push(this.vertex);
    }
    
    this.mat = new THREE.PointsMaterial({
        size: size,
        sizeAttenuation: false,
        map: this.tex,
        alphaTest: 0.5,
        transparent: true,
        castShadow: true,
        receiveShadow: true
    });
    this.mat.color.setHSL(1.0,0.3,0.7);
    
    this.particles = new THREE.Points(this.geom,this.mat);
    
    this.addToScene = function(scene){
        scene.add(this.particles);
    }
    
    this.rescale = function(){
        vec = new THREE.Vector3();
        this.scale.x = 0.1 * vec.setFromMatrixPosition(this.matrixWorld).sub(camera.position).length()/(20000);
        this.scale.y = this.scale.x;
    }
    
    this.clone = function(){
        var cop = new Bilboards(this.num,this.size,this.r);
        for(var i = 0; i < this.num; i++){
            cop.geom.vertices[i] = this.geom.vertices[i];
        }
        return cop;
    }
    return this;
    
}

function Fireworks(scene,car_position){
    this.done = false;
    this.vector = car_position;
    this.colors = [];
    this.dest = [];
    this.geometry = null;
    this.points = null;
    this.scene = scene;
    this.burst = true;
    var tex = new THREE.TextureLoader().load("textures/clouds.png");
    this.material = new THREE.PointsMaterial({
        size: 5,
        map: tex,
        color: 0xffffff,
        opacity: 1,
        vertexColors: true,
        transparent: true,
        depthTest: false
        
    });
    
    this.reset = function(){
        this.scene.remove(this.points);
        this.colors = [];
        this.dest = [];
        this.geometry = null;
        this.points = null;
    }
    
    this.explode = function(){
        this.geometry = new THREE.Geometry();
        this.points = new THREE.Points(this.geometry,this.material);
        for(var i = 0; i < 200; i++){
            var color = new THREE.Color();
            color.setHSL( 0.1, 0.2, 0.5 );
            this.colors.push( color ); 
                
            var from = new THREE.Vector3( 
                THREE.Math.randInt( this.vector.x - 2, this.vector.x + 2), 
                this.vector.y, 
                THREE.Math.randInt( this.vector.z - 2, this.vector.z + 2)
            ); 
            var to = new THREE.Vector3( 
                THREE.Math.randInt( this.vector.x - 10, this.vector.x + 0 ), 
                THREE.Math.randInt( this.vector.y - 5, this.vector.y + 5 ), 
                THREE.Math.randInt( this.vector.z - 10, this.vector.z + 10 )
            ); 
            this.geometry.vertices.push( from ); 
            this.dest.push( to ); 
        }
        this.geometry.colors = this.colors;
        this.scene.add( this.points );  
    }
    
    this.update = function(){
        if(this.burst){
            this.explode();
            this.burst = false;
            return;
        }
        if( this.points && this.geometry ){
        //console.log("update");
            var total = this.geometry.vertices.length; 
            // lerp particle positions 
            for( var i = 0; i < total; i++ )
            {
                this.geometry.vertices[i].x += ( this.dest[i].x - this.geometry.vertices[i].x ) / 20;
                this.geometry.vertices[i].y += ( this.dest[i].y - this.geometry.vertices[i].y ) / 20;
                this.geometry.vertices[i].z += ( this.dest[i].z - this.geometry.vertices[i].z ) / 20;
                this.geometry.verticesNeedUpdate = true;
            }
            if( total > 1 ){
                this.material.opacity -= 0.015; 
                this.material.colorsNeedUpdate = true;
            }
            // remove, reset and stop animating 
            if( this.material.opacity <= 0 )
            {
                this.reset(); 
                this.done = true; 
                return; 
            }
        }
    }
    this.clone = function(){
        var n = new Fireworks(reflectionsScene,this.vector);
        //n.vector.y = -10;
        return n;
    }
    
}

function Butters(num, size_x,size_y,size_z){
    this.objects = new Array(num);
    this.size_x = size_x;
    this.size_y = size_y;
    this.size_z = size_z;
    for(var i = 0; i < num; i++){
        this.objects[i] = createCube(size_x,size_y,size_z);
        this.objects[i].material.color.setHex(0xffdd00);       this.objects[i].setPosition(Math.random()*100-50,size_y/2.,Math.random()*100-50);
    }
    
    this.addToScene = function(scene){
        for(var i = 0; i < this.objects.length; i++){
            scene.add(this.objects[i]);
        }
    }
    this.clone = function(){
        var c = new Butters(this.objects.length,this.size_x,this.size_y,this.size_z);
        return c;
    }
    
    return this; 
}

function Oranges(num,r){
    this.objects = new Array(num);
    this.speed = new Array(num);
    this.r = r;
    for(var i = 0; i < num; i++){
        this.objects[i] = createSphere(r,10,10);
        this.objects[i].material.map = new THREE.TextureLoader().load("textures/orange.jpg");
       this.speed[i] = 0.5; this.objects[i].setPosition(Math.random()*100-50,r,Math.random()*100-50);
    }
    
    this.update = function(){
        for(var i = 0; i < this.objects.length; i++){
            this.objects[i].translateX(this.speed[i]);
            if(this.objects[i].position.x >= 40){
                this.speed[i] = -0.5;
            }
            else if(this.objects[i].position.x <= -40){
                this.speed[i] = 0.5;
            }
        }
    }
    
    this.clone = function(){
        var c = new Oranges(this.objects.length,this.r);
        return c;
    }
    
    this.addToScene = function(scene){
        for(var i = 0; i < this.objects.length; i++){
            scene.add(this.objects[i]);
        }
    }
    
    return this;
    
}

