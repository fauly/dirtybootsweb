/**
 * Dirty Boots Café - Animations
 * Gentle animations that enhance the organic feel without overwhelming the user
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Initialize text animations
    initTextAnimations();
    
    // Initialize parallax effect
    initParallax();
    
    // Initialize rotation on scroll effect
    initRotateOnScroll();
    
    // Initialize size scaling on scroll effect
    initSizeScaling();
    
    // Initialize header scroll behavior
    initHeaderScroll();
    
    // Initialize typing animation
    initTypewriter();
    
    // Initialize audio on scroll - DISABLED
    // initAudioOnScroll();
});

/**
 * Initializes reveal animations on scroll
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    // Observer options
    const options = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Enable this for one-time animations:
                // entry.target.classList.remove('active');
            }
        });
    }, options);
    
    // Observe all reveal elements
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initializes text animations for headings
 */
function initTextAnimations() {
    const animatedTextElements = document.querySelectorAll('.animated-text');
    
    animatedTextElements.forEach(element => {
        // Get the text content
        const text = element.textContent;
        
        // Clear the element
        element.textContent = '';
        
        // Add each letter wrapped in a span
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.setProperty('--i', i);
            element.appendChild(span);
        }
    });
}

/**
 * Initializes parallax scrolling effect
 * This creates the multi-layered depth effect as users scroll
 */
function initParallax() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    // Update parallax positions on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxLayers.forEach(layer => {
            // Get custom speed from data attribute (or use default)
            const speed = layer.dataset.speed || 0.2;
            
            // Calculate the Y offset based on scroll position and speed
            // Faster speed values (higher numbers) create more dramatic movement
            const yOffset = scrollY * speed * -1;
            
            // Apply the transform to create the parallax effect
            // Check if the element also has a rotation effect
            if (layer.classList.contains('rotating-image-container') || layer.dataset.spin) {
                // If element has both parallax and rotation, combine the transforms
                const rotation = calculateRotation(scrollY, layer);
                
                // For direct spin element
                if (layer.dataset.spin) {
                    layer.style.transform = `translate3d(0, ${yOffset}px, 0) rotate(${rotation}deg)`;
                }
                // For container with child spin element
                else if (layer.classList.contains('rotating-image-container')) {
                    // Apply just parallax to container
                    layer.style.transform = `translate3d(0, ${yOffset}px, 0)`;
                    
                    // Rotation will be handled by the initRotateOnScroll function
                }
            } else {
                layer.style.transform = `translate3d(0, ${yOffset}px, 0)`;
            }
        });
    });
    
    // Initialize positions on page load
    triggerScroll();
}

/**
 * Initializes rotation on scroll effect
 * This creates rotation effects as users scroll
 */
function initRotateOnScroll() {
    // Handle elements with direct rotation
    const rotateElements = document.querySelectorAll('[data-spin]:not(.rotating-image-container [data-spin])');
    
    // Handle nested image rotations specifically
    const rotateImageContainers = document.querySelectorAll('.rotating-image-container');
    
    // Skip if no elements with rotation
    if (rotateElements.length === 0 && rotateImageContainers.length === 0) return;
    
    // Update rotation on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Handle regular elements with rotation
        rotateElements.forEach(element => {
            // Skip if element is also a parallax layer (already handled in initParallax)
            if (element.classList.contains('parallax-layer')) return;
            
            // Calculate and apply rotation
            const rotation = calculateRotation(scrollY, element);
            element.style.transform = `rotate(${rotation}deg)`;
        });
        
        // Handle special case for image containers
        rotateImageContainers.forEach(container => {
            const rotateImage = container.querySelector('[data-spin]');
            if (!rotateImage) return;
            
            // Calculate rotation for the image
            const rotation = calculateRotation(scrollY, rotateImage);
            
            // Apply rotation to just the image while container stays fixed
            rotateImage.style.transform = `rotate(${rotation}deg)`;
            
            // If container also has parallax, apply that to the container only
            if (container.classList.contains('parallax-layer') && container.dataset.speed) {
                // This will be handled by the parallax function
            }
        });
    });
    
    // Initialize positions on page load
    triggerScroll();
}

/**
 * Helper function to calculate rotation based on scroll position and element's data-spin value
 * @param {number} scrollY - Current scroll position
 * @param {Element} element - Element to rotate
 * @returns {number} - Rotation amount in degrees
 */
function calculateRotation(scrollY, element) {
    // Get custom spin speed from data attribute (or use default)
    const spinSpeed = element.dataset.spin || 0.1;
    const spinDirection = element.dataset.spinDirection === 'counter' ? -1 : 1;
    
    // Calculate rotation based on scroll position and speed
    // Multiplying by spinDirection allows for clockwise or counter-clockwise rotation
    return scrollY * parseFloat(spinSpeed) * spinDirection;
}

/**
 * Helper function to trigger a scroll event to position elements initially
 */
function triggerScroll() {
    window.dispatchEvent(new Event('scroll'));
}

/**
 * Helper function to add staggered animation delays to children
 * @param {string} selector - Parent element selector
 * @param {string} childSelector - Child elements selector
 * @param {number} baseDelay - Base delay in ms
 * @param {number} increment - Delay increment per child in ms
 */
function staggerChildren(selector, childSelector, baseDelay = 100, increment = 50) {
    const container = document.querySelector(selector);
    if (!container) return;
    
    const children = container.querySelectorAll(childSelector);
    
    children.forEach((child, index) => {
        const delay = baseDelay + (index * increment);
        child.style.transitionDelay = `${delay}ms`;
    });
}

/**
 * Initializes header scroll behavior
 */
function initHeaderScroll() {
    const header = document.querySelector('.home-header');
    if (!header) return;
    
    const updateHeader = () => {
        const scrollY = window.scrollY;
        const triggerPoint = window.innerHeight - 100; // Start transition slightly before reaching header
        
        if (scrollY > triggerPoint) {
            header.classList.add('header-visible');
        } else {
            header.classList.remove('header-visible');
        }
    };
    
    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Initialize on page load
}

/**
 * Typing animation for homepage
 */
function initTypewriter() {
    const firstPart = document.getElementById('firstPart');
    const secondPart = document.getElementById('secondPart');
    const thirdPart = document.getElementById('thirdPart');
    
    if (!firstPart || !secondPart || !thirdPart) return;

    const words = {
        first: "dirty boots'",
        second: "Cafè",
        third: "Roost"
    };

    const delay = 100; // Delay between each character
    const pauseBetweenWords = 1000; // Pause before switching words
    const pauseAfterFirstLine = 1500; // Longer pause after the first line
    const backspaceDelay = 50; // Delay for backspacing

    // Clear initial content
    firstPart.textContent = '';
    secondPart.textContent = '';
    thirdPart.textContent = '';

    async function typeWord(element, word) {
        for (let i = 0; i < word.length; i++) {
            element.textContent += word[i];
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    async function backspace(element) {
        const text = element.textContent;
        for (let i = text.length; i > 0; i--) {
            element.textContent = text.substring(0, i - 1);
            await new Promise(resolve => setTimeout(resolve, backspaceDelay));
        }
    }

    async function animateText() {
        // Type "Dirty Boots" on the first line
        await typeWord(firstPart, words.first);
        
        // Longer pause after typing the first line
        await new Promise(resolve => setTimeout(resolve, pauseAfterFirstLine));

        // Begin alternating between Café and Roost on the second line
        while (true) {
            // Type "Café"
            await typeWord(secondPart, words.second);
            await new Promise(resolve => setTimeout(resolve, pauseBetweenWords * 2));
            
            // Backspace "Café"
            await backspace(secondPart);

            // Type "Roost"
            await typeWord(thirdPart, words.third);
            await new Promise(resolve => setTimeout(resolve, pauseBetweenWords * 2));
            
            // Backspace "Roost"
            await backspace(thirdPart);
        }
    }

    // Start the animation
    animateText();
}

/**
 * Initializes audio triggers that fade in and out on scroll
 * This creates an immersive audio experience tied to specific page sections
 */
function initAudioOnScroll() {
    // Find any elements with data-audio attribute
    const audioTriggers = document.querySelectorAll('[data-audio]');
    if (audioTriggers.length === 0) return;
    
    // Create audio context and gain node for volume control
    let audioElements = {};
    let audioContext;
    let gainNodes = {};
    
    // Initialize audio elements
    audioTriggers.forEach(trigger => {
        const audioSrc = trigger.dataset.audio;
        if (!audioSrc) return;
        
        // Create audio element if it doesn't exist yet
        if (!audioElements[audioSrc]) {
            const audio = new Audio(audioSrc);
            audio.loop = true;
            audio.preload = 'auto';
            audio.volume = 0; // Start with volume at 0
            audioElements[audioSrc] = audio;
            
            // Prepare gain node (will be initialized on first user interaction)
            gainNodes[audioSrc] = null;
        }
    });
    
    // Initialize audio context on first user interaction (to comply with autoplay policies)
    const initAudioContext = () => {
        if (audioContext) return;
        
        // Create audio context
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Set up each audio element with the audio context
        Object.keys(audioElements).forEach(src => {
            const audio = audioElements[src];
            const source = audioContext.createMediaElementSource(audio);
            const gainNode = audioContext.createGain();
            
            // Connect nodes: source -> gain -> destination
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Set initial gain to 0 (silent)
            gainNode.gain.value = 0;
            gainNodes[src] = gainNode;
            
            // Start playing (will be silent until gain is adjusted)
            audio.play().catch(e => console.warn('Audio autoplay prevented:', e));
        });
        
        // Remove event listeners once audio is initialized
        document.removeEventListener('click', initAudioContext);
        document.removeEventListener('touchstart', initAudioContext);
        document.removeEventListener('scroll', initAudioContext);
    };
    
    // Add event listeners to initialize audio on user interaction
    document.addEventListener('click', initAudioContext);
    document.addEventListener('touchstart', initAudioContext);
    document.addEventListener('scroll', initAudioContext);
    
    // Set up Intersection Observer to control audio volume
    const observerOptions = {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '0px'
    };
    
    const audioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const audioSrc = entry.target.dataset.audio;
            if (!audioSrc || !audioElements[audioSrc] || !gainNodes[audioSrc]) return;
            
            // Calculate desired volume based on visibility ratio
            let targetVolume = 0;
            if (entry.isIntersecting) {
                // Scale volume between 0 and max volume based on intersection ratio
                targetVolume = Math.min(entry.intersectionRatio, 0.8); // Max volume of 0.8
            }
            
            // Get the gain node for this audio
            const gainNode = gainNodes[audioSrc];
            if (!gainNode) return;
            
            // Smooth transition to target volume
            const now = audioContext.currentTime;
            gainNode.gain.linearRampToValueAtTime(targetVolume, now + 0.5);
        });
    }, observerOptions);
    
    // Observe all audio trigger elements
    audioTriggers.forEach(trigger => {
        audioObserver.observe(trigger);
    });
}

/**
 * Initializes size scaling on scroll effect
 * This creates growing/shrinking effects as users scroll
 */
function initSizeScaling() {
    // Handle elements with size scaling
    const sizeElements = document.querySelectorAll('[data-size]');
    
    // Skip if no elements with size scaling
    if (sizeElements.length === 0) return;
    
    // Update size on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        sizeElements.forEach(element => {
            // Calculate and apply size scaling
            const scaleAmount = calculateScaling(scrollY, element);
            
            // If element has other transforms, we need to combine them
            if (element.classList.contains('parallax-layer') || element.dataset.spin) {
                // Get current transform if it exists
                const currentTransform = element.style.transform || '';
                
                if (currentTransform.includes('scale')) {
                    // Replace existing scale
                    element.style.transform = currentTransform.replace(/scale\([^)]+\)/, `scale(${scaleAmount})`);
                } else {
                    // Add scale to existing transform
                    element.style.transform = `${currentTransform} scale(${scaleAmount})`;
                }
            } else {
                // Just apply scaling
                element.style.transform = `scale(${scaleAmount})`;
            }
        });
    });
    
    // Initialize sizes on page load
    triggerScroll();
}

/**
 * Helper function to calculate scaling based on scroll position and element's data-size value
 * @param {number} scrollY - Current scroll position
 * @param {Element} element - Element to scale
 * @returns {number} - Scale amount
 */
function calculateScaling(scrollY, element) {
    // Get custom size parameters from data attributes
    const sizeSpeed = parseFloat(element.dataset.size) || 0.001;
    const baseSize = parseFloat(element.dataset.baseSize) || 1.0;
    const minSize = parseFloat(element.dataset.minSize) || 0.5;
    const maxSize = parseFloat(element.dataset.maxSize) || 2.0;
    
    // Calculate scale based on scroll position and speed
    // Use baseSize as the starting point
    let scale = baseSize + (scrollY * sizeSpeed);
    
    // Clamp the scale between min and max values
    scale = Math.max(minSize, Math.min(maxSize, scale));
    
    return scale;
}

/**
 * Helper function to trigger a scroll event to position elements initially
 */
function triggerScroll() {
    // Create and dispatch a scroll event to initialize positions
    window.dispatchEvent(new Event('scroll'));
}