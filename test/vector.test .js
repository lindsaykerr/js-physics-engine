import * as assert from 'assert';

//import {Vec1, Vec2} from '../src/math/vectors.js';
import * as v from '../src/math/vectorsv2.js';



describe("Testing Vec1", ()=>{
    
    describe("Initialisation ",()=>{
        it("Empty Vec1",()=>{
            const vec = v.Vec1();
            assert.equal(vec.x, 0);
            assert.equal(vec.magnitude, 0);
        });
        it("positive  Vec1",()=>{
            const vec = v.Vec1(1);
            assert.equal(vec.x, 1);
            assert.equal(vec.magnitude, 1);
        });
        it("negative Vec1",()=>{
            const vec = v.Vec1(-2);
            assert.equal(vec.x, -2);
            assert.equal(vec.magnitude, 2);
        });

    });
 



    it("scale factor",()=>{
        const vec = v.Vec1(1);
        
        const vs1 = v.scaleVector(vec,-20);
        assert.equal(vs1.x, -20);
        
        const vs2 = v.scaleVector(vs1, .5)
        
        assert.equal(vs2.x, -10);
        assert.equal(vs2.magnitude, 10);
        
        const vs3 = v.scaleVector(vs1, 0);
        assert.equal(vs3.x, 0);
        assert.equal(vs3.magnitude, 0);
        
        // 0 magnitude should not be able to be scaled
        const vs4 = v.scaleVector(vs3, 0.1);
        assert.equal(vs4.x, 0);
        assert.equal(vs4.magnitude, 0);
    });

    it("normalise Points", ()=>{
        const v1 = v.Vec1(-3);
        const n1 = v.normaliseVector(v1)
        assert.equal(n1.x, -1);
        const v2 = v.Vec1(0);
        const n2 = v.normaliseVector(v2);
        assert.equal(n2.x, 0);
        const v3 = v.Vec1(23)
        assert.equal(v.normaliseVector(v3).x, 1);
    });
    it("divide by value",()=>{
        const v1 = v.Vec1(10);
        const d1 = v.vectorDivideBy(v1,2);
        assert.equal(d1.x ,5);
        assert.equal(d1.magnitude, 5);

        const v2 = v.Vec1(0);
        const d2 = v.vectorDivideBy(v2, 2);
        assert.equal(d2.x, 0);
        assert.equal(d2.magnitude, 0);

        const v3 = v.Vec1(-7);
        const d3 = v.vectorDivideBy(v3, 5);
        assert.equal(d3.x, -1.4);
        assert.equal(d3.magnitude, 1.4);

        const v4 = v.Vec1(-7);
        const d4 = v.vectorDivideBy(v4, 0);
        assert.equal(d4.x, -Infinity);
    });
    it("add vector",()=>{
        const v1 = v.Vec1(1);
        const v2 = v.Vec1(10);
        const v3 = v.addVectors(v1, v2);
        assert.equal(v3.x, 11);
        
        const v4 = v.Vec1(-11);
        const v5 = v.addVectors(v1, v4);
        assert.equal(v5.x, -10);
        assert.equal(v5.magnitude, 10);
    });

    it("subtract vector",()=>{
        const v1 = v.Vec1(-10);
        const v2 = v.Vec1(10);
        const v3 = v.subtractVectors(v1, v2);
        assert.equal(v3.x, -20);
        assert.equal(v3.magnitude, 20);
        
        const v4 = v.Vec1(-23);
        const v5 = v.subtractVectors(v1, v4);
        assert.equal(v5.x, 13);
        assert.equal(v5.magnitude, 13);


        const v6 = v.subtractVectors(v.Vec1(12), v.Vec1(-23), v.Vec1(18));
        assert.equal(v6.x, 17);
        assert.equal(v6.magnitude, 17);
    });

});
    

describe("Testing Vec2", ()=>{
    
    describe("Initialisation ",()=>{
        it("Empty Vec2",()=>{
            const v1 = v.Vec2();
            assert.deepEqual([v1.x,v1.y], [0,0]);
            assert.equal(v1.magnitude, 0);
        });
        it("positive  Vec2",()=>{
            const v1 = v.Vec2(1, 25);
            assert.deepEqual([v1.x, v1.y],[1, 25]);
            assert.equal(v1.magnitude.toFixed(1), "25.0");
        });
        it("negative Vec2",()=>{
            const v1 = v.Vec2(-2);
            assert.deepEqual([v1.x, v1.y], [-2, 0]);
            assert.equal(v1.magnitude.toFixed(1), "2.0");
        });

    });
   describe("Methods", ()=>{



        it("scale factor",()=>{
            const v1 = v.Vec2(-1, 1);
            const s1 = v.scaleVector(v1, -20);
            assert.deepEqual([s1.x, s1.y], [20,-20]);
            const s2 = v.scaleVector(s1, 0.5);
            assert.deepEqual([s2.x, s2.y], [10, -10]);
            assert.deepEqual(s2.magnitude, Math.hypot(10, -10));
            const s3 = v.scaleVector(s2, 0);
            assert.deepEqual([s3.x, s3.y], [0, -0]);
            assert.deepEqual(s3.magnitude, 0);
            // 0 magnitude should not be able to be scaled
            const s4 = v.scaleVector(s3, 0.1);
            assert.deepEqual([s4.x, s4.y], [0, -0]);
            assert.deepEqual(s4.magnitude, 0);
        });

        it("normalise Points", ()=>{
            const norm = (x, y)=> {
                const r = 1/Math.hypot(x, y);
                return [x*r, y*r];
            } 
            const v1 = v.Vec2(-3, 18);
            const n1 = v.normaliseVector(v1);
            assert.deepEqual([n1.x, n1.y], norm(-3,18));
            
            const v2 = v.Vec2(6,7);
            const n2 = v.normaliseVector(v2);
            assert.deepEqual([n2.x, n2.y], norm(6, 7));
            
            const v3 = v.Vec2(0,0);
            const n3 = v.normaliseVector(v3);
            assert.deepEqual([n3.x, n3.y], [0,0]);
        });

       
        it("divide by value",()=>{
            const v1 = v.Vec2(10, 10);
            const d1 = v.vectorDivideBy(v1, 2);
            assert.deepEqual([d1.x, d1.y],[5, 5]);

            const v2 = v.Vec2(0, 1);
            const d2 = v.vectorDivideBy(v2, 2);
            assert.deepEqual([d2.x, d2.y], [0, .5]);

            const v3 = v.Vec2(-20, 5);
            const d3 = v.vectorDivideBy(v3, 5);
            assert.deepEqual([d3.x, d3.y], [-4, 1]);

            const v4 = v.Vec2(-7, 8);
            const d4 = v.vectorDivideBy(v4,0);
            assert.deepEqual([d4.x, d4.y], [-Infinity, Infinity]);
        });

            
        });
        it("add vector",()=>{
            const v1 = v.Vec2(2, 2);
            const v2 = v.Vec2(5, 5);
            const a1 = v.addVectors(v1, v2);
            assert.deepEqual([a1.x, a1.y], [7,7]);
            assert.equal(a1.magnitude, Math.hypot(7,7));
            
            const v3 = v.Vec2(-23, -23);
            const a2 = v.addVectors(v2, v3);
            assert.deepEqual([a2.x, a2.y], [-18,-18]);
        });
      it("subtract vector",()=>{
            const v1 = v.Vec2(10, 10);
            const v2 = v.Vec2(5, 5);
            const s1 = v.subtractVectors(v1, v2);
            assert.deepEqual([s1.x, s1.y], [5, 5]);
            assert.equal(s1.magnitude, Math.hypot(5,5));
            
            const v3 = v.Vec2(-25, -25);
            const s2 = v.subtractVectors(v3,v2);
            assert.deepEqual([s2.x, s2.y], [-30,-30]);
            assert.equal(s2.magnitude, Math.hypot(-30,-30));

        });

 });
   

