import * as vector from '../math/vectors.js';
import * as phy from '../math/physicsformula.js';

//
export class SimObject {
    constructor(direction, accelerationValue, mass) {
        // when the object is initialised it has a net force
        // and acceleration is 0, thus the object is moving at 
        // a constant velocity;
        this.ballast = (direction > 90)? -1 : 1;
        const N = mass * accelerationValue;
        console.log("starting N", N);
        this.mass = mass;
        this.atRest = false;
        this.force = vector.fromAngle(N, direction);
        console.log("starting force", this.force)
        this.position = {
            x: 0,
            y: 0,
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
}

export class Sim {
    constructor() {
        this.prevTime = 0;
        this.objects = [];
        this.friction = .7;
    }


    cycle(time) {
        for (const obj of this.objects) { 
            obj.update((time-this.prevTime), this.friction);        
        }
        this.prevTime = time;
    }
    add(simObj) {
        this.objects.push(simObj);
    }
} 
