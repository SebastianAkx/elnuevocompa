const symbols = ['👧', '👦'];
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const lever = document.getElementById('lever');
const finalMessage = document.getElementById('final-message');

let attempt = 0;

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinReels(currentAttempt) {
  if (currentAttempt < 2) {
    // Asegura que haya una niña y un niño en las dos primeras posiciones
    const pair = ['👧', '👦'];
    const shuffled = pair.sort(() => 0.5 - Math.random());
    reel1.textContent = shuffled[0];
    reel2.textContent = shuffled[1];

    // El tercero puede ser cualquiera, mientras no genere triple igual
    let third;
    do {
      third = getRandomSymbol();
    } while (third === reel1.textContent && third === reel2.textContent);

    reel3.textContent = third;
  } else if (currentAttempt === 2) {
    // Tercer intento: todo niño
    reel1.textContent = '👦';
    reel2.textContent = '👦';
    reel3.textContent = '👦';
  }
}

function showFinalMessage() {
  finalMessage.classList.remove('hidden');
  finalMessage.style.opacity = '1';
  launchConfetti();
}

function launchConfetti() {
  const duration = 8000; // 8 segundos
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 8,
      angle: 60,
      spread: 120,
      origin: { x: 0, y: 0.6 },
      colors: ['#00cfff', '#3399ff', '#99ccff']
    });
    confetti({
      particleCount: 8,
      angle: 120,
      spread: 120,
      origin: { x: 1, y: 0.6 },
      colors: ['#00cfff', '#3399ff', '#99ccff']
    });
    confetti({
      particleCount: 10,
      angle: 90,
      spread: 180,
      origin: { x: 0.5, y: 0 },
      colors: ['#00cfff', '#3399ff', '#99ccff']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

lever.addEventListener('click', () => {
  if (attempt >= 3) return;

  lever.style.pointerEvents = "none";

  let spins = 12;
  const spinInterval = setInterval(() => {
    reel1.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
    reel2.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
    reel3.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;

    spinReels(attempt);
    spins--;

    if (spins <= 0) {
      clearInterval(spinInterval);
      attempt++;

      setTimeout(() => {
        reel1.style.transform = 'rotate(0deg)';
        reel2.style.transform = 'rotate(0deg)';
        reel3.style.transform = 'rotate(0deg)';

        if (attempt === 3) {
          setTimeout(() => {
            showFinalMessage();
          }, 1000);
        } else {
          lever.style.pointerEvents = "auto";
        }
      }, 500);
    }
  }, 100);
});
