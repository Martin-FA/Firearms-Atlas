document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const gunId = urlParams.get('id');
  const container = document.getElementById('gunDetail');

  if (!gunId) {
    container.innerHTML = '<p>Missing gun ID in URL.</p>';
    return;
  }

  fetch('guns.json')
    .then(response => response.json())
    .then(data => {
      const gun = data.find(item => item.id === gunId);
      if (!gun) {
        container.innerHTML = '<p>Gun not found.</p>';
        return;
      }

      container.innerHTML = `
        <div class="card detail-card">
          <img src="${gun.image}" alt="${gun.name}" class="card-img-large" />
          <h2>${gun.name}</h2>
          <p><strong>Type:</strong> ${gun.type}</p>
          <p><strong>Origin:</strong> ${gun.origin}</p>
          <p><strong>Year:</strong> ${gun.year}</p>
          <p><strong>Caliber:</strong> ${gun.caliber}</p>
          <p><strong>Ammo:</strong> ${gun.ammo}</p>
          <p>${gun.description}</p>
        </div>
      `;
    })
    .catch(error => {
      console.error('Error loading gun details:', error);
      container.innerHTML = '<p>Error loading gun detail.</p>';
    });
});

