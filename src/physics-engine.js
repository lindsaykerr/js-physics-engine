import * as viewer from './twoDviewer/twoDviewer.js'


const canvas = document.getElementById("physics-viewer");
canvas.setAttribute("width", "600px");
canvas.style.backgroundColor = "#222222";
viewer.initialise(canvas, 100, 20, 100, 20);
viewer.showAxisLines();
viewer.addPoint(0,0, "black");
viewer.addPoint(5, 5, "red");
viewer.addPoint(5, -5, "green");
viewer.addPoint(-5, 5, "cyan");
viewer.addPoint(-5, -5, "white");
