import * as vector from '../math/vectors.js';
import * as phy from '../math/physicsformula.js';

//
export class SimObject {
    constructor(id, velocity, mass, fromX, fromY) {
        this.velocity = velocity;
        this.d = 0;
        this.netForce = velocity;
        this.acceleration = vector.Vec2(0,0);
        this.mass = mass;
        this.x = fromX;
        this.y = fromY;
        this.prevTime = NaN;
        this.id = id;
        this.bound = undefined;
    }

    update(time, forces) {      
        this.x = this.velocity.x;
        this.y = this.velocity.y;
        /*
       
        if (!this.prevTime) {
            this.prevTime = time%1000/1000;
            return;
        } 
        const secondsFraction = time%1000/1000

        this.netForce = vector.add(this.netForce, vector.scale(vector.Vec2(-1, 0), secondsFraction), ...forces);
        
        const accel = phy.accelerationFromNetForce(this.netForce, this.mass)
       // console.log(accel)
        const newVelocity = phy.finalVelocityFromAcceleration(this.velocity, accel, secondsFraction);
        this.d = Math.sqrt(Math.pow(this.velocity.x-newVelocity.x)+ Math.pow(this.velocity.y - newVelocity.y));
        this.velocity = newVelocity;


       // console.log(this.velocity, newVelocity)
       */
    }
}

export class Sim {
    constructor(obj) {
        this.obj = obj;
        this.forces = [vector.fromAngle(.2, 260)];
    }


    cycle(sec) {
       this.obj.update(sec,this.forces)
    }
} 
