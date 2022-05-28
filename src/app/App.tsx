import { IntlProvider } from 'react-intl';
import { loadLocaleData } from 'utils/language-service';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routesConfig from 'utils/routes';
import { Suspense } from 'react';
import PageLoading from 'components/page-loading';

const { locale, messages } = loadLocaleData();

function AppRoutes() {
  const routes = useRoutes(routesConfig);
  return routes;
}

function AppIntlWrapper() {
  return (
    <IntlProvider messages={messages} locale={locale}>
      <HelmetProvider>
        <Helmet titleTemplate="TINEL Meetup - %s" />

        <Router>
          <Suspense fallback={<PageLoading />}>
            <AppRoutes />
          </Suspense>
        </Router>
      </HelmetProvider>
    </IntlProvider>
  );
}

export default AppIntlWrapper;
