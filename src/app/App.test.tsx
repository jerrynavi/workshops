import { screen } from '@testing-library/react';
import { setup } from 'utils/test-utils';

describe('Home page', () => {
  it('renders the "Workshops" title', async () => {
    setup(['/']);
    const workshopTitle = await screen.findByRole('heading', {
      name: /workshops/i,
    });
    expect(workshopTitle).toBeInTheDocument();
  });
});
