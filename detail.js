function getLanguage() {
  return localStorage.getItem("language") || "sk";
}

function loadDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("detailContainer").innerHTML = `<p>Žiadne ID zbrane nebolo zadané.</p>`;
    return;
  }

  fetch("guns.json")
    .then((response) => response.json())
    .then((data) => {
      const gun = data.find((g) => g.id === id);
      if (!gun) {
        document.getElementById("detailContainer").innerHTML = `<p>Zbraň s ID ${id} neexistuje.</p>`;
        return;
      }

      const lang = getLanguage();

      const translatedName = gun.name[lang] || gun.name["sk"];
      const translatedManufacturer = gun.manufacturer[lang] || gun.manufacturer["sk"];
      const translatedCategory = gun.category[lang] || gun.category["sk"];
      const translatedCaliber = gun.caliber[lang] || gun.caliber["sk"];
      const translatedDescription = gun.description?.[lang] || "";

      document.getElementById("detailContainer").innerHTML = `
        <div class="card">
          <img src="${gun.image}" alt="${translatedName}" />
          <h2>${translatedName}</h2>
          <p><strong data-translate="manufacturer">Výrobca:</strong> ${translatedManufacturer}</p>
          <p><strong data-translate="caliber">Kaliber:</strong> ${translatedCaliber}</p>
          <p><strong data-translate="category">Kategória:</strong> ${translatedCategory}</p>
          <p>${translatedDescription}</p>
        </div>
      `;
      translatePage(); // Preloží fixné texty v prípade zmeny jazyka
    })
    .catch((error) => {
      document.getElementById("detailContainer").innerHTML = `<p>Chyba pri načítaní detailov.</p>`;
      console.error("Chyba načítania JSON:", error);
    });
}
