import * as Tone from 'tone';
import { Circle } from './circle.js';

export class SceneManager {
    constructor(container) {
        this.container = container;
        this.Circles = [];
        this.synth = new Tone.Synth().toDestination(); // Single shared synth instance
        this.isPlayingSound = false; // Flag to prevent multiple sounds playing simultaneously
    }

    // Initialize the scene with multiple circles
    initScene(circleConfigs) {
        circleConfigs.forEach(config => {
            const { radius, colorName, startX, startY, directionX, speed, note } = config;
            const circle = new Circle(radius, colorName, startX, startY, note);
            this.Circles.push({ circle, directionX, speed, note });
            circle.appendTo(this.container);
        });

        this.startAnimation();
    }

    // Start the animation for all circles
    startAnimation() {
        const moveCircles = () => {
            this.Circles.forEach((item) => {
                let { circle, directionX, speed } = item;
                
                // Get the current position in percentage
                let currentPositionX = parseFloat(circle.element.style.left);
                let currentPositionY = parseFloat(circle.element.style.top);
    
                // Update the X position linearly
                currentPositionX += directionX * speed / this.container.clientWidth * 100;
    
                // Ensure the X position stays within the bounds of 0% to 100%
                if (currentPositionX >= 80 || currentPositionX <= 20) {
                    item.directionX *= -1;
                }
    
                // Calculate the Y position based on a sine wave centered around the initial Y position
                const amplitude = this.container.clientHeight / 4; // Amplitude is a quarter of the container's height
                const frequency = (Math.PI) / this.container.clientWidth; // Full sine wave cycle across the container width
                currentPositionY = parseFloat(circle.startY) + (amplitude / this.container.clientHeight * 100) * Math.sin(frequency * (currentPositionX / 100) * this.container.clientWidth);
    
                // Apply the new positions to the circle element
                circle.setPosition(currentPositionX, currentPositionY);

                // Play sound when circle crosses the center
                if (Math.abs(currentPositionX - 50) < 1 && !this.isPlayingSound) {
                    this.playSound(circle.getNote());
                }
            });
    
            requestAnimationFrame(moveCircles); // Use requestAnimationFrame for smoother animation
        };
    
        moveCircles();
    }

    // Play sound with a debounce to prevent crashes
    playSound(note) {
        if (!this.isPlayingSound) {
            this.isPlayingSound = true;
            this.synth.triggerAttackRelease(note, "8n");

            setTimeout(() => {
                this.isPlayingSound = false;
            }, 300); // Debounce for 300ms to prevent overlapping sounds
        }
    }
}
