import React from 'react';

import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ErrorBoundary from 'src/components/ErrorBoundary';
import TrackingProvider, { TrackPageView } from 'src/contexts/TrackingContext';
import { UserProvider } from 'src/contexts/UserContext';
import createTheme from 'src/theme/createTheme';

import Pages from './pages';
import Integration from './pages/integration';
import Popup from './popup';

import './App.css';

import 'iframe-resizer/js/iframeResizer.contentWindow';

const Router: React.FC = () => (
  <BrowserRouter>
    <TrackPageView />
    <Switch>
      <Route path="/popup" component={Popup} />
      <Route path="/integration" component={Integration} />
      <Route component={Pages} />
    </Switch>
  </BrowserRouter>
);

const theme = createTheme();

const App: React.FC = () => {
  return (
    <TrackingProvider>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <UserProvider>
            <CssBaseline />
            <Router />
          </UserProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </TrackingProvider>
  );
};

export default App;
