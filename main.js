document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in');
  
    const appearOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add('show');
          appearOnScroll.unobserve(entry.target);
        }
      });
    }, appearOptions);
  
    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  });

  AOS.init();

const typingText2 = document.getElementById('typing-text-2');

const textOptions = ["Desenvolvedor Fullstack", "Desenvolvedor Mobile", "Professor de Mentoria Fullstack", "Engenheiro de Software"];
let textOptionIndex = 0;
let charIndex = 0;

function typeText2() {
    const currentText = textOptions[textOptionIndex];
    if (charIndex < currentText.length) {
      typingText2.textContent += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(typeText2, 100);
    } else {
        setTimeout(eraseText2, 1000)
    }
}

function eraseText2() {
    const currentText = textOptions[textOptionIndex];
    if (charIndex > 0) {
      typingText2.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(eraseText2, 50);
    } else {
        textOptionIndex = (textOptionIndex + 1) % textOptions.length;
        charIndex=0;
        setTimeout(typeText2, 500);
    }
}

typeText2();