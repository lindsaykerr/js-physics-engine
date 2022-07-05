import * as viewer from './twoDviewer/twoDviewer.js';
import * as renderObjects from './twoDviewer/renderObjects.js';
import * as vector from './math/vectors.js';

import { acceleration } from './math/physicsformula.js';
import { makeSimCircleObject } from './physicsEngineObjects.js';

/* Instantiate web worker and sim */
const simWorker = new Worker(new URL('./simulator.js', import.meta.url))

simWorker.postMessage({'command': "initialise"}); 

const addObjectToSim = (simWorker, simObject) => {
    const message = {
        command: "sim-object",
        input: simObject,
    }
    simWorker.postMessage(message);
}

const simObj1 = makeSimCircleObject({x: 0, y:0}, 5, 60, 1.2, 1);
const simObj2 = makeSimCircleObject({x: 0, y:0}, 5, 100, 1.5, 1.2);

/* Setup sim viewer */
const canvas = document.getElementById("physics-viewer");
canvas.setAttribute("width", "600px");
canvas.style.backgroundColor = "#222222";
viewer.initialise(canvas, 600, 5, 200, 200);


/* Render item for the viewer only*/
const renderItem1 = renderObjects.circleObject(
    simObj1.id, 
    simObj1.shape.centerVector.x, 
    simObj1.shape.centerVector.y, 
    simObj1.shape.radius, 
    "yellow"
    );
const renderItem2 = renderObjects.circleObject(
    simObj2.id, 
    simObj2.shape.centerVector.x, 
    simObj2.shape.centerVector.y, 
    simObj2.shape.radius, 
    "green"
    )

/* Create a store for holding render items */    
const renderItems = {}

renderItems[renderItem1.id] = renderItem1;
renderItems[renderItem2.id] = renderItem2;





addObjectToSim(simWorker, simObj1);
addObjectToSim(simWorker, simObj2);

/* Update the position of items held in the render items store */ 
simWorker.onmessage = (e) => {
    const command = e.data.command;
    const input = e.data.input;
    switch(command) {
        case 'sim-objects':
            for(const object of input) {
                const position = object.position;
                renderItems[object.id].x = position.x;
                renderItems[object.id].y = position.y;
            }
            break;
    }
}




function tick(time) { 
    
    const draw = () => {   
        viewer.clear();
        viewer.showAxisLines(); 
        renderItem1.draw();  
        renderItem2.draw(); 
    }

    let current = performance.now();

    simWorker.postMessage({command: "cycle", input: performance.now()});
    draw();
    requestAnimationFrame(tick)
}

requestAnimationFrame(tick); 
