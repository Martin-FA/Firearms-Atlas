document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const ammoList = document.getElementById('ammoList');
  let ammoData = [];

  // Načítanie JSON dát
  fetch('ammo.json')
    .then(response => response.json())
    .then(data => {
      ammoData = data;
      renderAmmo(data);
    })
    .catch(error => {
      console.error('Chyba pri načítaní ammo.json:', error);
    });

  // Renderovanie kariet
  function renderAmmo(data) {
    ammoList.innerHTML = ''; // Vyčistiť predchádzajúci obsah

    data.forEach(ammo => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${ammo.image}" alt="${ammo.name}" class="card-img">
        <h3>${ammo.name}</h3>
        <p><strong>Typ:</strong> ${ammo.type}</p>
        <p><strong>Pôvod:</strong> ${ammo.origin}</p>
        <p><strong>Rok:</strong> ${ammo.year}</p>
        <p><strong>Používané v:</strong> ${ammo.usedIn.join(', ')}</p>
        <p>${ammo.description_sk}</p>
      `;

      ammoList.appendChild(card);
    });
  }

  // Vyhľadávanie
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    const filtered = ammoData.filter(ammo =>
      ammo.name.toLowerCase().includes(term) ||
      ammo.type.toLowerCase().includes(term) ||
      ammo.origin.toLowerCase().includes(term) ||
      ammo.description_sk.toLowerCase().includes(term) ||
      ammo.usedIn.join(', ').toLowerCase().includes(term)
    );
    renderAmmo(filtered);
  });
});

