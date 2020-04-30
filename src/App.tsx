import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect,
} from "react-router-dom";


import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  StylesProvider,
  MuiThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core';

import TestEditor from './pages/TestEditor/TestEditor';

import './App.css';

const App: React.FC = () => {
  const InfNetColors = {
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
  };

  const theme = responsiveFontSizes(createMuiTheme(InfNetColors));

  theme.overrides = {
    MuiSlider: {
      root: {
        height: 6,
        display: "flex",
        justifyContent: "space-between",
      },
      thumb: {
        height: 16,
        width: 16,
        marginTop: -5,
        marginLeft: -8,
      },
      rail: {
        height: 6,
        borderRadius: 1000,
        color: "#9e9e9e",
      },
      track: {
        height: 6,
        borderRadius: 1000,
      },
      mark: {
        height: 6,
        width: 6,
        marginLeft: -3,
        borderRadius: 1000,
        backgroundColor: "grey",
      },
      markActive: {
        opacity: 1,
        backgroundColor: theme.palette.secondary.main,
        height: 10,
        width: 10,
        marginLeft: -5,
        marginTop: -2,
      },
      markLabel: {
        '&&:nth-of-type(4)': {
          textAlign: "left",
          flexGrow: 1,
          marginLeft: -4,
          marginRight: 4,
        },
        '&&:nth-last-of-type(2)': {
          textAlign: "right",
          flexGrow: 1,
          marginLeft: 4,
          marginRight: -4,
        },
        marginTop: 8,
        height: 20,
        position: "static",
        textAlign: "center",
        transform: "",
        flexGrow: 2,
        flexShrink: 1,
        flexBasis: 0,
        // textOverflow: "ellipsis",
        // overflow: "hidden",
      },
    },
  };


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
