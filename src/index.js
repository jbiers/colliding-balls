import * as p5 from 'p5';
import './style.css';

class Ball {
    constructor(position, velocity, radius, color) {
        this.xPos = position[0];
        this.yPos = position[1];

        this.xVel = velocity[0];
        this.yVel = velocity[1];

        this.radius = radius;

        this.color = color;
    }
}

let s = (sk) => {
    const exampleBall = new Ball([200, 300], [0, 0], 40, 0);

    sk.setup = () => {
        sk.createCanvas(600, 600);
    }

    sk.draw = () => {
        sk.background(204);

        sk.ellipse(exampleBall.xPos, exampleBall.yPos, exampleBall.radius * 2, exampleBall.radius * 2);
    }
}

const P5 = new p5(s);