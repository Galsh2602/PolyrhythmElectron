import './style.css'; // Adjust this path based on where your CSS file is located
import { SceneManager } from './sceneManager.js';

document.addEventListener('DOMContentLoaded', () => {
    // Get the container where scenes will be rendered


    const circleConfigs = [
        // Small circles moving right to left
        {
            radius: 20,
            colorName: 'light mint',
            startX: 25,   // Start at 25% X
            startY: 10,   // Start at 10% Y (slightly higher)
            directionX: 1, // Move right initially
            speed: 2,     // Movement speed
            note: 'C5'    // Note to play
        },
        {
            radius: 20,
            colorName: 'sky blue',
            startX: 25,   // Start at 25% X
            startY: 20,   // Start at 15% Y (slightly lower)
            directionX: 1, // Move right initially
            speed: 2,     // Same speed for simplicity
            note: 'D5'    // Note to play
        },
    
        // Small circles moving left to right
        {
            radius: 20,
            colorName: 'blush pink',
            startX: 75,   // Start at 75% X
            startY: 10,   // Start at 10% Y (slightly higher)
            directionX: -1, // Move left initially
            speed: 2,     // Movement speed
            note: 'E5'    // Note to play
        },
        {
            radius: 20,
            colorName: 'lavender',
            startX: 75,   // Start at 75% X
            startY: 20,   // Start at 15% Y (slightly lower)
            directionX: -1, // Move left initially
            speed: 2,     // Same speed for simplicity
            note: 'G5'    // Note to play
        },
    
        // Bigger, slower circles positioned lower on the screen
        {
            radius: 50,
            colorName: 'pale peach',
            startX: 30,   // Start at 30% X
            startY: 70,   // Start at 70% Y (lower on the screen)
            directionX: 1, // Move slowly to the right
            speed: 1,     // Slow movement speed
            note: 'C4'    // Deeper note
        },
        {
            radius: 50,
            colorName: 'light mint',
            startX: 50,   // Start at 50% X (centered)
            startY: 75,   // Start at 75% Y (lower on the screen)
            directionX: -1, // Move slowly to the left
            speed: 1,     // Slow speed for consistency
            note: 'A3'    // Deeper note
        },
        {
            radius: 50,
            colorName: 'lavender',
            startX: 70,   // Start at 70% X
            startY: 70,   // Start at 70% Y (lower on the screen)
            directionX: 1, // Move slowly to the right
            speed: 1,     // Slow movement speed
            note: 'G3'    // Deeper note
        }
    ];
    
    
    const container = document.getElementById('visualization');

    // Initialize the SceneManager with the container
    const sceneManager = new SceneManager(container);

    // Initialize the metronome scene
    sceneManager.initScene(circleConfigs);
});
