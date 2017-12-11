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

function createCar(){
    //var car;
    var wOffsetX = [1,1,2,2];
    car.body = createCube(5,5);
    var bodyPos = car.body.getPosition();
    car.globalPos = bodyPos;
    for(var i = 0; i< 4; i++){
        car.wheels[i] = createTorus(2,0.5);
        car.wheels[i].setPosition(bodyPos[0]+wOffsetX[i],bodyPos[1],bodyPos[2]);
        //collidableMeshList.push(car.wheels[i]);
    }
        
    car.setPosition = function(x,y,z){
        this.body.setPosition(x,y,z);
        for(i = 0; i < this.wheels.length(); i++){
            this.wheels[i].setPosition(x+wOffsetX[i],y,z);
        }
    }
    
    car.setRotation = function(x,y,z){
        this.body.setRotation(x,y,z);
        for(i = 0; i < this.wheels.length(); i++){
            this.wheels[i].setRotation(x,y,z);
        }        
    }
    
    car.move = function(direction){
        switch(direction){
            case DIRECTIONS.FRONT:
                this.body.translateX(0.02);
                break;
            case DIRECTIONS.BACK:
                
                break;
        }
    }
    
    car.addToScene = function(scene){
        scene.add(this.body);
        for(var i = 0; i< 4; i++){
            scene.add(this.wheels[i]);
        }
    }
    
    car.getCarX = function() { return this.globalPos[0]; }
    car.getCarY = function() { return this.globalPos[1]; }
    car.getCarZ = function() { return this.globalPos[2]; }
    
    car.getPosition = function(){ return [this.globalPos[0], this.globalPos[1], this.globalPos[2] ]; }    
    
    return car;
}
