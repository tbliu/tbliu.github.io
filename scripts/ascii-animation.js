function randomChar(greyscale) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ02345689!@#$%&';

    if (greyscale >= 168) {
	return ' ';
    }
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

function loadCanvas() {
    const div = document.getElementById('animation-canvas');
    const style = window.getComputedStyle(div);
    const divWidth = parseInt(style.width, 10);
    const charWidth = Math.ceil(9); // Average width of a character in pixels
    const charsPerLine = Math.floor(divWidth / charWidth);
    const lineHeight = parseInt(style.lineHeight, 10) || parseInt(style.fontSize, 10);
    const divHeight = parseInt(style.height, 10);
    const lines = Math.floor(divHeight / lineHeight);

    const c = document.getElementById("ascii-canvas");
    const ctx = c.getContext("2d");
    const img = document.getElementById('eye');
    ctx.drawImage(img, 0, 0, c.width, c.height);
    c.width = charsPerLine;
    c.height = lines;
    ctx.drawImage(img, 0, 0, c.width, c.height);
    const resizedImageData = ctx.getImageData(0, 0, c.width, c.height);
    const resizedData = resizedImageData.data;

    function updateCanvas() {
        let text = '';
        for (let i = 0; i < lines; i++) {
	    const line = []
            for (let j = 0; j < charsPerLine; j++) {
                const pixelIndex = (i * charsPerLine + j) * 4;
                const greyScale = 0.3 * resizedData[pixelIndex] + 0.59 * resizedData[pixelIndex + 1] + 0.11 * resizedData[pixelIndex + 2];
                
                // Check if the current line is above the drop position
                line.push(randomChar(greyScale)); // ASCII art character
            }

	    for (let j = 1; j < line.length - 1; j++) {
		if (line[j] === ' ') {
		    continue;
		}

		if (line[j-1] === ' ' && line[j+1] === ' '){
		    line[j] = '.';
		}
	    }
            text += line.join('') + '\n';
        }

        div.textContent = text;
    }

    updateCanvas();
    setInterval(updateCanvas, 90); // Adjust interval as needed
}

