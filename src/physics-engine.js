import * as viewer from './twoDviewer/twoDviewer.js';
import * as sim from './sim/sim.js';
import * as vector from './math/vectors.js';


const canvas = document.getElementById("physics-viewer");
canvas.setAttribute("width", "600px");
canvas.style.backgroundColor = "#222222";
viewer.initialise(canvas, 30, 0, 10, 10);
viewer.showAxisLines();

const simObj = new sim.SimObject("point",vector.fromAngle(3, 80), 1, 0, 0);
const s = new sim.Sim(simObj);

let oldtime = performance.now();
function tick(time) {
    let current = performance.now();
    s.cycle(current);
    viewer.addPoint(simObj.x, simObj.y, "green");
    requestAnimationFrame(tick)
}

requestAnimationFrame(tick); 
