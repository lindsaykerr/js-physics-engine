/**
 * A one dimensional vector
 */
export class Vec1 {
    /**
     * Constructs a one dimensional vector 
     * @param {number} [point] 
     */
    constructor(point) {
        this.point = point || 0;
        this.magnitude = this.#calcNewMagnitude();
    }
    /**
     * Add two one dimensional vectors
     * @param {Vec1} vec1 
     * @returns {Vec1}  
     */
    add(vec1) {
        return new Vec1(this.point + vec1.point);
    }
    /**
     * Subtract two one dimensional vectors
     * @param {Vec1} vec1 
     * @returns {Vec1} 
     */
    subtract(vec1) {
        return new Vec1(this.point - vec1.point);
    }
    /**
     * Multiplies a vector by a value
     * @param {number} value 
     * @returns {Vec1}
     */
    multiply(value) {
        return new Vec1(this.point * value);
    }

    /**
     * Divide a vector by a value
     * @param {number} value 
     * @returns {Vec1}
     */
    divide(value) {
        return new Vec1(this.point / value);
    }
    /**
     * Changing the scale factor of the vector
     * @param {number} factor 
     */

    /**
     * Scale the size of vector
     * @param {number} factor 
     */
    scale(factor) {
        this.point *= factor;
        this.magnitude = this.#calcNewMagnitude()
    }
    
    /*
     * Give the magnitude of the vector
     */
    #calcNewMagnitude() {
        return Math.abs(this.point);
    }

    /**
     * Get the direction of the vector in form of a normalised point
     * 
     * @returns {-1|0|1} point direction
     */
    normalisePoint() {
        return Vec1.#normalisePoint(this.point);
    }
    /*
     * Determines the normalised point in space based on another point value
     */
    static #normalisePoint(point) {
        if(point > 0) {
            return 1;
        } else  if(point < 0) {
            return -1;
        }
        return 0;
    }
    /**
     * Use when there is a need to combine the values of scalar and 
     * direction to form a vector. The value of 
     * the scalar corresponds to the magnitude of the resulting vector.
     *     
     * @param {number} scalar a positive number
     * @param {number} direction a positive or negative number 
     */
    fromScalarAndDirection(scalar, direction) {
        this.point = scalar * Vec1.#normalisePoint(direction)
    }
    /**
     * Change the vector point
     * @param {number} scalar 
     */
    changePoint(scalar) {
        this.point = scalar;
        this.magnitude = this.#calcNewMagnitude();
    }
    
}

/**
 * A two dimensional vector
 */
export class Vec2 {
    constructor(x, y) {
        y = y || 0;
        x = x || 0;
        if (x instanceof Vec1) {
            x = x.point;
        }
        this.point = [x, y];
        
        this.magnitude = this.#calcNewMagnitude();
    }
    changePoint(...coordinate) {
        this.point[0] = coordinate[0] || 0;
        this.point[1] = coordinate[1] || 0;
        this.magnitude = this.#calcNewMagnitude();
    }
    /**
     * Add two two dimensional vectors
     * @param {Vec2} vec2 
     * @returns {Vec2} resulting vector
     */
    add(vec2) {
        return new Vec2(
            this.point[0] + vec2.point[0], 
            this.point[1] + vec2.point[1]
            )
    }

    /**
     * Subtract two two dimensional vectors
     * @param {Vec2} vec2 
     * @returns {Vec2} resulting vector
     */
    subtract(vec2) {
        return new Vec2(
            this.point[0] - vec2.point[0], 
            this.point[1] - vec2.point[1]
            )
    }

    /**
     * Divide a vector by a given value
     * @param {number} value 
     * @returns {Vec2} resulting vector
     */
    divide(value) {
        return new Vec2(
            this.point[0] / value, 
            this.point[1] / value,
            );
    }

    /**
     * Multiply a vector by a given value
     * @param {number} value 
     * @returns {Vec2} resulting vector
     */
    multiply(value) {
        return new Vec2(
            this.point[0] * value,
            this.point[1] * value
        );
    }

    /**
     * Scale the size of vector
     * @param {number} factor 
     */
    scale(factor) {
        this.point[0] *= factor;
        this.point[1] *= factor;
        this.magnitude = this.#calcNewMagnitude();
    }

    /*
    * Give the magnitude of the vector
    */
    #calcNewMagnitude() {
        /*
        * Magnitude is the hypotenuse of right angle triangle formed from x and y
        */
        return Math.hypot(this.point[0], this.point[1]);

    }
    static _normalisePoint(point) {
        const toRadiusOneRatio = 1 / Math.hypot(point[0], point[1]); 
     
        if (toRadiusOneRatio !== Infinity) {
            return [point[0]*toRadiusOneRatio, point[1]*toRadiusOneRatio];
        }
        return [0,0];
    }

    /**
     * Get the direction of the vector in form of a normalised point.
     * The magnitude of the point is one and falls at any point on the
     * circumference of a circle with radius of one.
     * 
     * @returns {[number, number]} each point coordinate ranges from -1 to 1 
     */
    normalisePoint() {
        return Vec2._normalisePoint(this.point);
    }



    fromScalarAndDirection(scalar, ...direction) {
        direction[0] = direction[0] || 0; 
        direction[1] = direction[1] || 0; 
        
        this.point = Vec2._normalisePoint(direction);
        this.scale(scalar);
    }
}
        