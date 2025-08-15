import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import './styles/main.scss';

import { App } from '../src/components/app/App.jsx';

document.title = 'Sort&Filter';

const domNode = document.querySelector('#root');
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)