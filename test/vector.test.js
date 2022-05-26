import * as assert from 'assert';

import {Vec1, Vec2} from '../src/math/vectors.js';

describe("Testing Vec1", ()=>{
    
    describe("Initialisation ",()=>{
        it("Empty Vec1",()=>{
            const vec = new Vec1();
            assert.equal(vec.point, 0);
            assert.equal(vec.magnitude, 0);
        });
        it("positive  Vec1",()=>{
            const vec = new Vec1(1);
            assert.equal(vec.point, 1);
            assert.equal(vec.magnitude, 1);
        });
        it("negative Vec1",()=>{
            const vec = new Vec1(-2);
            assert.equal(vec.point, -2);
            assert.equal(vec.magnitude, 2);
        });

    });
    describe("Methods", ()=>{
        it("from scalar and direction",()=>{
            const vec = new Vec1();
            vec.fromScalarAndCoord(60, -1);
            assert.equal(vec.point, -60);
            
            vec.fromScalarAndCoord(60, 0);
            assert.equal(vec.point, 0);
            
            vec.fromScalarAndCoord(60, 1);
            assert.equal(vec.point, 60);
            
            vec.fromScalarAndCoord(0.2, -77.1);
            assert.equal(vec.point, -0.2);
            
            vec.fromScalarAndCoord(0.2, 0);
            assert.equal(vec.point, 0);
            
            vec.fromScalarAndCoord(1, 11000);
            assert.equal(vec.point, 1);
        });

        it("change point", ()=>{
            const vec = new Vec1(0);
            vec.changePoint(-3);
            assert.equal(vec.point, -3);
            assert.equal(vec.magnitude, 3);
        });

        it("scale factor",()=>{
            const vec = new Vec1(1);
            vec.scale(-20);
            assert.equal(vec.point, -20);
            vec.scale(0.5);
            assert.equal(vec.point, -10);
            assert.equal(vec.magnitude, 10);
            vec.scale(0);
            assert.equal(vec.point, 0);
            assert.equal(vec.magnitude, 0);
            // 0 magnitude should not be able to be scaled
            vec.scale(0.1);
            assert.equal(vec.point, 0);
            assert.equal(vec.magnitude, 0);
        });

        it("normalise Points", ()=>{
            const vec = new Vec1(-3);
            assert.equal(vec.normalisePoint(), -1);
            vec.changePoint(0);
            assert.equal(vec.normalisePoint(), 0);
            vec.changePoint(23);
            assert.equal(vec.normalisePoint(), 1);
        });
        it("divide by value",()=>{
            const vec1 = new Vec1(10);
            let temp = vec1.divide(2);
            assert.equal(temp.point,5);
            assert.equal(temp.magnitude, 5);

            const vec2 = new Vec1(0);
            temp = vec2.divide(2);
            assert.equal(temp.point, 0);
            assert.equal(temp.magnitude, 0);

            const vec3 = new Vec1(-7);
            temp = vec3.divide(5);
            assert.equal(temp.point, -1.4);
            assert.equal(temp.magnitude, 1.4);

            const vec4 = new Vec1(-7);
            temp = vec4.divide(0);
            assert.equal(temp.point, -Infinity);
        });
        it("multiply by value",()=>{
            const vec = new Vec1(1);
            let temp;
            temp = vec.multiply(25);
            assert.equal(temp.point, 25);
            assert.equal(temp.magnitude, 25);
            temp = temp.multiply(-2);
            assert.equal(temp.point, -50);
            assert.equal(temp.magnitude, 50);
            temp = temp.multiply(Infinity);
            assert.equal(temp.point, -Infinity);
            assert.equal(temp.magnitude, Infinity);
            
        });
        it("add vector",()=>{
            const vec1 = new Vec1();
            const vec2 = new Vec1(10);
            let temp = vec1.add(vec2);
            assert.equal(temp.point, 10);
            assert.equal(temp.magnitude, 10);
            
            vec1.changePoint(-23);
            temp = vec1.add(vec2);
            assert.equal(temp.point, -13);
            assert.equal(temp.magnitude, 13);

            vec1.changePoint(-10);
            temp = vec1.add(vec2);
            assert.equal(temp.point, 0);
            assert.equal(temp.magnitude, 0);
        });
        it("subtract vector",()=>{
            const vec1 = new Vec1();
            const vec2 = new Vec1(10);
            let temp = vec1.subtract(vec2);
            assert.equal(temp.point, -10);
            assert.equal(temp.magnitude, 10);
            
            vec1.changePoint(-23);
            temp = vec1.subtract(vec2);
            assert.equal(temp.point, -33);
            assert.equal(temp.magnitude, 33);

            vec1.changePoint(10);
            temp = vec1.subtract(vec2);
            assert.equal(temp.point, 0);
            assert.equal(temp.magnitude, 0);
        });

    });

});

describe("Testing Vec2", ()=>{
    
    describe("Initialisation ",()=>{
        it("Empty Vec2",()=>{
            const vec = new Vec2();
            assert.deepEqual(vec.point, [0,0]);
            assert.equal(vec.magnitude, 0);
        });
        it("positive  Vec2",()=>{
            const vec = new Vec2(1, 25);
            assert.deepEqual(vec.point, [1, 25]);
            assert.equal(vec.magnitude.toFixed(1), "25.0");
        });
        it("negative Vec2",()=>{
            const vec = new Vec2(-2);
            assert.deepEqual(vec.point, [-2, 0]);
            assert.equal(vec.magnitude.toFixed(1), "2.0");
        });

    });
    describe("Methods", ()=>{
        it("from scalar and direction",()=>{
            const ratio = (x,y)=>{
                return 1 / Math.hypot(x, y);
            }
            const vec = new Vec2;
            vec.fromScalarAndCoord(60, -1 , 0);
            assert.deepEqual(vec.point, [-60,0]);
            
            let r = ratio(7,8);
            vec.fromScalarAndCoord(60, 7, 8);
            assert.deepEqual(vec.point, [7*r*60, 8*r*60]);
            
            r = ratio(0, 1);
            vec.fromScalarAndCoord(60, 0, 1);
            assert.deepEqual(vec.point, [0*r*60, 1* r * 60]);
            
            vec.fromScalarAndCoord(0.2, -77.1);
            assert.deepEqual(vec.point, [-0.2, 0]);
            
            vec.fromScalarAndCoord(0.2, 0);
            assert.deepEqual(vec.point, [0,0]);
            
            r = ratio(-2, -80)
            vec.fromScalarAndCoord(-2, -2, -80);
            assert.deepEqual(vec.point, [-2*r*-2, -80*r*-2]);
        });

        it("change point", ()=>{
            const vec = new Vec2(0);
            vec.changePoint(-3, 2);
            assert.deepEqual(vec.point, [-3,2]);
            assert.deepEqual(vec.magnitude, Math.hypot(-3,2));
        });

        it("scale factor",()=>{
            const vec = new Vec2(-1, 1);
            vec.scale(-20);
            assert.deepEqual(vec.point, [20,-20]);
            vec.scale(0.5);
            assert.deepEqual(vec.point, [10, -10]);
            assert.deepEqual(vec.magnitude, Math.hypot(10, -10));
            vec.scale(0);
            assert.deepEqual(vec.point, [0, -0]);
            assert.deepEqual(vec.magnitude, 0);
            // 0 magnitude should not be able to be scaled
            vec.scale(0.1);
            assert.deepEqual(vec.point, [0, -0]);
            assert.deepEqual(vec.magnitude, 0);
        });

        it("normalise Points", ()=>{
            const norm = (x, y)=> {
                const r = 1/Math.hypot(x, y);
                return [x*r, y*r];
            } 
            const vec = new Vec2(-3, 18);

            assert.deepEqual(vec.normalisePoint(), norm(-3,18));
            vec.changePoint(6, 7);
          
            assert.deepEqual(vec.normalisePoint(), norm(6, 7));
            vec.changePoint(0, 0);
            assert.deepEqual(vec.normalisePoint(), [0,0]);
        });

       
        it("divide by value",()=>{
            const vec1 = new Vec2(10, 10);
            let temp = vec1.divide(2);
            assert.deepEqual(temp.point,[5, 5]);

            const vec2 = new Vec2(0, 1);
            temp = vec2.divide(2);
            assert.deepEqual(temp.point, [0, .5]);

            const vec3 = new Vec2(-20, 5);
            temp = vec3.divide(5);
            assert.deepEqual(temp.point, [-4, 1]);

            const vec4 = new Vec2(-7, 8);
            temp = vec4.divide(0);
            assert.deepEqual(temp.point, [-Infinity, Infinity]);
        });
        it("multiply by value",()=>{
            const vec = new Vec2(1, 1);
            let temp;
            temp = vec.multiply(25);
            assert.deepEqual(temp.point, [25, 25]);
            
            temp = temp.multiply(Infinity);
            assert.deepEqual(temp.point, [Infinity, Infinity]);
            
        });
        it("add vector",()=>{
            const vec1 = new Vec2(2, 2);
            const vec2 = new Vec2(5, 5);
            let temp = vec1.add(vec2);
            assert.deepEqual(temp.point, [7,7]);
            assert.equal(temp.magnitude, Math.hypot(7,7));
            
            vec1.changePoint(-23, -23);
            temp = vec1.add(vec2);
            assert.deepEqual(temp.point, [-18,-18]);

        });
       it("subtract vector",()=>{
            const vec1 = new Vec2(10, 10);
            const vec2 = new Vec2(5, 5);
            let temp = vec1.subtract(vec2);
            assert.deepEqual(temp.point, [5, 5]);
            assert.equal(temp.magnitude, Math.hypot(5,5));
            
            vec1.changePoint(-25, -25);
            temp = vec1.subtract(vec2);
            assert.deepEqual(temp.point, [-30,-30]);
            assert.equal(temp.magnitude, Math.hypot(-30,-30));

        });
/*  */
    });
 

});