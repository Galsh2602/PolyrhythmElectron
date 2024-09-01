import './style.css'; // Adjust this path based on where your CSS file is located
import { SceneManager } from './sceneManager.js';

document.addEventListener('DOMContentLoaded', () => {
    // Get the container where scenes will be rendered


    const circleConfigs = [
        {
            radius: 50,
            colorName: 'light mint',
            startX: 25,    // Start at 25% X
            startY: 50,    // Start at 50% Y
            directionX: 1, // Move right initially
            speed: 3,      // Movement speed
            note: 'G4'     // Note to play
        },
        {
            radius: 50,
            colorName: 'sky blue',
            startX: 75,    // Start at 75% X
            startY: 50,    // Start at 50% Y
            directionX: -1,// Move left initially
            speed: 4,      // Movement speed
            note: 'E4'     // Note to play
        }
        // Add more circles as needed
    ];
    const container = document.getElementById('visualization');

    // Initialize the SceneManager with the container
    const sceneManager = new SceneManager(container);

    // Initialize the metronome scene
    sceneManager.initScene(circleConfigs);
});
