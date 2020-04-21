import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect,
} from "react-router-dom";


import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  StylesProvider,
  MuiThemeProvider,
} from '@material-ui/core';

import TestEditor from './pages/TestEditor/TestEditor';

import './App.css';

const App: React.FC = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#475d9d',
        dark: '#000e42',
        main: '#0f346e',
      },
      secondary: {
        light: '#93e3e2',
        dark: '#2d8181',
        main: '#61b1b0',
        contrastText: '#ffffff',
      },
      background: {
        default: '#f2f2f2',
      }
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <StylesProvider injectFirst>
        <Router>
          <Route path="/test-editor" component={TestEditor} />
          <Redirect to="/test-editor"></Redirect>
        </Router>
      </StylesProvider>
    </MuiThemeProvider>
  );
}

export default App;
