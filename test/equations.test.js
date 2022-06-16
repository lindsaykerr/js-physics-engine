import * as assert from 'assert';
import * as phy from '../src/math/physicsformula.js';


describe("Speed Calculations",()=>{
  
  describe("Speed Method", ()=>{
    it("normal values",()=>{
      assert.equal(phy.speedFromDistance(10, 3).toFixed(1), "3.3");
      assert.equal(phy.speedFromDistance(10, 10).toFixed(1), "1.0");
      assert.equal(phy.speedFromDistance(2, 10).toFixed(1), "0.2");
    });
    it("divide by zero", ()=>{
      assert.equal(phy.speedFromDistance(1.0, 0), Infinity);
    });
  });

 describe("distance Method", ()=>{ 
    it("normal arguments",()=>{
  
      assert.equal(phy.distanceFromSpeed(200, 2), 400);
      assert.equal(phy.distanceFromSpeed(1, 1), 1);
      assert.equal(phy.distanceFromSpeed(0, 1), 0);
    });
  });
  describe("time Method", ()=>{ 
    it("normal arguments",()=>{
  
      assert.equal(phy.timeFromSpeed(20, 2).toFixed(1), "10.0");
      assert.equal(phy.timeFromSpeed(1, 1).toFixed(1), "1.0");
      assert.equal(phy.timeFromSpeed(2, 10).toFixed(1), "0.2");
    });
    it("divide by zero", ()=>{
  
      assert.equal(phy.timeFromSpeed(1.0, 0), Infinity);
    });
  });
});

describe("Velocity Equations", ()=> {
  it("velocity from a directional point", ()=>{

    const speed1 = phy.speedFromDistance(20, 2);
    const vel01 = phy.velocityFromADirectionalPoint(speed1, 2, 2)
    
    assert.deepEqual([vel01.x,vel01.y], [7.071067811865475, 7.071067811865475])
  });
  it("Average Velocity", ()=>{
    
    const speed1 = phy.speedFromDistance(10, 1);
    const vel01 = phy.velocityFromADirectionalPoint(speed1, 1, 1);
    const speed2 = phy.speedFromDistance(30, 1);
    const vel02 = phy.velocityFromADirectionalPoint(speed2, -1, 1);
    const avg = phy.averageVelocity(vel01, vel02);
    
    assert.deepEqual([avg.x, avg.y], [-7.071067811865474, 14.14213562373095])
  });
  it("Acceleration", ()=>{
    
    const startVel = phy.velocityFromADirectionalPoint(
      20,
      1
    );
    const endVel = phy.velocityUsingCoord(5);
    const accel = phy.acceleration(phy.velocityUsingCoord(0, 0), endVel, 1);
    const endSpeed = phy.finalVelocityFromAcceleration(
      startVel,
      accel,
      1);
 
    const avgSpeed = phy.averageVelocity(startVel, endSpeed);
    
    assert.equal(avgSpeed.x, 22.5);
  });
})