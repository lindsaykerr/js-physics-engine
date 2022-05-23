import { Vec, Vec1, Vec2 } from "./vectors.js"

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
     * Velocity of an object is speed with a direction 
     * @param {number} speed - speed of a travelling object
     * @param {[number]} direction - represents the direction of travel with respect 
     * to a coordinate system like (x, y, z). For Vec1, value x is either -1 or 1. 
     * For Vec2 or Vec3 the values may represent the destination point from the grid
     * origin.  
     * @returns {Vec1 | Vec2 | Vec3} velocity vector
     */
    velocity: (speed, direction, measure) => {
        const vector = {
            1: () => new Vec1(direction[0] * speed),
            2: () => new Vec2(speed, direction),
            3: () => {}
        }
        return vector[direction.length]();
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
    acceleration: (oVelocity, fVelocity, time) => fVelocity.subtract(oVelocity).divideBy(time),
    /*
    endSpeed: (startSpeed, acceleration, time) => startSpeed + acceleration * time,
    startSpeed: (endSpeed, acceleration, time) => endSpeed - acceleration * time,
    time: (startSpeed, endSpeed, acceleration) => (endSpeed - startSpeed) / acceleration,
    */
}