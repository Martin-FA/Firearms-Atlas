document.addEventListener('DOMContentLoaded', loadAmmoDetail);

function loadAmmoDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const ammoId = urlParams.get('id');

  fetch('ammo.json')
    .then(response => response.json())
    .then(data => {
      const ammo = data.find(item => item.id === ammoId);
      const container = document.getElementById('ammoDetail');

      if (!ammo) {
        container.innerHTML = '<p>Ammo not found.</p>';
        return;
      }

      container.innerHTML = `
        <div class="card">
          <img src="${ammo.image}" alt="${ammo.name}" />
          <h2>${ammo.name}</h2>
          <p><strong>Caliber:</strong> ${ammo.caliber}</p>
          <p><strong>Country of Origin:</strong> ${ammo.country}</p>
          <p><strong>Purpose:</strong> ${ammo.purpose}</p>
          <p><strong>Type:</strong> ${ammo.type}</p>
          <p><strong>Description:</strong> ${ammo.description}</p>
        </div>
      `;
    })
    .catch(error => {
      console.error('Error loading ammo details:', error);
      document.getElementById('ammoDetail').innerHTML = '<p>Error loading ammo detail.</p>';
    });
}

