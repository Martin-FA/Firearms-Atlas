function loadAmmoDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const ammoId = urlParams.get('id');

  fetch('ammo.json')
    .then(response => response.json())
    .then(data => {
      const ammo = data.find(item => item.id === ammoId);
      if (!ammo) {
        document.getElementById('detailContainer').innerHTML = '<p>Strelivo nebolo nájdené.</p>';
        return;
      }

      const container = document.getElementById('detailContainer');
      container.innerHTML = `
        <div class="card">
          <img src="${ammo.image}" alt="${ammo.name}" />
          <h2>${ammo.name}</h2>
          <p><strong>Kaliber:</strong> ${ammo.caliber}</p>
          <p><strong>Krajina pôvodu:</strong> ${ammo.country}</p>
          <p><strong>Účel použitia:</strong> ${ammo.purpose}</p>
          <p><strong>Typ:</strong> ${ammo.type}</p>
          <p><strong>Popis:</strong> ${ammo.description}</p>
        </div>
      `;
    })
    .catch(error => {
      console.error('Chyba pri načítaní streliva:', error);
      document.getElementById('detailContainer').innerHTML = '<p>Chyba pri načítaní detailu streliva.</p>';
    });
}
