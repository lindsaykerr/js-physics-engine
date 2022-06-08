/**
 * A Vector type
 * @typedef {object} Vector
 * @property {1|2|3} dimension
 * @property {[number]} point
 * @property {number} magnitude 
 */


/**
 * Initialise a one dimensional Vector
 * @param {number} point 
 * @returns {Vector}
 */
export function Vec1(point) {

    point = point || 0;
    const magnitude = Math.abs(point);

    return {
        dimension: 1, 
        x: point,
        magnitude
    }
}


/**
 * Initialise a two dimensional Vector
 * @param   {...number} point 
 * @returns {Vector}
 */
export function Vec2(...point) {

    const x = point[0] || 0;
    const y = point[1] || 0;
    const magnitude = Math.hypot(point[0] || 0, point[1] || 0);

    return {
        dimension: 2,
        x, 
        y,
        magnitude,
    }
}



/**
 * Add vectors
 * @param   {...Vector} vectors 
 * @returns {Vector}
 */
export const addVectors = (...vectors) => {

    const vec1Addition = (vectors) => {
        return vectors.reduce((t, v) => t + v.x, 0);
    }
    
    const vec2Addition = (vectors) => {
        const x = vectors.reduce((t, v) => t + v.x, 0);
        const y = vectors.reduce((t, v) => t + v.y, 0);
        return [x, y];
    }
    
    const calcDimension = {
        1: Vec1(vec1Addition(vectors)),
        2: Vec2(...vec2Addition(vectors))
    }
    return calcDimension[vectors[0].dimension]
}


/**
 * Subtract vectors
 * @param  {...Vector} vectors 
 * @returns 
 */
export const subtractVectors = (...vectors) => {
    
    const vec1Subtract = (vectors) => {
        return vectors[0].x + vectors.slice(1).reduce((t, v) => t - v.x, 0);
    }
    
    const vec2Subtract = (vectors) => {
        const x = vectors[0].x + vectors.slice(1).reduce((t, v) => t - v.x, 0);
        const y = vectors[0].y + vectors.slice(1).reduce((t, v) => t - v.y, 0);
        return [x, y];
    }

    const calcDimension = {
        1: Vec1(vec1Subtract(vectors)),
        2: Vec2(...vec2Subtract(vectors)),
    }

    return calcDimension[vectors[0].dimension]
}


/**
 * Divide a vector by a value
 * @param   {Vector} vector 
 * @param   {number} value 
 * @returns {Vector}
 */
export const vectorDivideBy = (vector, value) => {

    const calcDimension = {
        1: Vec1(vector.x / value),
        2: Vec2(vector.x / value, vector.y / value),
    }
    
    return calcDimension[vector.dimension];
} 



/**
 * Scales a vector by a factor
 * @param   {Vector} vector 
 * @param   {number} factor 
 * @returns {Vector}
 */
export const scaleVector = (vector, factor) => {

    const calcDimension = {
        1: Vec1(vector.x * factor),
        2: Vec2(vector.x * factor, vector.y * factor),
    }
    
    return calcDimension[vector.dimension]
}



export function Vec2FromRadians(scalar, radians) {

    const x = scalar * Math.cos(radians);
    const y = scalar * Math.sin(radians);
    
    return Vec2(x, y);
}



export function Vec2FromAngle(scalar, angle) {

    const radians = (angle % 360) * (Math.PI/ 180)
    const x = scalar * Math.cos(radians);
    const y = scalar * Math.sin(radians);
    
    return Vec2(x, y);
}



/**
 * Creates a base vector
 * @param {Vector} vector 
 * @returns {vector}
 */
export const normaliseVector = (vector) => {

    const vec1Normalise = (vector) => {
        const pointVal = vector.x;
        if (pointVal > 1) { return  1; } else 
        if (pointVal < 0) { return -1; }
        return 0;
    } 
    
    const vec2Normalise = (vector) => {
        const ratio = 1 / Math.hypot(vector.x, vector.y); 
        return (ratio !== Infinity) ? [vector.x*ratio, vector.y*ratio] : [0,0];
    }
    
    const calcDimension = {
        1: Vec1(vec1Normalise(vector)),
        2: Vec2(...vec2Normalise(vector))
    }

    return calcDimension[vector.dimension];
}
