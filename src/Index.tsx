import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { WordBash } from './WordBash';

import './app.scss';

ReactDOM.render(
  <React.StrictMode>
    <WordBash />
  </React.StrictMode>,
  document.getElementById('app-root')
);
