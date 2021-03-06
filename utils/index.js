import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import path from 'path';

import { StaticRouter } from 'react-router-dom';
import App from '../front-end/src/containers/App';

export function renderReactPage(props = {}, location = '/') {
  if (!(props instanceof Object)) props = {};

  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
      if (err) return reject(err);

      const element = (
        <StaticRouter location={location}>
          <App {...props} />
        </StaticRouter>
      );

      return resolve(
        data
          .replace(
            '<script id="props"></script>',
            `<script id="props">window.__INITIAL__DATA__=${JSON.stringify(props)}</script>`,
          )
          .replace(
            '<div id="root"></div>',
            `<div id="root">${ReactDOMServer.renderToString(element)}</div>`,
          )
      );
    })
  });
}
