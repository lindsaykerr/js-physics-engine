const vec1Magnitude = (point) => Math.abs(point);
const vec2Magnitude = (...points) => Math.hypot(points[0] || 0, points[1] || 0);

/**
 * A Vector type
 * @typedef {object} Vector
 * @property {1|2|3} dimension
 * @property {[number]} point
 * @property {number} magnitude 
 */


/**
 * Initialise a one dimensional Vector
 * @param {nubmer} point 
 * @returns {Vector}
 */
export function Vec1(point) {
    point = point || 0;
    const magnitude = magnitudeOf(point);
    return {
        dimension: 1, 
        point: [point],
        magnitude: magnitude
    }
}

/**
 * Initialise a two dimensional Vector
 * @param {...number} point 
 * @returns {Vector}
 */
export function Vec2(...point) {
    const x = point[0] || 0;
    const y = point[1] || 0;
    const magnitude = vec2Magnitude(x, y);
    return {
        dimension: 2,
        point: [x, y],
        magnitude,
    }
}

/**
 * Add two vectors
 * @param  {...Vector} vectors 
 * @returns {Vector}
 */
export const addVectors = (...vectors) => {
    const calcDimension = {

        1: Vec1(
            vectors.map( v => v.point)
            .reduce((c1, c2) => c1[0] + c2[0])
            ),
        
        2: Vec2(
            vectors.map( c => c.point)
            .reduce(
                (c1, c2)=> [
                    c1[0] + c2[0], 
                    c1[1] + c2[1]
                ])
            ),
    }
    return calcDimension(vectors[0].dimension)
}

export const scaleVector = (vector, factor) => {
    const calcDimension = {
        1: Vec1(vector.point[0] * factor),
        2: Vec2(vector.point[0] * factor, vector.point[1] * factor);
    }
    return calcDimension(vector.dimension)
}