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

var table = {
    globalPos: new Array(3),
    mesh: null,
    mat:null
};

function createCar(){
    var target = null;
    var size = 5;
    var offset = size/2;
    var wOffsetX = [offset,offset,-offset,-offset];
    var wOffsetZ = [offset,-offset,offset,-offset];
    var lOffsetZ = [-1.5,1.5];
    
    car.body = createCube(size,size,size);
    car.body.name = "car-body";
    car.body.setPosition(0,size/2+1,0);
    var bodyPos = car.body.getPosition();
    car.globalPos = bodyPos;
    
    //create and add wheels
    for(var i = 0; i< 4; i++){
        car.wheels[i] = createTorus(1,0.2);
        car.wheels[i].setTexture("textures/stone.jpg");
        car.wheels[i].setPosition(bodyPos[0]+wOffsetX[i],bodyPos[1]-size-0.8,bodyPos[2]+wOffsetZ[i]);
        car.wheels[i].name = "car-wheel-"+i.toString();
        car.body.add(car.wheels[i]);
    }
    
    //create and add headlights
    for(var i = 0; i< 2; i++){
        target = createSphere(0,0,0);
        target.setPosition(20,0,0);
        target.setTransparent(0);
        car.headlights[i] = createSpotLight(0xffffff,1,6000);
        car.headlights[i].setPosition(0,2,lOffsetZ[i]);
        car.headlights[i].target = target;
        car.headlights[i].name = "headlights";
        car.body.add(car.headlights[i]);
        car.body.add(target);
    }
    
    car.setPosition = function(x,y,z){
        this.body.setPosition(x,y,z);
    }
    
    car.setRotation = function(x,y,z){
        this.body.setRotation(x,y,z);   
    }
    
    car.move = function(direction){
        switch(direction){
            case DIRECTIONS.FRONT:
                this.updatePosition(.5);
                break;
            case DIRECTIONS.BACK:
                this.updatePosition(-.5);
                break;
        }
    }
    
    car.rotate = function(direction){
        switch(direction){
            case DIRECTIONS.RIGHT:
                this.updateRotation(-0.05);
                break;
            case DIRECTIONS.LEFT:
                this.updateRotation(0.05);
                break;
        }
    }
    
    car.updateRotation = function(radians){
        var matrix = new THREE.Matrix4();
        var yAxis = new THREE.Vector3(0,1,0);
        matrix.makeRotationAxis(yAxis.normalize(),radians);
        this.body.matrix.multiply(matrix);
        this.body.rotation.setFromRotationMatrix(this.body.matrix);
        this.setRotation(this.body.rotation._x, this.body.rotation._y, this.body.rotation._z);
        
    }
    
    car.updatePosition = function(dist){
        this.body.translateX(dist);
        for(var i = 0; i < this.wheels.length; i++){
            var rotZ = this.wheels[i].getRotation()[2];
            this.wheels[i].setRotation(0,0,rotZ+1);
        }
        this.globalPos = this.body.getPosition();
    }
    
    car.checkHeadlights = function(trigger){
        if(!trigger) this.body.remove(this.body.getObjectByName("headlights"));
        else {
            for(var i = 0; i < 2 ; i++){
                this.body.add(this.headlights[i]);
            }
        }
    }
    
    car.addToScene = function(scene){
        scene.add(this.body);
    }
    
    car.getPositionX = function(){
        return this.globalPos[0];
    }
    car.getPositionY = function(){
        return this.globalPos[1];
    }
    car.getPositionZ = function(){
        return this.globalPos[2];
    }
    
    
    return car;
}

function createTable(size_x,size_y) {
    table.mesh = createQuad(size_x,size_y);
    table.mesh.name = "table";
    table.mesh.setPosition(0,0,0);
    
    table.setPosition = function(x,y,z){
        this.mesh.setPosition(x,y,z);
    }
    
    table.setRotation = function(x,y,z){
        this.mesh.setRotation(x,y,z);   
    }
    
    table.addToScene = function(scene){
        scene.add(this.mesh);
    }
    
    table.setTexture = function(path){
        this.mesh.setTexture(path);
    }

    
    
    return table;
}
