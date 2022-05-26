import { IntlProvider } from 'react-intl';
import { loadLocaleData } from 'utils/language-service';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Styleguide from 'pages/styleguide';

const { locale, messages } = loadLocaleData();

function App() {
  return (
    <Routes>
      <Route path="/" element={<Styleguide />} />
    </Routes>
  );
}

function AppIntlWrapper() {
  return (
    <IntlProvider messages={messages} locale={locale}>
      <HelmetProvider>
        <Helmet titleTemplate="TINEL Meetup - %s" />

        <Router>
          <App />
        </Router>
      </HelmetProvider>
    </IntlProvider>
  );
}

export default AppIntlWrapper;
