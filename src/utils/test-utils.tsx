import { AppRoutes } from 'app/App';
import { Suspense } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import store from 'store';
import { RawIntlProvider } from 'react-intl';
import { intl } from './language-service';

export const setup = (history: string[]) =>
  render(
    <Provider store={store}>
      <RawIntlProvider value={intl}>
        <Router initialEntries={history}>
          <Suspense fallback={<p>Loading</p>}>
            <AppRoutes />
          </Suspense>
        </Router>
      </RawIntlProvider>
    </Provider>,
  );
