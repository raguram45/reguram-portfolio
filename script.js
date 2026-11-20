document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // 2. Skill Category Filter
  const tabBtns = document.querySelectorAll('.tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      skillCards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Interactive Digital Logic Gate Emulator
  let currentGate = 'AND';
  let inputA = 1;
  let inputB = 0;

  const gateBtns = document.querySelectorAll('.gate-btn');
  const btnA = document.getElementById('input-a');
  const btnB = document.getElementById('input-b');
  const activeGateLabel = document.getElementById('active-gate-label');
  const verilogCode = document.getElementById('verilog-code');
  const outputLed = document.getElementById('output-led');
  const outputVal = document.getElementById('output-val');

  const verilogMap = {
    AND: 'assign Y = A & B;',
    OR: 'assign Y = A | B;',
    XOR: 'assign Y = A ^ B;',
    NAND: 'assign Y = ~(A & B);',
    NOR: 'assign Y = ~(A | B);',
    XNOR: 'assign Y = ~(A ^ B);',
  };

  function evaluateLogic() {
    let result = 0;
    switch (currentGate) {
      case 'AND': result = inputA & inputB; break;
      case 'OR': result = inputA | inputB; break;
      case 'XOR': result = inputA ^ inputB; break;
      case 'NAND': result = !(inputA & inputB) ? 1 : 0; break;
      case 'NOR': result = !(inputA | inputB) ? 1 : 0; break;
      case 'XNOR': result = !(inputA ^ inputB) ? 1 : 0; break;
    }

    activeGateLabel.textContent = `${currentGate} GATE`;
    verilogCode.textContent = verilogMap[currentGate];
    outputVal.textContent = result;

    if (result === 1) {
      outputLed.classList.add('high');
    } else {
      outputLed.classList.remove('high');
    }
  }

  gateBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      gateBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentGate = btn.dataset.gate;
      evaluateLogic();
    });
  });

  btnA.addEventListener('click', () => {
    inputA = inputA === 1 ? 0 : 1;
    btnA.querySelector('span').textContent = inputA;
    btnA.classList.toggle('active', inputA === 1);
    evaluateLogic();
  });

  btnB.addEventListener('click', () => {
    inputB = inputB === 1 ? 0 : 1;
    btnB.querySelector('span').textContent = inputB;
    btnB.classList.toggle('active', inputB === 1);
    evaluateLogic();
  });

  evaluateLogic();

  // 4. Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = 'Transmission received! Reguram will respond shortly.';
    contactForm.reset();
  });

  // 5. Subtle Purple & Magenta Silicon Node Canvas Background
  const canvas = document.getElementById('pcb-canvas');
  const ctx = canvas.getContext('2d');
  let nodes = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  for (let i = 0; i < 38; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      color: i % 2 === 0 ? '#A855F7' : '#EC4899',
    });
  }

  function animateNodes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach((n, idx) => {
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();

      for (let j = idx + 1; j < nodes.length; j++) {
        const dx = n.x - nodes[j].x;
        const dy = n.y - nodes[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 135) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.18 * (1 - dist / 135)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animateNodes);
  }

  animateNodes();
});