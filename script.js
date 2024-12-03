document.addEventListener('DOMContentLoaded', function() {
    // Hide the main content initially
    document.getElementById('main-content').style.display = 'none';
    console.log('DOMContentLoaded: Main content hidden.');
});

// Function to dynamically load content
function loadContent(page) {
    fetch(page)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('main-content').innerHTML = data;
        document.getElementById('main-content').style.display = 'block';
        window.scrollTo(0, 0); // Scroll to the top of the page
        console.log(`${page} content loaded.`);
    })
    .catch(error => console.error('Error loading content:', error));
}

// Function to load header.html
async function loadHeader() {
    try {
        const response = await fetch('header.html');
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        document.getElementById('header-placeholder').innerHTML = text;
        console.log('Header loaded.');
        document.getElementById('nav-bar').style.display = 'block'; // Show nav bar after loading
    } catch (error) {
        console.error('Error loading header:', error);
    }
}
loadHeader();

// Function to load footer.html
async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        document.getElementById('footer-placeholder').innerHTML = text;
        console.log('Footer loaded.');
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}
loadFooter();

// Function to show the contact form modal
function showContactForm() {
    document.getElementById('contact-modal').style.display = 'flex';
    init3DScene();
}

// Function to close the contact form modal
function closeContactForm() {
    document.getElementById('contact-modal').style.display = 'none';
}

// Initialize 3D scene
function init3DScene() {
    const canvas = document.getElementById('3d-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();
}

// Add this to handle the loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        loadContent('about.html'); // Load the "About Me" content by default after loading screen
        console.log('Loading screen hidden, About Me content loaded.');
    }, 5000); // 5 seconds
});
