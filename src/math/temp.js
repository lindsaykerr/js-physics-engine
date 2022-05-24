/**
    /**
     * A two dimensional vector
     */
     export class  Vec2 {
        constructor(x, y) {
            y = y || 0;
            x = x || 0;
            if (x instanceof Vec1) {
                x = x.point;
            }
            this.point = [x, y];
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
            this.#calcNewMagnitude();
        }

        /*
        * Give the magnitude of the vector
        */
        #calcNewMagnitude() {
            /*
            * Magnitude is the hypotenuse of right angle triangle formed from x and y
            */
            this.magnitude = Math.hypot(this.point[0], this.point[1]);
        }
        static _normalisePoint(point) {
            const toRadiusOneRatio = 1 / Math.hypot(point[0], point[1]);
            return [point[0]*toRadiusOneRatio, point[1]*toRadiusOneRatio];
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
            
            this.point = Vec2._normalisePoint(direction[0], direction[1]);
            this.scale(scalar);
        }
**/