import './style.css'; // Adjust this path based on where your CSS file is located
import { SceneManager } from './sceneManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const toolbox = document.getElementById('toolbox');
    const toolboxButton = document.getElementById('toolbox-button');

    toolboxButton.addEventListener('click', () => {
        toolbox.classList.toggle('open');
        toolboxButton.classList.toggle('open');
    });
    

    const circleConfigs = [
        // Small circles moving right to left
        {
            radius: 20,
            colorName: 'light mint',
            startX: 25,   // Start at 25% X
            startY: 10,   // Start at 10% Y (slightly higher)
            directionX: 1, // Move right initially
            speed: 8,     // Movement speed
            note: 'C5'    // Note to play
        }
    ];
    
    
    const container = document.getElementById('visualization');  // Initialize the SceneManager with the container
    const sceneManager = new SceneManager(container);
    // Initialize the metronome scene
    sceneManager.initScene(circleConfigs);

    // Toolbar controls
    const circleSelect = document.getElementById('circle-select');
    const radiusInput = document.getElementById('radius-input');
    const colorInput = document.getElementById('color-input');
    const noteInput = document.getElementById('note-input');
    const speedInput = document.getElementById('speed-input');
    const updateCircleButton = document.getElementById('update-circle');
    const removeCircleButton = document.getElementById('remove-circle');
    const addCircleButton = document.getElementById('add-circle');

    // Populate circle selector
    const populateCircleSelector = () => {
        circleSelect.innerHTML = '';
        sceneManager.Circles.forEach((item, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `Circle ${index + 1}`;
            circleSelect.appendChild(option);
        });
    };
    populateCircleSelector();

    // Update selected circle
    updateCircleButton.addEventListener('click', () => {
        const selectedIndex = circleSelect.value;
        const selectedCircle = sceneManager.Circles[selectedIndex].circle;

        selectedCircle.radius = parseInt(radiusInput.value);
        selectedCircle.colorName = colorInput.value;
        selectedCircle.note = noteInput.value;
        sceneManager.Circles[selectedIndex].speed = parseFloat(speedInput.value);

        // Update the circle's appearance
        selectedCircle.updateAppearance();
    });

    // Remove selected circle
    removeCircleButton.addEventListener('click', () => {
        const selectedIndex = parseInt(circleSelect.value);
        if (selectedIndex >= 0 && selectedIndex < sceneManager.Circles.length) {
            sceneManager.removeCircle(selectedIndex);
            populateCircleSelector();
        }
    });

    // Add a new circle
    addCircleButton.addEventListener('click', () => {
        const newCircleConfig = {
            radius: parseInt(radiusInput.value),
            colorName: colorInput.value,
            startX: 50,
            startY: 50,
            directionX: 1,
            speed: parseFloat(speedInput.value),
            note: noteInput.value
        };
        sceneManager.addCircle(newCircleConfig);
        populateCircleSelector();
    });
});