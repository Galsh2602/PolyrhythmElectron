import { Circle } from './circle.js';
import * as Tone from 'tone';
export class SceneManager {
    constructor(container) {
        this.container = container;
        this.Circles = [];
        this.synth = null; // Initialize the synth to null
        this.synth = new Tone.Synth().toDestination();
        // Dynamically import Tone.js and initialize the synth
    }

    // Initialize the scene with multiple circles
    initScene(circleConfigs) {
        circleConfigs.forEach(config => {
            const { radius, colorName, startX, startY, directionX, directionY, speed, note } = config;
            const circle = new Circle(radius, colorName, startX, startY, note);
            this.Circles.push({ circle, directionX, directionY, speed, note });
            circle.appendTo(this.container);
        });

        this.startAnimation();
    }

    // Start the animation for all circles
    startAnimation() {
        const moveCircles = () => {
            this.Circles.forEach(item => {
                let { circle, directionX, speed } = item;
                
                let currentPositionX = parseFloat(circle.element.style.left);
                let currentPositionY = parseFloat(circle.element.style.top);
    
                currentPositionX += directionX * speed / this.container.clientWidth * 100;
    
                if (currentPositionX >= 100 || currentPositionX <= 0) {
                    item.directionX *= -1;
                }
    
                const amplitude = this.container.clientHeight / 4;
                const frequency = Math.PI / this.container.clientWidth;
                currentPositionY = 50 + (amplitude / this.container.clientHeight * 100) * Math.sin(frequency * (currentPositionX / 100) * this.container.clientWidth);
    
                circle.setPosition(currentPositionX, currentPositionY);
                
                if (Math.abs(currentPositionX - 50) < 1 && this.synth) { // Ensure the synth is loaded
                    this.playSound(circle.getNote());
                }
            });
    
            requestAnimationFrame(moveCircles);
        };

        moveCircles();
    }

    playSound(note) {
        if (this.synth) { // Check if the synth is loaded before playing the sound
            this.synth.triggerAttackRelease(note, "8n");
        }
    }
}
