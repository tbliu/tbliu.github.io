function dragWindow() {
    var xLoc = 0, yLoc = 0;
    const element = document.getElementById('window')
    const header = document.getElementById('window-header')
    const sensitivity = 1;

    function dragMouseDown(e) {
	e = e || window.event;
	e.preventDefault();
	xLoc = e.clientX;
	yLoc = e.clientY;

	document.onmouseup = closeDragElement;
	document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
	e = e || window.event;
	e.preventDefault();

	const winW = document.documentElement.clientWidth || document.body.clientWidth,
	    winH = document.documentElement.clientHeight || document.body.clientHeight;
	const maxX = winW - element.offsetWidth - 1,
	    maxY = winH - element.offsetHeight - 1;

	// Calculate new position
	xOffset = xLoc - e.clientX
	yOffset = yLoc - e.clientY
	xLoc = e.clientX;
	yLoc = e.clientY;

	// Set the element's new position if it doesn't go out of the viewport
	if ((element.offsetTop - yOffset) <= maxY && (element.offsetTop - yOffset) >= 0) {
	    element.style.top = (element.offsetTop - yOffset) + "px";
	}
	
	if ((element.offsetLeft - xOffset) <= maxX && (element.offsetLeft - xOffset) >= 0) {
	    element.style.left = (element.offsetLeft - xOffset) + "px";
	}
    }

    function closeDragElement() {
	document.onmouseup = null;
	document.onmousemove = null;
    }

    if (element && header) {
	header.onmousedown = dragMouseDown;
    }
}
