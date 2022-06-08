export const sim = {
    canvas : {
        width: 0,
        height: 0,
    },
    unitRatio: undefined,
    viewer: {
        edge: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
        canvasContext: null,
    }
}

const graphCoordsToCanvas = (x, y) => {
    const canvas = sim.canvas;
    const edge = sim.viewer.edge;
    const yOriginRatio = edge.top / (edge.top + Math.abs(edge.bottom));

    const xOriginRatio = edge.right / (edge.right + Math.abs(edge.left));
    console.log(yOriginRatio, xOriginRatio)
    return [
        x + canvas.width * xOriginRatio, -y + canvas.height * yOriginRatio];
}

const simCoordsToGraph = (sx, sy) => {
    return [sx * sim.unitRatio, sy * sim.unitRatio]
}

const simCoordsToCanvas = (sx, sy) => {
    return graphCoordsToCanvas(...simCoordsToGraph(sx,sy));
}


export const addPoint = (x, y, color) => {
    const ctx = sim.viewer.canvasContext;
    ctx.fillStyle = color || "white";
    ctx.beginPath();
    ctx.ellipse(...simCoordsToCanvas(x,y), 2, 2, 2*Math.PI,0, 2*Math.PI);
    ctx.fill();
}

export const showAxisLines = () => {
    const ctx = sim.viewer.canvasContext;
    ctx.strokeStyle = "pink";
    ctx.beginPath();
    ctx.moveTo(...simCoordsToCanvas(sim.viewer.edge.left,0));
    ctx.lineTo(...simCoordsToCanvas(sim.viewer.edge.right,0));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(...simCoordsToCanvas(0, sim.viewer.edge.top));
    ctx.lineTo(...simCoordsToCanvas(0, sim.viewer.edge.bottom));
    ctx.stroke();
}


/**
 * 
 * @param {HTMLElement} canvas 
 */
export function initialise(canvas, ...simBorders) {
    
    const setSimBorders = (top, bottom, left, right) => {
        const edge = sim.viewer.edge;
        edge.top = top;
        edge.bottom = bottom;
        edge.right = right;
        edge.left = left;
    }

    
    sim.canvas.height = canvas.clientHeight;
    sim.canvas.width = canvas.clientWidth;

    switch (simBorders.length) {
        case 0: (function() {
                sim.unitRatio = 1;
                const quadWidth = sim.canvas.width * 0.5;
                const quadHeight = sim.canvas.height * 0.5;
                setSimBorders(quadHeight, -quadHeight, -quadWidth, quadWidth);
            })();
            break;
        case 1: (function(){
                sim.unitRatio = sim.canvas.height / simBorders[0];
                const quadTop = simBorders[0];
                const quadSides = (sim.canvas.width * .5) / sim.unitRatio;
                setSimBorders(quadTop, 0, -quadSides, quadSides);
            })();
            
            break;
        case 2: (function(){
                sim.unitRatio = sim.canvas.width / simBorders[1];
                const quadTop = simBorders[0];
                const quadRight = simBorders[1];
                setSimBorders(quadTop, 0, 0, quadRight);
            })()
            break;
            /*
        case 2: (function() {
                sim.unitRatio = sim.canvasWeight / (simBorders[0] + ;
                const quadTop = simBorders[0];
                const quadLeft = simBorders[1];
                const quadBottom = simBorders[2];
                setSimBorders(quadTop, 0, quadLeft, 0);
            }());
            break;*/
    }



    /**
     * @type {CanvasRenderingContext2D}
     */
    const ctx = canvas.getContext('2d');
    sim.viewer.canvasContext = ctx;
    return ctx;
}
