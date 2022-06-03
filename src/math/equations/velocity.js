import { 
    normaliseVector,
    Vector,
    scaleVector, 
    Vec1, 
    Vec2, 
    Vec2FromAngle, 
    Vec2FromRadians 
} from "../vectorsv2.js";

/**
 * 
 * @param  {...number} coordinate 
 * @returns {Vector}
 */
export const velocityUsingCoord = (...coordinate) => {
    const dimensionCalc = {
        1: Vec1(coordinate[0]),
        2: Vec2(coordinate[0], coordinate[1]),
    }
    return dimensionCalc[coordinate.length]
};

/**
 * 
 * @param {*} speed 
 * @param  {...any} point 
 * @returns {Vector}
 */
export const velocityFromADirectionalPoint = (speed, ...point) => {
    const vecFromPoint = {
        1: Vec1(point[0]),
        2: Vec2(point[0], point[1]),
    }
    const dirPoint = dimensionCalc[point.length];
    const normPoint = normaliseVector(dirPoint);
    return scaleVector(normPoint, speed);
};

/**
 * 
 * @param {number} speed 
 * @param {number} angle - 0-360 degrees 
 * @returns {Vector}
 */
export const velocityUsingAngle = (speed, angle) => {
    return Vec2FromAngle(speed, angle);
};

/**
 * Calculate velocity using a speed value and a radi
 * @param {*} speed 
 * @param {*} radians 
 * @returns {Vector} 
 */
export const velocityUsingRadian = (speed, radians) => {
    return Vec2FromRadians(speed, radians);
};