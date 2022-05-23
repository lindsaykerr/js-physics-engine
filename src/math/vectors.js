export class Vec{

    /**
     * The base Vector is comprised of a scalar (the magnitude of 
     * some unit of measure, this can be a compound measure).
     *  
     * @param {number} magnitude - magnitude of one unit measure
     */
    constructor(magnitude) {
        this.magnitude = magnitude;
    }
}


/**
 * A one dimensional vector
 */
export class Vec1 extends Vec{
    /**
     * Vector1 is comprised of a scalar giving the magnitude of 
     * one unit of measure (usually a compound measure) and a direction
     * in the form of a positive or negative value.
     *  
     * @param {number} magnitude - +|-(scalar), + represents forward, - backward direction
     */
    constructor(magnitude) {
        super(magnitude);
        this.coordinate = this.magnitude;
    }
    /**
     * 
     * @param {Vec1} vec1
     */
    add(vec1) {
        return new Vec1(this.coordinate + vec1.coordinate);
    }
}

export class Vec2 {
    /**
     * 
     * @param {[number]} magnitude 
     * @param {[number]} directionCoord 
     */
    constructor(magnitude, directionCoord) {
        this.magnitude = magnitude || 0;
        if (directionCoord) {
            this.setCoordinate(directionCoord);
        }
        else {
            this.coordinate = [0,0];
        }
    }

    setValues(magnitude, dirCoordinate) {
        this.setMagnitude(magnitude);
        this.setCoordinate(dirCoordinate);
    }
    setMagnitude(magnitude) {
        this.magnitude = magnitude;
    }
    setCoordinate(directionCoord) {
        this.coordinate = Vec2.normaliseCoordinates(directionCoord).map(x => x*this.magnitude)
    }


    static normaliseCoordinates(coordinates) {
        const x = coordinates[0];
        const y = coordinates[1];
        /* 
         * To calculate the radius of circle using x y coordinates: r = sqrt(x^2 + y^2)
         * To find the difference between a radius of 1 and the calculated radius: d = 1/r
         * Normalise the coordinates to a radius of 1 by multiplying them by the d
         */
        const oneUnitRadiusRatio = (1/(Math.sqrt(x*x + y*y)))
        return [x*oneUnitRadiusRatio, y*oneUnitRadiusRatio];
    }

    add(vec2) {
        const magnitude = Math.sqrt(
            Math.abs(this.coordinate[0]*vec2.coordinate[0] + this.coordinate[1]+ vec2.coordinate[1])
        );
        const vecAddition = [
            this.coordinate[0] + vec2.coordinate[0], 
            this.coordinate[1] + vec2.coordinate[1]
        ];
        const vec2Result = new Vec2();
        vec2Result.magnitude = magnitude;
        vec2Result.coordinate = vecAddition;
        return vec2Result;
    }
    
    subtract(vec2) {
        const tempVec = new Vec2(vec2.magnitude,[-vec2.coordinate[0],-vec2.coordinate[1]]);
        return this.add(tempVec);
    }
    divideBy(scalar) {
        const tempVec = new Vec2();
        tempVec.setValues(this.magnitude / scalar, this.coordinate);
        // because the magnitude changes the point coordinate must be updated
        return tempVec;
    }
    multiplyBy(scalar) {
        const tempVec = new Vec2();
        tempVec.setValues(this.magnitude * scalar, this.coordinate);
        return tempVec; 
    }
}