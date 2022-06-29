import * as viewer from './twoDviewer/twoDviewer.js';
import * as vector from './math/vectors.js';


/* config viewer */
const canvas = document.getElementById("physics-viewer");
canvas.setAttribute("width", "600px");
canvas.style.backgroundColor = "#222222";
viewer.initialise(canvas, 600, 5, 200, 200);

const generateID = (() => {
    let value = 0;
    return {
        next: () => {
            value++;
            return value;
        }
    }})();


const makeSimObject = (physicsProperties, renderProperties) => {
    return {
        id: generateID.next(),
        physics: physicsProperties,
        rendering: renderProperties,
    }
}

const simWorker = new Worker(new URL('./simulator.js', import.meta.url))

const simObj1 = makeSimObject({
    x: 0,
    y: 0,
    direction: 55,
    acceleration: 1.7,
    mass: 1.2 
} ,{
    colour: "green",
    radius: 5,
});

const simObj2 = makeSimObject({
    x: 0,
    y: 0,
    direction: 120,
    acceleration: 1.6,
    mass: 1.1 
} ,{
    colour: "yellow",
    radius: 5,
});

const simObjects = {}
simObjects[simObj1.id] = simObj1;
simObjects[simObj2.id] = simObj2;

const addObjectToSim = (simworker, simObject) => {
    const message = {
        command: "sim-object",
        input: {
            id : simObject.id, 
            position: {
                x: simObject.physics.x, 
                y: simObject.physics.y
            },
            direction: simObject.physics.direction,
            acceleration: simObject.physics.acceleration,
            mass: simObject.physics.mass
        }
    }
    simworker.postMessage(message)
}
simWorker.postMessage({'command': "initialise"})  
addObjectToSim(simWorker, simObj1);
addObjectToSim(simWorker, simObj2);


simWorker.onmessage = (e) => {
    const command = e.data.command;
    const input = e.data.input;
    switch(command) {
        case 'sim-objects':
            for(const object of input) {
                const position = object.position;
                simObjects[object.id].physics.x = position.x;
                simObjects[object.id].physics.y = position.y;
            }
            break;
    }
}

const draw = () => {   
    viewer.clear();
    viewer.showAxisLines(); 
    viewer.addSphere(
        simObj1.physics.x, 
        simObj1.physics.y, 
        simObj1.rendering.radius, 
        simObj1.rendering.colour
        );
    viewer.addSphere(
        simObj2.physics.x, 
        simObj2.physics.y, 
        simObj2.rendering.radius, 
        simObj2.rendering.colour
        );    
}


let oldtime = performance.now();

function tick(time) { 
 
    let current = performance.now();
    simWorker.postMessage({command: "cycle", input: performance.now()});
    draw();
    requestAnimationFrame(tick)
}

requestAnimationFrame(tick); 
