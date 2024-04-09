window.addEventListener('DOMContentLoaded', () => {
  function replaceText(selector, text) {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }

  replaceText('current-timestamp', new Date().toLocaleString());
  setInterval(() => {
    replaceText('current-timestamp', new Date().toLocaleString());
  }, 1000);
});
