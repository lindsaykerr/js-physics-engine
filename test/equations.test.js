import * as assert from 'assert';
import * as math from '../src/math/math.js';
import {Vec1, Vec2} from '../src/math/vectors.js'

describe("Speed Calculations",()=>{
  
  describe("Speed Method", ()=>{
    it("normal values",()=>{
      assert.equal(math.SpeedCalc.speed(10, 3).toFixed(1), "3.3");
      assert.equal(math.SpeedCalc.speed(10, 10).toFixed(1), "1.0");
      assert.equal(math.SpeedCalc.speed(2, 10).toFixed(1), "0.2");
    });
    it("divide by zero", ()=>{
      assert.equal(math.SpeedCalc.speed(1.0, 0), Infinity);
    });
  });

 describe("distance Method", ()=>{ 
    it("normal arguments",()=>{
      assert.equal(math.SpeedCalc.distance(200, 2), 400);
      assert.equal(math.SpeedCalc.distance(1, 1), 1);
      assert.equal(math.SpeedCalc.distance(0, 1), 0);
    });
  });
  describe("time Method", ()=>{ 
    it("normal arguments",()=>{
      assert.equal(math.SpeedCalc.time(20, 2).toFixed(1), "10.0");
      assert.equal(math.SpeedCalc.time(1, 1).toFixed(1), "1.0");
      assert.equal(math.SpeedCalc.time(2, 10).toFixed(1), "0.2");
    });
    it("divide by zero", ()=>{
      assert.equal(math.SpeedCalc.time(1.0, 0), Infinity);
    });
  });
});

describe("Vec1",()=>{
  it("initialize a Vec1",()=>{
    const vec1 = new Vec1(1);
    assert.equal(vec1.coordinate, 1);
  }); 

  it("add two similar vectors", ()=>{
    const A = new Vec1(4);
    const C = A.add(new Vec1(-2));
    assert.equal(C.coordinate, 2);;
  });
});

describe("Vec 2",()=>{
  it("initialize a Vec2",()=>{
    const vec2 = new Vec2(2, [2, 8]);
    //console.log(vec2.coordinate)
    const ratio = 1 / Math.sqrt(2*2 + 8*8);
    assert.deepEqual(vec2.coordinate, [2*(2*ratio), 2*(8*ratio)]);
  }); 
  it("empty vec 2", ()=>{
    const empVec2 = new Vec2();
    assert.equal(empVec2.magnitude, 0);
    assert.deepEqual(empVec2.coordinate, [0,0]);
  });
  it("add two vec 2", ()=>{
    const vec2A = new Vec2(3, [10,-5]);
    const vec2B = new Vec2(4, [3, 3]);
    const vec2C = vec2A.add(vec2B);

    const x = Math.floor(vec2C.coordinate[0]);
    const y = Math.floor(vec2C.coordinate[1]);

    assert.equal(x, 5);
    assert.equal(y, 1);
  });
  
  it("subtract magnitude Vec2",()=>{
    const vecA = new Vec2(2, [2, 8]);
    const vecB = new Vec2(4, [2, 5]);
    const vecC = vecA.subtract(vecB);
    const x = Math.floor(vecC.coordinate[0]);
    const y = Math.floor(vecC.coordinate[1]);
    assert.equal(x, -2);
    assert.equal(y, -2);
  });
 

});


describe("VelocityCalc",()=>{
  describe("velocity method",()=>{
    it("turn speed into velocity vec1", ()=>{
      const speedEq = math.SpeedCalc.speed;
      const velocityEq = math.velocityCalc.velocity;
      const speed = speedEq(10, 4);
      const vel1 = velocityEq(speed, [1]);
      assert.equal(vel1 instanceof Vec1,true); 
    });
  });
});
/*
*
describe("AccelerationCalc", ()=>{
  it("test acceleration",()=>{
    const acceleration = math.AccelerationCalc.acceleration;
    const acc1 = acceleration(
      new Vec2(60, [2, 3]),
      new Vec2(120, [3, 1]),
      10
      );
    console.log(acc1.coordinate, acc1.magnitude)
  });
});
*?



  
  