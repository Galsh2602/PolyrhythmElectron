import * as Tone from 'tone';

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
        this.defaultColor = '#FFB6B9';
        this.colorName = colorName;
        this.startX = startX;
        this.startY = startY;
        this.note = note;
        this.lastPlayed = 0;
        this.debounceTime = 500;

        // Determine the color to use
        if (colorName && this.colors[colorName.toLowerCase()]) {
            this.color = this.colors[colorName.toLowerCase()];
        } else {
            this.color = this.defaultColor;
        }

        // Create the circle element
        this.element = document.createElement('div');
        this.element.className = 'circle';

        // Set the initial appearance
        this.updateAppearance();
    }

    updateAppearance() {
        this.element.style.width = `${this.radius * 2}px`;
        this.element.style.height = `${this.radius * 2}px`;
        this.element.style.left = `${this.startX}%`;
        this.element.style.top = `${this.startY}%`;
        this.element.style.borderColor = this.color;
        this.element.style.position = 'absolute';
        this.element.style.setProperty('--glow-color', this.color);
    }

    appendTo(parent) {
        parent.appendChild(this.element);
    }

    setPosition(x, y) {
        this.element.style.left = `${x}%`;
        this.element.style.top = `${y}%`;
    }

    glow(duration = 1000) {
        this.element.classList.add('glow');
        setTimeout(() => {
            this.element.classList.remove('glow');
        }, duration);
    }

    getNote() {
        return this.note;
    }

    playSound() {
        const now = Date.now();
        if (now - this.lastPlayed >= this.debounceTime) {
            this.lastPlayed = now;
            const synth = new Tone.Synth().toDestination();
            synth.triggerAttackRelease(this.note, "8n");
            this.glow();
        }
    }
}
