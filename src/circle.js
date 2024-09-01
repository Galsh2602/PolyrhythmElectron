export class Circle {
    constructor(radius, colorName = null, startX = 50, startY = 50, note = null) {
        this.radius = radius;
        this.colors = {
            'soft coral': '#FFB6B9',
            'blush pink': '#FFDAC1',
            'pale peach': '#FFE7C7',
            'light mint': '#B4F8C8',
            'sky blue': '#A0E7E5',
            'lavender': '#C8BFE7'
        };
        this.defaultColor = '#FFB6B9'; // Default to soft coral if the color is not found
        this.startX = startX;
        this.startY = startY;
        this.note = note;

        // Check if the provided colorName exists in the colors list
        if (colorName && this.colors[colorName.toLowerCase()]) {
            this.color = this.colors[colorName.toLowerCase()];
        } else {
            this.color = this.defaultColor;
        }
        console.log(`Circle initialized at X: ${startX}%, Y: ${startY}%`);

        this.element = document.createElement('div');
        
        // Assign the 'circle' class to the element
        this.element.className = 'circle';
        
        // Apply dynamic styles
        this.element.style.width = `${this.radius * 2}px`;
        this.element.style.height = `${this.radius * 2}px`;
        this.element.style.left = `${this.startX}%`;
        this.element.style.top = `${this.startY}%`;  // Ensure startY is applied here
        this.element.style.borderColor = this.color; // Set the border color to the selected color
        this.element.style.setProperty('--glow-color', this.color); // Set the glow color dynamically
    }

    // Method to append the circle to a parent element
    appendTo(parent) {
        parent.appendChild(this.element);
    }

    // Method to set the position of the circle
    setPosition(x, y) {
        this.element.style.left = `${x}%`;
        this.element.style.top = `${y}%`;
    }

    // Method to trigger the glow effect
    glow(duration = 1000) {
        this.element.classList.add('glow');
        setTimeout(() => {
            this.element.classList.remove('glow');
        }, duration);
    }

    // Method to get the note assigned to the circle (if applicable)
    getNote() {
        return this.note;
    }
}
