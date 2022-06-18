import * as viewer from './twoDviewer/twoDviewer.js';
import * as sim from './sim/sim.js';
import * as vector from './math/vectors.js';


const canvas = document.getElementById("physics-viewer");
canvas.setAttribute("width", "600px");
canvas.style.backgroundColor = "#222222";
viewer.initialise(canvas, 600, 5, 200, 200);
viewer.showAxisLines();

const simObj = new sim.SimObject(67, 1.6, 1.2);
const s = new sim.Sim(simObj);

let oldtime = performance.now();
function tick(time) {
    let current = performance.now();
    s.cycle(time);
    viewer.addPoint(simObj.position.x, simObj.position.y, "green");
    requestAnimationFrame(tick)
}

requestAnimationFrame(tick); 
