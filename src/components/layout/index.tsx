import Checkout from 'components/checkout';
import { Outlet } from 'react-router-dom';
import CartSidebar from './CartSidebar';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
  return (
    <div className="w-full min-h-full flex flex-col relative pb-12">
      <Header />
      <main>
        <Outlet />
      </main>
      <aside>
        <CartSidebar />
      </aside>
      <aside>
        <Checkout />
      </aside>
      <Footer />
    </div>
  );
}
