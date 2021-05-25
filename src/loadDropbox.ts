const loadDropbox = (callback: { (): void; (): void; }, appKey: string) => {
  const existingScript = document.getElementById('dropboxjs');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://www.dropbox.com/static/api/2/dropins.js';
    script.id = 'dropboxjs';
    script.setAttribute('data-app-key', appKey);
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
}

export default loadDropbox;