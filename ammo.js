document.addEventListener('DOMContentLoaded', () => {
  fetch('ammo.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('ammoList');
      const searchInput = document.getElementById('searchInput');

      function renderAmmo(filter = '') {
        container.innerHTML = '';

        const filtered = data.filter(ammo =>
          ammo.name.toLowerCase().includes(filter.toLowerCase())
        );

        if (filtered.length === 0) {
          container.innerHTML = `<p data-translate="no_results">No results found.</p>`;
          translatePage();
          return;
        }

        filtered.forEach(ammo => {
          const card = document.createElement('div');
          card.className = 'card';

          card.innerHTML = `
            <img src="${ammo.image}" alt="${ammo.name}" class="card-img">
            <h3>${ammo.name}</h3>
            <p><strong data-translate="type">Typ:</strong> ${ammo.type}</p>
            <p><strong data-translate="origin">Pôvod:</strong> ${ammo.origin}</p>
            <p><strong data-translate="year">Rok:</strong> ${ammo.year}</p>
            <p><strong data-translate="used_in">Používané v:</strong> ${ammo.usedIn.join(', ')}</p>
            <p>${ammo.description_sk}</p>
          `;

          container.appendChild(card);
        });

        translatePage();
      }

      searchInput.addEventListener('input', () => {
        renderAmmo(searchInput.value);
      });

      renderAmmo();
    })
    .catch(error => {
      console.error('Chyba pri načítaní ammo.json:', error);
    });
});
