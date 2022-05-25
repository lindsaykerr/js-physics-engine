import { Vec1, Vec2 } from "./vectors.js"

export const SpeedCalc = {
    /**
     * Calculates the overall speed for an object when it travels a given distance over a time
     * 
     * f(d, t) = d / t = s
     * 
     * Note: 
     * dividing by zero yields the JavaScript default infinity.
     * 
     * @param {number} distance - d >= 0 unit of distance
     * @param {number} time - t >= 0 unit of speed
     * @returns {number} speed unit
     */
    speed: (distance, time) => distance / time,

    /**
     * Calculates the distance travelled by an object travelling at a speed for a given time
     * 
     * f(s, t) = s * t = d
     * 
     * @param {number} speed - speed unit 
     * @param {number} time - time unit
     * @returns {number} distance unit
     */
    distance: (speed, time) => speed * time,

    /**
     * Calculate the time taken for an object to travel a certain distance over a given speed
     * 
     * f(d, s) = d / s = t 
     * 
     * @param {number} distance - distance unit 
     * @param {number} speed - speed unit 
     * @returns {number} time unit
     */
    time: (distance, speed) => distance / speed,
}



export const velocityCalc = {
    /**
     * Velocity of an object is a vector comprised of a speed and direction.
     * 
     * Be aware that the direction coordinate values will be are normalised to 
     * the range of -1 to 1. Thus for a given direction, any value could have been used that falls
     * on the projected direction line. 
     * 
     * Eg. A speed of 60 numbers in a single direction of 1002 will be create a 
     * one dimensional vector that will point at 60. Likewise if that direction was -10 the vector 
     * would point to -60. There is only one case where direction would affect the magnitude 
     * and that is when it is 0.     
     * 
     * @param {number} speed - speed of a travelling object
     * @param {number} dirCoord[0] - x coordinate 
     * @param {number} dirCoord[1] - y coordinate
     * @param {number} dirCoord[2] - z coordinate
     * 
     * @returns {Vec1 | Vec2 | Vec3} velocity vector
     */
    velocity: (speed, ...dirCoord) => {
        const vector = {
            1: () => {
                const tempVec = new Vec1();
                tempVec.fromScalarAndDirection(speed, dirCoord[0]);
                return tempVec;
            },
            2: () => {
                const tempVec = new Vec2();
                tempVec.fromScalarAndDirection(speed, dirCoord);
                return tempVec;
            },
            3: () => {}
        }
        return vector[dirCoord.length]();
    },
}




export const AccelerationCalc = {
    /**
     * 
     * @param {Vec1 | Vec2} oVelocity - original velocity
     * @param {Vec1 | Vec2} fVelocity - final velocity
     * @param {number} time - time unit
     * @returns {Vec1 | Vec2}
     */
    acceleration: (sVelocity, fVelocity, time) => fVelocity.subtract(sVelocity).divide(time),

    /**
     * 
     * @param {*} startSpeed 
     * @param {*} acceleration 
     * @param {*} time 
     * @returns 
     */
    finalVelocity: (sVelocity, acceleration, time) => sVelocity.add(acceleration).multiply(time),
    startVelocity: (fVelocity, acceleration, time) => fVelocity.subtract(acceleration).multiply(time),
    //time: (sVelocity, fVelocity, acceleration) => fVelocity.subtract(sVelocity).scale(1/(acceleration.magnitude)),
    
}