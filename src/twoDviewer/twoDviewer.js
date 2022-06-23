import * as v from '../math/vectors.js';


export const sim = {
    canvas : {
        width: 0,
        height: 0,
    },
    graphToCanvasRatio: undefined,
    viewer: {
        originOffset: v.Vec2(),
        edge: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
        canvasContext: null,
    }
}



/*
 * Get a canvas coordinates from graph coordinates 
 */
const getCanvasCoord = (sx, sy) => {
    
    const graphCoordsToCanvas = (x, y) => {  
        return [
            x * sim.graphToCanvasRatio, 
            sim.canvas.height + (-y* sim.graphToCanvasRatio)
        ];
    }

    const pointFromOrigin = v.Vec2(sx, sy);
    const pointOnGraph = v.add(
        sim.viewer.originOffset,
        v.Vec2(sx, sy));    
  
    return graphCoordsToCanvas(pointOnGraph.x, pointOnGraph.y);
}

export const clear = () => {
    const ctx = sim.viewer.canvasContext;
    ctx.clearRect(0,0, sim.canvas.width, sim.canvas.height);
}


export const addPoint = (x, y, color) => {
    const ctx = sim.viewer.canvasContext;
    ctx.fillStyle = color || "white";
    ctx.beginPath();
    ctx.ellipse(...getCanvasCoord(x,y), 2, 2, 2*Math.PI,0, 2*Math.PI);
    ctx.fill();
}

export const addSphere = (centerX, centerY, radius, color) => {
    const ctx = sim.viewer.canvasContext;
    ctx.fillStyle = color || "white";
    ctx.beginPath();
    ctx.ellipse(...getCanvasCoord(centerX,centerY), radius, radius, 2*Math.PI,0, 2*Math.PI);
    ctx.fill();
}

export const showAxisLines = () => {
    const ctx = sim.viewer.canvasContext;
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.moveTo(...getCanvasCoord(sim.viewer.edge.left,0));
    ctx.lineTo(...getCanvasCoord(sim.viewer.edge.right,0));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(...getCanvasCoord(0, sim.viewer.edge.top));
    ctx.lineTo(...getCanvasCoord(0, sim.viewer.edge.bottom));
    ctx.stroke();
}

export const lineSegment = (x1, y1, x2, y2, color, width) => {
    const ctx = sim.viewer.canvasContext;
    ctx.strokeStyle = color || "white";
    ctx.lineWidth = width || 1;
    ctx.beginPath();
    ctx.moveTo(...getCanvasCoord(x1, y1));
    ctx.lineTo(...getCanvasCoord(x2, y2));
    ctx.stroke();
} 


/**
 * Initialises a sim viewer/graph, uses a canvas element with a set width. Edges represent X Y axis range. 
 * Manipulating these values allows the user to draw various 
 * graphs with an offset origin, ie the origin is set beyond its default location 
 * of in the lower left corner, 
 * 
 * @param {HTMLElement} canvas 
 * @param {number} pY positive Y limit of the graph
 * @param {number} nY negative Y limit of the graph
 * @param {number} pX positive X limit of the graph
 * @param {number} nX negative X limit of the graph
 */
export function initialise(canvas, pY, nY, pX, nX) {
    nY = -nY;
    nX = -nX;

    // using canvas width set the height based on the provided edge values
    const graphSize = {
        y: pY + Math.abs(nY),
        x: pX + Math.abs(nX)
    };
    canvas.setAttribute(
        "height", 
        `${(canvas.clientWidth * graphSize.y) /graphSize.x}px`
    ); 
    sim.canvas.height = canvas.clientHeight;
    sim.canvas.width = canvas.clientWidth;
    
    // value for scaling graph to canvas
    sim.graphToCanvasRatio = sim.canvas.width / graphSize.x;


    // assign edge values 
    const edge = sim.viewer.edge;
    edge.top = pY;
    edge.bottom = nY;
    edge.right = pX;
    edge.left = nX;

    // gives an offset value to graph
    sim.viewer.originOffset = v.Vec2(Math.abs(nX), Math.abs(nY)); 

    const ctx = canvas.getContext('2d');
    sim.viewer.canvasContext = ctx;
    return ctx;
}
