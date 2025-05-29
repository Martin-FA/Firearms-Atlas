function changeLanguage(lang) {
  localStorage.setItem('preferredLanguage', lang);
  location.reload(); // neskôr tu môžeš načítať preklady bez reloadu
}

window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang) {
    const languageSelector = document.getElementById('language');
    if (languageSelector) {
      languageSelector.value = savedLang;
    }
  }
});
