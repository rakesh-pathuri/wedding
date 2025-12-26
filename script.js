const scene = document.getElementById('scene');

// Current rotation
let currentX = 0;
let currentY = 0;

// Target rotation
let targetX = 0;
let targetY = 0;

// Smoothness
const ease = 0.08;

// Rotation limits
const MOUSE_MAX = 35;
const GYRO_MAX = 35;

// Clamp helper
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Animation loop
function animate() {
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;

    scene.style.transform = `
        rotateX(${currentX}deg)
        rotateY(${currentY}deg)
    `;

    requestAnimationFrame(animate);
}

animate();


// ==================
// Desktop Mouse
// ==================
document.addEventListener('mousemove', (e) => {
    const x = (window.innerHeight / 2 - e.clientY) / 25;
    const y = (window.innerWidth / 2 - e.clientX) / 25;

    targetX = clamp(x, -MOUSE_MAX, MOUSE_MAX);
    targetY = clamp(-y, -MOUSE_MAX, MOUSE_MAX);
});


// ==================
// Mobile Gyroscope (STRONGER ROTATION)
// ==================
window.addEventListener('deviceorientation', (event) => {
    if (event.beta === null || event.gamma === null) return;

    // Increase sensitivity
    const gyroX = event.beta / 2.2;
    const gyroY = event.gamma / 2.2;

    targetX = clamp(gyroX, -GYRO_MAX, GYRO_MAX);
    targetY = clamp(gyroY, -GYRO_MAX, GYRO_MAX);
});


// ==================
// Touch Drag (fallback)
// ==================
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const x = (window.innerHeight / 2 - touch.clientY) / 20;
    const y = (window.innerWidth / 2 - touch.clientX) / 20;

    targetX = clamp(x, -MOUSE_MAX, MOUSE_MAX);
    targetY = clamp(-y, -MOUSE_MAX, MOUSE_MAX);
}, { passive: true });
