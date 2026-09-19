// Mind-ner app starter
// This file can be used as the main JavaScript entry point for the project.

const app = {
  name: 'Mind-ner',
  version: '1.0.0',
};

function initializeApp() {
  console.log(`${app.name} v${app.version} initialized.`);

  const root = document.getElementById('app');
  if (root) {
    root.innerHTML = `
      <main>
        <h1>${app.name}</h1>
        <p>Project starter initialized successfully.</p>
      </main>
    `;
  }
}

initializeApp();
