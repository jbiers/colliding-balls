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

    updatePosition() {
        this.xPos = this.xPos + this.xVel;
        this.yPos = this.yPos + this.yVel;
    }
}

let s = (sk) => {
    //const exampleBall = new Ball([200, 300], [0, 0], 40, 0);

    sk.setup = () => {
        sk.createCanvas(500, 500);
    }

    let x = 250;
    let y = 500;

    sk.draw = () => {
        /*   sk.background(204);
   
           sk.ellipse(exampleBall.xPos, exampleBall.yPos, exampleBall.radius * 2, exampleBall.radius * 2);
           this.xPos = this.xPos + this.xVel;
           this.yPos = this.yPos + this.yVel;
           sk.ellipse(exampleBall.xPos, exampleBall.yPos, exampleBall.radius * 2, exampleBall.radius * 2);*/

        sk.background(200);

        sk.stroke(50);
        sk.fill(100);
        sk.ellipse(x, y, 24, 24);
        x = x + sk.random(-1, 1);
        // Moving up at a constant speed
        y = y - 1;
    }

    console.log(sk.isLooping());

}

const P5 = new p5(s);