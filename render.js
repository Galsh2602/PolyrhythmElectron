document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('visualization');
    const circles = [];
    const numCircles = 10;
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    const maxRadius = 200;
    let speedFactor = 1; // Initial speed factor set to 1

    // Define a set of harmonious notes
    const notes = ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5", "G5", "A5"];
    const synths = [];

    // Create a synth for each note
    notes.forEach(note => {
        synths.push(new Tone.Synth().toDestination());
    });

    // Speed control
    const speedControl = document.getElementById('speed');
    speedControl.addEventListener('input', (e) => {
        speedFactor = parseFloat(e.target.value);
        console.log(`Speed factor updated: ${speedFactor}`); // Debugging output
    });

    // Create a circle element
    function createCircle(radius, initialAngle, lengthFactor) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.width = `${radius * 2}px`;
        circle.style.height = `${radius * 2}px`;

        circles.push({ element: circle, radius, angle: initialAngle, lengthFactor, noteIndex: circles.length });
        container.appendChild(circle);
    }

    // Update the position and animation of the circles
    function updateCircles() {
        circles.forEach((circleData, index) => {
            circleData.angle += speedFactor * circleData.lengthFactor * 0.02; // Update angle

            const x = centerX  + maxRadius * Math.sin(circleData.angle) * circleData.lengthFactor;
            const y = centerY  + maxRadius * Math.sin(circleData.angle) * circleData.lengthFactor;

            // Debugging output
            console.log(`Circle ${index}: x=${x}, y=${y}, angle=${circleData.angle}`);

            circleData.element.style.left = `${x - circleData.radius}px`;
            circleData.element.style.top = `${y - circleData.radius}px`;

            // Adjusted threshold for triggering sound
            const threshold = 20;  // Increase the threshold to ensure sound triggers even if the circle is slightly off-center
            if (Math.abs(x - centerX) < threshold) {
                playSound(circleData.noteIndex, x);
                showVisualFeedback(circleData.element);
            }
        });

        requestAnimationFrame(updateCircles); // Continue the animation loop
    }

    // Play a sound based on the circle's assigned note
    function playSound(noteIndex, x) {
        const synth = synths[noteIndex];
        const pan = (x - centerX) / centerX; // Normalize panning between -1 and 1
        synth.triggerAttackRelease(notes[noteIndex], "8n", undefined, 0.8, pan);
    }

    // Provide visual feedback when a sound is played
    function showVisualFeedback(element) {
        element.style.transition = 'transform 0.1s ease, background-color 0.1s ease';
        element.style.transform = 'scale(1.2)';
        element.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';

        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.backgroundColor = '';
        }, 100);
    }

    // Initialize circles with different sizes, angles, and length factors
    for (let i = 0; i < numCircles; i++) {
        const initialAngle = Math.PI / numCircles * i * 2; // Evenly distribute the initial angles
        createCircle(20 + i * 5, initialAngle, 0.5 + Math.random() * 1.5);
    }

    // Start the circle animation
    updateCircles();

    // Handle window resize
    window.addEventListener('resize', () => {
        centerX = window.innerWidth / 2;
        centerY = window.innerHeight / 2;
    });
});
