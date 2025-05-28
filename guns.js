document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const container = document.getElementById('gunList');

  fetch('guns.json')
    .then(response => response.json())
    .then(data => {
      renderGuns(data);

      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filtered = data.filter(gun =>
          gun.name.toLowerCase().includes(query) ||
          gun.type.toLowerCase().includes(query) ||
          gun.caliber.toLowerCase().includes(query) ||
          gun.manufacturer.toLowerCase().includes(query) ||
          gun.country.toLowerCase().includes(query)
        );
        renderGuns(filtered);
      });
    })
    .catch(error => {
      console.error('Chyba pri načítaní databázy zbraní:', error);
    });

  function renderGuns(guns) {
    container.innerHTML = '';
    guns.forEach(gun => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${gun.name}</h3>
        <p><strong>Typ:</strong> ${gun.type}</p>
        <p><strong>Kaliber:</strong> ${gun.caliber}</p>
        <p><strong>Výrobca:</strong> ${gun.manufacturer}</p>
        <p><strong>Krajina:</strong> ${gun.country}</p>
      `;
      container.appendChild(card);
    });
  }
});
