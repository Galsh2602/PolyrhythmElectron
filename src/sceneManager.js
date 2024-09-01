import * as Tone from 'tone';
import { Circle } from './circle.js';

export class SceneManager {
    constructor(container) {
        this.container = container;
        this.Circles = [];
        this.synth = new Tone.Synth().toDestination();
    }

    // Initialize the scene with multiple circles
    initScene(circleConfigs) {
        circleConfigs.forEach(config => {
            this.createCircle(config);
        });
        this.startAnimation();
    }

    // Create a circle based on configuration and add it to the scene
    createCircle(config) {
        const { radius, colorName, startX, startY, directionX, directionY, speed, note } = config;
        const circle = new Circle(radius, colorName, startX, startY, note);
        this.Circles.push({ circle, directionX, directionY, speed, note });
        circle.appendTo(this.container);
    }

    // Start the animation for all circles
    startAnimation() {
        const moveCircles = () => {
            this.Circles.forEach(item => {
                this.updateCirclePosition(item);
            });
            requestAnimationFrame(moveCircles);
        };
        moveCircles();
    }

    // Update the position of a circle based on its current direction and speed
    updateCirclePosition(item) {
        let { circle, directionX, speed } = item;
        let currentPositionX = parseFloat(circle.element.style.left);
        let currentPositionY = parseFloat(circle.element.style.top);

        // Update the X position linearly
        currentPositionX += directionX * speed / this.container.clientWidth * 100;

        // Reverse direction if the circle hits the horizontal bounds
        if (currentPositionX >= 100 || currentPositionX <= 0) {
            item.directionX *= -1;
        }

        // Calculate Y position based on a sine wave
        const amplitude = this.container.clientHeight / 4;
        const frequency = Math.PI / this.container.clientWidth;
        currentPositionY = 50 + (amplitude / this.container.clientHeight * 100) * Math.sin(frequency * (currentPositionX / 100) * this.container.clientWidth);

        // Apply new positions to the circle element
        circle.setPosition(currentPositionX, currentPositionY);

        // Play sound if the circle reaches the center
        if (Math.abs(currentPositionX - 50) < 1) {
            this.playSound(circle.getNote());
        }
    }

    // Play a sound for the circle's note
    playSound(note) {
        this.synth.triggerAttackRelease(note, "8n");
    }
}
