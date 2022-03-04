import * as p5 from 'p5';

let s = (sk) => {
    sk.setup = () => {
        let gfx = sk.createGraphics(window.innerWidth, window.innerHeight);
        let gfx2;
        sk.createCanvas(window.innerWidth, window.innerHeight)
        sk.background(40);
        gfx.stroke(200);
        gfx.strokeWeight(3);

        for (let i = 0; i < 1000; i++) {
            gfx.point(
                Math.random()
                * window.innerWidth, Math.random()
            * window.innerHeight
            );
        }
        //creating the cloned object
        gfx2 = { ...gfx };
        sk.image(gfx, 0, 0);
        sk.image(gfx2, 2, 2);
    }

    sk.draw = () => {

    }
}

const P5 = new p5(s);