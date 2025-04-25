window.addEventListener('DOMContentLoaded', () => {
  // Carrega Header e Nav
  fetch('/components/header.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
      return fetch('/components/nav.html');
    })
    .then(res => res.text())
    .then(nav => {
      document.getElementById('nav').innerHTML = nav;
    });

  // Carrega Footer
  fetch('/components/footer.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });

  // Ativa animações .fade-in ao carregar
  document.querySelectorAll(".fade-in").forEach(el => {
    el.classList.add("active");
  });

  // Fade-in lateral ao rolar
  document.addEventListener("scroll", () => {
    document.querySelectorAll(".fade-left").forEach(el => {
      const top = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  });

  // Animação de contagem dos números
  const counters = document.querySelectorAll('.num');
  let animated = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        counters.forEach(counter => {
          const update = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 80;

            if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(update, 20);
            } else {
              counter.innerText = target;
            }
          };
          update();
        });
        animated = true;
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  const bloco = document.getElementById('contador');
  if (bloco) observer.observe(bloco);

  // ✅ Carrossel Infinito com rolagem contínua real
  const carousel = document.querySelector(".carousel");
  const track = document.querySelector(".carousel-track");

  if (carousel && track) {
    // Clonar todos os itens para continuidade
    const items = Array.from(track.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });

    let offset = 0;
    const speed = 0.5;
    let paused = false;

    function scrollCarousel() {
      if (!paused) {
        offset -= speed;
        track.style.transform = `translateX(${offset}px)`;

        const itemWidth = items[0].offsetWidth + 40; // inclui gap
        const fullScroll = itemWidth * items.length;

        if (Math.abs(offset) >= fullScroll) {
          offset = 0;
        }
      }

      requestAnimationFrame(scrollCarousel);
    }

    scrollCarousel();

    carousel.addEventListener("mouseenter", () => paused = true);
    carousel.addEventListener("mouseleave", () => paused = false);
  }

    // Envio do formulário com mensagem de sucesso
    const formContato = document.getElementById("form-contato");

    if (formContato) {
      formContato.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const formData = new FormData(formContato);
  
        fetch(formContato.action, {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
          .then(response => {
            if (response.ok) {
              alert("✅ Sua mensagem foi enviada com sucesso!");
              formContato.reset();
            } else {
              alert("❌ Ocorreu um erro ao enviar. Tente novamente.");
            }
          })
          .catch(() => {
            alert("❌ Erro ao conectar com o servidor. Verifique sua internet.");
          });
      });
    }
  
});
