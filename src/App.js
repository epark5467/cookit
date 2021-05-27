import React, { useState, useEffect } from 'react';

import { createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';

import './App.css';
import Home from './Components/Home';
function App() {

  const font = "'Squada One', cursive";

  const theme = createMuiTheme({
    typography: {
      h2: {
        fontFamily: font,
      },
      button: {
        textTransform: "none"
      }
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
    <React.Fragment>
      <CssBaseline />
      <Home />
    </React.Fragment>  
    </MuiThemeProvider>
    
  );
}

export default App;
