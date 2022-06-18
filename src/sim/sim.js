import * as vector from '../math/vectors.js';
import * as phy from '../math/physicsformula.js';

//
export class SimObject {
    constructor(direction, accelerationValue, mass) {
        // when the object is initialised it has a net force
        // and acceleration is 0, thus the object is moving at 
        // a constant velocity;
        const N = mass * accelerationValue;
        console.log("starting N", N);
        this.mass = mass;
        this.force = vector.fromAngle(N, direction);
        console.log("starting force", this.force)
        this.position = {
            x: 0,
            y: 0,
        }
    }

    update(time, friction) {
        // attempt to simulate the forces applied on a lawn bowl
        // if object is at rest return
        if (this.force.x + this.force.y === 0) return;

        // find the direction of the current main force vector
        const normaliseDirection1 = vector.normalise(this.force);

        // rotate the direction so that it is perpendicular 
        const perpToNetForce = vector.rotate(normaliseDirection1, Math.PI/2);
        // create a perpendicular force to apply to the object
        const turnForce = vector.scale(perpToNetForce, (this.mass*.05) / time);
        // apply the perpendicular force to the main force
        this.force = phy.netForce(turnForce, this.force);

        // get the new direction from the main force vector
        const normaliseDirection2 = vector.normalise(this.force);
       
        // newtons applied by friction at the given rate
        const N = (this.mass * friction) / time; 
        
        // friction force
        const resistance = vector.scale(normaliseDirection2, (-1 * N)/time);
    
        const netForce = phy.netForce(this.force, resistance);
        
        // clamp the net force to 0,0
        if (netForce.x * 10 + netForce.y * 10 < 0) {
            this.force = vector.Vec2(0, 0);
            return;
        } else {
            this.force = netForce;
        }
        
        // update the objects x y coordinates
        const newPos = vector.add(this.position, netForce);
        this.position = newPos;

    }
}

export class Sim {
    constructor(obj) {
        this.obj = obj;
        this.forces = [vector.fromAngle(.2, 260)];
        this.time = 0;
        this.prevTime = 0;
    }


    cycle(time) {
       this.obj.update((time-this.prevTime), .7);
       this.prevTime = time;
    }
    timing(time) {
        
    }
} 
