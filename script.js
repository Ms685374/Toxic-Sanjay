// Three.js Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: '#7289da',
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 5;

const animate = () => {
    requestAnimationFrame(animate);
    particlesMesh.rotation.x += 0.001;
    particlesMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
};

animate();

// Chart.js
const activityChart = new Chart(document.getElementById('activity-chart'), {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'User Activity',
            data: [12, 19, 3, 5, 2, 3, 10],
            borderColor: '#7289da',
            tension: 0.4,
        }],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    },
});

const commandChart = new Chart(document.getElementById('command-chart'), {
    type: 'doughnut',
    data: {
        labels: ['Moderation', 'Music', 'Games', 'Utilities'],
        datasets: [{
            label: 'Command Distribution',
            data: [45, 30, 15, 10],
            backgroundColor: ['#7289da', '#43b581', '#faa61a', '#f04747'],
        }],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    },
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check localStorage for theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    themeToggle.checked = savedTheme === 'light-mode';
}

// Toggle theme on switch change
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    } else {
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark-mode');
    }
});