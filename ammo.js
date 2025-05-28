document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const ammoList = document.getElementById('ammoList');
  let ammoData = [];

  // Načítaj dáta zo súboru ammo.json
  fetch('ammo.json')
    .then(response => response.json())
    .then(data => {
      ammoData = data;
      renderAmmo(ammoData);
    })
    .catch(error => {
      console.error('Chyba pri načítaní ammo.json:', error);
      ammoList.innerHTML = '<p>Chyba pri načítaní údajov.</p>';
    });

  // Funkcia na vykreslenie kariet streliva
  function renderAmmo(data) {
    ammoList.innerHTML = ''; // Vyčisti kontajner

    data.forEach(ammo => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${ammo.image}" alt="${ammo.name}" class="card-img">
        <h3>${ammo.name}</h3>
        <p><strong>Type:</strong> ${ammo.type}</p>
        <p><strong>Diameter:</strong> ${ammo.diameter}</p>
        <p><strong>Length:</strong> ${ammo.length}</p>
      `;

      ammoList.appendChild(card);
    });
  }

  // Vyhľadávanie podľa viacerých polí
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();

    const filtered = ammoData.filter(ammo =>
      ammo.name.toLowerCase().includes(term) ||
      ammo.type.toLowerCase().includes(term) ||
      ammo.diameter.toLowerCase().includes(term) ||
      ammo.length.toLowerCase().includes(term)
    );

    renderAmmo(filtered);
  });
});
