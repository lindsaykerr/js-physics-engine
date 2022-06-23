import * as viewer from './twoDviewer/twoDviewer.js';
import * as sim from './sim/sim.js';
import * as vector from './math/vectors.js';


const canvas = document.getElementById("physics-viewer");
canvas.setAttribute("width", "600px");
canvas.style.backgroundColor = "#222222";
viewer.initialise(canvas, 600, 5, 200, 200);


const simObj1 = new sim.SimObject(55, 1.7, 1.2);
const simObj2 = new sim.SimObject(120, 1.6, 1.1);
const testsim = new sim.Sim();
testsim.add(simObj1)
testsim.add(simObj2)


let oldtime = performance.now();
function tick(time) { 
    viewer.clear();
    viewer.showAxisLines();
    let current = performance.now();
    testsim.cycle(time);
    viewer.addSphere(simObj1.position.x, simObj1.position.y, 5, "green");
    viewer.addSphere(simObj2.position.x, simObj2.position.y, 5, "yellow");
   
    requestAnimationFrame(tick)
}

requestAnimationFrame(tick); 
