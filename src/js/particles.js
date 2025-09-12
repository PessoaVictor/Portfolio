function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#667eea'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#667eea',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

function updateParticlesTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const particleColor = isDark ? '#764ba2' : '#667eea';
    
    if (typeof pJSDom !== 'undefined' && pJSDom?.[0]?.pJS) {
        pJSDom[0].pJS.particles.color.value = particleColor;
        pJSDom[0].pJS.particles.line_linked.color = particleColor;
        pJSDom[0].pJS.fn.particlesRefresh();
    }
}

if (typeof window !== 'undefined') {
    window.initParticles = initParticles;
    window.updateParticlesTheme = updateParticlesTheme;
}