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


describe("VelocityCalc",()=>{
  describe("velocity method",()=>{
    it("turn speed into velocity vec1", ()=>{
      const speedEq = math.SpeedCalc.speed;
      const velocityEq = math.velocityCalc.velocity;
      const speed = speedEq(10, 4);
      const vel1 = velocityEq(speed, 1);
      assert.equal(vel1 instanceof Vec1,true); 
    });
    it("turn speed into velocity vec2", ()=>{
      const speedEq = math.SpeedCalc.speed;
      const velocityEq = math.velocityCalc.velocity;
      const speed = speedEq(10, 4);
      const vel1 = velocityEq(speed, 1, 1);
      assert.equal(vel1 instanceof Vec2,true); 
    });
  });
});

describe("AccelerationCalc", ()=>{
  it("test acceleration vec1 1",()=>{
    const acceleration = math.AccelerationCalc.acceleration;
    const vecA = new Vec1()
    vecA.fromScalarAndDirection(10, 1);
    const vecB = new Vec1()
    vecB.fromScalarAndDirection(20, 1);
    const acc = acceleration(vecA, vecB, 10);
    assert.equal(acc.point, 1);
  });
  it("test acceleration vec2 1",()=>{
    const acceleration = math.AccelerationCalc.acceleration;
    const vecA = new Vec2()
    vecA.fromScalarAndDirection(10, 0, 1);
    const vecB = new Vec2()
    vecB.fromScalarAndDirection(20, 1, 0);
    const acc = acceleration(vecA, vecB, 10);
  });
  
});