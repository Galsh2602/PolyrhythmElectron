export class Circle {
    constructor(radius, colorName = null, x = 50, y = 50, note = null) {
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

        // Check if the provided colorName exists in the colors list
        if (colorName && this.colors[colorName.toLowerCase()]) {
            this.color = this.colors[colorName.toLowerCase()];
        } else {
            this.color = this.defaultColor;
        }

        this.note = note; // Store the note associated with this circle

        this.element = document.createElement('div');
        
        // Assign the 'circle' class to the element
        this.element.className = 'circle';
        
        // Apply dynamic styles
        this.element.style.width = `${this.radius * 2}px`;
        this.element.style.height = `${this.radius * 2}px`;
        this.element.style.borderColor = this.color; // Set the border color to the selected color
        
        // Set the initial position of the circle
        this.setPosition(x, y);
    }

    // Method to set the position of the circle
    setPosition(x, y) {
        this.element.style.left = `${x}%`;  // Position in percentage relative to the container
        this.element.style.top = `${y}%`;
        this.element.style.transform = `translate(-${x}%, -${y}%)`; // Adjust for the circle's center
    }

    // Method to append the circle to a parent element
    appendTo(parent) {
        parent.appendChild(this.element);
    }

    // Method to get the associated note
    getNote() {
        return this.note;
    }
}
