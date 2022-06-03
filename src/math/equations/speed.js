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
 export const speed = (distance, time) => distance / time,

 /**
  * Calculates the distance travelled by an object travelling at a speed for a given time
  * 
  * f(s, t) = s * t = d
  * 
  * @param {number} speed - speed unit 
  * @param {number} time - time unit
  * @returns {number} distance unit
  */
 export const distance = (speed, time) => speed * time,
 
 /**
  * Calculate the time taken for an object to travel a certain distance over a given speed
  * 
  * f(d, s) = d / s = t 
  * 
  * @param {number} distance - distance unit 
  * @param {number} speed - speed unit 
  * @returns {number} time unit
  */
 export const time = (distance, speed) => distance / speed;
 