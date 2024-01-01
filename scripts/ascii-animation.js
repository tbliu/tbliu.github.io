function loadCanvas() {
    const c = document.getElementById("ascii-canvas");
    const ctx = c.getContext("2d");
    const img = document.getElementById('eye')
    ctx.drawImage(img, 10, 10);
}
