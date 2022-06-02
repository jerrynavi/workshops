import { RawIntlProvider } from 'react-intl';
import { intl } from 'utils/language-service';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routesConfig from 'utils/routes';
import { Suspense } from 'react';
import PageLoading from 'components/page-loading';
import { ToastContainer } from 'react-toastify';

function AppRoutes() {
  const routes = useRoutes(routesConfig);
  return routes;
}

function AppIntlWrapper() {
  return (
    <RawIntlProvider value={intl}>
      <HelmetProvider>
        <Helmet titleTemplate="TINEL Meetup - %s" />

        <Router>
          <Suspense fallback={<PageLoading />}>
            <AppRoutes />
            <ToastContainer
              hideProgressBar
              pauseOnFocusLoss={false}
              limit={1}
            />
          </Suspense>
        </Router>
      </HelmetProvider>
    </RawIntlProvider>
  );
}

export default AppIntlWrapper;
