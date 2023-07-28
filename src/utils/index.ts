export function checkMode() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export const toggleDarkMode = (isDarkModeOn: boolean) => {
  if (isDarkModeOn) {
    localStorage.theme = 'dark';
  } else {
    localStorage.theme = 'light';
  }
  checkMode();
};
