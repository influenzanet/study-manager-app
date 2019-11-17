import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import {
  createMuiTheme,
  StylesProvider,
  MuiThemeProvider,
} from '@material-ui/core';

import Button from '@material-ui/core/Button';

import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";

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

          {/* The rest of your application */}
          <h1>Test</h1>
          <Button variant="contained">
            Default
          </Button>
          <Button variant="contained" color="primary">
            Default
          </Button>
          <Button variant="contained" color="secondary">
            Default
          </Button>

        </Router>
      </StylesProvider>
    </MuiThemeProvider>

  );
}

export default App;
