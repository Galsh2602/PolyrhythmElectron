import { Circle } from './circle.js';

export class SceneManager {
    constructor(container) {
        this.container = container;
        this.Circles = [];
    }

    initScene(circleConfigs) {
        circleConfigs.forEach(config => {
            const { radius, colorName, startX, startY, directionX, speed, note } = config;
            const circle = new Circle(radius, colorName, startX, startY, note);
            this.Circles.push({ circle, directionX, speed });
            circle.appendTo(this.container);
        });
        this.startAnimation();
    }

    addCircle(config) {
        const { radius, colorName, startX, startY, directionX, speed, note } = config;
        const circle = new Circle(radius, colorName, startX, startY, note);
        this.Circles.push({ circle, directionX, speed });
        circle.appendTo(this.container);
    }

    removeCircle(index) {
        if (index >= 0 && index < this.Circles.length) {
            const { circle } = this.Circles[index];
            circle.element.remove(); // Remove the circle from the DOM
            this.Circles.splice(index, 1); // Remove the circle from the array
        }
    }

    startAnimation() {
        const moveCircles = () => {
            this.Circles.forEach(item => {
                const { circle, directionX, speed } = item;
                let currentPositionX = parseFloat(circle.element.style.left);
                let currentPositionY = parseFloat(circle.element.style.top);

                currentPositionX += directionX * speed / this.container.clientWidth * 100;
                if (currentPositionX >= 90 || currentPositionX <= 10) {
                    item.directionX *= -1;
                }

                const amplitude = this.container.clientHeight / 4;
                const frequency = Math.PI / this.container.clientWidth;
                currentPositionY = circle.startY + (amplitude / this.container.clientHeight * 100) * Math.sin(frequency * (currentPositionX / 100) * this.container.clientWidth);

                circle.setPosition(currentPositionX, currentPositionY);

                // Play sound if the circle is near the center
                if (Math.abs(currentPositionX - 50) < 2) {
                    circle.playSound();
                }
            });
            requestAnimationFrame(moveCircles);
        };
        moveCircles();
    }
}
