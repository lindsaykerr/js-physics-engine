import * as assert from 'assert';

//import {Vec1, Vec2} from '../src/math/vectors.js';
import * as v from '../src/math/vectors.js';





describe("Testing Vec2", ()=>{
    
    describe("Initialisation ",()=>{
        it("Empty Vec2",()=>{
            const v1 = v.Vec2();
            assert.deepEqual([v1.x,v1.y], [0,0]);
        });
        it("positive  Vec2",()=>{
            const v1 = v.Vec2(1, 25);
            assert.deepEqual([v1.x, v1.y],[1, 25]);

        });
        it("negative Vec2",()=>{
            const v1 = v.Vec2(-2);
            assert.deepEqual([v1.x, v1.y], [-2, 0]);
        });

    });
   describe("Methods", ()=>{



        it("scale factor",()=>{
            const v1 = v.Vec2(-1, 1);
            const s1 = v.scale(v1, -20);
            assert.deepEqual([s1.x, s1.y], [20,-20]);
            const s2 = v.scale(s1, 0.5);
            assert.deepEqual([s2.x, s2.y], [10, -10]);
            const s3 = v.scale(s2, 0);
            assert.deepEqual([s3.x, s3.y], [0, -0]);
            // 0 magnitude should not be able to be scaled
            const s4 = v.scale(s3, 0.1);
            assert.deepEqual([s4.x, s4.y], [0, -0]);
        });

        it("normalise Points", ()=>{
            const norm = (x, y)=> {
                const r = 1/Math.hypot(x, y);
                return [x*r, y*r];
            } 
            const v1 = v.Vec2(-3, 18);
            const n1 = v.normalise(v1);
            assert.deepEqual([n1.x, n1.y], norm(-3,18));
            
            const v2 = v.Vec2(6,7);
            const n2 = v.normalise(v2);
            assert.deepEqual([n2.x, n2.y], norm(6, 7));
            
            const v3 = v.Vec2(0,0);
            const n3 = v.normalise(v3);
            assert.deepEqual([n3.x, n3.y], [0,0]);
        });

       
        it("divide by value",()=>{
            const v1 = v.Vec2(10, 10);
            const d1 = v.divideBy(v1, 2);
            assert.deepEqual([d1.x, d1.y],[5, 5]);

            const v2 = v.Vec2(0, 1);
            const d2 = v.divideBy(v2, 2);
            assert.deepEqual([d2.x, d2.y], [0, .5]);

            const v3 = v.Vec2(-20, 5);
            const d3 = v.divideBy(v3, 5);
            assert.deepEqual([d3.x, d3.y], [-4, 1]);

            const v4 = v.Vec2(-7, 8);
            const d4 = v.divideBy(v4,0);
            assert.deepEqual([d4.x, d4.y], [-Infinity, Infinity]);
        });

            
        });
        it("add vector",()=>{
            const v1 = v.Vec2(2, 2);
            const v2 = v.Vec2(5, 5);
            const a1 = v.add(v1, v2);
            assert.deepEqual([a1.x, a1.y], [7,7]);
            
            const v3 = v.Vec2(-23, -23);
            const a2 = v.add(v2, v3);
            assert.deepEqual([a2.x, a2.y], [-18,-18]);
        });
      it("subtract vector",()=>{
            const v1 = v.Vec2(10, 10);
            const v2 = v.Vec2(5, 5);
            const s1 = v.subtract(v1, v2);
            assert.deepEqual([s1.x, s1.y], [5, 5]);
            
            const v3 = v.Vec2(-25, -25);
            const s2 = v.subtract(v3,v2);
            assert.deepEqual([s2.x, s2.y], [-30,-30]); 

        });

 });
   

