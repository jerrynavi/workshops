import Cart from 'components/cart';

export default function Header() {
  return (
    <nav className="header">
      <a href="/" title="Back to homepage">
        <img src="/tined-logo.svg" alt="Tined Workshops logo" />
      </a>

      <Cart />
    </nav>
  );
}
