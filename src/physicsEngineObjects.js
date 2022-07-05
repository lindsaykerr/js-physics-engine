import {generateID} from './utils.js';
export const makeSimCircleObject = (centerVector, radius, directionDegree, acceleration, mass) => {
    return {
        id: generateID.next(),
        shape : {
            type: 'circle',
            centerVector,
            radius,
        },
        physics : {
            acceleration,
            directionDegree,
            mass,
        },
    }
}
