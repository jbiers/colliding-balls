import * as p5 from 'p5';
import './style.css';

const canvas = (() => {
    const CANVAS_WIDTH = 500;
    const CANVAS_HEIGHT = 500;


    class Ball {
        constructor(position, velocity, radius, color) {
            this.xPos = position[0];
            this.yPos = position[1];

            this.xVel = velocity[0];
            this.yVel = velocity[1];

            this.radius = radius;

            // the larger, the heavier
            this.mass = radius;

            // Horizontal and vertical momentum
            this.xMom = this.xVel * this.mass;
            this.yMom = this.yVel * this.mass;

            this.color = color;
        }

        updatePosition() {
            this.xPos = this.xPos + this.xVel;
            this.yPos = this.yPos + this.yVel;
        }

        detectBorder() {
            if ((this.xPos + this.radius) > CANVAS_WIDTH) {
                this.xVel = -this.xVel;
                this.xPos = CANVAS_WIDTH - this.radius;
            }

            else if ((this.xPos - this.radius) < 0) {
                this.xVel = -this.xVel;
                this.xPos = this.radius;
            }

            if ((this.yPos + this.radius) > CANVAS_HEIGHT) {
                this.yVel = -this.yVel;
                this.yPos = CANVAS_HEIGHT - this.radius;
            }

            else if ((this.yPos - this.radius) < 0) {
                this.yVel = -this.yVel;
                this.yPos = this.radius;
            }
        }

        distance(anotherBall) {
            return Math.sqrt(((this.xPos - anotherBall.xPos) ** 2) + ((this.yPos - anotherBall.yPos) ** 2));
        }

        velocityAfterCollision(anotherBall) {
            let temporaryXVel, temporaryYVel;

            temporaryXVel = this.xVel;
            temporaryYVel = this.yVel;

            this.xVel = (this.xVel * (this.mass - anotherBall.mass) + (2 * anotherBall.mass * anotherBall.xVel)) / (this.mass + anotherBall.mass);
            this.yVel = (this.yVel * (this.mass - anotherBall.mass) + (2 * anotherBall.mass * anotherBall.yVel)) / (this.mass + anotherBall.mass);

            anotherBall.xVel = (anotherBall.xVel * (anotherBall.mass - this.mass) + (2 * this.mass * temporaryXVel)) / (anotherBall.mass + this.mass);
            anotherBall.yVel = (anotherBall.yVel * (anotherBall.mass - this.mass) + (2 * this.mass * temporaryYVel)) / (anotherBall.mass + this.mass);
        }

        detectCollision(anotherBall) {
            if (this.distance(anotherBall) < (this.radius + anotherBall.radius)) {
                this.velocityAfterCollision(anotherBall);
            }
        }
    }

    const addBall = (newBall) => {
        balls.push(newBall);
    }

    let balls;

    let s = (sk) => {
        const exampleBall = new Ball([50, 250], [-10, 10], 50, 'green');
        const exampleBall2 = new Ball([200, 200], [2, 5], 20, 'magenta');
        const exampleBall3 = new Ball([400, 300], [6, -5], 30, 'red');

        balls = [exampleBall, exampleBall2, exampleBall3];

        sk.setup = () => {
            sk.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        }


        sk.draw = () => {
            sk.background(255);

            for (let i = 0; i < balls.length; i++) {
                balls[i].updatePosition();

                for (let j = i + 1; j < balls.length; j++) {
                    balls[i].detectCollision(balls[j]);
                }

                balls[i].detectBorder();

                sk.fill(balls[i].color);
                sk.noStroke();
                sk.ellipse(balls[i].xPos, balls[i].yPos, balls[i].radius * 2, balls[i].radius * 2)
            }
        }
    }

    const P5 = new p5(s);

    return {
        addBall,
        Ball,
        balls
    };
})();

const DOMmanipulator = (() => {
    const pageTitle = document.createElement('h1');

    pageTitle.innerHTML = "Colliding Balls";
    document.body.appendChild(pageTitle);

    // canvas.addBall(new canvas.Ball([450, 250], [-10, 10], 10, 'blue'));
})();