const translations = {
  sk: {
    search: "Vyhľadávanie",
    filterByCountry: "Filtrovať podľa krajiny",
    caliber: "Kaliber",
    manufacturer: "Výrobca",
    showMore: "Zobraziť viac",
    back: "Späť",
    ammo: "Strelivo",
    firearms: "Zbrane",
    manufacturers: "Výrobcovia"
  },
  en: {
    search: "Search",
    filterByCountry: "Filter by Country",
    caliber: "Caliber",
    manufacturer: "Manufacturer",
    showMore: "Show more",
    back: "Back",
    ammo: "Ammo",
    firearms: "Firearms",
    manufacturers: "Manufacturers"
  },
  de: {
    search: "Suche",
    filterByCountry: "Nach Land filtern",
    caliber: "Kaliber",
    manufacturer: "Hersteller",
    showMore: "Mehr anzeigen",
    back: "Zurück",
    ammo: "Munition",
    firearms: "Schusswaffen",
    manufacturers: "Hersteller"
  },
  pl: {
    search: "Szukaj",
    filterByCountry: "Filtruj według kraju",
    caliber: "Kaliber",
    manufacturer: "Producent",
    showMore: "Pokaż więcej",
    back: "Wstecz",
    ammo: "Amunicja",
    firearms: "Broń palna",
    manufacturers: "Producenci"
  }
};

function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  translatePage();
  closeLanguageModal();
}

function getLanguage() {
  return localStorage.getItem('lang') || 'en'; // default is English
}

function translatePage() {
  const lang = getLanguage();
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });
}

// Modal ovládanie
function openLanguageModal() {
  document.getElementById('languageModal').classList.remove('hidden');
}

function closeLanguageModal() {
  document.getElementById('languageModal').classList.add('hidden');
}

// Spustenie prekladu pri načítaní
document.addEventListener('DOMContentLoaded', () => {
  translatePage();
});
