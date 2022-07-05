import * as viewer from './twoDviewer.js';


export const circleObject = (id, x, y, radius, color) => {
    return {
        id,
        x,
        y,
        radius,
        color,
        draw() {
            const x = this.x;
            const y = this.y;
            const radius = this.radius;
            const color = this.color;
            viewer.addSphere(x,y,radius,color);
        },
    }
}