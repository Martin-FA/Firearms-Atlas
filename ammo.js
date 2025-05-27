document.addEventListener('DOMContentLoaded', () => {
  fetch('ammo.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('ammo-container');

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

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Chyba pri načítaní ammo.json:', error);
    });
});
