import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/open-sans';
// import '@fontsource/open-sans/300.css'; // for light font
import '@fontsource/open-sans/400-italic.css';
import '@fontsource/open-sans/700.css';

import 'bootstrap/dist/js/bootstrap.bundle';
// import * as bootstrap from 'bootstrap';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
