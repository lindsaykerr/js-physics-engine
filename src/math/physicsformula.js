import * as vector from "./vectors.js";



/* Speed */

export const speedFromDistance = (distance, time) => distance / time;


export const distanceFromSpeed = (speed, time) => speed * time;


export const timeFromSpeed = (distance, speed) => distance / speed;

//-------/



/* Velocity */

export const velocityUsingCoord = (...coordinate) => {
    
    const x = coordinate[0];
    const y = coordinate[1];
    
    return vector.Vec2(x, y);
};



export const velocityFromADirectionalPoint = (speed, ...point) => {
    const x = point[0] || 0;
    const y = point[1] || 0;
    
    const dirPoint =  vector.Vec2(x, y)
    const normPoint = vector.normalise(dirPoint);

    return vector.scale(normPoint, speed);
};



export const velocityUsingAngle = (speed, angle) => {

    return vector.fromAngle(speed, angle);
};



export const velocityUsingRadian = (speed, radians) => {

    return vector.fromRadians(speed, radians);
}; 


// f(v1,v2) = (v1 + v2) / 2
export const averageVelocity = (sVelocity, fVelocity) => {
    
    const sumVel = vector.add(sVelocity, fVelocity);

    return vector.divideBy(sumVel, 2);
}

//-------/



/* Force */

export const netForce = (...forceVectors) => {

    return vector.add(...forceVectors);
}


export const accelerationFromNetForce = (nForce, mass) => {

    return vector.divideBy(nForce, mass);
}


export const netForceFromAcceleration = (acceleration, mass) => {

    return vector.scale(acceleration, mass);
}

//-------/



/* Acceleration */

export const acceleration = (startVelocity, endVelocity, time) => {
    
    const diffVelocity = vector.subtract(endVelocity, startVelocity);
    
    return vector.divideBy(diffVelocity, time);
}



export const finalVelocityFromAcceleration = (startVelocity, acceleration, time) => {
    
    const accelByTime = vector.scale(acceleration, time);
    
    return vector.add(startVelocity, accelByTime);
}
 


export const distanceFromAcceleration = (startVelocity, acceleration, time) =>{

    const velByTime = vector.scale(startVelocity, time);
    const accelByTimeSquared = vector.scale(acceleration, time*time);

    return vector.add(velByTime, vector.scale(accelByTimeSquared, 0.5))
}