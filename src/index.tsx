import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { App } from './App';

const isGitHubPages =
  process.env.NODE_ENV === 'production' && process.env.PUBLIC_URL;

const basename = isGitHubPages ? '/galactic-character-explorer' : '/';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <BrowserRouter basename={basename}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
);

reportWebVitals();
