import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';

// Import CardDetailComponent
import { DeatilCardComponent } from './src/app/deatil-card/deatil-card.component'; // Update the path

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // Route for pre-rendering each card detail page
  server.get('detail/:id', async (req, res, next) => {
    const cardId = req.params.id;

    // Fetch data for the specific card detail page (e.g., from Firestore)
    // Replace the sample data with actual data fetching logic
    const cardData = await fetchCardData(cardId); // Implement this function

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: req.baseUrl },
          { provide: 'serverUrl', useValue: req.originalUrl },
          // Provide card data to the CardDetailComponent
          { provide: 'cardData', useValue: cardData }, // Add this line
        ],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${req.originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

// Function to fetch card data (replace with your actual data fetching logic)
async function fetchCardData(cardId: string): Promise<any> {
  // Implement data fetching logic (e.g., from Firestore)
  return { id: cardId, title: 'Sample Title', description: 'Sample Description' };
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
