export const magnitude = (vec2) => Math.hypot(vec2.x, vec2.y);



export function Vec2(...point) {

    const x = point[0] || 0;
    const y = point[1] || 0;

    return {
        x : x, 
        y : y,
    }
}



export const add = (...vectors) => {
    
    const x = vectors.reduce((t, v) => t + v.x, 0);
    const y = vectors.reduce((t, v) => t + v.y, 0);

    return Vec2(x,y);
}



export const subtract = (...vectors) => {
    
    const x = vectors[0].x + vectors.slice(1).reduce((t, v) => t - v.x, 0);
    const y = vectors[0].y + vectors.slice(1).reduce((t, v) => t - v.y, 0);

    return Vec2(x, y);
}



export const divideBy = (vector, value) => {
    
    const x = vector.x / value;
    const y = vector.y / value;
    
    return Vec2(x, y);
} 



export const scale = (vector, factor) => {

    const x  = vector.x * factor;
    const y  = vector.y * factor;
    
    return Vec2(x, y);
}



export function fromRadians(scalar, radians) {

    const x = scalar * Math.cos(radians);
    const y = scalar * Math.sin(radians);
    
    return Vec2(x, y);
}



export function fromAngle(scalar, angle) {
    
    const radians = (angle % 360) * (Math.PI/ 180);

    return fromRadians(scalar, radians)
}



export function rotate(vector, radians) {
    
    const x = vector.x * Math.cos(radians) - (vector.y * Math.sin(radians));
    const y = vector.x * Math.sin(radians) + vector.y * Math.cos(radians);
    
    return Vec2(x, y); 
}



export function dotProduct(vecA, vecB) {
    
    return vecA.x * vecB.x + vecA.y + vecB.y;
}



export function radiansBetween(vecA, vecB) {
    
    const a = normalise(vecA);
    const b = normalise(vecB);
    
    const dotProd = dotProduct(a, b);
    
    return Math.acos(dotProd);
}



export function angleBetween(vec2A, vec2B) {
    
    return radiansToDegrees(vec2RadianBetween(vec2A, vec2B));
}



export function project(projectVec2, ontoVec2) {

    const ontoProd = dotProduct(ontoVec2, ontoVec2);
    if(ontoProd > 0) {
        const dotProd = dotProduct(projectVec2, ontoVec2);
        return scale(ontoVec2, dotProd / ontoProd) 
    }
    
    return ontoProd;
}




export const normalise = (vector) => {

    const ratio = 1 / Math.hypot(vector.x, vector.y); 
    
    if (ratio === Infinity) return Vec2(0,0);
    
    const x = vector.x*ratio;
    const y = vector.y*ratio;

    return Vec2(x, y);
}



export function radiansToDegrees(radians) {

    return radians * (180 / Math.PI);
}