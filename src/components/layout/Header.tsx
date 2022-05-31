import Cart from 'components/cart';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="header">
      <Link to="/" title="Back to homepage">
        <img src="/tined-logo.svg" alt="Tined Workshops logo" />
      </Link>

      <Cart />
    </nav>
  );
}
