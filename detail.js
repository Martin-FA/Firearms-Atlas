function getLanguage() {
  return localStorage.getItem("language") || "sk";
}

function translateText(textObj, lang) {
  return textObj?.[lang] || textObj?.["sk"] || "";
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

      const name = translateText(gun.name, lang);
      const manufacturer = translateText(gun.manufacturer, lang);
      const category = translateText(gun.category, lang);
      const caliber = translateText(gun.caliber, lang);
      const description = translateText(gun.description, lang);

      document.getElementById("detailContainer").innerHTML = `
        <div class="card">
          <img src="${gun.image}" alt="${name}" />
          <h2>${name}</h2>
          <p><strong data-translate="manufacturer">Výrobca:</strong> ${manufacturer}</p>
          <p><strong data-translate="caliber">Kaliber:</strong> ${caliber}</p>
          <p><strong data-translate="category">Kategória:</strong> ${category}</p>
          <p>${description}</p>
        </div>
      `;

      if (typeof translatePage === "function") {
        translatePage();
      }
    })
    .catch((error) => {
      document.getElementById("detailContainer").innerHTML = `<p>Chyba pri načítaní detailov.</p>`;
      console.error("Chyba načítania JSON:", error);
    });
}
