import * as v from "./vectorsv2.js"


/**

**/


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