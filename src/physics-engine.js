import * as viewer from './twoDviewer/twoDviewer.js'


const canvas = document.getElementById("physics-viewer");
canvas.setAttribute("width", "600px");
canvas.setAttribute("height", "600px");
canvas.style.backgroundColor = "#254984";
viewer.initialise(canvas,100, 100);
viewer.addPoint(30, 30, "red");
viewer.showAxisLines();
console.log(viewer.sim)
