import * as vector from './math/vectors.js';
import * as phy from './math/physicsformula.js';


const circleToCircleCollision = (circleA, circleB) => {
    const minDistance = circleA.radius + circleB.radius;
    const betweenTwoVec = vector.subtract(circleA.position, circleB.position);
    const ActualDistance = vector.magnitude(betweenTwoVec);
    return ActualDistance <= minDistance;
}

//
class SimObject {
    constructor(metaObject) {
        // when the object is initialised it has a net force
        // and acceleration is 0, thus the object is moving at 
        // a constant velocity;
        const physicsProps = metaObject.physics;
        this.id = metaObject.id || 1;
        this.ballast = (physicsProps.directionDegree > 90)? -1 : 1;
        const N = physicsProps.mass * physicsProps.acceleration;
        this.mass = physicsProps.mass;
        this.atRest = false;
        this.force = vector.fromAngle(N, physicsProps.directionDegree);
        this.position = {
            x: metaObject.x || 0,
            y: metaObject.y || 0,
        }
    }

    update(time, friction) {
        /* Attempt to simulate the forces applied on a lawn bowl */

        if (this.atRest) return;

        // First, find the direction of the current main force vector
        const normaliseDirection1 = vector.normalise(this.force);

        // rotate the direction so that it is perpendicular 
        const perpToNetForce = vector.rotate(normaliseDirection1, Math.PI/2);

        // create a perpendicular force by applying a magnitude to the direction
        const turnForce = vector.scale(perpToNetForce, (this.ballast*this.mass*.05) / time);
        
        // apply the perpendicular force to the main force
        this.force = phy.netForce(turnForce, this.force);

        // get the direction of the force again
        const normaliseDirection2 = vector.normalise(this.force);
       
        // determine how many newtons will be applied to the friction
        const N = (this.mass * friction) / time; 
        
        // create a friction force
        const resistance = vector.scale(normaliseDirection2, (-1 * N)/time);
    
        const netForce = phy.netForce(this.force, resistance);
        
        // clamp the net force to 0,0
        if ((netForce.x * 1 + netForce.y * 1) < 0) {
            this.atRest = true;
            this.force = vector.Vec2(0, 0);
        } else {
            this.force = netForce;
        }
        
        // update the objects x y coordinates
        const newPos = vector.add(this.position, netForce);
        this.position = newPos;

    }
    testCollision() {}
}

class CircleObject extends SimObject {
    constructor(metaObject) {
        
        super(metaObject);
        this.shapetype = metaObject.shape.type;
        this.radius = metaObject.shape.radius;
        this.position = metaObject.shape.centerVector;
    }

    testCollision(simObj) {
        switch(simObj.shapetype) {
            case 'circle':
                if (circleToCircleCollision(this, simObj)) {
                    console.log(this.id, "Collided with", simObj.id);
                }
            break;
        }
    }
}

class Simulator {
    constructor() {
        this.prevTime = 0;
        this.objects = [];
        this.friction = .7;
        this.nextObjectId = 1;
    }


    cycle(time) {
        for (const obj of this.objects) { 
            obj.update((time - this.prevTime), this.friction);
            for(const objs of this.objects) {
                //console.log("testing collision")
                if (obj.id !== objs.id) {
                    obj.testCollision(objs);
                }
            }        
        }
        this.prevTime = time;
    }
    add(ObjectMeta) {
        let simObj = null;
        switch(ObjectMeta.shape.type) {
            
            case 'circle':
                simObj = new CircleObject(ObjectMeta);
            break;
            default:
                simObj = new SimObject(
                    ObjectMeta.id || this.nextObjectId++, 
                    ObjectMeta.position || {x:0, y:0},
                    ObjectMeta.direction || 90,
                    ObjectMeta.acceleration || 0,
                    ObjectMeta.mass || 1
                    )
            break;
        } 
        this.objects.push(simObj);
    }

    getObjects() {
        return this.objects;
    }
} 

const sim = {
    instance : null,
}

onmessage = (e) => {
    const command = e.data.command;
    const input = e.data.input;
    switch(command) {
        case 'initialise': 
            sim.instance = new Simulator(input);
            break;
        case 'stop':
            break;
        case 'cycle':
            sim.instance.cycle(input); 
            postMessage({command:"sim-objects", input: sim.instance.getObjects()});
            break;
        case 'sim-object': 
            sim.instance.add(input);
            break;
    }
}