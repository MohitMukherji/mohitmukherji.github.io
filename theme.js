// Apply a saved theme choice before the page draws, so there is no flash.
(function () {
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  function currentTheme() {
    var set = document.documentElement.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.createElement('button');
    button.className = 'theme-toggle';

    function update() {
      button.textContent = currentTheme() === 'dark' ? '☀ light' : '☾ dark';
    }

    button.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      update();
    });

    update();
    document.body.appendChild(button);
  });
})();
