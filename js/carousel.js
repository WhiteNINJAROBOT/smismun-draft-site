const track = document.getElementById('carouselTrack');
const cards = Array.from(track.querySelectorAll('.carousel-card'));
const dotsContainer = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const CARD_WIDTH = 220;
const ACTIVE_WIDTH = 300;
const GAP = 20;
let current = 0;

cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
});

function goTo(index) {
    current = (index + cards.length) % cards.length;

    cards.forEach((card, i) => {
        card.classList.toggle('active', i === current);
    });

    let offset = 0;
    for (let i = 0; i < current; i++) {
        offset += (i === current - 1 ? CARD_WIDTH : CARD_WIDTH) + GAP;
    }
    const containerCenter = 410;
    const shift = containerCenter - (offset + ACTIVE_WIDTH / 2);
    track.style.transform = `translateX(${shift}px)`;

    Array.from(dotsContainer.children).forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
    });
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));

let startX = 0;
let isDragging = false;

track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    track.classList.add('dragging');
});

document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 50) {
        diff < 0 ? goTo(current + 1) : goTo(current - 1);
    }
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
});

goTo(0);