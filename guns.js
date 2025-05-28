let gunsData = [];

async function fetchGuns() {
  try {
    const response = await fetch('guns.json');
    gunsData = await response.json();
    displayGuns(gunsData);
  } catch (error) {
    console.error("Chyba pri načítaní guns.json:", error);
  }
}

function displayGuns(data) {
  const container = document.getElementById('gunsContainer');
  container.innerHTML = '';

  if (data.length === 0) {
    container.innerHTML = '<p>No results found.</p>';
    return;
  }

  data.forEach(gun => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${gun.image}" alt="${gun.name}">
      <h3>${gun.name}</h3>
      <p><strong data-translate="manufacturer">Manufacturer</strong>: ${gun.manufacturer}</p>
      <p><strong data-translate="caliber">Caliber</strong>: ${gun.caliber}</p>
      <p><strong data-translate="category">Category</strong>: ${gun.category}</p>
      <button onclick="showGunDetails('${gun.name}')"><span data-translate="showMore">Show more</span></button>
    `;

    container.appendChild(card);
  });

  translatePage();
}

function showGunDetails(name) {
  alert(`Details for: ${name}`);
}

function searchGuns() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const caliber = document.getElementById('caliberFilter').value.toLowerCase();
  const manufacturer = document.getElementById('manufacturerFilter').value.toLowerCase();

  const filtered = gunsData.filter(gun => {
    const matchQuery =
      gun.name.toLowerCase().includes(query) ||
      gun.caliber.toLowerCase().includes(query) ||
      gun.manufacturer.toLowerCase().includes(query);

    const matchCaliber = caliber ? gun.caliber.toLowerCase().includes(caliber) : true;
    const matchManufacturer = manufacturer ? gun.manufacturer.toLowerCase().includes(manufacturer) : true;

    return matchQuery && matchCaliber && matchManufacturer;
  });

  displayGuns(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  fetchGuns();

  document.getElementById('searchInput').addEventListener('input', searchGuns);
  document.getElementById('caliberFilter').addEventListener('input', searchGuns);
  document.getElementById('manufacturerFilter').addEventListener('input', searchGuns);
});
