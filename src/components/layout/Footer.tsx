import { FormattedDate } from 'react-intl';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="font-semibold  text-light-gray text-h6-mobile md:text-h6 inline-flex gap-x-1">
        <span>&copy;</span>
        <span>TINEL Meetup</span>
        <span>
          <FormattedDate value={new Date()} year="numeric" />
        </span>
      </p>
    </footer>
  );
}
