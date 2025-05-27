document.addEventListener("DOMContentLoaded", () => {
  const lang = getLanguage();
  const container = document.getElementById("gunsContainer");
  const searchInput = document.getElementById("searchInput");
  const manufacturerFilter = document.getElementById("manufacturerFilter");
  const caliberFilter = document.getElementById("caliberFilter");

  let gunsData = [];

  fetch("guns.json")
    .then((response) => response.json())
    .then((data) => {
      gunsData = data;
      populateFilters(data);
      displayGuns(data);
    });

  function displayGuns(guns) {
    container.innerHTML = "";

    if (guns.length === 0) {
      container.innerHTML = `<p style="padding: 1rem;">No results found.</p>`;
      return;
    }

    guns.forEach((gun) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${gun.image}" alt="${gun.name[lang]}" />
        <h3>${gun.name[lang]}</h3>
        <p><strong>${translations[lang].manufacturer}:</strong> ${gun.manufacturer}</p>
        <p><strong>${translations[lang].caliber}:</strong> ${gun.caliber}</p>
        <button onclick="location.href='detail.html?id=${gun.id}'">${translations[lang].showMore}</button>
      `;

      container.appendChild(card);
    });
  }

  function populateFilters(guns) {
    const manufacturers = [...new Set(guns.map((g) => g.manufacturer))];
    const calibers = [...new Set(guns.map((g) => g.caliber))];

    manufacturerFilter.innerHTML = `<option value="">-- ${translations[lang].manufacturer} --</option>`;
    caliberFilter.innerHTML = `<option value="">-- ${translations[lang].caliber} --</option>`;

    manufacturers.sort().forEach((man) => {
      const option = document.createElement("option");
      option.value = man;
      option.textContent = man;
      manufacturerFilter.appendChild(option);
    });

    calibers.sort().forEach((cal) => {
      const option = document.createElement("option");
      option.value = cal;
      option.textContent = cal;
      caliberFilter.appendChild(option);
    });
  }

  function filterAndSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedManufacturer = manufacturerFilter.value;
    const selectedCaliber = caliberFilter.value;

    const filtered = gunsData.filter((gun) => {
      const matchesSearch = gun.name[lang].toLowerCase().includes(searchTerm);
      const matchesManufacturer = selectedManufacturer === "" || gun.manufacturer === selectedManufacturer;
      const matchesCaliber = selectedCaliber === "" || gun.caliber === selectedCaliber;

      return matchesSearch && matchesManufacturer && matchesCaliber;
    });

    displayGuns(filtered);
  }

  searchInput.addEventListener("input", filterAndSearch);
  manufacturerFilter.addEventListener("change", filterAndSearch);
  caliberFilter.addEventListener("change", filterAndSearch);
});
