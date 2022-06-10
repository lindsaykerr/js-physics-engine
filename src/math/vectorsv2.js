/**
 * One dimensional vector
 * @typedef {object} Vec1
 * @property {1} dimension
 * @property {number} x
 * @property {number} magnitude 
 */

/**
 * Two dimensional vector
 * @typedef {object} Vec2
 * @property {2}  dimension
 * @property {number} x
 * @property {number} y
 * @property {number} magnitude
 */

/**
 * @typedef {Vec1|Vec2} Vector
 */

/**
 * Initialise a one dimensional Vector
 * @param {number} point 
 * @returns {Vec1}
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
 * @returns {Vec2}
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
 * Scale a vector by a factor
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


/**
 * Create a new vector 2 from a scalar and a direction in radians
 * @param {number} scalar 
 * @param {number} radians 
 * @returns {Vec2}
 */
export function Vec2FromRadians(scalar, radians) {

    const x = scalar * Math.cos(radians);
    const y = scalar * Math.sin(radians);
    
    return Vec2(x, y);
}


export function Vec2FromAngle(scalar, angle) {
    const radians = (angle % 360) * (Math.PI/ 180)
    return Vec2FromRadians(scalar, radians)
}


/**
 * Rotate vector 2 by a radian value 
 * @param {Vec2} vec2 
 * @param {number} radians 
 * @returns {Vec2}
 */
export function rotateVec2(vec2, radians) {
    const x = vec2.x * Math.cos(radians) - (vec2.y * Math.sin(radians));
    const y = vec2.x * Math.sin(radians) + vec2.y * Math.cos(radians);
    
    return Vec2(x, y); 
}


/**
 * Calculate the dot product between two Vec2
 * @param {Vec2} vec2A 
 * @param {Vec2} vec2B 
 * @returns {number} n == 0 is 90 degrees, n > 0 is less than 90, n < 0 greater than 90 
 */
export function vec2DotProduct(vec2A, vec2B) {
    return vec2A.x * vec2B.x + vec2A.y + vec2B.y;
}


/**
 * Calculates the radians between two vector 2
 * @param {Vec2} vec2A 
 * @param {Vec2} vec2B 
 * @returns {number} radians
 */
export function vec2RadiansBetween(vec2A, vec2B) {
    const vec1 = normaliseVector(vec2A);
    const vec2 = normaliseVector(vec2B);
    const dotProd = vec2DotProduct(vec1, vec2);
    return Math.acos(dotProd);
}


/**
 * Calculates the angles between two vector 2
 * @param {Vec2} vec2A 
 * @param {Vec2} vec2B 
 * @returns {number} angle
 */
export function vec2AngleBetween(vec2A, vec2B) {
    return radiansToDegrees(vec2RadianBetween(vec2A, vec2B));
}

/**
 * Project a vector2 onto another
 * @param {Vec2} projectVec2 
 * @param {Vec2} ontoVec2 
 * @returns {Vec2}
 */
export function vec2Project(projectVec2, ontoVec2) {
    const ontoProd = vec2DotProduct(ontoVec2, ontoVec2);
    if(ontoProd > 0) {
        const dotProd = vec2DotProduct(projectVec2, ontoVec2);
        return scaleVector(ontoVec2, dotProd / ontoProd) 
    }
    return ontoProd;
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

/**
 * Converts radians to angular degrees
 * @param {number} radians 
 * @returns {number} degrees
 */
 export function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
}