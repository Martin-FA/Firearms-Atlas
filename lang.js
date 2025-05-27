const translations = {
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
  },
  es: {
    search: "Buscar",
    filterByCountry: "Filtrar por país",
    caliber: "Calibre",
    manufacturer: "Fabricante",
    showMore: "Mostrar más",
    back: "Volver",
    ammo: "Munición",
    firearms: "Armas de fuego",
    manufacturers: "Fabricantes"
  },
  fi: {
    search: "Haku",
    filterByCountry: "Suodata maan mukaan",
    caliber: "Kaliperi",
    manufacturer: "Valmistaja",
    showMore: "Näytä lisää",
    back: "Takaisin",
    ammo: "Ammukset",
    firearms: "Ampuma-aseet",
    manufacturers: "Valmistajat"
  },
  no: {
    search: "Søk",
    filterByCountry: "Filtrer etter land",
    caliber: "Kaliber",
    manufacturer: "Produsent",
    showMore: "Vis mer",
    back: "Tilbake",
    ammo: "Ammunisjon",
    firearms: "Skytevåpen",
    manufacturers: "Produsenter"
  },
  fr: {
    search: "Recherche",
    filterByCountry: "Filtrer par pays",
    caliber: "Calibre",
    manufacturer: "Fabricant",
    showMore: "Voir plus",
    back: "Retour",
    ammo: "Munitions",
    firearms: "Armes à feu",
    manufacturers: "Fabricants"
  },
  sv: {
    search: "Sök",
    filterByCountry: "Filtrera efter land",
    caliber: "Kaliber",
    manufacturer: "Tillverkare",
    showMore: "Visa mer",
    back: "Tillbaka",
    ammo: "Ammunition",
    firearms: "Skjutvapen",
    manufacturers: "Tillverkare"
  }
};

function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  translatePage();
  closeLanguageModal();
}

function getLanguage() {
  return localStorage.getItem('lang') || 'en';
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

function openLanguageModal() {
  document.getElementById('languageModal').classList.remove('hidden');
}

function closeLanguageModal() {
  document.getElementById('languageModal').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  translatePage();
});
