document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('#instagram-feed');

  // Substitua com seu token do Instagram Basic Display API
  const accessToken = 'SEU_TOKEN_DO_INSTAGRAM';
  const limit = 3; // quantidade de posts

  if (!container || !accessToken) return;

  fetch(`https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption&access_token=${accessToken}&limit=${limit}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.data) {
        data.data.forEach(item => {
          const div = document.createElement('div');
          div.className = 'gallery-item';
          div.innerHTML = `
            <a href="${item.permalink}" target="_blank" rel="noopener">
              <img src="${item.media_url}" alt="${item.caption || 'Post do Instagram'}">
            </a>
          `;
          container.appendChild(div);
        });
      }
    })
    .catch(err => console.error('Erro ao carregar feed do Instagram:', err));
});
